import express, { Request, Response }  from 'express';
import mysql from 'mysql';

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
});

export const userRouter = express.Router();

userRouter.post('/login', (req: Request, res: any) => {
	const { email, password } = req.body;

	return res.json({ email, password });

	// if (!email || !password) {
	// 		return res.status(400).json({ error: 'Email and password are required' });
	// }

	// const sql = 'SELECT * FROM users WHERE email = ?';
	// db.query(sql, [email], (err, results) => {
	// 		if (err) {
	// 				console.error('Database error:', err);
	// 				return res.status(500).json({ error: 'Database error' });
	// 		}

	// 		if (results.length === 0) {
	// 				return res.status(401).json({ error: 'Invalid email or password' });
	// 		}

	// 		const user = results[0];

	// 		bcrypt.compare(password, user.password, (err, isMatch) => {
	// 				if (err) {
	// 						console.error('Error comparing passwords:', err);
	// 						return res.status(500).json({ error: 'Error verifying password' });
	// 				}

	// 				if (!isMatch) {
	// 						return res.status(401).json({ error: 'Invalid email or password' });
	// 				}

	// 				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', {
	// 						expiresIn: process.env.JWT_EXPIRES_IN || '1h',
	// 				});

	// 				res.json({ message: 'Login successful', token });
	// 		});
	// });
});

