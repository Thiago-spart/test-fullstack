import express from "express";
import dotenv from "dotenv";
import  routes  from './routes/index';
import cors from 'cors';

dotenv.config();


const app = express();	
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
	console.log('Server started on port 3001');
})

export default app