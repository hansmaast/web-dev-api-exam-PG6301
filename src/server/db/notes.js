const notes = new Map();

let noteCounter = 0;

function createNote(userEmail, date, title, text) {
    if (
        userEmail.trim() === '' ||
        title.trim() === ''
    ) {
        return false;
    }

    const note = {
        id: noteCounter,
        author: userEmail,
        date: date,
        title: title,
        text: text
    };

    notes.set(noteCounter, note);
    noteCounter++;
    return true;
}

function getNoteById(id) {
    return notes.get(id);
}

function getAllNotes(){
    const notesAsArray = Array.from(notes.values());
    return notesAsArray;
}

function deleteNote(id) {
    return notes.delete(id);
}

function updateNote(id, userEmail, date, title, text) {

    const note = {
        id: id,
        author: userEmail,
        date: date,
        title: title,
        text: text
    };

    notes.set(id, note);
    return true;
}

module.exports = {createNote, getNoteById, getAllNotes, deleteNote, updateNote}