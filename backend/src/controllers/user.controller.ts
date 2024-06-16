import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import UsersAvatarSigned from '../models/user-avatars.model';
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

