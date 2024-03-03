import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './config/db';
import userRoutes from './routes/user.routes';


const app = express();


const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(cors(
//     {
//         origin: process.env.FRONTEND_URL,
//         credentials: true,
//     }
// ));

//CONNECT TO DATABASE
connectToDatabase();

//USER ROUTES
app.use('/api/user', userRoutes);

app.get('/api/test', async (req: Request, res: Response) => {
    res.send({ message: 'Hello from kitchen!' })
})

app.listen(port, () => {
    console.log()
    console.log("Server started successfully on port: " + port);
})