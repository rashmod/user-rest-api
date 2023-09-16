import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utilities/Errors';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.user) {
		throw new CustomError(
			'Authentication failed. Please login again.',
			401,
			'InvalidCredentials'
		);
	}
	next();
};

export default isLoggedIn;
