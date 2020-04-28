const express = require('express');
const router = express.Router();

const {
    getItems
} = require('../contollers/gameItemsController');

router.get('/game-items', getItems)

// router.get('/menu/:id', getDishById)

module.exports = router;