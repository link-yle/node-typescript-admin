const addNewUser = require('../../../../src/data-layer/add-new-user.db')
const addRecord = require('../../../../src/data-layer/add-record.db')
const { connectToDb } = require('../../../helpers/requestsSpecHelper')

const faker = require('faker')


fdescribe("Users endpoint", function () {
    beforeAll(() => {
        connectToDb()
    })
    const payload = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        timeZones: [],
        password: '1234567a'
    }
    let id 
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            done()
        })
    })

    it("should add new record ", function (done) {
        const newRecord = {
            name: faker.address.city(),
            city: faker.address.city(),
            gmtTimeDifference: 8
        }
        addRecord(id, newRecord).then(x=>{
            expect(x.timeZones.length).toBe(1)
            expect(x.timeZones[0].city).toBe(newRecord.city)
            expect(x.timeZones[0].name).toBe(newRecord.name)
            expect(x.timeZones[0].gmtTimeDifference).toBe(newRecord.gmtTimeDifference)
            done()
        })
    })





})