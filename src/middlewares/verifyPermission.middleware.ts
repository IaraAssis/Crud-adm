import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";

export const verifyPermission = (req: Request, res: Response, next: NextFunction): void => {

    const { admin } = res.locals.decoded;

    if(admin) return next();
    
    if(!admin){
        throw new AppError("Insufficient permission", 403);
    }

    return next();
}

