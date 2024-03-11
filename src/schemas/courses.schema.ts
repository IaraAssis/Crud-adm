
import { number, z } from "zod";

export const coursesSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15).min(3),
    description: z.string().nullable()
});

export const coursesCreateSchema = coursesSchema.omit({id: true});
export const coursesReadSchema = coursesSchema.array();
export const userDeleteSchema = coursesSchema.partial();

