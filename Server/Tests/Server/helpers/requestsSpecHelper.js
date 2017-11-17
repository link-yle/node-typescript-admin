const app = require('../../../Code/Server/src/app')
const db = require('../../../Code/Server/src/core/dbConnection.js')
const request = require('supertest')


function setup() {
    db.connectToTestDb()
    return [app.listen(6000), request(app)]
}

module.exports = {
    setup
}