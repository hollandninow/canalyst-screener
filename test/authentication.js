const supertest = require('supertest');
const { expect } = require('chai');
const dotenv = require('dotenv');
const testUsers = require('../testHelpers/testUsers');

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

    it('GET /user/:id should return 401', done => {
      request
        .get('api/v1/users/6503ba4bda5433587ff7c0cb')
        .send()
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('POST /user should return 401', done => {
      request
        .post('api/v1/users/')
        .send(testUsers.testUser)
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('PATCH /user/:id should return 401', done => {
      request
        .patch('api/v1/users/6503ba4bda5433587ff7c0cb')
        .send({
          name: 'testtest'
        })
        .expect(401)
        .then(res => done())
        .catch(err => done(err));
    });

    it('DELETE /user/:id should return 401', done => {
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
});