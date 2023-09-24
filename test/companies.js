const supertest = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const testUsers = require('../testHelpers/testUsers');

dotenv.config({ path: './config.env' });

const request = supertest(`http://127.0.0.1:${process.env.PORT}/`);

let testCompany, testCompanyId, adminToken;

describe('companies', () => {
  before(() => 
    request
      .post('api/v1/users/login')
      .send(testUsers.adminTestUser)
      .then(res => {
        adminToken = res.body.token;
      })
  );

  describe('POST companies', () => {

  });
  
  describe('GET companies', () => {

  });
  
  describe('PATCH companies', () => {

  });
  
  describe('DELETE companies', () => {

  });
});