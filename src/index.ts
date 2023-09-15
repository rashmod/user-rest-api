import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/prisma';
import UserRoutes from './routes/UserRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use('/api/users', UserRoutes);

connectDB();

app.listen(process.env.PORT, () => {
	console.log(
		`server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
	);
});
