import { Courses, CoursesRead} from './../interfaces/courses.interface';
import { Request, Response } from "express";
import { coursesCreateService, createUserCourseService, deleteCourseService, readCourseService, readUserCourseService } from "../services/course.service";


export const createCourseController = async (req: Request, res: Response): Promise<Response> => {

    const courses: Courses  = await coursesCreateService(req.body);
    return res.status(201).json(courses);
};

export const readCourseController = async (req: Request, res: Response): Promise<Response> => {

    const courses: CoursesRead  = await readCourseService();
    return res.status(200).json(courses);
};

export const createUserCourseController = async (req: Request, res: Response) => {

    const {courseId} = req.params;
    const {userId} = req.params;

    const data = { 
        courseId,
        userId
    }

    await createUserCourseService(data)
    return res.status(201).json({ message:"User successfully vinculed to course" });
};

export const deleteCourseController = async (req: Request, res: Response) => {
    const {courseId} = req.params;
    const {userId} = req.params;

    const data = { 
        courseId,
        userId
    }

    await deleteCourseService(data);
    return res.status(204).json();
}

export const readUserCourseController = async (req: Request, res: Response) => {

    const usersInCourse = await readUserCourseService(req.params.id);

    return res.status(200).json(usersInCourse);
};