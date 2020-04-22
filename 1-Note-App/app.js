const yargs = require('yargs');
const notes = require('./notes.js');

const command = process.argv[2];

// console.log('Node Path: ', process.argv[0]);
// console.log('File Path: ', process.argv[1]);
// console.log('Command: ', process.argv[2]);

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body add',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.printList();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

//! this command goes through all the commands that we provide above and print only once
yargs.parse();

//! this command calls .parse(), so it prinst the first time, then it prints the console.log
//! so it prints twice the arguments
// console.log(yargs.argv);
