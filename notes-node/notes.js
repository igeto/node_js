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
            if (!!db) {
                db.push(data)
                fs.writeFileSync('playground/notes-data.json', JSON.stringify(db))
            }
        } else {
            console.error('Invalid data')
        }
    }
    if (!!method && method === 'getOne') {
        if (!!data && typeof data === 'string') {
            let db = dbContext('get')
            if (!!db)
                return db.filter(note => note.title === data)
        }
    }
    if (!!method && method === 'delete') {
        if (!!data && typeof data === 'string') {
            let db = dbContext('get')
            if (!!db) {
                db = db.filter(note => note.title !== data)
                fs.writeFileSync('playground/notes-data.json', JSON.stringify(db))
            }
        }
    }
}

function Note(title, body) {
    this.title = title;
    this.body = body
}

let addNote = (title, body) => {
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
    console.log(`${note[0].title}: ${note[0].body}`)
}

let removeNote = (title) => {
    console.log(`Removing note with title ${title}`)
    notes = dbContext('delete', title)
    getAll()
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
