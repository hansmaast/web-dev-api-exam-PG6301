/**
 *  This code is inspired by the following file:
 *  https://github.com/arcuri82/web_development_and_api_design/blob/725cd04148243c6a29eb5b2f94c51d168b13f82c/les10/connect4-v2/tests/server/auth-test.js
 */

const {app} = require('../../src/server/app');
const Users = require('../../src/server/db/users');

const request = require('supertest');
let response;
let cookie;

const validPayload = {userId: 'valid@email.com', password: 'Abc123'};
const invalidEmail = {userId: 'invalid@email', password: 'Abc123'};
const invalidPassword = {userId: 'invalid@email.com', password: 'abc'};

/*
    Useful during debugging. By default, when there is an internal
    500 error, Express does not show you anything.
    So, here we print the stack-trace
 */
const errorHandler = function (err, req, res, next) {
    console.log(err.stack);
    res.send(500);
};

app.use(errorHandler);

beforeAll(() => {
    Users.resetAllUsers();
});

describe('sign up, log out and log in', () => {

    it('should fail with invalid email', async () => {
        response = await request(app)
            .post('/api/signup')
            .send(invalidEmail);
        expect(response.statusCode).toBe(400);
    });

    it('should fail with invalid password', async () => {
        response = await request(app)
            .post('/api/signup')
            .send(invalidPassword);
        expect(response.statusCode).toBe(400);
    });

    it('should sign up and create new user', async () => {
        response = await request(app)
            .post('/api/signup')
            .send(validPayload);
        expect(response.statusCode).toBe(201);
        cookie = response.headers['set-cookie'];
    });

    it("should be logged in after signing up", async () => {
        response = await request(app)
            .get('/api/user')
            .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
        expect(response.body.user.email).toBe(validPayload.userId);
    });

    it('should be able to log out after signing up', async () => {
        response = await request(app)
            .post('/api/logout')
        expect(response.statusCode).toBe(204);
    })

    it("should fail when logging in with wrong password or email", async () => {

        response = await request(app)
            .post('/api/login')
            .send(invalidEmail);
        expect(response.statusCode).toBe(401);

        response = await request(app)
            .post('/api/login')
            .send(invalidPassword);
        expect(response.statusCode).toBe(401);

    });

    it('should be able to login after logging out', async () => {

        response = await request(app)
            .post('/api/login')
            .send(validPayload);
        expect(response.statusCode).toBe(200);
        cookie = response.headers['set-cookie'];

        response = await request(app)
            .get('/api/user')
            .set('cookie', cookie);
        expect(response.body.user.email).toBe(validPayload.userId);
    });

    it("should fail when signing up twice", async () => {
        response = await request(app)
            .post('/api/signup')
            .send(validPayload);
        expect(response.statusCode).toBe(400);
    });

});