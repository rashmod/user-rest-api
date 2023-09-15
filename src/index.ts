import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/prisma';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.listen(process.env.PORT, () => {
	console.log(
		`server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
	);
});
