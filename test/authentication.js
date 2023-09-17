const supertest = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const testUsers = require('../testHelpers/testUsers');
const { login } = require('../testHelpers/login');

dotenv.config( { path: './config.env' });

const request = supertest(`http://127.0.0.1:${process.env.PORT}/`);

let testUser, testUserId, testUserToken, adminToken;

describe('authentication', () => {
  describe('log in and log out', () => {
    it('should log in when provided credentials for an existing user', done => {
      testUser = testUsers.adminTestUser;

      request
        .post('api/v1/users/login')
        .send(testUser)
        .expect(200)
        .then(res => {
          testUserToken = res.body.token;

          expect(res.body.data.user.email).to.be.equal(testUser.email);
          expect(res.body.data.user.name).to.not.be.undefined;
          expect(res.body.data.user.role).to.be.oneOf(['user', 'admin']);

          done();
        })
          .catch(err => done(err));
    });

    it('should log out the user', done => {
      request
        .get('api/v1/users/logout')
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(200)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should not log in when provided incorrect credentials for an existing user', done => {
      testUser = testUsers.adminTestUserBadPassword;

      request
        .post('api/v1/users/login')
        .send(testUser)
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should not log in when provided credentials for a non-existent user', done => {
      testUser = testUsers.testUserFictional;

      request
        .post('api/v1/users/login')
        .send(testUser)
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });
  });
  
  describe('accessing protected /users routes while not logged in', () => {
    it('GET /users should return 401', done => {
      request
        .get('api/v1/users/')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('GET /users/:id should return 401', done => {
      request
        .get('api/v1/users/6503ba4bda5433587ff7c0cb')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('POST /users should return 401', done => {
      request
        .post('api/v1/users/')
        .send(testUsers.testUser)
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('PATCH /users/:id should return 401', done => {
      request
        .patch('api/v1/users/6503ba4bda5433587ff7c0cb')
        .send({
          name: 'testtest'
        })
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('DELETE /users/:id should return 401', done => {
      request
        .delete('api/v1/users/6503ba4bda5433587ff7c0cb')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });
  });

  describe('accessing protected \'me\' routes while not logged in', () => { 
    it('GET /me should return 401', done => {
      request
        .get('api/v1/users/me')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('PATCH /me should return 401', done => {
      request
        .patch('api/v1/users/updateMe')
        .send({
          name: 'testtest'
        })
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('DELETE /me should return 401', done => {
      request
        .delete('api/v1/users/deleteMe')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });
  });

  describe('accessing protected /companies routes while not logged in', () => {
    it('GET /companies should return 401', done => {
      request
        .get('api/v1/companies/')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('GET /companies/:id should return 401', done => {
      request
        .get('api/v1/companies/6505e90c570f2ede901a970e')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('POST /companies should return 401', done => {
      request
        .post('api/v1/companies/')
        .send(testUsers.testUser)
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('PATCH /companies/:id should return 401', done => {
      request
        .patch('api/v1/companies/6505e90c570f2ede901a970e')
        .send({
          name: 'New Test Company'
        })
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('DELETE /companies/:id should return 401', done => {
      request
        .delete('api/v1/companies/6505e90c570f2ede901a970e')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });
  });

  describe('accessing restricted to admin /users routes while logged in as normal user', () => {
    beforeEach(() => 
        request
          .post('api/v1/users/login')
          .send(testUsers.permanentTestUser)
          .then(res => {
            testUserToken = res.body.token;
          })

      );
      
    it('GET /users should return 403 when logged in as normal user', done => {
      request
        .post('api/v1/users')
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(403)
        .then(res => done())
        .catch(err => done(err));
    });

    it('GET /users/:id should return 403 when logged in as normal user', done => {
      request
        .post('api/v1/users/6503ba4bda5433587ff7c0cb')
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(403)
        .then(res => done())
        .catch(err => done(err));
    });

    it('POST /users should return 403 when logged in as normal user', done => {
      request
        .post('api/v1/users/')
        .send(testUsers.testUser)
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(403)
        .then(res => done())
        .catch(err => done(err));
    });

    it('PATCH /users/:id should return 403 when logged in as normal user', done => {
      request
        .patch('api/v1/users/6503ba4bda5433587ff7c0cb')
        .send({
          name: 'new name',
        })
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(403)
        .then(res => done())
        .catch(err => done(err));
    });

    it('DELETE /users/:id should return 403 when logged in as normal user', done => {
      request
        .delete('api/v1/users/6503ba4bda5433587ff7c0cb')
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(403)
        .then(res => done())
        .catch(err => done(err));
    });
  });
});