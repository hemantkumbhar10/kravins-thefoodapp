import express, { Request, Response  } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(400).send({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Invalid Credentials!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Incorrect email or password!' });
        }

        const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1D' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });

        return res.status(200).send({ userId: user.id });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
}

export const validateToken = (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
}

export const logout = (req: Request, res: Response) => {
    // res.cookie('auth_token', '', {
    //     expires: new Date(0), //Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
    // })
    res.clearCookie('auth_token');
    res.status(200).send();
}