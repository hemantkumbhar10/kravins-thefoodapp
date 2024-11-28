import mongoose from "mongoose";
import {IUserAvatarSigned} from '../helpers/types';


const userAvatarSignedSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
})

const UsersAvatarSigned = mongoose.model<IUserAvatarSigned>('UserAvatarSigned', userAvatarSignedSchema);

export default UsersAvatarSigned;
