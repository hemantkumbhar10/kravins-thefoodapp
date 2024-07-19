import { Request, Response } from 'express';
import { constructSearchQueryForFriends, FriendsQueryParamsType } from '../helpers/searchQueryConstructors';
import User from '../models/user.model';
import UsersAvatarSigned from '../models/user-avatars.model';
import { FriendsSearchResponse } from '../helpers/types';
import mongoose from 'mongoose';





export const searchFriends = async (req: Request, res: Response) => {
    try {
        const query = constructSearchQueryForFriends(req.query);

        //Default number of friends per page
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

        const user = await User.findById(req.userId).select('-password');

        //Skipper when clicked on next page
        const skip = (pageNumber - 1) * pageSize;
        const friends = await User.find(query).where('username').ne(user?.username).skip(skip).limit(pageSize).select('-password');

        //Total count display at pagination
        const total = await User.countDocuments(query);

        const friendUserIds = friends.map(friend => friend._id);

        //Search for friends avatars
        const friendsAvatars = await UsersAvatarSigned.find({ userId: { $in: friendUserIds } });

        const avatarOptions = await mongoose.connection.collection('avatars').find({}).toArray();

        //Merging avatars with respect to each friend
        const friendsWithAvatars = friends.map(friend => {
            const avatarObj = friendsAvatars.find(avatar => avatar.userId === friend._id.toString());
            const avatarURL = avatarOptions[0][avatarObj?.avatar!];

            return {
                friendId: friend._id,
                firstname: friend.firstname,
                lastname: friend.lastname,
                email: friend.email,
                username: friend.username,
                avatar: avatarURL,
            }
        });

        const response: FriendsSearchResponse = {
            data: friendsWithAvatars,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        }

        return res.status(200).json(response);

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}


