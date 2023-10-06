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
    before(() => 
      request
        .post('api/v1/users/login')
        .send(testUsers.adminTestUser)
        .then(res => {
          adminToken = res.body.token;
        })
      );

    it('GET /companies should return all companies', done => {
      request
        .get('api/v1/companies')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;

          expect(data.length).to.be.equal(1);
          expect(data[0].name).to.be.equal(testCompanies.permanentTestCompany.name);
          expect(data[0].csin).to.be.equal(testCompanies.permanentTestCompany.csin);
          expect(data[0].canalystTicker).to.be.equal(testCompanies.permanentTestCompany.canalystTicker);
          expect(data[0].bloombergTicker).to.be.equal(testCompanies.permanentTestCompany.bloombergTicker);
          expect(data[0].countryCode).to.be.equal(testCompanies.permanentTestCompany.countryCode);
          expect(data[0].version).to.be.equal(testCompanies.permanentTestCompany.version);
          expect(data[0].mostRecentPeriod).to.be.equal(testCompanies.permanentTestCompany.mostRecentPeriod);
          expect(data[0].mrpDuration).to.be.equal(testCompanies.permanentTestCompany.mrpDuration);
          expect(data[0].mrpStartDate).to.be.equal(testCompanies.permanentTestCompany.mrpStartDate);
          expect(data[0].mrpEndDate).to.be.equal(testCompanies.permanentTestCompany.mrpEndDate);
          expect(data[0].isInCoverage).to.be.equal(testCompanies.permanentTestCompany.isInCoverage);
          expect(data[0].reportingFrequency).to.be.equal(testCompanies.permanentTestCompany.reportingFrequency);
          expect(data[0].tradingCurrency).to.be.equal(testCompanies.permanentTestCompany.tradingCurrency);
          expect(data[0].reportingCurrency).to.be.equal(testCompanies.permanentTestCompany.reportingCurrency);

          done();
        })
        .catch(err => done(err));
    });

    it('GET /companies/:id should return a company', done => {
      request
        .get(`api/v1/companies/${testCompanies.permanentTestCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;

          expect(data.name).to.be.equal(testCompanies.permanentTestCompany.name);
          expect(data.csin).to.be.equal(testCompanies.permanentTestCompany.csin);
          expect(data.canalystTicker).to.be.equal(testCompanies.permanentTestCompany.canalystTicker);
          expect(data.bloombergTicker).to.be.equal(testCompanies.permanentTestCompany.bloombergTicker);
          expect(data.countryCode).to.be.equal(testCompanies.permanentTestCompany.countryCode);
          expect(data.version).to.be.equal(testCompanies.permanentTestCompany.version);
          expect(data.mostRecentPeriod).to.be.equal(testCompanies.permanentTestCompany.mostRecentPeriod);
          expect(data.mrpDuration).to.be.equal(testCompanies.permanentTestCompany.mrpDuration);
          expect(data.mrpStartDate).to.be.equal(testCompanies.permanentTestCompany.mrpStartDate);
          expect(data.mrpEndDate).to.be.equal(testCompanies.permanentTestCompany.mrpEndDate);
          expect(data.isInCoverage).to.be.equal(testCompanies.permanentTestCompany.isInCoverage);
          expect(data.reportingFrequency).to.be.equal(testCompanies.permanentTestCompany.reportingFrequency);
          expect(data.tradingCurrency).to.be.equal(testCompanies.permanentTestCompany.tradingCurrency);
          expect(data.reportingCurrency).to.be.equal(testCompanies.permanentTestCompany.reportingCurrency);

          done();
        })
        .catch(err => done(err));
    });

    it('GET /users/:id should throw 400 error when provided a fictitious id', done => {
      request
        .get(`api/v1/users/${testCompanies.fakeTestCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });
  });
  
  describe('PATCH /companies', () => {
    before(() => 
      request
        .post('api/v1/users/login')
        .send(testUsers.adminTestUser)
        .then(res => {
          adminToken = res.body.token;
        })
    );

    beforeEach(() => 
      request
        .post('api/v1/companies/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanies.testCompany)
        .then(res => {
          const { data } = res.body.data;
          testCompanyId = data._id;
        })
        .catch(err => {
          console.log(err);
        })
    );

    afterEach(() =>
      request
        .delete(`api/v1/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204)
        .then(res => {
          testCompanyId = undefined;
        })
        .catch(err => {
          console.log(err);
        })
    );

    it('should update all fields successfully', done => {
      request
        .patch(`api/v1/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanies.testCompanyUpdate)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;

          expect(data.name).to.be.equal(testCompanies.testCompanyUpdate.name);
          expect(data.csin).to.be.equal(testCompanies.testCompanyUpdate.csin);
          expect(data.canalystTicker).to.be.equal(testCompanies.testCompanyUpdate.canalystTicker);
          expect(data.bloombergTicker).to.be.equal(testCompanies.testCompanyUpdate.bloombergTicker);
          expect(data.countryCode).to.be.equal(testCompanies.testCompanyUpdate.countryCode);
          expect(data.version).to.be.equal(testCompanies.testCompanyUpdate.version);
          expect(data.mostRecentPeriod).to.be.equal(testCompanies.testCompanyUpdate.mostRecentPeriod);
          expect(data.mrpDuration).to.be.equal(testCompanies.testCompanyUpdate.mrpDuration);
          expect(data.mrpStartDate).to.be.equal(testCompanies.testCompanyUpdate.mrpStartDate);
          expect(data.mrpEndDate).to.be.equal(testCompanies.testCompanyUpdate.mrpEndDate);
          expect(data.isInCoverage).to.be.equal(testCompanies.testCompanyUpdate.isInCoverage);
          expect(data.reportingFrequency).to.be.equal(testCompanies.testCompanyUpdate.reportingFrequency);
          expect(data.tradingCurrency).to.be.equal(testCompanies.testCompanyUpdate.tradingCurrency);
          expect(data.reportingCurrency).to.be.equal(testCompanies.testCompanyUpdate.reportingCurrency);

          done();
        })
        .catch(err => done(err));
    });

    it('should not successfully update a fictional field', done => {
      request
        .patch(`api/v1/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanies.updateFictionalField)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;
          
          expect(data.fictionalField).to.be.not.equal(testCompanies.updateFictionalField);
          expect(data.fictionalField).to.be.undefined;

          done();
        })
        .catch(err => done(err));
    });
  });
  
  describe('DELETE /companies', () => {
    before(() => 
      request
        .post('api/v1/users/login')
        .send(testUsers.adminTestUser)
        .then(res => {
          adminToken = res.body.token;
        })
    );

    beforeEach(() => 
      request
        .post('api/v1/companies')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testCompanies.testCompany)
        .then(res => {
          const { data } = res.body.data;
          testCompanyId = data._id;
        })
        .catch(err => {
          console.log(err);
        })
    );

    afterEach(() => 
      request
        .delete(`api/v1/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .then(res => {
          testUserId = undefined;
        })
    );

    it('should delete an existing company', done => {
      request
        .delete(`api/v1/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204)
        .then(res => {
          testCompanyId = undefined;
          done();
        })
        .catch(err => {
          console.log(err);
        })
    });

    it('should fail to delete a fictional company', done => {
      request
        .delete(`api/v1/companies/${testCompanies.fakeTestCompanyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .then(res => done())
        .catch(err => {
          console.log(err);
        })
    });
  });
});