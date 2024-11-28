import express from 'express';
import { check } from 'express-validator';
import { updateUserAvatar } from '../controllers/change-avatar.controller';
import { verifyToken } from '../middlewares/verifytoken.middleware';




const router = express.Router();


router.put('/changeAvatar', verifyToken, [check('avatarName', 'Avatar name is required!').isString()], updateUserAvatar);

export default router;

