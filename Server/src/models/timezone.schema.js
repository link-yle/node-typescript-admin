const mongoose = require('mongoose')
const Schema = mongoose.Schema


const timeZoneSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    gmtTimeDifference: {
        type: Number,
        required: true,
        min: -12,
        max: 14
    },
})

module.exports = timeZoneSchema