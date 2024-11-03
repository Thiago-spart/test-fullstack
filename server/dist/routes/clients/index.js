"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRouter = void 0;
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
exports.clientsRouter = express_1.default.Router();
exports.clientsRouter.get('/clients', async (req, res) => {
    try {
        console.log();
        const { id } = req.query;
        const dbConnection = await db;
        if (!id) {
            const sql = 'SELECT * FROM clients';
            const [results] = await dbConnection.execute(sql);
            if (!results) {
                throw new Error('Database error');
            }
            return res.json(results);
        }
        const sql = 'SELECT * FROM clients WHERE id = ?';
        const [results] = await dbConnection.execute(sql, [id]);
        if (!results || !results.length) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        return res.json(results);
    }
    catch (error) {
        // console.error('Database error:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});
exports.clientsRouter.post('/clients', async (req, res) => {
    try {
        const dbConnection = await db;
        const { name, email, telephone, document, status } = req.body;
        if (!name || !email || !telephone || !document || !status) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        const validationSql = 'SELECT * FROM clients WHERE email = ? OR document = ?';
        const [results] = await dbConnection.query(validationSql, [email, document]);
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email ou documento já cadastrados' });
        }
        const sql = 'INSERT INTO clients (name, email, telephone, document, status) VALUES (?, ?, ?, ?, ?)';
        await dbConnection.query(sql, [name, email, telephone, document, status]);
        return res.json({ message: 'Cliente criado com sucesso' });
    }
    catch (err) {
        //  console.error('Database error:', err);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});
exports.clientsRouter.put('/clients/update', async (req, res) => {
    try {
        const dbConnection = await db;
        const { id, name, email, telephone, document, status } = req.body;
        if (!name || !email || !telephone || !document || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const sql = 'UPDATE clients SET name = ?, email = ?, telephone = ?, document = ?, status = ? WHERE id = ?';
        await dbConnection.query(sql, [name, email, telephone, document, status, id]);
        return res.json({ message: 'Cliente atualizado com sucesso' });
    }
    catch (err) {
        //  console.error('Database error:', err);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});
exports.clientsRouter.delete('/clients/delete', async (req, res) => {
    try {
        const dbConnection = await db;
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'id é obrigatório' });
        }
        const sql = 'DELETE FROM clients WHERE id = ?';
        await dbConnection.query(sql, [id]);
        return res.json({ message: 'Cliente deletado com sucesso' });
    }
    catch (err) {
        //  console.error('Database error:', err);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});
