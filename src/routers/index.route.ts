import { Router } from "express";
import { userRouter } from "./user.router";
import { sessionRouter } from "./session.router";
import { couserRouter } from "./couser.route";

export const routes: Router = Router();

routes.use("/users", userRouter);
routes.use("/login" , sessionRouter);
routes.use("/courses", couserRouter);