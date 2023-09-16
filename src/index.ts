import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';

import connectDB from './db/prisma';
import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import errorHandler from './middlewares/errorHandler';

// todo rate limit
// todo conflict update

declare module 'express-session' {
	interface SessionData {
		user: any; // Modify 'any' to match your actual user data structure
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
		session({
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
		session({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
		})
	);
}

app.use(express.json());

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
	console.log(
		`server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
	);
});
