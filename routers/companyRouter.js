const express = require('express');
const companyController = require('../controllers/companyController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(companyController.getAllCompanies)
  .post(
    authController.restrictTo('admin'), 
    companyController.createCompany
    );

router
  .route('/:id')
  .get(companyController.getCompany)
  .patch(
    authController.restrictTo('admin'), 
    companyController.updateCompany
    )
  .delete(
    authController.restrictTo('admin'), 
    companyController.deleteCompany
    );

module.exports = router;