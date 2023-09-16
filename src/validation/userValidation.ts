import { body } from 'express-validator';

export const userValidation = [
	body('username')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Username is required')
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters long'),
	body('displayName')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Display Name is required')
		.isLength({ min: 3 })
		.withMessage('Display Name must be at least 3 characters long'),
	body('email')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please enter a valid email'),
];

export const updatedAtValidation = body('updatedAt')
	.trim()
	.notEmpty()
	.escape()
	.withMessage('Updated At is required')
	.isISO8601()
	.withMessage(
		'Timestamp must be in ISO 8601 format (e.g. 2023-09-16T05:55:11.037Z)'
	);
