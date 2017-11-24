
const mongoose = require("mongoose")

function connectToOriginalDb(){
    return mongoose.connect(process.env.mongodbTimezoneURI, { useMongoClient: true});
}
function connectToTestDb(){
    return mongoose.connect(process.env.mongodbTimezoneMockURI, { useMongoClient: true});
}




mongoose.connection.on('open', () => console.log('Db connected'))

mongoose.connection.on('error', (error) => {
    throw new Error(error)
})
module.exports  = {connectToOriginalDb, connectToTestDb}


