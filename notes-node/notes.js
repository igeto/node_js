console.log('Starting notes.js')

const fs = require('fs')

let dbContext = (method, data) => {
    if (!!method && method === 'get') {
        try {
            let db = fs.readFileSync('playground/notes-data.json')
            return JSON.parse(db)
        } catch (error) {
            console.error(`Database not found!`)
            return [];
        }

    }
    if (!!method && method === 'post') {
        if (!!data && data instanceof Note) {
            let db = dbContext('get')
            let duplicateNote = db.filter(note => note.title === data.title)
            if ((!!db && db.length !== 0) && duplicateNote.length === 0) {
                fs.writeFileSync('playground/notes-data.json', JSON.stringify(db))
                console.log(`Added new note with title: ${data.title} and body: ${data.body}`)
            } else {
                console.log(`Note with title: ${data.title} already exists`)
            }
        } else {
            console.error('Invalid data')
        }
    }
    if (!!method && method === 'getOne') {
        if (!!data && typeof data === 'string') {
            let db = dbContext('get')
            if (!!db && db.length !== 0) {
                note = db.filter(note => note.title === data)
                return note[0]
            }
        } else {
            console.error('Invalid data')
        }
    }
    if (!!method && method === 'delete') {
        if (!!data && typeof data === 'string') {
            let db = dbContext('get')
            if (!!db && db.length !== 0) {
                let filteredDb = db.filter(note => note.title !== data)
                fs.writeFileSync('playground/notes-data.json', JSON.stringify(filteredDb))

                return filteredDb.length !== db.length ? true : false;
            }
        } else {
            console.error('Invalid data')
        }
    }
}

function Note(title, body) {
    this.title = title;
    this.body = body
}

let addNote = (title, body) => {
    debugger
    console.log(`Adding note ${title} ${body}`)
    dbContext('post', new Note(title, body))
}

let getAll = () => {
    console.log(`Getting all notes`)
    let notes = dbContext('get')
    notes.forEach(n => console.log(`${n.title}: ${n.body}`))
}

let getNote = (title) => {
    console.log(`Getting note with title ${title}`)
    let note = dbContext('getOne', title)
    return note
}

let removeNote = (title) => {
    console.log(`Removing note with title ${title}`)
    return notes = dbContext('delete', title)
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
