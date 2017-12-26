const addNewUser = require('../../../src/data-layer/add-new-user.db')
const updatePassword = require('../../../src/data-layer/update-passwrd-by-user-id.db')
const { connectToDb } = require('../../helpers/requestsSpecHelper')

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
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            done()
        })
    })

    it("should update password ", async function (done) {
        const res = await updatePassword(id, payload.password, '1234567b')
        expect(res).toBeTruthy()
        done()
    })

    fit("should throw error in case of wrong id ", async function (done) {
        try{
            await updatePassword('wrong id', payload.password, '1234567b')
        }  catch(e) {
            global.log.error(e)
            
            done()
        }
    })

    it("should throw wrong password ", async function (done) {
        try{
            await updatePassword(id, 'wrong', '1234567b')
        }  catch(e) {
            global.log.error(e)
            done()
        }
    })





})