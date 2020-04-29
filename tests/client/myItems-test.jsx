const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
const {MyItems} = require('../../src/client/components/myItems/MyItems');

import {testUser} from "./mockDataAndFuncs";

let wrapper;
const items = Object.values(testUser.myItems);

beforeEach(() => {

        const history = {
            push: (h) => {
                page = h
            }
        };

        wrapper = mount(
            <MyItems
                user={testUser}
                history={history}/>
        )
        console.log(items)
        wrapper.setState({myItems: items})
    }
);

afterEach(() => {
    wrapper.unmount();
})

describe('game description', () => {

    it('Should render correct content', () => {

        expect(wrapper.find('.myItem')).toHaveLength(items.length)
        expect(wrapper.find('.sellItemBtn')).toHaveLength(items.length)

        expect(wrapper.html()).toContain('Your items:');

    })

})