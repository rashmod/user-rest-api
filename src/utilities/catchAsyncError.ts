import { NextFunction, Request, Response } from 'express';

const catchAsyncError = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
	return function (req: Request, res: Response, next: NextFunction) {
		fn(req, res, next).catch(next);
	};
};

export default catchAsyncError;
