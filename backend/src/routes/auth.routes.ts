import express from 'express';
import { check } from 'express-validator';
import { login, logout, validateToken } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifytoken.middleware';

const router = express.Router();

router.post('/login',
    [check('email', 'Email field is invalid!').isEmail(),
    check('password', 'Password field is invalid!').isLength({ min: 8 })
    ],
    login
);


router.get('/validate-token', verifyToken, validateToken);

router.post('/logout', logout);

export default router;