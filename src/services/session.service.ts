import { Query } from "pg";
import { sign } from "jsonwebtoken";
import { client } from "../database";
import AppError from "../errors/App.error";
import { User, UserResult } from "../interfaces/user.interface";
import { SessionCreate, SessionReturn } from "../interfaces/session.interface";
import { compare } from "bcryptjs";


export const loginService = async (data: SessionCreate): Promise<SessionReturn> => {

    const query: UserResult = await client.query(
        'SELECT * FROM "users" WHERE "email" = $1;',
        [data.email]
    );

    if(!query.rowCount) {
        throw new AppError("Wrong email/password", 401);
    }
    
    const user: User = query.rows[0];
    
    const verifyPass: boolean = await compare(data.password, user.password);

    if(!verifyPass) {
        throw new AppError("Wrong email/password", 401)
    };


    const token: string = sign(
        { email: user.email, admin: user.admin },
        process.env.SECRET_KEY!,
        { expiresIn: process.env.EXPIRES_IN!, subject: user.id.toString() }
    )

    return {token};
};
