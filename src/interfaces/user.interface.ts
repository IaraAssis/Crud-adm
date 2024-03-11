import { z } from "zod";
import { QueryResult } from "pg";
import { userCreateSchema, userReadSchema, userReturnSchema, userSchema } from "../schemas/users.schema";

export type User = z.infer<typeof userSchema>;

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserRead   = z.infer<typeof userReadSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;

export type UserResult = QueryResult<User>;


