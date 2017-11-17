

const donorsModel = require('../models/donors.model')

function findFromLocation(long, lat, distance=5000000) {
    return donorsModel.
        find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [long, lat] }, $maxDistance: distance } } }).limit(10).lean().exec()
}

function findOneAndUpdate(id, update) {
    return donorsModel.findById(id).exec().then((item)=>{
        item.firstName = update.firstName
        item.lastName = update.lastName
        item.email = update.email
        item.telephone = update.telephone
        item.bloodGroup = update.bloodGroup
        item.location  = update.location || item.location
        item.address  = update.address || item.address
        return item.save()
    })
}

function remove(id) {
    return donorsModel.
}

function getOneById(id) {
    return donorsModel.findById(id).lean().exec()
}

function add(item) {
    const newDonor = new donorsModel(item)
    return newDonor.save()
}

module.exports = {
    findFromLocation, findOneAndUpdate, remove, add, getOneById
}