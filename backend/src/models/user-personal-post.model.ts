import mongoose from "mongoose";
import { UserPersonalPostType } from '../helpers/types';

const personalPostSchema = new mongoose.Schema({
    userId: {
        type: String,
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

const UserPersonalPost = mongoose.model<UserPersonalPostType>('UserPersonalPost', personalPostSchema);

export default UserPersonalPost;
