import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './config/db';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';


const app = express();

//COOKIES ARE NOT TYPICALLY COMES AS A STRING
//TO USE THEM WE MUST CONVERT THEM INTO OBJECT
//cookie-parser CONVERTS THIS Cookie into request.cookies OBJECT
//FROM WHERE WE CAN FIND COOKIES AS request.cookies['auth_token']
app.use(cookieParser());


const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL as string,
        credentials: true,
    }
));

//CONNECT TO DATABASE
connectToDatabase();

//USER ROUTES
app.use('/api/user', userRoutes);

//AUTH ROUTES
app.use('/api/auth', authRoutes);


app.listen(port, () => {
    console.log()
    console.log("Server started successfully on port: " + port);
})