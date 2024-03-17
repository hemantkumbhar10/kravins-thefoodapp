import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

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

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });

        return res.status(200).send({ message: 'User registered successfully!' });

    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};


export const me = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        //WE DONT WANT TO INCLUDE PASSWORD IN RESPONSE
        const user = await User.findById(userId).select('password');
        if (!user) {
            return res.status(400).send({ message: 'User not found!' });
        }
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
}