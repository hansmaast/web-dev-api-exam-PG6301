const express = require('express');
const router = express.Router();

const {
    getNotes,
    getNoteById,
    postNote,
    deleteNote,
    putNote
} = require('../contollers/notesController');

router.get('/notes', getNotes)

router.get('/notes/:id', getNoteById)

router.post('/notes', postNote)

router.delete('/notes/:id', deleteNote)

router.put('/notes/:id', putNote)

module.exports = router;