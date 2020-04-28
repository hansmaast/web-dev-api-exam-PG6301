/**
 * This code is inspired by the following file:
 * https://github.com/arcuri82/web_development_and_api_design/blob/7b53f9f5a11683ee34c5f263678e6d5cc1925642/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx
 */

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');
const {HeaderBar} = require('../../src/client/components/header/headerbar');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');
const {msg} = require('../../src/shared/utils');
const request = require('supertest');

let response;
let cookie;
let wrapper;

const validPayload = {userId: 'valid@email.com', firstName: 'Test', lastName: 'Person', password: 'Abc123'};

beforeAll( async () => {
    // Creates a user to access notes
    response = await request(app)
        .post('/api/signup')
        .send(validPayload);
    cookie = response.headers['set-cookie'];
})

beforeEach(() => {
        wrapper = mount(
            <MemoryRouter>
                <HeaderBar />
            </MemoryRouter>
        )
    }
);



afterEach(() => {
    resetAllUsers();
    wrapper.unmount();
})


describe('headerbar if logged in', () => {

    it('should contain 2 divs', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('should contain Home, notes and Logout', function () {
        expect(wrapper.html()).toContain('Home');
        expect(wrapper.html()).toContain('My Items');
        expect(wrapper.html()).toContain('Gacha');
        expect(wrapper.html()).toContain('Logout');
    });

    it('should display welcome message', function () {
        expect(wrapper.html()).toContain('Welcome')
    });

})

// describe('headerbar if not logged in', () => {
//
//     it('should contain 2 divs', async () => {
//         response = await request(app)
//             .post('/api/logout')
//         expect(wrapper.find('div')).toHaveLength(2);
//     });
//
//     it('should contain 3 links', function () {
//         expect(wrapper.find('a')).toHaveLength(3);
//     });
//
//     it('should display welcome message', function () {
//         expect(wrapper.html()).toContain('not logged in')
//     });
//
// })

// it("should fail on invalid username or password", async () => {
//
//     overrideFetch(app);
//
//     fillForm(wrapper, "foo", "123");
//
//     await asyncCheckCondition(
//         () => {
//             wrapper.update();
//         },
//         2000, 200);
//
//     expect(wrapper.html()).toContain(msg.invalidUserOrPassword);
// });
