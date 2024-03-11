import 'express-async-errors';
import express, { Application, json } from 'express'
import { routes } from './routers/index.route';
import { handleErrors } from './middlewares/handleErrors.middleware';

const app: Application = express();
app.use(json());

app.use("/", routes);

app.use(handleErrors);

export default app;
