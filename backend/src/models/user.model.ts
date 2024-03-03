import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

type UserType = {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}


const userSchema = new mongoose.Schema({
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
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


// This is a middleware function that is called directly before the item is
// saved to the database (hence the name pre). This makes it possible to execute
// functions directly before the object is saved. Many times it is used to transform a value.

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})



const User = mongoose.model<UserType>('User', userSchema);
export default User;




