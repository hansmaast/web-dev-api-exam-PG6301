const GameItems = require('../db/gameItems');
const {msg} = require('../../shared/utils');

exports.getItems = (req, res) => {

    const items = GameItems.getAllItems();

    if(!items) {
        res.status(500).json({msg: 'Internal server error'});
        return;
    }

    if (items.length === 0) {
        res.status(200).json({msg: 'There are no items in this game..'});
        return;
    }

    res.status(200).json(items)
};


exports.getRandomItems = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const amount = parseInt(req.query.amount);

    const randomItems = GameItems.getRandomItems(amount);

    if (randomItems.length === 0) {
        res.status(200).json({msg: 'There are no items in this game..'});
        return;
    }

    res.status(200).json(randomItems)
}


exports.getMissingItems = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }
    
    const itemIds = req.body.myItems;

    const missingItems = GameItems.getMissingItems(itemIds);

    res.status(200).json(missingItems);

}



