import mongoose from "mongoose";
import { IComment } from "../helpers/types";

const commentSchema = new mongoose.Schema<IComment>({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPersonalPost',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    likes: {
        type: [String],
        default: [],
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

}, { timestamps: true, toJSON: {virtuals:true}, toObject: {virtuals:true} });



commentSchema.pre('find', function(next) {
    this.populate({ path: "replies", populate: { path: "author", select: "-password"  } })
    next();
});

const Comments = mongoose.model<IComment>('Comment', commentSchema);

export default Comments;
