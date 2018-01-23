console.log('Starting app.js')

const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
})
    .command('list', 'Lists all notes')
    .command('read', 'Read a note selected by title', {
        title: titleOptions
    })
    .command('remove', 'Deletes a selected note', {
        title: titleOptions
    })
    .help()
    .argv

let command = argv._[0]
console.log(`Process: ${process.argv} 
Yargs: `, argv)

console.log(`Command: ${command}`)

switch (command) {
    case 'add':
        notes.addNote(argv.title, argv.body)
        break;
    case 'list':
        notes.getAll()
        break
    case 'read':
        let note = notes.getNote(argv.title)
        note ?
            console.log(`${note.title}: ${note.body}`) :
            console.log(`Couldn't find a note with title ${argv.title}`)
        break
    case 'remove':
        notes.removeNote(argv.title) ?
            console.log(`Note with title ${argv.title} has been removed`) :
            console.log(`Note with title ${argv.title} not found`)
        break
    default:
        console.log('Command not recognized')
        break;
}