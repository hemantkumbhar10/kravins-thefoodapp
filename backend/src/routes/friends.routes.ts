import express from 'express';
import { check } from 'express-validator';
import { verifyToken } from '../middlewares/verifytoken.middleware';
import { addFriend, deleteFriend } from '../controllers/friends.controller';


const router = express.Router();



router.post('/add-friend', verifyToken, [check('friendsUsername', 'Friends username invalid!')], addFriend);


router.delete('/delete-friend', verifyToken, [check('friendsUsername', 'Friends username invalid!')], deleteFriend);



export default router;
