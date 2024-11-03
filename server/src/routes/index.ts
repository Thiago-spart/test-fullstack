import express from 'express';
import { defaultRoute } from './defaultRoute';
import { userRouter } from './users';
import { clientsRouter } from './clients';
const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRouter);
routes.use(clientsRouter);

export default routes;