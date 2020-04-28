/**
 *  This code is inspired by the following file:
 *  https://github.com/arcuri82/web_development_and_api_design/blob/725cd04148243c6a29eb5b2f94c51d168b13f82c/les10/connect4-v2/tests/server/auth-test.js
 */

const {app} = require('../../src/server/app');
const Users = require('../../src/server/db/users');
const Notes = require('../../src/server/db/notes');

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

beforeAll(async () => {
    // Creates a user to access notes
    response = await request(app)
        .post('/api/signup')
        .send(validPayload);
    cookie = response.headers['set-cookie'];
});

afterAll(async () => {
    response = await request(app)
        .post('/api/logout')
    Users.resetAllUsers();
})

describe('getting the notes', () => {

    it('should not be accessible unless logged in', async () => {
        response = await request(app)
            .get('/api/notes')
        expect(response.statusCode).toBe(401);

        response = await request(app)
            .get('/api/notes/0')
        expect(response.statusCode).toBe(401);
    });

    it('should be accessible when loged in', async () => {
        response = await request(app)
            .get('/api/notes')
            .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
    });

});

describe('creating a note', () => {

    it('should fail if not logged in', async () => {
        response = await request(app)
            .post('/api/notes')
            .send({author: 'author', date: 'date', title: 'Title', text: 'Text'})
        expect(response.statusCode).toBe(401);
    });

    it('should work if logged in', async () => {
        response = await request(app)
            .post('/api/notes')
            .set('cookie', cookie)
            .send({author: 'author', date: 'date', title: 'Title', text: 'Text'})
        expect(response.statusCode).toBe(201);
    });

    it('should fail without a title', async () => {
        response = await request(app)
            .post('/api/notes')
            .set('cookie', cookie)
            .send({author: 'author', date: 'date', title: '  ', text: 'Text'})
        expect(response.statusCode).toBe(400);
    });
});


describe('deleting a note', () => {

    it('should not delete without authentication', async () => {
        response = await request(app)
            .delete('/api/notes/0')
        expect(response.statusCode).toBe(401);
    });

    it('should delete a specific note', async () => {
        response = await request(app)
            .delete('/api/notes/0')
            .set('cookie', cookie)
        expect(response.statusCode).toBe(200);
    });

    it('should not delete a note that doesnt exists', async () => {
        response = await request(app)
            .delete('/api/notes/100')
            .set('cookie', cookie)
        expect(response.statusCode).toBe(400);
    });

});

describe('Updating a note', () => {

    const note = {author: 'author', date: 'date', title: 'Title', text: 'Text'};
    const updatedNote = {author: 'newAuthor', date: 'newDate', title: 'newTitle', text: 'newText'};

    it('should fail if not logged in', async () => {
        response = await request(app)
            .put('/api/notes/0')
            .send(note)
        expect(response.statusCode).toBe(401);
    });

    it('should update a note with specific id', async () => {

        // create some notes before update
        for (let i = 4; i < i; i++) {
            response = await request(app)
                .post('/api/notes')
                .set('cookie', cookie)
                .send(note)
            expect(response.statusCode).toBe(201);
        }

        const updateId = 2;

        response = await request(app)
            .put(`/api/notes/${updateId}`)
            .set('cookie', cookie)
            .send(updatedNote)
        expect(response.statusCode).toBe(200);

        response = await request(app)
            .get('/api/notes/2')
            .set('cookie', cookie)
        expect(response.body).toEqual({...updatedNote, id: updateId});

    })


})