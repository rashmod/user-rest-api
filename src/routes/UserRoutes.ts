import express, { Request, Response } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from '../controllers/UserControllers';
import catchAsyncError from '../utilities/catchAsyncError';
import userValidation from '../validation/userValidation';
import { passwordValidation } from '../validation/passwordValidation';

const router = express.Router();

router.get('/', catchAsyncError(getAllUsers));
router.post(
	'/',
	userValidation,
	passwordValidation,
	catchAsyncError(createUser)
);

router.get('/:id', catchAsyncError(getUser));
router.put('/:id', userValidation, catchAsyncError(updateUser));
router.delete('/:id', catchAsyncError(deleteUser));

export default router;
