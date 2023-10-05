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

  describe('POST /companies', () => {
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
    });

    it('should throw 400 error when the duplication of company is attempted', done => {
      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanies.testCompany)
        .then(res => {
          const { data } = res.body.data;
          testCompanyId = data._id;

          request
            .post('api/v1/companies/')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testCompanies.testCompany)
            .expect(400)
            .then(res => done())
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });

    it('should return 500 status code when name field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.name;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when csin field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.csin;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when canalystTicker field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.canalystTicker;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when bloombergTicker field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.bloombergTicker;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when countryCode field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.countryCode;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when version field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.version;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when mostRecentPeriod field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.mostRecentPeriod;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when mrpDuration field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.mrpDuration;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when mrpStartDate field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.mrpStartDate;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when mrpEndDate field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.mrpEndDate;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when isInCoverage field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.isInCoverage;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when reportingFrequency field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.reportingFrequency;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when tradingCurrency field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.tradingCurrency;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when reportingCurrency field is missing', done => {
      const testCompanyNoName = {...testCompanies.testCompany};
      delete testCompanyNoName.reportingCurrency;

      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanyNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });
  });
  
  describe('GET /companies', () => {

  });
  
  describe('PATCH /companies', () => {

  });
  
  describe('DELETE /companies', () => {

  });
});