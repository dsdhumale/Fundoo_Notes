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
    it('1. Create user and should return status 201', (done) => {

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
    it('2. While creating user due to invalid first name should return status 500', (done) => {

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
    it('3. While creating user due to invalid last name should return status 500', (done) => {

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
    it('4. While creating user due to invalid email should return status 500', (done) => {

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
    it('5. While creating user due to invalid password should return status 500', (done) => {

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
  it('6. Given user details in login should get logged into account', (done) => {
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
  it('7. While log in due to invalid email id should return status 500', (done) => {
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
  it('8. While log in due to invalid password should return status 500', (done) => {
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

var ID;
// 9 - Test case for notes creation
describe('Notes-Create', () => {
  it('9. While creating notes due to correct note details status should return 201', (done) => {
    const noteBody = {
      Title: "Java Basics",
      Description: "Concept"
    }
    request(app)
      .post('/api/v1/note/')
      .set('authorization', `Bearer ${token}`)
      .send(noteBody)
      .end((err, res) => {
        ID = res.body.data._id;
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});


// 10 - Test case for notes creation without authorization
describe('Notes-Create', () => {
  it('10. While creating notes without authorization should return status code 400', (done) => {
    const noteBody = {
      Title: "Java Basics",
      Description: "Concept"
    }
    request(app)
      .post('/api/v1/note/')
      .send(noteBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

// 11 - Test case for invalid note description
describe(' Notes-Create', () => {
  it('11. While creating notes due to invalid note description status should return 500', (done) => {
    const noteBody = {
      Title: "Java Basics",
      Description: ""
    }
    request(app)
      .post('/api/v1/note/')
      .set('authorization', `Bearer ${token}`)
      .send(noteBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

// 12 - Test case for invalid note title
describe('Notes-Create', () => {
  it('12. While creating notes due to invalid note title status should return 500', (done) => {
    const noteBody = {
      Title: "",
      Description: "Concept"
    }
    request(app)
      .post('/api/v1/note/')
      .set('authorization', `Bearer ${token}`)
      .send(noteBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

// 13 - Test case for get all notes with authorization
describe(' Getting all notes with authorization', () => {
  it('13. While getting all notes successfully should return status code 201', (done) => {
    request(app)
      .get('/api/v1/note/')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});

// 14 - Test case for get all notes without authorization
describe(' Getting all notes without authorization ', () => {
  it('14. While getting all notes failed due invalid authorization should return status code 400', (done) => {
    request(app)
      .get('/api/v1/note/')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

// 15 - Test case for get note by ID with authorization
describe(' Getting note by id with authorization ', () => {
  it('15. While getting note by ID successfully should return status code 201', (done) => {
    request(app)
      .get(`/api/v1/note/${ID}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});

// 16 - Test case for get note by ID without authorization
describe(' Getting note by id without authorization ', () => {
  it('16. While getting note by ID without authorization failed should return status code 400', (done) => {
    request(app)
      .get(`/api/v1/note/${ID}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

// 17 - Test case for update note by ID with authorization
describe(' Update note by id with authorization ', () => {
  it('17. While updating note by ID successfully complete should return status code 201', (done) => {
    const noteBody = {
      Title: "Javascript Basics",
      Description: "concept"
    }
    request(app)
      .put(`/api/v1/note/${ID}`)
      .set('authorization', `Bearer ${token}`)
      .send(noteBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});

// 18 - Test case for update note by ID without authorization
describe(' Update note by id with authorization ', () => {
  it('18. While updating note by ID without authorization failed should return status code 400', (done) => {
    const noteBody = {
      Title: "Javascript Basics",
      Description: "concept"
    }
    request(app)
      .put(`/api/v1/note/${ID}`)
      .send(noteBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

// 19 - Test case for archive note by ID with authorization
describe(' Archive note by id with authorization ', () => {
  it('19. While archive note by ID successfully complete should return status code 201', (done) => {
    request(app)
      .put(`/api/v1/note/${ID}/archive`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});

//  20 - Test case for trash note by ID with authorization
describe(' Trash note by id with authorization ', () => {
  it('20. While trash note by ID successfully complete should return status code 201', (done) => {
    request(app)
      .put(`/api/v1/note/${ID}/trash`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});


// 21 - Test case for delete note by ID with authorization
describe(' Update note by id with authorization ', () => {
  it('21. While deleting note by ID successfully complete should return status code 201', (done) => {
    request(app)
      .delete(`/api/v1/note/${ID}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});

// 22 - Test case for delete note by ID without authorization
describe(' Update note by id with authorization ', () => {
  it('22. While deleting note by ID without authorization failed should return status code 400', (done) => {
    request(app)
      .delete(`/api/v1/note/${ID}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});


// 23 - Test case for delete note by invalid ID with authorization
describe(' Update note by id with authorization ', () => {
  it('23. While deleting note by invalid ID failed should return status code 500', (done) => {
    request(app)
      .delete(`/api/v1/note/637dc973fabe2c026cf065e`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});


