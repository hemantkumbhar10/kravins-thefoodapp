import { Request, Response } from 'express';
import { constructSearchQueryForFriends } from '../helpers/searchQueryConstructors';
import { IUserPersonalPost } from '../helpers/types';
import UserPersonalPost from '../models/user-personal-post.model';
import { getAllComments } from './comments.controller';
import { IComment } from '../helpers/types';
//type SafeUser = Omit<IUser, 'password'>;

export interface IPostWithComments {
    comments: IComment[],
    post: IUserPersonalPost,
}

interface FeedPosts {
    data: IPostWithComments[],
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
        const personalPosts = await UserPersonalPost.find({}).sort({ lastUpdated: -1 }).skip(skip).limit(pageSize).populate({ path: 'user', select: '-password' });
        //Total count display at pagination
        const total = await UserPersonalPost.countDocuments(query);
        const allPostsWithComments: IPostWithComments[] = [];
        for (const post of personalPosts) {
            const commentsForPost = await getAllComments(post._id);
            const data: IPostWithComments = {
                post,
                comments: commentsForPost ? commentsForPost : []
            }
            allPostsWithComments.push(data);
        }

        const response: FeedPosts = {
            data: allPostsWithComments,
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
