const dotenv = require('dotenv');
dotenv.config( { path: './config.env' });

exports.adminTestUser = {
  email: process.env.ADMIN_TEST,
  password: process.env.ADMIN_TEST_PASSWORD,
}

exports.adminTestUserBadPassword = {
  email: process.env.ADMIN_TEST,
  password: 'helloworld',
}

exports.permanentTestUser = {
  email: 'permtest@gmail.com',
  password: 'test1234',
}

exports.testUser = {
  name: 'Test',
  email: 'test@gmail.com',
  password: 'test1234',
  passwordConfirm: 'test1234',
}

exports.testUserNoName = {
  email: 'test@gmail.com',
  password: 'test1234',
  passwordConfirm: 'test1234',
}

exports.testNoEmail = {
  name: 'Test',
  password: 'test1234',
  passwordConfirm: 'test1234',
}

exports.testUserMalformedEmail = {
  name: 'Test',
  email: 'bademail',
  password: 'test1234',
  passwordConfirm: 'test1234',
}

exports.testUserNoPassword = {
  name: 'Test',
  email: 'test@gmail.com',
  passwordConfirm: 'test1234',
}

exports.testUserNoPasswordConfirm = {
  name: 'Test',
  email: 'test@gmail.com',
  password: 'test1234',
}

exports.testUserMismatchPasswords = {
  name: 'Test',
  email: 'test@gmail.com',
  password: 'test12345',
  passwordConfirm: 'test1234',
}

exports.testUserFictional = {
  email: 'aijsdoiajda@ioajsdoijsa.oiujaosdjsa',
  password: 'simplepassword',
}