const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach( el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
}

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;

  next();
}

exports.updateMe = catchAsync( async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for updating passwords. Please use /updateMyPassword.',
        400
      )
    );
  }

  
});