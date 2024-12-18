import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectToDatabase from './config/db';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import feedRoutes from './routes/feed.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import myPostRoutes from './routes/my-personal-posts.routes';
import updateAvatarRoutes from './routes/user-avatar.routes';
import searchRoutes from './routes/search.routes';
import friendsRoutes from './routes/friends.routes';
import commentRoutes from './routes/comments.routes';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const app = express();

//COOKIES ARE NOT TYPICALLY COMES AS A STRING
//TO USE THEM WE MUST CONVERT THE, INTO OBJECT
// cookie-parser CONVERTS THIS COOKIE INTO request.cookies OBJECT
// FROM WHERE WE CAN FIND COOKIES AS request.cookies['auth_token']
app.use(cookieParser());


const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL as string,
  credentials: true,
}));



//CONNECT TO DATABASE
connectToDatabase();

//FEED ROUTES
app.use('/api', feedRoutes);

//USER ROUTES
app.use('/api/user', userRoutes);

//AUTH ROUTES
app.use('/api/auth', authRoutes);

//PERSONAL POST ROUTES
app.use('/api/mypost', myPostRoutes);

//UPDATE AVATAR ROUTES
app.use('/api/avatars', updateAvatarRoutes);

//SEARCH ROUTES
app.use('/api/search', searchRoutes);

//FRIENDS ROUTES
app.use('/api/friends', friendsRoutes);

//COMMENT ROUTES
app.use('/api/comments', commentRoutes);

app.listen(port, () => {
  console.log("Server started successfully on port: ", port);
})


