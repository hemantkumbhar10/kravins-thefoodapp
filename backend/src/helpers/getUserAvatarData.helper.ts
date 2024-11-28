import mongoose from 'mongoose';

export const getUsersAvatarData = async (avatar:string ) => {
    const avatarOptions = await mongoose.connection.collection('avatars').find({}).toArray();

    // console.log('collectionnae--------> ', await mongoose.connection.collection('avatars').countDocuments())
    avatar = avatarOptions[0]![avatar];

    return {
        avatar,
        avatarOptions,
    }
}
