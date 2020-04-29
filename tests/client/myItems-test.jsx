const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
const {MyItems} = require('../../src/client/components/myItems/MyItems');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

import {testUser} from "./mockDataAndFuncs";

let wrapper;
let history;
let page = null;
const items = Object.values(testUser.myItems);

beforeEach(() => {

        overrideFetch(app);

        history = {
            push: (h) => {
                page = h
            }
        };

        wrapper = mount(
            <MyItems
                user={testUser}
                history={history}/>
        )
        // wrapper.setState({myItems: items})
    }
);

afterEach(() => {
    wrapper.unmount();
})

describe('my items', () => {

    it('Should render correct content', async () => {

        expect(wrapper.find('.myItem')).toHaveLength(items.length)
        expect(wrapper.find('.sellItemBtn')).toHaveLength(items.length)

        expect(wrapper.html()).toContain('Your items:')

    })

    it('should redirect to home if no user', async () => {

            wrapper = mount(
                <MyItems
                    user={null}
                    history={history}/>
            )

            const redirected = await asyncCheckCondition(
                () => {
                    return page === "/"
                },
                200, 20);

            expect(redirected).toEqual(true);

    }

    );

})