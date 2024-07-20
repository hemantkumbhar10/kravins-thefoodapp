import express from 'express';
import { deleteMyPost, getMyPersonalPost, myPersonalPost, updateMyPersonalPost } from '../controllers/my-personal-posts.controller';
import { uploadImage } from '../helpers/imageupload.helper';
import { body, check } from 'express-validator';
import { verifyToken } from '../middlewares/verifytoken.middleware';
import { uploadImages } from '../middlewares/cloudinary.middleware';


const router = express.Router();


router.get('/:id', [check('postId', 'PostId is required').isString()], verifyToken, getMyPersonalPost);

router.post('/',
    [
        check('title', 'Title is required!').isLength({ min: 1 }).isString()
    ],
    verifyToken,
    uploadImage.array('postImages', 3), //RECIEVE IMAGE ARRAY WITH MAX LIMIT OF 3 IMAGES
    myPersonalPost
);


router.put('/', [check('title', 'Title is required!').isString()], verifyToken, uploadImage.array('postImages', 3), updateMyPersonalPost);

router.delete('/:id', verifyToken, deleteMyPost);


export default router;
