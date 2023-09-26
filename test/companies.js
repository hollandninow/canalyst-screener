const supertest = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const testUsers = require('../testHelpers/testUsers');
const testCompanies = require('../testHelpers/testCompanies');

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
    afterEach(() => 
      request
        .delete(`api/v1/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .then(res => {
          testCompanyId = undefined;
        })
    );

    it('should create a new company successfully when provided all required data', done => {
      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanies.testCompany)
        .expect(201)
        .then(res => {
          const { data } = res.body.data;
          testCompanyId = data._id;

          expect(data.name).to.be.equal(testCompanies.testCompany.name);
          expect(data.csin).to.be.equal(testCompanies.testCompany.csin);
          expect(data.canalystTicker).to.be.equal(testCompanies.testCompany.canalystTicker);
          expect(data.bloombergTicker).to.be.equal(testCompanies.testCompany.bloombergTicker);
          expect(data.countryCode).to.be.equal(testCompanies.testCompany.countryCode);
          expect(data.version).to.be.equal(testCompanies.testCompany.version);
          expect(data.mostRecentPeriod).to.be.equal(testCompanies.testCompany.mostRecentPeriod);
          expect(data.mrpDuration).to.be.equal(testCompanies.testCompany.mrpDuration);
          expect(data.mrpStartDate).to.be.equal(testCompanies.testCompany.mrpStartDate);
          expect(data.mrpEndDate).to.be.equal(testCompanies.testCompany.mrpEndDate);
          expect(data.isInCoverage).to.be.equal(testCompanies.testCompany.isInCoverage);
          expect(data.reportingFrequency).to.be.equal(testCompanies.testCompany.reportingFrequency);
          expect(data.tradingCurrency).to.be.equal(testCompanies.testCompany.tradingCurrency);
          expect(data.reportingCurrency).to.be.equal(testCompanies.testCompany.reportingCurrency);

          done();
        })
        .catch(err => done(err));
    })
  });
  
  describe('GET companies', () => {

  });
  
  describe('PATCH companies', () => {

  });
  
  describe('DELETE companies', () => {

  });
});