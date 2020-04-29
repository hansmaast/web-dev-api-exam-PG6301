const express = require('express');
const router = express.Router();

const {
    getItems,
    getRandomItems,
    getMissingItems
} = require('../contollers/gameItemsController');

// this route is open for everyone
router.get('/game-items', getItems)

router.get('/random-items', getRandomItems)

router.post('/missing-items', getMissingItems)

module.exports = router;