"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const promise_1 = tslib_1.__importDefault(require("mysql2/promise"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const db = promise_1.default.createConnection({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});
exports.validateRouter = express_1.default.Router();
exports.validateRouter.get('/validate/email', async (req, res) => {
    try {
        const dbConnection = await db;
        const { email } = req.query;
        const sql = 'SELECT * FROM clients WHERE email = ?';
        const [results] = await dbConnection.query(sql, [email]);
        if (results.length > 0) {
            return res.status(200).json({ message: 'Email ja cadastrado' });
        }
        return res.json({ message: 'Email disponível' });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});
exports.validateRouter.get('/validate/document', async (req, res) => {
    try {
        const dbConnection = await db;
        const { document } = req.query;
        const sql = 'SELECT * FROM clients WHERE document = ?';
        const [results] = await dbConnection.query(sql, [document]);
        if (results.length > 0) {
            return res.status(200).json({ message: 'Documento ja cadastrado' });
        }
        return res.json({ message: 'Documento disponível' });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});
