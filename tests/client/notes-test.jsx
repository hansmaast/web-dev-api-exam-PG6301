/**
 * This code is inspired by the following file:
 * https://github.com/arcuri82/web_development_and_api_design/blob/7b53f9f5a11683ee34c5f263678e6d5cc1925642/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx
 */

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {Notes} = require('~/client/components/notes/notes');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');

const {msg} = require('../../src/shared/utils');

let wrapper;

beforeEach(() => {
        wrapper = mount(<Notes/>)
    }
);

afterEach(() => {
    resetAllUsers();
    wrapper.unmount();
})

function fillNote(component, email, password) {

    const emailInput = component.find('#emailInput');
    const passwordInput = component.find('#passwordInput');
    const loginBtn = component.find('#loginBtn');

    emailInput.simulate('change', {target: {name: 'email', value: email}});
    passwordInput.simulate('change', {target: {name: 'password', value: password}});
    return loginBtn.simulate('click');
}

describe('state of note', () => {
    it('should have blank fields when mounted', function () {
        expect(wrapper.state('text')).toEqual('');
        expect(wrapper.state('title')).toEqual('');
        expect(wrapper.state('updateId')).toEqual(null);
        expect(wrapper.state('notes')).toEqual(null);
    });

    it('should should contain values when adding note', function () {
        const titleInput = wrapper.find('#noteTitle');
        const noteText = wrapper.find('textarea');

        titleInput.simulate('change', {target: {name: 'title', value: 'newTitle'}});
        noteText.simulate('change', {target: {name: 'text', value: 'newText'}});

        expect(wrapper.state('title')).toEqual('newTitle');
        expect(wrapper.state('text')).toEqual('newText');
        expect(wrapper.state('updateId')).toEqual(null);
        expect(wrapper.state('notes')).toEqual(null);
    });
});

describe('creating a note UI', () => {

    it('should render div for creating and editing note correctly', () => {
        expect(wrapper.find('#createNoteContainer')).toHaveLength(1);
        expect(wrapper.find('#noteTitle')).toHaveLength(1);
        expect(wrapper.find('textarea')).toHaveLength(1);
        expect(wrapper.find('button')).toHaveLength(3);
        expect(wrapper.find('button').at(1).prop('disabled')).toEqual(true);
        expect(wrapper.find('button').at(2).prop('disabled')).toEqual(true);
    });

    it('should add a note with title', () => {

    })
})
