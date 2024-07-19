import { Request, Response } from 'express';
import UserPersonalPost from '../models/user-personal-post.model';
import { uploadImages } from '../middlewares/cloudinary.middleware';
import { UserPersonalPostType } from '../helpers/types';



export const myPersonalPost = async (req: Request, res: Response) => {
    try {
        const postImages = req.files as Express.Multer.File[];

        const newPersonalPost: UserPersonalPostType = req.body;

        const imageUrls = await uploadImages(postImages);
        if(!imageUrls){
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

