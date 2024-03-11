import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";
import { client } from "../database";

export const verifyCourseAndUserExistence = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { courseId, userId } = req.params;

    const userResult = await client.query(`SELECT * FROM "users" WHERE id = $1`, [userId]);
    
    const courseResult = await client.query(`SELECT * FROM "courses" WHERE id = $1`, [courseId]);
    
    if(!userResult.rowCount || !courseResult.rowCount ) {

        throw new AppError("User/course not found", 404);
    }

    return next();

}

