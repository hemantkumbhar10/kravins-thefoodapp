
import express from 'express';
import { check } from 'express-validator';
import { verifyToken } from '../middlewares/verifytoken.middleware';
import { createComment, createReplyToComment, updateComment } from '../controllers/comments.controller';

const router = express.Router();



router.post('/add', verifyToken, [check('post', 'Post Id is required!').isString(), check('text', 'Comment is required!').isString()], createComment);
router.post('/reply', verifyToken, createReplyToComment);

router.put('/update-comment', verifyToken, [check('post', 'Post Id is required!').isString(), check('text', 'Comment is required!').isString(), check("commentId", "CommentId is required").isString()], check('rootCommentId', ' RootCommentId is required!').isString(), updateComment);

export default router;
