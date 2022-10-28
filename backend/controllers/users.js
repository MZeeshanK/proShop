import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Authenticate the users & get a token
// @route   POST /api/users/login
// @access  PUBLIC
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { email, name, _id, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or password');
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  PUBLIC
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { email, name, _id, isAdmin } = user;
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user details');
  }
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  PRIVATE
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  PRIVATE
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const { _id, name, password, email, isAdmin } = updatedUser;

    res.json({
      name,
      email,
      password,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    get users
// @route   GET /api/users
// @access  PRIVATE/ADMIN
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// @desc    delete a user
// @route   DELETE /api/users/:id
// @access  PRIVATE/ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    get user by id
// @route   PUT /api/users/:id
// @access  PRIVATE/ADMIN
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  PRIVATE/ADMIN
export const udpateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = (req.body.isAdmin && true) || user.isAdmin;

    const updatedUser = await user.save();

    const { name, password, email, isAdmin } = updatedUser;

    res.json({
      name,
      email,
      password,
      isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
