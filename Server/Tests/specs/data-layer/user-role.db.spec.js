const addNewUser = require('../../../src/data-layer/add-new-user.db')
const updateUserRole = require('../../../src/data-layer/update-role.db')
const getUserRoleById = require('../../../src/data-layer/get-user-role-by-id')
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

 

    it("should Update and get user role ", function (done) {
        const newRole =  'manager'
        updateUserRole(id, newRole ).then(x=>{
            expect(x).toBeTruthy()
            getUserRoleById(id).then(x=>{
                expect(x).toBe(newRole)
                done()
            })
            
        })
    })





})