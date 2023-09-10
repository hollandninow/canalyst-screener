const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/appError');
const AppError = require('../utils/appError');

const signToken = id => 
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
}

// Omit sign up function. I'll add users manually.

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) return next(new AppError('Please provide email and password.', 401));

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError('Incorrect email or password.', 401));

  // 3) If everything is okay, send token to client
  createSendToken(user, 200, res, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 *1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
}

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError('You are not logged in! Please log in to get access.', 401));

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new AppError('The user for which this token was created no longer exists.', 401));

  // 3) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) return next(new AppError('User recently changed password! Please log in again.', 401));

  // 4) Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = 
  (...roles) => 
  (req, res, next) => {
    if(!roles.includes(req.user.role))
      return next(new AppError('You do not have permission to perform this action.', 403));

    next();
  }

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  // 2) Check if PATCHed current password is correct
  const { passwordCurrent } = req.body;

  if (!(await user.correctPassword(passwordCurrent, user.password)))
    return next(new AppError('Please enter the correct password.', 401));

  // 3) If correct, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in
  createSendToken(user, 200, req, res);
});