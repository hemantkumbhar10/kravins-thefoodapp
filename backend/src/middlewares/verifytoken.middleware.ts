import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

//GLOBALLY EXTENDING REQUEST OBJECT FROM EXPRESS TO SET ADDITIONAL PROPERTY userId
declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}



export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized!' });
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET as string);

        //EXTENDED userId TO REQUEST OBJECT SO THE MIDDLEWARE GIVES ACCESS TO IT THROUGHOUT LIFECYCLE OF REQUEST
        req.userId = (decoded_token as JwtPayload).userId;

        next();
    } catch (e) {
        return res.status(401).send('Unauthorized!');
    }
}