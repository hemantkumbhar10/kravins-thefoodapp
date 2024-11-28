import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { getUsersAvatarData } from '../helpers/getUserAvatarData.helper';

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

        //Default avatar
        const userAvatarData = await getUsersAvatarData("cooltomato");
        user.avatar.name = "cooltomato"
        user.avatar.url =  userAvatarData.avatar;

        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1D'
        });


        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });

        const userProfile = {
            user,
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
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId).select('-password');
        const userProfile = {
            user,
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
        const {avatarOptions} = await getUsersAvatarData(userId);

        const userProfile = {
            user,
            avatarOptions
        }
        return res.status(200).json(userProfile);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}



export const getUsers = async (req: Request, res: Response) => {

    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: userId }).select('-password');
        const usersFriends = user!.friends.friendsUsernames;
        const filter = { username: { $in: usersFriends } };
        const users = await User.find(filter).select('-password');

        //Merging avatars with respect to each friend
        const usersWithAvatars = users.map(async user => {
            return {
                friendId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
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
        const user = await User.findOne({ _id: userId }).select('-password');
        const usersFriendsRequests = user!.friends.friendsRequestUsernames;
        const filter = { username: { $in: usersFriendsRequests } };
        const users = await User.find(filter).select('-password');

        //Merging avatars with respect to each friend
        const usersFriendRequestsWithAvatars = users.map(async user => {
            return {
                friendId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
            }
        });

        return res.status(200).json(usersFriendRequestsWithAvatars);

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}

