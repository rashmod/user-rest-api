import express from 'express';

import catchAsyncError from '../utilities/catchAsyncError';
import { loginUser, logoutUser } from '../controllers/Authcontrollers';

const router = express.Router();

router.post('/login', catchAsyncError(loginUser));
router.get('/logout', catchAsyncError(logoutUser));

export default router;
