import { Request, Response } from 'express';
import UserPersonalPost from '../models/user-personal-post.model';
import Comments from '../models/comments.model';
import mongoose from 'mongoose';

export interface TypedRequestBody<T> extends Request {
    body: T;
}
type CommentRequestType = {
    post: string,
    like?: boolean,
    text: string,
    parentComment?: string,
    replies?: string,
}

//Since createComment function only expects data in the request body
//(i.e., the CommentRequestType), the first two parameters are left empty.
//
export const createComment = async (req: TypedRequestBody<CommentRequestType>, res: Response) => {
    try {
        const { post, text, like, parentComment } = req.body;
        const postId = new mongoose.Types.ObjectId(post);
        const parentCommentId = parentComment ? new mongoose.Types.ObjectId(parentComment) : undefined;
        const authorId = new mongoose.Types.ObjectId(req.userId);
        const postExists = await UserPersonalPost.findById(postId);
        if (!postExists) {
            return res.status(404).send({ message: "This post does not exists!" });
        }

        const newCommentData = {
            post: postId,
            author: authorId,
            text,
            likes: like ? [authorId] : [],
            parentComment: parentCommentId,
        }
        const newComment = new Comments(newCommentData);
        await newComment.save();
        const populatedComments = await Comments.find({ post, parentComment: null }).sort({ _id: 1 })
            .populate({ path: "replies" })
            .populate({ path: "author", select: "-password" })
            .lean();
        return res.status(201).json(populatedComments);
    } catch (e) {
        console.log("Creating comment failed!", e);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}
export const createReplyToComment = async (req: Request, res: Response) => {
    try {
        const { post, replyText, like, parentComment } = req.body;
        const authorId = new mongoose.Types.ObjectId(req.userId);
        const replyObj = {
            author: authorId,
            text: replyText,
            parentComment: parentComment,
            post,
            likes: like ? [authorId] : [],
        }
        const reply = new Comments(replyObj);
        await reply.save();
        await Comments.findOneAndUpdate({ _id: parentComment, post }, { $push: { replies: reply._id } })
        const comments = await Comments.find({ post, _id: parentComment }).sort({ _id: 1 })
            .populate({ path: "replies" })
            .populate({ path: "author", select: "-password" })
            .lean();
        return res.status(201).json(comments);
    } catch (e) {
        console.log("Creating reply failed", e);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}


//TODO:  CREATE UPDATE ROUTE AND INTEGRATE WITH UI
export const updateComment = async (req: Request, res: Response) => {
    try {
        const { commentId, text, post, rootCommentId } = req.body;
        const comment = await Comments.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: "Comment not found!" });
        }
        if (comment.author.toString() !== req.userId) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        comment.text = text;
        await comment.save();
        const comments = await Comments.find({ post, _id: rootCommentId }).sort({ _id: 1 })
            .populate({ path: "replies" })
            .populate({ path: "author", select: "-password" })
            .lean();

        return res.status(201).json(comments);
    } catch (e) {
        console.log("Error while updating comment", e);
        return res.status(500).send({ message: "Something went wrong!" });
    }
}


export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId, rootCommentId } = req.body;
        const comment = await Comments.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: "Comment not found!" });
        }
        if (comment.author.toString() !== req.userId) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        const parent = comment.parentComment;
        await comment.deleteOne();
        if (parent) {
            const parentCommentData = await Comments.findById(parent);
            if (parentCommentData) {
                parentCommentData.replies.filter(replyId => replyId !== commentId);
                await parentCommentData.save();
            }
        }
        if(!rootCommentId){
            return res.status(200).json([]);
        }
        const comments = await Comments.find({ _id: rootCommentId }).sort({ _id: 1 })
            .populate({ path: "replies" })
            .populate({ path: "author", select: "-password" })
            .lean();

        return res.status(201).json(comments);

    }
    catch (e) {
        return res.status(500).send({ message: "Something went wrong!" })
    }
}


export const getAllComments = async (post: string) => {
    const comments = await Comments.find({ post, parentComment: null }).sort({ _id: 1 })
        .populate({ path: "replies" })
        .populate({ path: "author", select: "-password" })
        .lean();
    return comments;
}























