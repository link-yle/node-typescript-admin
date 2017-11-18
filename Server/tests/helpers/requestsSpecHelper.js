const app = require('../../src/app')
const db = require('../../src/core/dbConnection.js')
const request = require('supertest')


function setup() {
    db.connectToTestDb()
    return [app.listen(6000), request(app)]
}

function connectToDb(){
    db.connectToTestDb()
}
module.exports = {
    setup , connectToDb
}