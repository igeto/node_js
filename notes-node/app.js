console.log('Starting app.js')

const fs = require('fs')
const os = require('os')
const notes = require('./notes.js')

let user = os.userInfo()

fs.appendFile('greetings.txt', `Hello ${user.username}`, err => {
    if (!!err) {
        throw new console.error('couldnt create file');        
    }
})
