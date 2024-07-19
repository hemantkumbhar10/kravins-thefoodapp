import express from 'express';
import { getFeedPosts } from '../controllers/feed.controller';


const router = express.Router();

router.get('/', getFeedPosts);

export default router;