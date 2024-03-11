import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createCourseController, createUserCourseController, deleteCourseController, readCourseController, readUserCourseController } from "../controllers/courses.controller";
import { verifyCourseAndUserExistence } from "../middlewares/verifyCourseAndUser.middleware copy";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { coursesCreateSchema } from "../schemas/courses.schema";

export const couserRouter: Router = Router();

couserRouter.post("/", validateBody(coursesCreateSchema), verifyToken, verifyPermission, createCourseController );
couserRouter.get("/", readCourseController);
couserRouter.get("/:id/users", verifyToken, verifyPermission, readUserCourseController);

couserRouter.use("/:courseId/users/:userId", verifyCourseAndUserExistence , verifyToken, verifyPermission);
couserRouter.post("/:courseId/users/:userId", createUserCourseController);
couserRouter.delete("/:courseId/users/:userId", deleteCourseController);