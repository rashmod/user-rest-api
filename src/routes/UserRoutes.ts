import express from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updatePassword,
	updateUser,
} from '../controllers/UserControllers';
import catchAsyncError from '../utilities/catchAsyncError';
import userValidation from '../validation/userValidation';
import {
	changePasswordValidation,
	passwordValidation,
} from '../validation/passwordValidation';

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

router.patch(
	'/:id/changePassword',
	changePasswordValidation,
	catchAsyncError(updatePassword)
);

export default router;
