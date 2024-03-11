import { sessionSchema } from './../schemas/session.schema';
import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { loginController } from '../controllers/session.controller';

export const sessionRouter: Router = Router();

sessionRouter.post("/", validateBody(sessionSchema), loginController);