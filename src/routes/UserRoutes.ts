import express, { Request, Response } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from '../controllers/UserControllers';
import catchAsyncError from '../utilities/catchAsyncError';

const router = express.Router();

router.get('/', catchAsyncError(getAllUsers));
router.post('/', catchAsyncError(createUser));

router.get('/:id', catchAsyncError(getUser));
router.put('/:id', catchAsyncError(updateUser));
router.delete('/:id', catchAsyncError(deleteUser));

export default router;
