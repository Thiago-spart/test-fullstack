import express from "express";
import dotenv from "dotenv";
import  routes  from './routes/index';

dotenv.config();

const app = express();	
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
	console.log('Server started on port 3001');
})

