const express = require('express');
const router = express.Router();

const {
    getItems,
    getMyItems
} = require('../contollers/gameItemsController');

router.get('/game-items', getItems)

router.post('/my-items', getMyItems)

// router.get('/menu/:id', getDishById)

module.exports = router;