const GameItems = require('../../src/server/db/gameItems');

export let testUser = {
    id: 0,
    email: 'email@email.com',
    firstName: 'Test',
    lastName: 'Person',
    password: 'Asd123',
    gamesPlayed: 0,
    myItems: {
        "6": {
            "id": 6,
            "name": "Saffron",
            "description": "Saffron is easily the most expensive spice in the world. Harvesting Saffron is very particular — each individual strand must be hand picked and it takes thousands to supply an ounce. There are many uses for Saffron from flavoring delicate dishes to coloring vibrant foods. Top chefs around the world love getting their hands on this spice to give their dishes extra character.",
            "amount": 1,
            "price": 6000
        },
        "8": {
            "id": 8,
            "name": "Italian White Alba Truffle",
            "description": "Truffles in general are very rare and deemed a delicacy. The Italian White Alba Truffles are among the most unique and most expensive in the family. These truffles have a very particular taste and chefs handle them with high caution due to their market value. Truffles are so unique that their taste can’t really be duplicated, so if you want to experience these delicacy, then you will have to pay the price.",
            "amount": 1,
            "price": 35000
        },
        "12": {
            "id": 12,
            "name": "Bluefin tuna",
            "description": "Wild-caught bluefin tuna, some as large as a car, can sell for hundreds of thousands of dollars at Tokyo’s Tsukiji fish market, but are also critically endangered.",
            "amount": 1,
            "price": 7400
        }
    },
    cash: 0,
    lootBoxes: 3
}

export const updateUserLootBoxes = {
    remove: () => {

        const user = {...testUser}
        const prevValue = user.lootBoxes;
        user.lootBoxes = prevValue - 1

        testUser = {...user};
    },
    add: () => {

        const user = {...testUser}
        const prevValue = user.lootBoxes;
        user.lootBoxes = prevValue + 1

        testUser = {...user};

    }
}

export const updateUserItems = item => {
    const user = {...testUser}
    let {myItems} = user;

    if (myItems.hasOwnProperty(item.id)) {

        const propValue = myItems[item.id].amount;
        myItems[item.id].amount = propValue + 1;

    } else {
        myItems[item.id] = {
            id: item.id,
            name: item.name,
            description: item.description,
            amount: 1,
            price: item.price
        }
    }

    testUser = {...user};
}

export const buyUserLootBox = price => {

    const user = {...testUser};

    //BUG: this is not updating when bying loot
    user.cash -= price;

    testUser = {...user};
}
