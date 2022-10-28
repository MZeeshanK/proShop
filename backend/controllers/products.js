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

// @desc    delete product
// @route   DELETE /api/products/:id
// @access  PUBLIC/ADMIN
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    create Product
// @route   POST /api/products
// @access  PUBLIC/ADMIN
export const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jgp',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 1,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    update  Product
// @route   PUT /api/products/:id
// @access  PUBLIC/ADMIN
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const createdProduct = await product.save();
    res.json(createdProduct);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});
