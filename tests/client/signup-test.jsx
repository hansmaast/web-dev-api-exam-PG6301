/**
 * This code is inspired by the following file:
 * https://github.com/arcuri82/web_development_and_api_design/blob/7b53f9f5a11683ee34c5f263678e6d5cc1925642/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx
 */

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {SignUp} = require('~/client/components/auth/signup');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');

const {msg} = require('../../src/shared/utils');

let wrapper;

beforeEach(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={["/signup"]}>
                <SignUp />
            </MemoryRouter>
        )
    }
);

afterEach(() => {
    resetAllUsers();
    wrapper.unmount();
})

function fillForm(wrapper, email, firstName, lastName, password, confirmPassword) {

    const emailInput = wrapper.find('input').at(0);
    const firstNameInput = wrapper.find('input').at(1);
    const lastNameInput = wrapper.find('input').at(2);
    const passwordInput = wrapper.find('input').at(3);
    const confirmPasswordInput = wrapper.find('input').at(4);

    emailInput.simulate('change', {target: {name: 'email', value: email}})
    firstNameInput.simulate('change', {target: {name: 'firstName', value: firstName}})
    lastNameInput.simulate('change', {target: {name: 'lastName', value: lastName}})
    passwordInput.simulate('change', {target: {name: 'password', value: password}})
    confirmPasswordInput.simulate('change', {target: {name: 'confirmPassword', value: confirmPassword}})

    const signUpBtn = wrapper.find('button');

    signUpBtn.simulate('click');
}

describe('signup component', () => {

    it('should contain 7 divs', () => {
        expect(wrapper.find('div')).toHaveLength(7);
    });

    it('should render 5 inputs', function () {
        expect(wrapper.find('input')).toHaveLength(5);
    });

    it('should render 1 button', function () {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should not be able to click button on empty inputs', function () {
        fillForm(wrapper, " ", " ", " ", " ", " ");
        expect(wrapper.find('button').prop('disabled')).toEqual(true);
    });

    it('should display warning if passwords doesnt match', function () {
        fillForm(wrapper, "valid@email.com", "Bob", "Jones", "abc", "abe");
        expect(wrapper.find('button').prop('disabled')).toEqual(true);
        expect(wrapper.find('#errorMessage')).toHaveLength(1);
    });

})

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
