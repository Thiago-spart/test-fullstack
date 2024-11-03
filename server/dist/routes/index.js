"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const defaultRoute_1 = require("./defaultRoute");
const users_1 = require("./users");
const clients_1 = require("./clients");
const routes = express_1.default.Router();
routes.use(defaultRoute_1.defaultRoute);
routes.use(users_1.userRouter);
routes.use(clients_1.clientsRouter);
exports.default = routes;