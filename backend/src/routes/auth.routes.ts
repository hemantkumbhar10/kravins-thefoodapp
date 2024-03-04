import express from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login',
    [check('email', 'Email field is invalid!').isEmail(),
    check('password', 'Password field is invalid!').isLength({ min: 8 })
    ],
    login
);



export default router;