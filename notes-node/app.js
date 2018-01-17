console.log('Starting app.js')

const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

const argv = yargs.argv
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
        notes.getNote(argv.title)
        break
    case 'remove':
        notes.removeNote(argv.title)
        break
    default:
        console.log('Command not recognized')
        break;
}