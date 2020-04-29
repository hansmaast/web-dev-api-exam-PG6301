/**
 * Inpired by this code:
 * https://github.com/arcuri82/web_development_and_api_design/blob/60328f9ed01689df1ba9a4df27ee033f5054a55a/exercise-solutions/quiz-game/part-10/tests/client/match-test.jsx
 */

import {LootBox} from "../../src/client/components/LootBox/LootBox";
import {updateUserItems, updateUserLootBoxes} from "./mockDataAndFuncs";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {app} = require('../../src/server/app');
const Users = require('../../src/server/db/users');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {msg} = require('../../src/shared/utils');

let wrapper;

beforeEach(async () => {

        overrideFetch(app);

        global.alert = jest.fn();

        wrapper = mount(
            <MemoryRouter>
                <LootBox
                    items={3}
                    updateUserLootBoxes={updateUserLootBoxes}
                    updateUserItems={updateUserItems}
                />
            </MemoryRouter>
        );
        // wrapper.setProps({ : 'bar' });
    }
);

afterEach(() => {
    Users.resetAllUsers();
    wrapper.unmount();
})


describe('the loot box', () => {

    it('should render correctly', () => {
        const lootBox = wrapper.find('.lootBox');
        const lootBtn = wrapper.find('.gimmeLootBtn');

        expect(lootBox).toHaveLength(1);
        expect(lootBtn).toHaveLength(1);
        expect(lootBox.html()).toContain('Loot the box to view the items...');
    })

    it('should display items on click', async () => {
        const lootBtn = wrapper.find('.gimmeLootBtn').at(0);

        lootBtn.simulate('click');

        await asyncCheckCondition(
            () => {
                wrapper.update()
            },
            200, 20);

    })

})