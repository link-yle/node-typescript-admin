const addNewUser = require('../../../../src/data-layer/add-new-user.db')
const addRecord = require('../../../../src/data-layer/add-record.db')
const { connectToDb } = require('../../../helpers/requestsSpecHelper')
const getUserRecordsById = require('../../../../src/data-layer/get-user-records-by-id.db')
const updateRecord = require('../../../../src/data-layer/update-record.db')
const faker = require('faker')


describe("Users endpoint", function () {
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
    let timeZoneId
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            const newRecord = {
                name: faker.address.city(),
                city: faker.address.city(),
                gmtTimeDifference: 8
            }
            addRecord(id, newRecord).then(x => {
                expect(x.timeZones.length).toBe(1)
                expect(x.timeZones[0].city).toBe(newRecord.city)
                expect(x.timeZones[0].name).toBe(newRecord.name)
                expect(x.timeZones[0].gmtTimeDifference).toBe(newRecord.gmtTimeDifference)
                timeZoneId = x._id
                done()
            })
        })
    })

    it("should update record ", async function (done) {      
        const updatedRecord = {
            name: faker.address.city(),
            city: faker.address.city(),
            gmtTimeDifference: 5
        }
         updateRecord(id, timeZoneId, updatedRecord).then(x=>{
            global.log.error(x)
            done()
            
        })
        
        const u = await getUserRecordsById(id)
        global.log.error(u)
        
            
        // expect(updated.timeZones[0].gmtTimeDifference).toBe(5)
        // expect(updated.timeZones[0].name).toBe(updatedRecord.name)
        // expect(updated.timeZones[0].city).toBe(updatedRecord.city)
        
    })





})