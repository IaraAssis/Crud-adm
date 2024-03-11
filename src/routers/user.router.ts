import { verifyPermission } from './../middlewares/verifyPermission.middleware';
import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { createUserController, readUserController, readUserCoursesController } from "../controllers/user.controller";
import { validateUserEmailExists } from "../middlewares/validateUserEmailExists";
import { verifyToken } from "../middlewares/verifyToken.middleware";


export const userRouter: Router = Router();

userRouter.post("/", validateBody(userCreateSchema), validateUserEmailExists, createUserController );

userRouter.get("/", verifyToken, verifyPermission, readUserController );

userRouter.get("/:id/courses", verifyToken, verifyPermission, readUserCoursesController);
