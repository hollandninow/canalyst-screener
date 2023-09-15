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

    it('should log out the user', done => {
      request
        .get('api/v1/users/logout')
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect(200)
        .then(res => done())
        .catch(err => done(err));
    });
  });
  
});