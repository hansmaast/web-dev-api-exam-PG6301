/**
 * This code is inspired by the following file:
 * https://github.com/arcuri82/web_development_and_api_design/blob/7b53f9f5a11683ee34c5f263678e6d5cc1925642/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx
 */

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {Login} = require('~/client/components/auth/login');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');

const {msg} = require('../../src/shared/utils');

let wrapper;

beforeEach(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={["/login"]}>
                <Login/>
            </MemoryRouter>
        )
    }
);

afterEach(() => {
    resetAllUsers();
    wrapper.unmount();
})

function fillForm(component, email, password) {

    const emailInput = component.find('#emailInput');
    const passwordInput = component.find('#passwordInput');
    const loginBtn = component.find('#loginBtn');

    emailInput.simulate('change', {target: {name: 'email', value: email}});
    passwordInput.simulate('change', {target: {name: 'password', value: password}});

    return loginBtn.simulate('click');
}

describe('login component', () => {

    it('should render loginContainer', () => {
        expect(wrapper.find('#loginContainer')).toHaveLength(1);
    });

    it('should render email and password input', function () {
        expect(wrapper.find('#emailInput')).toHaveLength(1);
        expect(wrapper.find('#passwordInput')).toHaveLength(1);
    });

    it('should render login button', function () {
        expect(wrapper.find('#loginBtn')).toHaveLength(1);
    });

    it('should render link to register', function () {
        expect(wrapper.find('#signupLink').at(0).html()).toContain('Sign up!');
    });

    it('should not be able to click button on empty inputs', function () {
        fillForm(wrapper, " ", " ");
        expect(wrapper.find('#loginBtn').prop('disabled')).toEqual(true);
    });

})

it("should fail on invalid username or password", async () => {

    overrideFetch(app);

    fillForm(wrapper, "foo", "123");

    await asyncCheckCondition(
        () => {
            wrapper.update();
        },
        2000, 200);

    expect(wrapper.html()).toContain(msg.invalidUserOrPassword);
});

// test("Test valid login", async () => {
//
//     const userId = "valid@email.com";
//     const password = "Abc123";
//     createUser(userId, password);
//
//     overrideFetch(app);
//
//     const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
//     let page = null;
//     const history = {
//         push: (h) => {
//             page = h
//         }
//     };
//
//     const wrapper = mount(
//         <MemoryRouter initialEntries={["/signup"]}>
//             <Login updateLoggedInUserId={fetchAndUpdateUserInfo} history={history}/>
//         </MemoryRouter>
//     );
//
//     fillForm(wrapper, userId, password);
//
//     const redirected = await asyncCheckCondition(
//         () => {
//             return page === "/"
//         },
//         2000, 200);
//
//     expect(redirected).toEqual(true);
// });