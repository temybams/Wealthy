import jwt from 'jsonwebtoken';
import config from '../config/dbConfig';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET =  config.jwt_secret as string;

export const verfiyToken = (req: Request, res: Response, nex: NextFunction) => {
   
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(401).send({ message: 'Invalid token and Access Denied!' });
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(401).send({ message: 'Invalid token and Access Denied!' });
            return; 
        }
        (req as any).decoded = decoded;
        nex();
    })

}

