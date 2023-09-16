import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { prisma } from '../db/prisma';
import {
	CustomError,
	DuplicateEmailError,
	NotFoundError,
	ValidationError,
} from '../utilities/Errors';
import { comparePassword, hashPassword } from '../utilities/passwordUtils';

// @desc Get all users
// @route GET /api/users
// @access public
export const getAllUsers = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();

	res.status(200).json({ success: true, count: users.length, data: users });
};

// @desc Get single user
// @route GET /api/users/:id
// @access public
export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({ where: { userId: id } });

	if (!user) {
		throw new NotFoundError('The requested user was not found');
	}

	res.status(200).json({ success: true, data: user });
};

// @desc Create user
// @route POST /api/users
// @access public
export const createUser = async (req: Request, res: Response) => {
	const { username, email, password, displayName } = req.body;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		throw new ValidationError('Validation failed', result.array());
	}

	const emailExists = await prisma.user.findUnique({ where: { email } });

	if (emailExists) {
		throw new DuplicateEmailError();
	}

	const hashedPassword = await hashPassword(password);

	const user = await prisma.user.create({
		data: { username, email, displayName, hashedPassword },
	});

	res.status(200).json({ success: true, data: user });
};

// todo add route to change password

// @desc Update single user
// @route PUT /api/users/:id
// @access private
export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { username, email, displayName } = req.body;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		throw new ValidationError('Validation failed', result.array());
	}

	const user = await prisma.user.findUnique({ where: { userId: id } });

	if (!user) {
		throw new NotFoundError('The requested user was not found');
	}

	const emailExists = await prisma.user.findUnique({ where: { email } });
	const isEmailOwner = emailExists && emailExists.userId === id;

	if (!isEmailOwner) {
		throw new DuplicateEmailError();
	}

	const updateUser = await prisma.user.update({
		where: { userId: id },
		data: { username, email, displayName },
	});

	res.status(200).json({ success: true, data: updateUser });
};

// @desc Delete single user
// @route DELETE /api/users/:id
// @access private
export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({ where: { userId: id } });

	if (!user) {
		throw new NotFoundError('The requested user was not found');
	}

	const deletedUser = await prisma.user.delete({ where: { userId: id } });

	res.status(200).json({ success: true, data: deletedUser });
};

// @desc Update password
// @route PATCH /api/users/:id/changePassword
// @access private
export const updatePassword = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { oldPassword, newPassword } = req.body;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		throw new ValidationError('Validation failed', result.array());
	}

	const user = await prisma.user.findUnique({ where: { userId: id } });

	if (!user) {
		throw new NotFoundError('The requested user was not found');
	}

	const isOldPasswordMatch = await comparePassword(
		oldPassword,
		user.hashedPassword
	);

	if (!isOldPasswordMatch) {
		throw new CustomError(
			'The old password provided does not match the current password associated with this user.',
			401,
			'InvalidCredentials'
		);
	}

	const isNewPasswordSame = oldPassword === newPassword;

	if (isNewPasswordSame) {
		throw new CustomError(
			'The new password cannot be the same as the old password. Please choose a different password.',
			400,
			'PasswordUnchanged'
		);
	}

	const hashedPassword = await hashPassword(newPassword);

	const updatedUser = await prisma.user.update({
		where: { userId: id },
		data: { hashedPassword },
	});

	res.status(200).json({ success: true, data: updatedUser });
};
