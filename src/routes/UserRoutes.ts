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
import {
	updatedAtValidation,
	userValidation,
} from '../validation/userValidation';
import {
	changePasswordValidation,
	passwordValidation,
} from '../validation/passwordValidation';
import isLoggedIn from '../middlewares/isLoggedIn';

const router = express.Router();

router.get('/', catchAsyncError(getAllUsers));
router.post(
	'/',
	userValidation,
	passwordValidation,
	catchAsyncError(createUser)
);

router.get('/:id', catchAsyncError(getUser));
router.put(
	'/:id',
	isLoggedIn,
	userValidation,
	updatedAtValidation,
	catchAsyncError(updateUser)
);
router.delete('/:id', isLoggedIn, catchAsyncError(deleteUser));

router.patch(
	'/:id/changePassword',
	isLoggedIn,
	changePasswordValidation,
	updatedAtValidation,
	catchAsyncError(updatePassword)
);

export default router;
