import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import {
	CustomError,
	DuplicateEmailError,
	NotFoundError,
} from '../utilities/Errors';

// @desc Get all users
// @route GET /api/users
// @access public
export const getAllUsers = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();

	res.status(200).json({ success: true, count: users.length, data: users });
};

// @desc Create user
// @route POST /api/users
// @access public
export const createUser = async (req: Request, res: Response) => {
	const { username, email, password, displayName } = req.body;

	// todo perform validation
	// todo hash password before saving to database

	const emailExists = await prisma.user.findUnique({ where: { email } });

	if (emailExists) {
		throw new DuplicateEmailError();
	}

	const user = await prisma.user.create({
		data: { username, email, displayName, hashedPassword: password },
	});

	res.status(200).json({ success: true, data: user });
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

// todo add route to change password

// @desc Update single user
// @route PUT /api/users/:id
// @access private
export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { username, email, displayName } = req.body;

	const user = await prisma.user.findUnique({ where: { userId: id } });

	if (!user) {
		throw new NotFoundError('The requested user was not found');
	}

	const emailExists = await prisma.user.findUnique({ where: { email } });
	const isEmailOwner = emailExists && emailExists.userId === id;

	if (!isEmailOwner) {
		throw new DuplicateEmailError();
	}

	// todo perform validation
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
