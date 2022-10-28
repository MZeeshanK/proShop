import express from 'express';
import { admin, protect } from '../middleware/auth.js';

import {
  authUser,
  getUserProfile,
  register,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  udpateUser,
} from '../controllers/users.js';

const router = express.Router();

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/').post(register).get(protect, admin, getUsers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, udpateUser);

export default router;
