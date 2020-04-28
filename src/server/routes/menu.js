const express = require('express');
const router = express.Router();

const {
    getMenu,
    getDishById,
    updateDish,
    deleteDish,
    postDish
} = require('../contollers/menuController');

router.get('/menu', getMenu)

router.get('/menu/:id', getDishById)

router.post('/menu', postDish)

router.delete('/menu/:id', deleteDish)

router.put('/menu/:id', updateDish)

module.exports = router;