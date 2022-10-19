import express from 'express';
import { protect } from '../middleware/auth.js';

import {
  authUser,
  getUserProfile,
  register,
  updateUserProfile,
} from '../controllers/users.js';

const router = express.Router();

router.route('/').post(register);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
