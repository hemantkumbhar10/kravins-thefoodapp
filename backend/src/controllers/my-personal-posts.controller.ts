import mongoose from 'mongoose';
import { Request, Response } from 'express';
import UserPersonalPost from '../models/user-personal-post.model';
import { uploadImages } from '../middlewares/cloudinary.middleware';
import { IUserPersonalPost } from '../helpers/types';
import { TypedRequestBody, getAllComments } from './comments.controller';
import Comments from '../models/comments.model';
import { IPostWithComments } from './feed.controller';

export const getMyPersonalPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id.toString();

        const post = await UserPersonalPost.findById(postId).populate({path:'user', select: '-password'});

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



export const getAllMyPosts = async (req: Request, res: Response) => {
    try {
        const allMyPosts: IUserPersonalPost[] = await UserPersonalPost.find({ user: req.userId }).populate({path:'user', select:'-password'}).lean();
        console.log("My posts", allMyPosts);
        if (!allMyPosts) {
            return res.status(404).send({ message: "Posts not found!" });
        }
        const allPosts: IPostWithComments[] = [];
        for (const post of allMyPosts) {
            const comments = await getAllComments(post._id);
            const postWithComments: IPostWithComments = {
                post,
                comments:  comments ? comments : []
            }
            allPosts.push(postWithComments);
        }
        return res.status(200).json(allPosts);
    }
    catch (e) {
        console.log("Error getting all posts!", e);
        return res.status(500).send({ message: "Soemthing went wrong!" });
    }
}


export const myPersonalPost = async (req:Request, res: Response) => {
    try {
        const postImages = req.files as Express.Multer.File[];

        const newPersonalPost = req.body;

        const imageUrls = await uploadImages(postImages);
        if (!imageUrls) {
            return res.status(401).send('Image upload failed!');
        }
        newPersonalPost.images = imageUrls!;
        newPersonalPost.lastUpdated = new Date();
        newPersonalPost.user = new mongoose.Types.ObjectId(req.userId);

        const personalPost: IUserPersonalPost = new UserPersonalPost(newPersonalPost);
        await personalPost.save();
        const populatedPost = await personalPost.populate({ path: 'user', select: '-password' });

        const comments = await getAllComments(personalPost._id);

        const data = {
            populatedPost,
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

        const toBeUpdatedPersonalPostData: IUserPersonalPost = req.body;

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
        const populatedPost = await updatedPost.populate({ path: 'user', select: '-password' });
        const comments = await getAllComments(postId);

        const data = {
            populatedPost,
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

        if (req.userId !== post.user.toString()) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        await Comments.deleteMany({post : postId});

        await post.deleteOne();

        return res.status(200).send({ message: 'Post deleted successfully!' });
    }
    catch (e) {
        console.log("Error while deleting post", e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}



