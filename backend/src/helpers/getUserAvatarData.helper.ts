import mongoose from 'mongoose';

import UsersAvatarSigned from '../models/user-avatars.model';

export const getUsersAvatarData = async (userid: string) => {
    const avatarsDb = await UsersAvatarSigned.findOne({ userId: userid });

    let avatar = '';
    const avatarOptions = await mongoose.connection.collection('avatars').find({}).toArray();

    // console.log('collectionnae--------> ', await mongoose.connection.collection('avatars').countDocuments())
    avatar = avatarOptions[0]![avatarsDb?.avatar!];

    return {
        avatar,
        avatarOptions,
    }
}
