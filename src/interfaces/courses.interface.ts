import { z } from "zod";
import { coursesCreateSchema, coursesReadSchema, coursesSchema } from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type Courses = z.infer<typeof coursesSchema>;

export type CoursesCreate = z.infer<typeof coursesCreateSchema>;
export type CoursesRead   = z.infer<typeof coursesReadSchema>;
export type CoursesListResult = QueryResult<Courses>;


export type CoursesUsers = {
    courseId: string;
    userId: string;
}
