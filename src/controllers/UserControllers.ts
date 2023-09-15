import { Request, Response } from 'express';

// @desc Get all users
// @route GET /api/users
// @access public
export const getAllUsers = (req: Request, res: Response) => {
	res.send('get all users');
};

// @desc Create user
// @route POST /api/users
// @access public
export const createUser = (req: Request, res: Response) => {
	res.send('create user');
};

// @desc Get single user
// @route GET /api/users/:id
// @access public
export const getUser = (req: Request, res: Response) => {
	res.send('get user');
};

// @desc Update single user
// @route PUT /api/users/:id
// @access private
export const updateUser = (req: Request, res: Response) => {
	res.send('update user');
};

// @desc Delete single user
// @route DELETE /api/users/:id
// @access private
export const deleteUser = (req: Request, res: Response) => {
	res.send('delete user');
};
