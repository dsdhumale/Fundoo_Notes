import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // 1 - Test case for user registration
  describe('POST / UserRegistration', () => {
    it('1.Create user and should return status 201', (done) => {

      const userDetails = {
        "firstName": "Aniket",
        "lastName": "Mankumare",
        "emailID": "aniketdd34@gmail.com",
        "password": "Aniket123"
      }

      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
    // 2- Test case for invalid first name
    it('2.While creating user due to invalid first name should return status 500', (done) => {

      const userDetails = {
        "firstName": "A",
        "lastName": "Mankumare",
        "emailID": "aniket3432@gmail.com",
        "password": "Aniket123"
      }

      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
    // 3- Test case for invalid last name
    it('3.While creating user due to invalid last name should return status 500', (done) => {

      const userDetails = {
        "firstName": "Aniket",
        "lastName": "M",
        "emailID": "aniket34@gmail.com",
        "password": "Aniket123"
      }

      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
    // 4- Test case for invalid email-id
    it('4.While creating user due to invalid email should return status 500', (done) => {

      const userDetails = {
        "firstName": "Aniket",
        "lastName": "Mankumare",
        "emailID": "aniketgmail.com",
        "password": "Aniket123"
      }

      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
    // 5- Test case for invalid password
    it('5.While creating user due to invalid password should return status 500', (done) => {

      const userDetails = {
        "firstName": "Aniket",
        "lastName": "Mankumare",
        "emailID": "aniket345678@gmail.com",
        "password": "A"
      }

      request(app)
        .post('/api/v1/users/registration')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

  });
});
var token;
// 6 - Test case for user login
describe('POST/UserLogin', () => {
  it('6.Given user details in login should get logged into account', (done) => {
  const userDetails = {

    "emailID": "aniketdd34@gmail.com",
    "password": "Aniket123"
  }
    request(app)
      .post('/api/v1/users/login')
      .send(userDetails)
      .end((err, res) => {
        token = res.body.data
        expect(res.statusCode).to.be.equal(202);
        done();
      });
  });
});


// 7 - Test case for invalid user email id
describe('POST/UserLogin', () => {
  it('7.While log in due to invalid email id should return status 500', (done) => {
  const userDetails = {

    "emailID": "anike@gmail.com",
    "password": "Aniket123"
  }
    request(app)
      .post('/api/v1/users/login')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

// 8 - Test case for invalid user password
describe('POST/UserLogin', () => {
  it('8.While log in due to invalid password should return status 500', (done) => {
  const userDetails = {

    "emailID": "aniketdd34@gmail.com",
    "password": "Aniket12"
  }
    request(app)
      .post('/api/v1/users/login')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

