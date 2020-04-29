const React = require('react');
const {mount} = require('enzyme');
const {GameDescription} = require('../../src/client/components/gameDescription/GameDescription');

import gameItems from '../../src/server/db/gameItems';

let wrapper;
const items = gameItems.getAllItems();

beforeEach(() => {
        wrapper = mount(
                <GameDescription/>
        )
    wrapper.setState({ gameItems: items})
    }
);

afterEach(() => {
    wrapper.unmount();
})

describe('game description', () => {

    it('Should render correct content', () => {

        expect(wrapper.find('.gameItem')).toHaveLength(items.length)

        expect(wrapper.html()).toContain('Items found in game:');

    })

})