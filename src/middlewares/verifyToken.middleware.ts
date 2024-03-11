import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/App.error";


export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {

    const { authorization } = req.headers;
    
    if(!authorization) {
        throw new AppError("Missing bearer token", 401);
    }
    
    const token: string = authorization.split(" ")[1];
    const decoded =  verify(token, process.env.SECRET_KEY!);
    
    res.locals = { ...res.locals, decoded};
    
    return next();
}


