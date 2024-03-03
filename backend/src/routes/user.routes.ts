import express from 'express';
import { check } from 'express-validator';
import { me, register } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifytoken.middleware';

const router = express.Router();


router.get('/me', verifyToken, me);


router.post('/register',

    [check('firstname', 'Firstname is required!').isString(),
    check('lastname', 'Lastname is required!').isString(),
    check('username', 'Username is required!').isString(),
    check('email', 'Email is invalid!').isEmail(),
    check('password', 'Password must contain 1 Uppercase, 1 Symbol & 1 numeric character!').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 })],

    register
);

export default router;