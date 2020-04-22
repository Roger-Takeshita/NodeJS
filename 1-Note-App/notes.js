const chalk = require('chalk');
const fs = require('fs');

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatedNotes = notes.find((note) => note.title === title);

    if (!duplicatedNotes) {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        return console.log(chalk.green.inverse('new node added'));
    }
    console.log(chalk.red.inverse('title already exists'));
};

const removeNote = (title) => {
    const notes = loadNotes();
    const updateNotes = notes.filter((note) => note.title !== title);

    if (notes.length === updateNotes.length) return console.log(chalk.red.inverse('No note found'));
    saveNotes(updateNotes);
    console.log(chalk.green.inverse('Note removed'));
};

const printList = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);

    if (findNote) return console.log(chalk.green.inverse(findNote.title, findNote.body));
    console.log(chalk.red.inverse('Title not found'));
};

module.exports = {
    addNote,
    removeNote,
    printList,
    readNote
};
