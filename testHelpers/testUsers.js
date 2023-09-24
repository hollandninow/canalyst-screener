const dotenv = require('dotenv');
dotenv.config( { path: './config.env' });

exports.permanentTestUserId = '6503ba4bda5433587ff7c0cb';
exports.adminTestUserId = '65011e286842ba55e2680984';
exports.adminFakeUserId = 'i980u23j12iu3h123o9871y23o12uh3o';

exports.adminTestUser = {
  name: 'Admin',
  email: process.env.ADMIN_TEST,
  password: process.env.ADMIN_TEST_PASSWORD,
  passwordConfirm: process.env.ADMIN_TEST_PASSWORD,
  role: 'admin',
}

exports.adminTestUserBadPassword = {
  email: process.env.ADMIN_TEST,
  password: 'helloworld',
}

exports.permanentTestUser = {
  name: 'Permanent TestUser',
  email: 'permtest@gmail.com',
  password: 'test1234',
  passwordConfirm: 'test1234',
  role: 'user',
}

exports.testUser = {
  name: 'Test',
  email: 'test@gmail.com',
  password: 'test1234',
  passwordConfirm: 'test1234',
}

exports.testUser2 = {
  name: 'Test',
  email: 'test2@gmail.com',
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

exports.updateNameAndEmail = {
  name: 'New Name',
  email: 'newemail@gmail.com',
  role: 'admin',
}

exports.updatePassword = {
  password: 'newpass1234',
}

exports.updatePasswordShort = {
  password: '2short',
}

exports.updateActiveFalse = {
  active: false,
}

exports.updateId = {
  _id: '1oh23uo1h23iu132h',
}

exports.updateFictionalField = {
  fictionalField: 'orange',
}