const Notes = require('../db/notes');
const {msg} = require('../../shared/utils');

exports.getNotes = (req, res) => {

    if (!req.user) {
        res.status(401).json(msg.notAuthorized);
        return;
    }

    const notes = Notes.getAllNotes();

    if (notes.length === 0) {
        res.status(200).json({msg: 'You have no notes..'});
        return;
    }

    res.status(200).json(notes)
};

exports.getNoteById = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const id = parseInt(req.params.id);

    const note = Notes.getNoteById(id);

    if (note == null) {
        res.status(404).json({msg: 'Could not find note..'});
        return;
    }

    res.status(200).json(note)
};

exports.postNote = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: 'You need to login to access this..'});
        return;
    }

    const {author, date, title, text} = req.body;
    const createdNote = Notes.createNote(author, date, title, text);

    if (!createdNote) {
        // sends 400 bad request
        res.status(400).json({msg: 'Could not create note..'});
        return;
    }

    res.status(201).json({msg: "Note created!"})
};

exports.deleteNote = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const id = parseInt(req.params.id);

    const deletedNote = Notes.deleteNote(id);

    if (!deletedNote) {
        // sends 400 bad request
        res.status(400).json({msg: 'Could not delete note..'});
        return;
    }

    res.status(200).json({msg: `Note ${id} deleted!`})

};

exports.putNote = (req, res) => {

    if (!req.user) {
        res.status(401).json({msg: msg.notAuthorized});
        return;
    }

    const id = parseInt(req.params.id);

    const {author, date, title, text} = req.body;
    const updatedNote = Notes.updateNote(id, author, date, title, text);

    if (!updatedNote) {
        // sends 400 bad request
        res.status(400).json({msg: 'Could not update note..'});
        return;
    }

    res.status(200).json({msg: `Note ${id} updated!`});

}

