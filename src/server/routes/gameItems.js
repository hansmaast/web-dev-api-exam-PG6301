const express = require('express');
const router = express.Router();

const {
    getItems,
    getRandomItems,
    getMyItems
} = require('../contollers/gameItemsController');

router.get('/game-items', getItems)

router.get('/random-items', getRandomItems)

router.post('/my-items', getMyItems)

// router.get('/menu/:id', getDishById)

module.exports = router;