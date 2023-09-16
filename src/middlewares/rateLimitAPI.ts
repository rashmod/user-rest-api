import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utilities/Errors';

// Define a map to store request counts for each IP address
export const requestCounts = new Map<
	string,
	{ timestamp: number; count: number }
>();

const maxRequestsPerMinute = 100; // Adjust as needed
export const windowMs = 60 * 1000; // 1 minute

// Middleware to perform rate limiting
export const rateLimitAPI = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { ip } = req;

	const currentTimestamp = Date.now();
	const entry = requestCounts.get(ip);

	if (entry) {
		const { timestamp, count } = entry;

		if (currentTimestamp - timestamp > windowMs) {
			requestCounts.set(ip, { timestamp: Date.now(), count: 1 });
		} else {
			const requestsInWindow = count + 1;

			if (requestsInWindow > maxRequestsPerMinute) {
				throw new CustomError(
					'Too many requests. Please wait and try your request again later.',
					429,
					'RateLimitExceeded'
				);
			}

			requestCounts.set(ip, { timestamp, count: requestsInWindow });
		}
	} else {
		requestCounts.set(ip, { timestamp: currentTimestamp, count: 1 });
	}

	next();
};
