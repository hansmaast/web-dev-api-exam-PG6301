const GameItems = require('../db/gameItems');
const {msg} = require('../../shared/utils');

exports.getItems = (req, res) => {

    const items = GameItems.getAllItems();

    if (items.length === 0) {
        res.status(200).json({msg: 'There are no items in this game..'});
        return;
    }

    res.status(200).json(items)
};



