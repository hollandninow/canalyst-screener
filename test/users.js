const supertest = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const testUsers = require('../testHelpers/testUsers');

dotenv.config({ path: './config.env' });

const request = supertest(`http://127.0.0.1:${process.env.PORT}/`);

let testUser, testUserId, testUserToken, adminToken;

describe('users', () => {
  before(() => 
    request
      .post('api/v1/users/login')
      .send(testUsers.adminTestUser)
      .then(res => {
        adminToken = res.body.token;
      })
    );

  describe('POST users', () => {
    afterEach(() => 
      request
        .delete(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .then(res => {
          testUserId = undefined;
        })
    );

    it('should create a user when provided all required data', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUser)
        .expect(201)
        .then(res => {
          const { data } = res.body.data;
          testUserId = data._id;

          expect(data.name).to.be.equal(testUsers.testUser.name);
          expect(data.email).to.be.equal(testUsers.testUser.email);
          expect(data.password).to.not.equal(testUsers.testUser.password);
          expect(data.passwordConfirm).to.be.undefined;
          expect(data.role).to.be.equal('user');
          expect(data.active).to.be.true;

          done();
        })
        .catch(err => done(err));
    });

    it('should throw 400 error when a user is created with a previously used email', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUser)
        .then(res => {
          const { data } = res.body.data;
          testUserId = data._id;

          request
            .post('api/v1/users/')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testUsers.testUser)
            .expect(400)
            .then(res => 
                request
                  .delete(`api/v1/users/${testUserId}`)
                  .set('Authorization', `Bearer ${adminToken}`)
                  .expect(204)
                  .then(res => {
                    testUserId = undefined;
                    done();
                  })
              )
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });

    it('should thrown 400 error when creating a user with no name', () => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoName)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should thrown 400 error when creating a user with no email', () => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoEmail)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should thrown 400 error when creating a user with an invalid email', () => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserMalformedEmail)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should thrown 400 error when creating a user with no password', () => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoPassword)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should thrown 400 error when creating a user with no password confirm', () => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoPasswordConfirm)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should thrown 400 error when creating a user with mismatched password and password confirm', () => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserMismatchPasswords)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });
  });

  describe('GET /users', () => {
    before(() => 
    request
      .post('api/v1/users/login')
      .send(testUsers.adminTestUser)
      .then(res => {
        adminToken = res.body.token;
      })
    );

    it('GET /users should return all users', done => {
      request
        .get('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;

          expect(data.length).to.be.equal(2); // perm test user and admin
          expect(data[0].name).to.be.equal(testUsers.permanentTestUser.name);
          expect(data[0].email).to.be.equal(testUsers.permanentTestUser.email);
          expect(data[0].role).to.be.equal(testUsers.permanentTestUser.role);
          expect(data[0]._id).to.be.equal(testUsers.permanentTestUserId);
          expect(data[1].name).to.be.equal(testUsers.adminTestUser.name);
          expect(data[1].email).to.be.equal(testUsers.adminTestUser.email);
          expect(data[1].role).to.be.equal(testUsers.adminTestUser.role);
          expect(data[1]._id).to.be.equal(testUsers.adminTestUserId);

          done();
        })
        .catch(err => done(err));
    });

    it('GET /users/:id should return a user', done => {
      request
        .get(`api/v1/users/${testUsers.permanentTestUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;

          expect(data.name).to.be.equal(testUsers.permanentTestUser.name);
          expect(data.email).to.be.equal(testUsers.permanentTestUser.email);
          expect(data.role).to.be.equal(testUsers.permanentTestUser.role);

          done();
        })
        .catch(err => done(err));
    });

    it('GET /users/:id should throw 400 error when provided a fake id', done => {
      request
        .get(`api/v1/users/${testUsers.fakeTestUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });
  });

  describe('PATCH /users', () => {

  });

  describe('DELETE /users', () => {

  });
});