import express from 'express';

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orders.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
