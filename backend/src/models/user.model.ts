import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../helpers/types';


const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    avatar: {
        name:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        friendsRequestUsernames: {
            type: [String],
            default: []
        },
        friendsUsernames: {
            type: [String],
            default: []
        }
    }
});


// This is a middleware function that is called directly before the item is
// saved to the database (hence the name pre). This makes it possible to execute
// functions directly before the object is saved. Many times it is used to transform a value.

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;




