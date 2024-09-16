
import express from 'express';
import { check } from 'express-validator';
import { verifyToken } from '../middlewares/verifytoken.middleware';
import { createComment, createReplyToComment, deleteComment, updateComment } from '../controllers/comments.controller';

const router = express.Router();



router.post('/add', verifyToken, [check('post', 'Post Id is required!').isString(), check('text', 'Comment is required!').isString()], createComment);
router.post('/reply', verifyToken, createReplyToComment);
router.put('/update-comment', verifyToken, [check('post', 'Post Id is required!').isString(), check('text', 'Comment is required!').isString(), check("commentId", "CommentId is required").isString()], check('rootCommentId', ' RootCommentId is required!').isString(), updateComment);
router.delete('/delete', verifyToken, [check("commentId", "CommentId is required").isString(), check('rootCommentId', ' RootCommentId is required!').isString()], deleteComment);

export default router;
