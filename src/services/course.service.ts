import { CoursesListResult, CoursesRead, CoursesUsers } from './../interfaces/courses.interface';
import format from "pg-format";
import { Courses, CoursesCreate } from "../interfaces/courses.interface";
import { client } from '../database';


export const coursesCreateService = async (data: CoursesCreate): Promise<Courses> => {

    const queryFormat: string = format(
      'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(data),
        Object.values(data)
    );

    const queryResult: CoursesListResult = await client.query(queryFormat);
    return queryResult.rows[0];
};


export const readCourseService = async (): Promise<CoursesRead> => {
    const query: CoursesListResult = await client.query('SELECT * FROM "courses";');

    return query.rows;
};

export const createUserCourseService = async (data: CoursesUsers)  => {

    const queryFormat: string =  format(
        'INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;',
            Object.keys(data),
            Object.values(data)
    );
    await client.query(queryFormat);

};

export const deleteCourseService = async ( data: CoursesUsers ) => {
    const { userId, courseId } = data;

    const queryFormat: string = format(
        'UPDATE "userCourses"  SET "active" = false  WHERE "userId" = %L AND "courseId" = %L;',
        userId,
        courseId
    ) 
    
    await client.query(queryFormat);
};

export const readUserCourseService = async (courseId: string) => {

    const queryFormat: string = format(`
        SELECT 
        "uc"."userId",
        "u"."name" AS "userName",
        "uc"."courseId",
        "c"."name" AS "courseName",
        "c"."description" AS "courseDescription",
        "uc"."active" AS "userActiveInCourse"
    FROM "userCourses" AS "uc"
    LEFT JOIN "users" AS "u" ON "uc"."userId" = "u"."id"
    LEFT JOIN "courses" AS "c" ON "uc"."courseId" = "c"."id"
    WHERE "uc"."courseId" = $1;
    `
    );
    const query = await client.query(queryFormat,[courseId]);
        return query.rows;
};

