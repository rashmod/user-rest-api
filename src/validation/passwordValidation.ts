import { body } from 'express-validator';

export const passwordValidation = body('password')
	.trim()
	.notEmpty()
	.escape()
	.withMessage('Password is required')
	.isLength({ min: 8, max: 20 })
	.withMessage('Password must be 8 to 20 characters long');

export const changePasswordValidation = [
	body('oldPassword')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Old Password is required')
		.isLength({ min: 8, max: 20 })
		.withMessage('Old Password must be 8 to 20 characters long'),
	body('newPassword')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('New Password is required')
		.isLength({ min: 8, max: 20 })
		.withMessage('New Password must be 8 to 20 characters long'),
];
