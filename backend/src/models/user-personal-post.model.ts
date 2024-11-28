import mongoose from "mongoose";
import { IUserPersonalPost } from '../helpers/types';

const personalPostSchema = new mongoose.Schema<IUserPersonalPost>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
    },
    images: {
        type: [String],
    },
    lastUpdated: {
        type: Date,
        required: true,
    },
})

const UserPersonalPost = mongoose.model<IUserPersonalPost>('UserPersonalPost', personalPostSchema);

export default UserPersonalPost;
