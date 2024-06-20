import express from 'express';
import { verifyToken } from '../middlewares/verifytoken.middleware';
import { searchFriends } from '../controllers/searchfriends.controller';

const router = express.Router();


router.get('/searchFriends',verifyToken, searchFriends);


export default router;