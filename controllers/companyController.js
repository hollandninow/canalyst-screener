const Company = require('../models/companyModel');
const factory = require('./handlerFactory');

exports.getCompany = factory.getOne(Company);
exports.getAllCompanies = factory.getAll(Company);
exports.createCompany = factory.createOne(Company);
exports.deleteCompany = factory.deleteOne(Company);
exports.updateCompany = factory.updateOne(Company);

