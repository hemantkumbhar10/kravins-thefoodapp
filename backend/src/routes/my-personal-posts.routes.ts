import express from 'express';
import { myPersonalPost } from '../controllers/my-personal-posts.controller';
import { uploadImage } from '../helpers/imageupload.helper';
import { body, check } from 'express-validator';
import { verifyToken } from '../middlewares/verifytoken.middleware';


const router = express.Router();


router.post('/',
    [
        check('title', 'Title is required!').isLength({ min: 1 }).isString()
    ],
    verifyToken,
    uploadImage.array('postImages', 3), //RECIEVE IMAGE ARRAY WITH MAX LIMIT OF 3 IMAGES
    myPersonalPost
);


export default router;