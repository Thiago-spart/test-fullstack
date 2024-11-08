"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const defaultRoute_1 = require("./defaultRoute");
const clients_1 = require("./clients");
const validate_1 = require("./validate");
const routes = express_1.default.Router();
routes.use(defaultRoute_1.defaultRoute);
routes.use(clients_1.clientsRouter);
routes.use(validate_1.validateRouter);
exports.default = routes;
