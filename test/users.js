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

    it('should return 500 status code when creating a user with no name', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoName)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when creating a user with no email', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoEmail)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when creating a user with an invalid email', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserMalformedEmail)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when creating a user with no password', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoPassword)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when creating a user with no password confirm', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserNoPasswordConfirm)
        .expect(500)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should return 500 status code when creating a user with mismatched password and password confirm', done => {
      request
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUserMismatchPasswords)
        .expect(500)
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
        .post('api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.testUser)
        .then(res => {
          const { data } = res.body.data;
          testUserId = data._id;
        })
        .catch(err => {
          console.log(err);
        })
    );

    afterEach(() => 
      request
        .delete(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204)
        .then(res => {
          // console.log(res);
          testUserId = undefined;
        })
        .catch(err => {
          console.log(err);
        })
    );

    it('should update a user\'s name, email, and role', done => {
      request
        .patch(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.updateNameAndEmail)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;
          // testUserId = data._id;

          expect(data.name).to.be.equal(testUsers.updateNameAndEmail.name);
          expect(data.email).to.be.equal(testUsers.updateNameAndEmail.email);
          expect(data.role).to.be.equal(testUsers.updateNameAndEmail.role);

          done();
        })
        .catch(err => done(err));
    });

    it('should update user\'s password', done => {
      request
        .patch(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.updatePassword)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;
          // testUserId = data._id;

          expect(data.password).to.be.undefined;
          done();
        })
        .catch(err => done(err));
    });

    
    it('should fail to update user\'s password if too short', done => {
      request
        .patch(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.updatePasswordShort)
        .expect(400)
        .then(res => {
          done();
        })
        .catch(err => done(err));
    });

    it('should not successfully update user\'s id', done => {
      request
        .patch(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.updateId)
        .expect(400)
        .then(res => done())
        .catch(err => done(err));
    });

    it('should not successfully update a fictional field (i.e. one that is not in the user model)', done => {
      request
        .patch(`api/v1/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testUsers.updateFictionalField)
        .expect(200)
        .then(res => {
          const { data } = res.body.data;
          testUserId = data._id;

          expect(data.fictionalField).to.be.not.equal(testUsers.updateFictionalField);
          expect(data.fictionalField).to.be.undefined;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('DELETE /users', () => {
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
      .post('api/v1/users/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(testUsers.testUser)
      .then(res => {
        const { data } = res.body.data;
        testUserId = data._id;
      })
      .catch(err => {
        console.log(err);
      })
    );

    afterEach(() => 
    request
      .delete(`api/v1/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .then(res => {
        testUserId = undefined;
      })
  );
  
  it('should delete an existing user', done => {
    request
      .delete(`api/v1/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204)
      .then(res => {
        testUserId = undefined;
        done();
      })
      .catch(err => {
        console.log(err);
      })
  });

  it('should fail to delete a fictional user', done => {
    request
      .delete(`api/v1/users/${testUsers.adminFakeUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(400)
      .then(res => done())
      .catch(err => {
        console.log(err);
      })
  });
  });
});