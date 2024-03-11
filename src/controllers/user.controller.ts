import { readCourseController } from './courses.controller';
import { createUserService, readUserCoursesService, readUserService } from "../services/user.service";
import { User, UserRead, UserReturn } from "../interfaces/user.interface";
import { Request, Response } from "express";


export const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const user: UserReturn  = await createUserService(req.body);
    return res.status(201).json(user);
};

export const readUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserRead = await readUserService();
    return res.status(200).json(user);
};

export const readUserCoursesController = async (req: Request, res: Response): Promise<Response> => { 

    const user: UserRead = await readUserCoursesService( req.params.id )
    return res.status(200).json(user);
};




