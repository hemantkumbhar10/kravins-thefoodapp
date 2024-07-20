import { Request, Response } from 'express';
import UserPersonalPost from '../models/user-personal-post.model';
import { uploadImages } from '../middlewares/cloudinary.middleware';
import { UserPersonalPostType } from '../helpers/types';


export const getMyPersonalPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id.toString();

        const post = await UserPersonalPost.findById(postId);

        if (!post) {
            return res.status(404).send({ message: "Post not found!" });
        }

        return res.status(200).json(post);
    } catch (e) {
        console.log("Error while fetching post", e);
        return res.status(500).send({ message: "Something went wrong!" });
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
        res.status(201).send(personalPost);
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

        return res.status(201).json(updatedPost);


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



