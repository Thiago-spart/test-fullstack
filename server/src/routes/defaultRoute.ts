import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/ping', (_, res) => {
  res.send("pong");
})