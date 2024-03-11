import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(), 
    password: z.string().max(120),
    admin: z.boolean().default(false),
})

export const userCreateSchema = userSchema.omit({id: true});
export const userReturnSchema = userSchema.omit({password: true});
export const userReadSchema = userReturnSchema.array();
