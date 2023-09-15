import express, { Request, Response } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from '../controllers/UserControllers';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
