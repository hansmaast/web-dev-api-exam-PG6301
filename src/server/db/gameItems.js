/**
 * Data from these sources:
 * https://www.restaurantware.com/blog/post/top-10-luxurious-foods-fashionforfood/
 * https://says.com/my/lifestyle/you-can-look-at-me-but-you-cannot-afford-me
 * https://www.departures.com/lifestyle/food/worlds-most-luxurious-foods#fugu-puffer-fish
 *
 * @type {({price: number, name: string, description: string, id: number}|{price: number, name: string, description: string, id: number}|{price: number, name: string, description: string, id: number}|{price: number, name: string, description: string, id: number}|{price: number, name: string, description: string, id: number})[]}
 */

const gameItems = [
    {
        id: 0,
        name: 'Kobe beef',
        description: 'This precious beef has been in the public eye as one of the most luxurious meats for years. Due to its popularity, Kobe beef is more available to the public than ever before. However, when visiting its roots in Japan, these burgers and steaks will still cost you a small fortune. This succulent, marbled Wagyu beef will certainly delight your tastebuds, but definitely not your bank account.',
        price: 790
    },
    {
        id: 1,
        name: ' Ass Cheese/pule',
        description: 'As one of the most expensive cheeses in the world, Ass Cheese (aka pule) is made on a Serbian farm. In a similar process for cow or goat cheese, donkey milk is transformed into a succulent treat. Ass cheese is said to have a very strong and powerful taste with an aftertaste similar to parmesan. This cheese is unique, and the price definitely reflects that.',
        price: 1100
    },
    {
        id: 3,
        name: 'Japanese Matsutake Mushroom',
        description: 'This precious beef has been in the public eye as one of the most luxurious meats for years. Due to its popularity, Kobe beef is more available to the public than ever before. However, when visiting its roots in Japan, these burgers and steaks will still cost you a small fortune. This succulent, marbled Wagyu beef will certainly delight your tastebuds, but definitely not your bank account.',
        price: 810
    },
    {
        id: 4,
        name: 'Black Densuke Watermelons',
        description: 'Black watermelons are expensive because they are very rare around the world. Like many other pricey exotic foods, these are primarily found off the Japanese coast. Not only is the existence of this watermelon uncommon, but it is also very hard to harvest. However, when this is grown right, they can have a stronger and sweeter aroma than regular watermelons.',
        price: 5000
    },
    {
        id: 5,
        name: 'Beluga caviar',
        description: 'As one of the most expensive caviars in the world, it’s no surprise that Beluga caviar appears on this list. These eggs differ from other eggs not only in their color, but also in their size. Beluga caviar has a purple color that can look black in many instances. The lighter the color, the more expensive the caviar. Additionally, Beluga caviar is much bigger than other varieties.',
        price: 8500
    },
    {
        id: 6,
        name: 'Saffron',
        description: 'Saffron is easily the most expensive spice in the world. Harvesting Saffron is very particular — each individual strand must be hand picked and it takes thousands to supply an ounce. There are many uses for Saffron from flavoring delicate dishes to coloring vibrant foods. Top chefs around the world love getting their hands on this spice to give their dishes extra character.',
        price: 6000
    },
    {
        id: 7,
        name: ' Yubari King Melons',
        description: 'Another fruit tops our most luxurious foods list for the auction price of one of the most perfect Yubari King Melons. During an auction featuring these magnificent fruits in 2008, a woman purchased the favorited melon for approximately $23,000. Yubari King Melons are known for their irresistible sweetness and flavor.',
        price: 20000
    },
    {
        id: 8,
        name: 'Italian White Alba Truffle',
        description: 'Truffles in general are very rare and deemed a delicacy. The Italian White Alba Truffles are among the most unique and most expensive in the family. These truffles have a very particular taste and chefs handle them with high caution due to their market value. Truffles are so unique that their taste can’t really be duplicated, so if you want to experience these delicacy, then you will have to pay the price.',
        price: 35000
    },
    {
        id: 9,
        name: 'Edible gold leaf',
        description: 'Many dishes across the world top luxury lists and showcase these beautiful edible gold leaves. These decorations are the ultimate statement in class and elegance. Gold is edible, but it does not provide any essential nutrition. This flashy and classy decoration is a high priority item at special events and upscale holiday parties. Serendipity-3, a popular restaurant in New York, is the most expensive dessert and is topped with decadent gold leaves.',
        price: 50000
    },
    {
        id: 10,
        name: 'Angulas',
        description: 'These glass noodles from northern Spain are actually baby eels, or elvers. (Look closely for pinpoint eyes and a slit mouth.) When the ocean eels are two or three years old, they migrate up the rivers of Western Europe, where they’re net-caught in droves, particularly in Spain’s Basque country. Basque tradition requires that they be eaten in tiny earthenware bowls using wood forks so that metals don’t impose on its delicate flavor. So delicate, in fact, that some argue it’s more their texture—soft with a mild crunch—that pairs them so nicely with the traditional recipe of browned garlic and spicy red pepper flakes in piping-hot olive oil.',
        price: 900
    },
    {
        id: 11,
        name: 'Indonesian Black Chicken',
        description: 'This Indonesian breed of chicken, which is highly coveted for being beautiful, exotic and obviously hard-to-get, is all black from its feathers and organs to its muscles and meat.',
        price: 2500
    },
    {
        id: 12,
        name: 'Bluefin tuna',
        description: 'Wild-caught bluefin tuna, some as large as a car, can sell for hundreds of thousands of dollars at Tokyo’s Tsukiji fish market, but are also critically endangered.',
        price: 7400
    },
    {
        id: 13,
        name: 'Ruby Roman Grapes',
        description: 'Grown and marketed entirely in Ishikawa Prefecture, Japan, the Ruby Roman is red in colour and each grape is about the size of a ping-pong ball. The first Ruby Roman grapes were sold in August 2008 for $807 (RM3,371) per 700g bunch.',
        price: 690
    },
    {
        id: 14,
        name: ' La Bonnotte potatoes',
        description: 'This potato, grown only on Noirmoutier, an island off the west coast of France, is produced on a small scale and hand-picked only once a year. These potatoes can only be grown in the presence of a rare seaweed fertilizer in a climate shaped by the sea, a rare climate which can only be found on the island Noirmoutier in France.',
        price: 700
    },
    {
        id: 15,
        name: 'Jamón Ibérico de bellota ',
        description: 'Jamón Ibérico de bellota comes from a small area along the Spanish-Portuguese border, where the black Iberian pig is raised on a diet of nothing but acorns. This imparts a pure earthiness to the meat, not sullied by the consumption of any kind of meat, or spoiled food. These special pigs are also given a lifetime of free range in oak groves, where they walk or run around. This exercise strengthens the meat’s earthy flavor.',
        price: 630
    }
];


const getAllItems = () => {
    return gameItems;
}


/**
 * Returns an array of random items
 * @param numberOfItems
 * @returns {[]}
 */
const getRandomItems = numberOfItems => {
    if (isNaN(numberOfItems)) throw 'The parameter you have typed in is not  a  number';
    if (numberOfItems <= 0) throw 'The parameter you have typed in is <= 0';
    if (numberOfItems > gameItems.length) {
        console.error('The number you have typed in is greater than the length of array. It has been set to match array length.');
        numberOfItems = gameItems.length;
    }
    let randomItems = [];
    let randomNumber = Math.floor(Math.random() * gameItems.length);
    let usedNumbers = [];
    while (usedNumbers.length < numberOfItems) {
        randomNumber = Math.floor(Math.random() * gameItems.length);
        if (!usedNumbers.includes(randomNumber)) {
            usedNumbers.push(randomNumber);
            randomItems.push(gameItems[randomNumber]);
        }
    }
    return randomItems;
};

module.exports = {
    gameItems,
    getAllItems,
    getRandomItems
};