/**
 * Inpired by this code:
 * https://github.com/arcuri82/web_development_and_api_design/blob/60328f9ed01689df1ba9a4df27ee033f5054a55a/exercise-solutions/quiz-game/part-10/tests/client/match-test.jsx
 */

import {GachaGame} from "../../src/client/components/gachaGame/GachaGame";

const React = require('react');
export const {mount} = require('enzyme');
export const {MemoryRouter} = require('react-router-dom');

export const {app} = require('../../src/server/app');
const Users = require('../../src/server/db/users');

const {overrideFetch} = require('../mytest-utils');
import {testUser, updateUserLootBoxes, buyUserLootBox} from './mockDataAndFuncs'


function setTestUserProp(prop, value) {
    wrapper.unmount();

    testUser[prop] = value;

    overrideFetch(app);

    wrapper = mount(
        <MemoryRouter>
            <GachaGame
                user={testUser}
                buyUserLootBox={buyUserLootBox}
                updateUserLootBoxes={updateUserLootBoxes}
            />
        </MemoryRouter>
    );
}


let wrapper;

beforeEach(async () => {

        overrideFetch(app);

        global.alert = jest.fn();

        wrapper = mount(
            <MemoryRouter>
                <GachaGame
                    user={testUser}
                    buyUserLootBox={buyUserLootBox}
                    updateUserLootBoxes={updateUserLootBoxes}
                />
            </MemoryRouter>
        );
    }
);

afterEach(() => {
    Users.resetAllUsers();
    wrapper.unmount();
})

describe('Game of gacha', () => {

    it('should contain button', async () => {
        expect(wrapper.find('#buyLootBtn')).toHaveLength(1);
    })

    it('should contain 3 loot boxes', () => {
        expect(wrapper.find('.lootBox')).toHaveLength(3);
    });

    it('should display no loot if lootBoxes === 0', () => {

        setTestUserProp('lootBoxes', 0);

        expect(wrapper.find('.infoMsg')).toHaveLength(1);

    });

    it('should not be able to but loot without money', () => {

        setTestUserProp('cash', 0);

        wrapper.find('#buyLootBtn').simulate('click');

        expect(global.alert).toBeCalledWith('You do not have enough cash to buy a loot box..:(');

        expect(testUser.lootBoxes).toEqual(0);
    });

    it('should be able to but loot with money', () => {

        setTestUserProp('cash', 1100);
        setTestUserProp('lootBoxes', 0);


        /**
         * Snipptet from this source:
         * https://stackoverflow.com/questions/48728167/simulate-clicking-ok-or-cancel-in-a-confirmation-window-using-enzyme
         */
        global.confirm = jest.fn(() => true) // always click 'yes'

        wrapper.find('#buyLootBtn').simulate('click');

        expect(global.confirm).toHaveBeenCalledWith('Are u sure u want to buy this loot for $1000,-..?');


        expect(testUser.lootBoxes).toEqual(1);
    });
})
