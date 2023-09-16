import { body } from 'express-validator';

const userValidation = [
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

export default userValidation;
