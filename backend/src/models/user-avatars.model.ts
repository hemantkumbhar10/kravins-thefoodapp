import mongoose from "mongoose";
import {UserAvatarSignedType} from '../helpers/types';


const userAvatarSignedSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
})

const UsersAvatarSigned = mongoose.model<UserAvatarSignedType>('UserAvatarSigned', userAvatarSignedSchema);

export default UsersAvatarSigned;