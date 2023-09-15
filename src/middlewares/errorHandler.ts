import { NextFunction, Request, Response } from 'express';
import { CustomError, TCustomError } from '../utilities/Errors';

export default function errorHandler(
	err: TCustomError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof CustomError) {
		return handleCustomError(err, res);
	} else {
		return handleUnexpectedError(res);
	}
}

function handleCustomError(err: TCustomError, res: Response) {
	res.status(err.statusCode).json({
		success: false,
		error: err.errorName,
		message: err.message,
	});
}

function handleUnexpectedError(res: Response) {
	res.status(500).json({
		success: false,
		error: 'ServerError',
		message: 'An unexpected error occurred.',
	});
}
