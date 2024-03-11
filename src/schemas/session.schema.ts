import { z } from "zod";
import { userSchema } from "./users.schema";


export const sessionSchema = userSchema.pick({
    email: true,
    password: true
});
