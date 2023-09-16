import express from 'express';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import cron from 'node-cron';

import connectDB from './db/prisma';
import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import errorHandler from './middlewares/errorHandler';
import {
	rateLimitAPI,
	requestCounts,
	windowMs,
} from './middlewares/rateLimitAPI';

// todo rate limit

declare module 'express-session' {
	interface SessionData {
		user: any;
	}
}

dotenv.config();

const app = express();

if (!process.env.COOKIE_SECRET) {
	throw new Error('Set cookie secret in the environment variable');
}

if (process.env.NODE_ENV === 'PRODUCTION') {
	app.set('trust proxy', 1);

	app.use(
		expressSession({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
			cookie: {
				sameSite: 'none',
				secure: true,
				maxAge: 1000 * 60 * 60 * 24 * 7, // one week
			},
		})
	);
}

if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(
		expressSession({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
		})
	);
}

app.use(express.json());
app.use(rateLimitAPI);

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

app.use(errorHandler);

connectDB();

// run the job at the start of every hour
cron.schedule('0 * * * *', () => {
	const currentTimestamp = Date.now();

	requestCounts.forEach((value, key) => {
		if (currentTimestamp - value.timestamp > windowMs) {
			requestCounts.delete(key);
		}
	});
});

app.listen(process.env.PORT, () => {
	console.log(
		`server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
	);
});
