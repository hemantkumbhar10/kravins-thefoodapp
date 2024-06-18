import express from 'express'
import { searchFriends } from '../controllers/searchfriends.controller';

const router = express.Router();


router.get('/searchFriends', searchFriends);


export default router;