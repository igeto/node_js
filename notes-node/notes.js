console.log('Starting notes.js')

let notes = [
    {
        title: 'first',
        body: 'My first note'
    },
    {
        title: 'second',
        body: 'My second note'
    },
    {
        title: 'third', 
        body: 'My third note'
    },
    {
        title: 'fourth', 
        body: 'My fourth note'
    }
]

function Note(title, body) {
    this.title = title;
    this.body = body
}

let addNote = (title, body) => {
    console.log(`Adding note ${title} ${body}`)
    notes.push(new Note(title, body))
    console.log(notes)
}

let getAll = () => {
    console.log(`Getting all notes`)
    notes.forEach(n => console.log(`${n.title}: ${n.body}`))
}

let getNote = (title) => {
    let note = notes.filter(n => n.title === title)
    console.log(`${note[0].title}: ${note[0].body}`)
}

let removeNote = (title) => {
    console.log(`Removing note with title ${title}`)
    notes = notes.filter(n => n.title !== title)
    getAll()
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
