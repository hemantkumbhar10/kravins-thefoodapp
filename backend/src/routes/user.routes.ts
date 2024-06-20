import express from 'express';
import { check } from 'express-validator';
import { getUsers, getUsersFriendRequests, me, register, updateUserData } from '../controllers/user.controller';
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

router.put(
    '/updateUserInfo',
    verifyToken,
    [
        check('firstname', 'Firstname is required!').isString(),
        check('lastname', 'Lastname is required!').isString(),
        check('username', 'Username is required!').isString(),
        check('email', 'Email is invalid!').isEmail()
    ],
    updateUserData
)



router.get('/get-users', verifyToken, getUsers);
router.get('/get-friendrequests', verifyToken, getUsersFriendRequests);

export default router;