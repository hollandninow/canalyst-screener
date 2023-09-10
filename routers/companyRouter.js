const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

// TODO: add protect() and restrictTo() middlewares after implementing authController

router
  .route('/')
  .get(companyController.getAllCompanies)
  .post(companyController.createCompany);

router
  .route('/:id')
  .get(companyController.getCompany)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);

module.exports = router;