const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
const {Home} = require('../../src/client/components/home/home');
const {resetAllUsers} = require('../../src/server/db/users');
import {testUser} from "./mockDataAndFuncs";

import {notLoggedInContent} from "../../src/client/components/home/home";

let wrapper;
beforeEach(() => {
        wrapper = mount(
            <MemoryRouter>
                <Home
                    user={testUser}
                />
            </MemoryRouter>
        )
    }
);



afterEach(() => {
    resetAllUsers();
    wrapper.unmount();
})

describe('home page', () => {

    it('Should render not logged in content', () => {

        wrapper = mount(
            <MemoryRouter>
                <Home
                    user={null}
                />
            </MemoryRouter>
        )
        expect(wrapper.find('h3')).toHaveLength(2)
        expect(wrapper.find('a')).toHaveLength(3)

        expect(wrapper.html()).toContain('Login');
        expect(wrapper.html()).toContain('Sign Up');
        expect(wrapper.html()).toContain('description');

    })


    it('Should render logged in content', () => {

        expect(wrapper.find('h3')).toHaveLength(1)
        expect(wrapper.find('a')).toHaveLength(3)

        expect(wrapper.html()).toContain('Play Game');
        expect(wrapper.html()).toContain('View my items');
        expect(wrapper.html()).toContain('description');

    })

})