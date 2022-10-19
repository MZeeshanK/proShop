import express from 'express';

import { getProducts, getProduct } from '../controllers/products.js';

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProduct);

export default router;
