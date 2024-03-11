

import { number } from 'zod';
import format from "pg-format";
import { UserCreate, UserRead, UserReturn, UserResult, User } from "../interfaces/user.interface";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userReadSchema, userReturnSchema } from "../schemas/users.schema";
import AppError from '../errors/App.error';


export const createUserService = async (data: UserCreate): Promise<UserReturn> => {
    data.password = await hash(data.password, 10);

    const queryFormat: string = format(
      'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(data),
        Object.values(data)
    );

    const query: UserResult = await client.query(queryFormat);
    return userReturnSchema.parse(query.rows[0]);
};

export const readUserService = async (): Promise<UserRead> => {
    const query: UserResult = await client.query('SELECT * FROM "users";');
    return userReadSchema.parse(query.rows);
}


export const readUserCoursesService = async (userId: string): Promise<UserRead> => {
    
    const queryString: string = `
        SELECT 
        "uc"."courseId",
        "c"."name" AS "courseName",
        "c"."description" AS "courseDescription",
        "uc"."active" AS "userActiveInCourse",
        "uc"."userId",
        "u"."name" AS "userName"
    FROM "userCourses" AS "uc"
    LEFT JOIN "courses" AS "c" ON "uc"."courseId" = "c"."id"
    LEFT JOIN "users" AS "u" ON "uc"."userId" = "u"."id"
    WHERE "uc"."userId" = $1;
        `
        const queryResult: UserResult = await client.query(queryString, [userId]);

        if(!queryResult.rowCount){
            throw new AppError("No course found", 404);
        }
        
        return queryResult.rows;
}