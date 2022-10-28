import express from 'express';

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateorderToDelivered,
  updateOrderToPaid,
} from '../controllers/orders.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateorderToDelivered);

export default router;
