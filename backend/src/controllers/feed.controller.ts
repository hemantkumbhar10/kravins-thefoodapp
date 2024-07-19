
import { Request, Response } from 'express';
import { constructSearchQueryForFriends, FriendsQueryParamsType } from '../helpers/searchQueryConstructors';
import User, { UserType } from '../models/user.model';
import UsersAvatarSigned from '../models/user-avatars.model';
import { FriendsSearchResponse, UserPersonalPostType } from '../helpers/types';
import mongoose from 'mongoose';
import UserPersonalPost from '../models/user-personal-post.model';

type SafeUser = Omit<UserType, 'password'>;

type UserPostsData = {
  user: SafeUser,
  avatarUrl: string,
  post: UserPersonalPostType,
}

interface FeedPosts {
  data: UserPostsData[],
  pagination: {
    total: number
  }
}


export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const query = constructSearchQueryForFriends(req.query);

    //Default number of friends per page
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");


    //Skipper when clicked on next page
    const skip = (pageNumber - 1) * pageSize;
    //find users with ommitted passwords
    //get avatarOptions
    //get UserPostsData
    //map function to map all these into one object 
    //return
    const personalPosts = await UserPersonalPost.find({}).sort({ lastUpdated: -1 }).skip(skip).limit(pageSize);
    const usersIds = personalPosts.map(post => post.userId)

    const users: SafeUser[] = await User.find({ _id: { $in: usersIds } }).select('-password');

    //Total count display at pagination
    const total = await UserPersonalPost.countDocuments(query);


    //Search for friends avatars
    const usersAvatars = await UsersAvatarSigned.find({ userId: { $in: usersIds } });

    const avatarOptions = await mongoose.connection.collection('avatars').find({}).toArray();

    //Merging avatars with respect to each friend
    const postsWithAvatars: UserPostsData[] = personalPosts.map(post => {
      const avatarObj = usersAvatars.find(avatar => avatar.userId === post.userId);
      const avatarUrl = avatarOptions[0][avatarObj?.avatar!];
      const user = users.find((user) => user._id.toString() === post.userId) as SafeUser
      return {
        user,
        avatarUrl,
        post
      }
    });

    const response: FeedPosts = {
      data: postsWithAvatars,
      pagination: {
        total

      }

    }


    return res.status(200).json(response);


  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: 'Something went wrong!' });
  }
}


