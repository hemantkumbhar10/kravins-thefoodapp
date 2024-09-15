import { Request, Response } from 'express';
import UserPersonalPost from '../models/user-personal-post.model';
import { uploadImages } from '../middlewares/cloudinary.middleware';
import { UserPersonalPostType } from '../helpers/types';
import { getAllComments } from './comments.controller';
import { IComment } from '../models/comments.model';

export const getMyPersonalPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id.toString();

        const post = await UserPersonalPost.findById(postId);

        if (!post) {
            return res.status(404).send({ message: "Post not found!" });
        }

        const comments = await getAllComments(postId);

        const data = {
            post,
            comments
        }

        return res.status(200).json(data);
    } catch (e) {
        console.log("Error while fetching post", e);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}


export interface GetPostsWithComments extends UserPersonalPostType {
    comments: IComment[]
}

export const getAllMyPosts = async (req: Request, res: Response) => {
    try {
        const allMyPosts: UserPersonalPostType[] = await UserPersonalPost.find({ userId: req.userId }).lean();

        if (!allMyPosts) {
            return res.status(404).send({ message: "Posts not found!" });
        }



        const allPosts: GetPostsWithComments[] = [];
        for (const post of allMyPosts) {

            const postWithComments: GetPostsWithComments = {
                ...post,
                comments: []
            }

            const comments = await getAllComments(post._id);

            postWithComments.comments = comments ? comments : [];
            allPosts.push(postWithComments);
        }

        console.log(allPosts);
        return res.status(200).json(allPosts);
    }
    catch (e) {
        console.log("Error getting all posts!", e);
        return res.status(500).send({ message: "Soemthing went wrong!" });
    }
}


export const myPersonalPost = async (req: Request, res: Response) => {
    try {
        const postImages = req.files as Express.Multer.File[];

        const newPersonalPost: UserPersonalPostType = req.body;

        const imageUrls = await uploadImages(postImages);
        if (!imageUrls) {
            return res.status(401).send('Image upload failed!');
        }
        newPersonalPost.images = imageUrls!;
        newPersonalPost.lastUpdated = new Date();
        newPersonalPost.userId = req.userId;

        const personalPost = new UserPersonalPost(newPersonalPost);
        await personalPost.save();

        const comments = await getAllComments(personalPost._id);

        const data = {
            personalPost,
            comments
        }

        res.status(201).send(data);
    } catch (e) {
        console.log("Error while creating personal post", e);
        res.status(500).send({ message: 'Something went wrong!' });
    }

}


export const updateMyPersonalPost = async (req: Request, res: Response) => {
    try {

        const postImages = req.files as Express.Multer.File[];

        const toBeUpdatedPersonalPostData: UserPersonalPostType = req.body;

        toBeUpdatedPersonalPostData.lastUpdated = new Date();

        const imageUrls = await uploadImages(postImages);

        if (!imageUrls) {
            return res.status(401).send({ message: "Image upload failed!" });
        }

        const postId = req.body.postId;

        const updatedPost = await UserPersonalPost.findByIdAndUpdate({ _id: postId }, toBeUpdatedPersonalPostData, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: "Post does not exists!" });
        }

        updatedPost.images = [...imageUrls, ...(toBeUpdatedPersonalPostData.images || [])];

        await updatedPost.save();
        const comments = await getAllComments(postId);

        const data = {
            updatedPost,
            comments
        }

        return res.status(201).json(data);


    } catch (e) {
        console.log("Error while updating personal post", e);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}


export const deleteMyPost = async (req: Request, res: Response) => {

    try {

        const postId = req.params.id.toString();

        const post = await UserPersonalPost.findById(postId);


        if (!post) {
            return res.status(404).send({ message: "Post not found!" });
        }

        if (req.userId !== post.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        await post.deleteOne();

        return res.status(200).send({ message: 'Post deleted successfully!' });
    }
    catch (e) {
        console.log("Error while deleting post", e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}



