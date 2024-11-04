import express, { Request, Response }  from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
});


export const validateRouter = express.Router();

validateRouter.get('/validate/email', async (req: Request, res: Response): Promise<any> => {
	try {
		const dbConnection = await db
		const { email } = req.query;
		const sql = 'SELECT * FROM clients WHERE email = ?';
		const [results] = await dbConnection.query(sql, [email]) as any;

		if (results.length > 0) {
			return res.status(200).json({ message: 'Email ja cadastrado' });
		}

		return res.json({ message: 'Email disponível' });
	} catch (err) {
		return res.status(500).json({ error: 'Erro no servidor' });
	}
})

validateRouter.get('/validate/document', async (req: Request, res: Response): Promise<any> => {
	try {
		const dbConnection = await db
		const { document } = req.query;
		const sql = 'SELECT * FROM clients WHERE document = ?';
		const [results] = await dbConnection.query(sql, [document]) as any;

		if (results.length > 0) {
			return res.status(200).json({ message: 'Documento ja cadastrado' });
		}

		return res.json({ message: 'Documento disponível' });
	} catch (err) {
		return res.status(500).json({ error: 'Erro no servidor' });
	}
})