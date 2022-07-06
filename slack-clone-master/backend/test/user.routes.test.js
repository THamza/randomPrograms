const app = require('../server');
let mocha = require('mocha');
let describe = mocha.describe;
const chai = require('chai')

chai.use(require('chai-http'));
chai.should();

const assert = require('assert');
const request = require('supertest');

describe('testing get route for users list', () => {
  it('should return 200 status', () => {
    return request(app)
      .get('/users')
      .then( (response) => {
        assert.equal(response.status, 200)
      })
  });
});

describe('testing get route for a non-existing user id', () => {
  it('should return the 404 status', () => {
    let id = "idNotFound";
    return request(app)
      .get(`/users/${id}`)
      .then((response) => {
        assert.equal(response.status, 404)
      })
  })
});

describe('testing get route for a non-existing user name', () => {
  it('should return the 200 status', () => {
    let username = "nameNotFound";
    return request(app)
      .get(`/users/username/${username}`)
      .then((response) => {
        assert.equal(response.status, 200)
      })
  })
});

describe('testing user post request with empty body', () => {
  it('should return the 400 status', () => {
    let params = {};
    return request(app)
      .post('/users', params)
      .then( (response) => {
        assert.equal(response.status, 400)
      })
  })
});


describe('testing user post request with an existing username', () => {
  it('should return the 400 status', () => {
    let params= {"username": "aUsernameThatExists"};
    return request(app)
      .post('/users', params)
      .then( (response) => {
        assert.equal(response.status, 400)
      })
  })
});

describe('testing user authenticate with an existing username', () => {
  it('should return the 200 status', () => {
    let params= {"username": "aUsernameThatExists"};
    return request(app)
      .post('/users/auth', params)
      .then( (response) => {
        assert.equal(response.status, 200)
      })
  })
});

describe("testing updating a non-existing user's channel", () => {
  it('should return the 400 status', () => {
    let id = "idDoesNotExist"
    let params = {"channelId": "random"};
    return request(app)
      .patch(`/users/channels/${id}`, params)
      .then( (response) => {
        assert.equal(response.status, 400)
      })
  })
});
