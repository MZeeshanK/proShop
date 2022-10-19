import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all Products
// @route   GET /api/products
// @access  PUBLIC
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  PUBLIC
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
