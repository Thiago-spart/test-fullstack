import express from 'express';
import { defaultRoute } from './defaultRoute';
import { clientsRouter } from './clients';
import { validateRouter } from './validate';
const routes = express.Router();

routes.use(defaultRoute);
routes.use(clientsRouter);
routes.use(validateRouter);

export default routes;