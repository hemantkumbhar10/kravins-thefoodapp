import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User, { UserType } from '../models/user.model';
import jwt from 'jsonwebtoken';
import UsersAvatarSigned from '../models/user-avatars.model';
import { getUsersAvatarData } from '../helpers/getUserAvatarData.helper';
import mongoose from 'mongoose';

export const register = async (req: Request, res: Response) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        let username = await User.findOne({ username: req.body.username });
        if (user || username) {
            return res.status(400).send({ message: 'User already exists!' });
        }

        user = new User(req.body);

        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1D'
        });

        const avatarName = new UsersAvatarSigned({ userId: user.id, avatar: 'cooltomato' });
        await avatarName.save();
        const userAvatarData = await getUsersAvatarData(user.id);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });

        const userProfile = {
            user,
            ...userAvatarData
        }

        return res.status(200).json(userProfile);

    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

export const updateUserData = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array() });
    }
    try {
        const userId = req.userId;
        const update = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, username: req.body.username }
        const updatedUser = await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId).select('-password');
        const userAvatarData = await getUsersAvatarData(userId);
        const userProfile = {
            user,
            ...userAvatarData
        }
        return res.status(200).json(userProfile);
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}


export const me = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        //WE DONT WANT TO INCLUDE PASSWORD IN RESPONSE
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).send({ message: 'User not found!' });
        }

        const userAvatarData = await getUsersAvatarData(userId);

        const userProfile = {
            user,
            ...userAvatarData
        }
        res.status(200).json(userProfile);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
}



export const getUsers = async (req: Request, res: Response) => {
    
    try {
        const userId = req.userId;
        const user  = await User.findOne({_id:userId}).select('-password');
        if (!user) {
            return res.status(400).send({ message: 'User not found!' });
        }
        const usersFriends = user.friends.friendsUsernames;

        const filter = { username: { $in: usersFriends } };

        const users = await User.find(filter).select('-password');

        const userIds = users.map(user => user._id);
        const usersAvatars = await UsersAvatarSigned.find({ userId: { $in: userIds } });
        const avatarOptions = await mongoose.connection.collection('avatars').find({}).toArray();

        //Merging avatars with respect to each friend
        const usersWithAvatars = users.map(user => {
            const avatarObj = usersAvatars.find(avatar => avatar.userId === user._id.toString());
            const avatarURL = avatarOptions[0][avatarObj?.avatar!];

            return {
                friendId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                avatar: avatarURL,
            }
        });

        return res.status(200).json(usersWithAvatars);

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}


export const getUsersFriendRequests = async (req: Request, res: Response) => {
    
    try {
        const userId = req.userId;
        const user  = await User.findOne({_id:userId}).select('-password');
        if (!user) {
            return res.status(400).send({ message: 'User not found!' });
        }
        const usersFriendsRequests = user.friends.friendsRequestUsernames;

        const filter = { username: { $in: usersFriendsRequests } };

        const users = await User.find(filter).select('-password');

        const userIds = users.map(user => user._id);
        const usersAvatars = await UsersAvatarSigned.find({ userId: { $in: userIds } });
        const avatarOptions = await mongoose.connection.collection('avatars').find({}).toArray();

        //Merging avatars with respect to each friend
        const usersFriendRequestsWithAvatars = users.map(user => {
            const avatarObj = usersAvatars.find(avatar => avatar.userId === user._id.toString());
            const avatarURL = avatarOptions[0][avatarObj?.avatar!];

            return {
                friendId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                avatar: avatarURL,
            }
        });

        return res.status(200).json(usersFriendRequestsWithAvatars);

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}

