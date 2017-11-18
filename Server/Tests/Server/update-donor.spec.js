const { setup } = require('./helpers/requestsSpecHelper')
const faker = require('faker')


let server, request, socket_io, firstUser

describe("Users endpoint", function () {
    beforeAll(() => {
        [server, request] = setup()
    })
    afterAll(() => {
        server.close()
    })
    describe("Updating user", function () {
        const newUser = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            telephone: faker.phone.phoneNumber(),
            bloodGroup: "O",
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
            address: faker.address.streetAddress()
        }
        let id
        beforeAll((done) => {


            request.post('/users').send(newUser).end((err, res) => {
                id = res.body._id
                done()
            })
        })

        describe('Emitting updated event', () => {
            beforeAll(() => {

            })
        })
        it("should emit updated event", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: faker.phone.phoneNumber(),
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                global.io.emit('updated')
                firstUser.on('updated', payload => {
                    done()
                })

            })
        })


        it("should update successfully when changing telephone", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: faker.phone.phoneNumber(),
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.firstName).toBe(updatedUser.firstName)
                expect(res.body.lastName).toBe(updatedUser.lastName)
                expect(res.body.email).toBe(updatedUser.email)
                expect(res.body.telephone).toBe(updatedUser.telephone)
                expect(res.body.bloodGroup).toBe(updatedUser.bloodGroup)
                expect(parseInt(res.body.location.coordinates[0])).toEqual(parseInt(updatedUser.longitude))
                expect(parseInt(res.body.location.coordinates[1])).toEqual(parseInt(updatedUser.latitude))
                expect(res.body.address).toBe(updatedUser.address)
                done();
            })
        })
        it("should update successfully when changing item and adding ip", function (done) {
            const updatedUser = {
                firstName: faker.name.firstName(),
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                ip: '100.2.3',
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.firstName).toBe(updatedUser.firstName)
                expect(res.body.lastName).toBe(updatedUser.lastName)
                expect(res.body.email).toBe(updatedUser.email)
                expect(res.body.telephone).toBe(updatedUser.telephone)
                expect(res.body.bloodGroup).toBe(updatedUser.bloodGroup)
                expect(parseInt(res.body.location.coordinates[0])).toEqual(parseInt(updatedUser.longitude))
                expect(parseInt(res.body.location.coordinates[1])).toEqual(parseInt(updatedUser.latitude))
                expect(res.body.address).toBe(updatedUser.address)
                done();
            })
        })
        it("should update successfully when changing lastName", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: faker.name.lastName(),
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.firstName).toBe(updatedUser.firstName)
                expect(res.body.lastName).toBe(updatedUser.lastName)
                expect(res.body.email).toBe(updatedUser.email)
                expect(res.body.telephone).toBe(updatedUser.telephone)
                expect(res.body.bloodGroup).toBe(updatedUser.bloodGroup)
                expect(parseInt(res.body.location.coordinates[0])).toEqual(parseInt(updatedUser.longitude))
                expect(parseInt(res.body.location.coordinates[1])).toEqual(parseInt(updatedUser.latitude))
                expect(res.body.address).toBe(updatedUser.address)
                done();
            })
        })
        it("should update successfully when changing email", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: faker.internet.email(),
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.firstName).toBe(updatedUser.firstName)
                expect(res.body.lastName).toBe(updatedUser.lastName)
                expect(res.body.email).toBe(updatedUser.email)
                expect(res.body.telephone).toBe(updatedUser.telephone)
                expect(res.body.bloodGroup).toBe(updatedUser.bloodGroup)
                expect(parseInt(res.body.location.coordinates[0])).toEqual(parseInt(updatedUser.longitude))
                expect(parseInt(res.body.location.coordinates[1])).toEqual(parseInt(updatedUser.latitude))
                expect(res.body.address).toBe(updatedUser.address)
                done();
            })
        })
        it("should update successfully when changing bloodGroup", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "A",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.firstName).toBe(updatedUser.firstName)
                expect(res.body.lastName).toBe(updatedUser.lastName)
                expect(res.body.email).toBe(updatedUser.email)
                expect(res.body.telephone).toBe(updatedUser.telephone)
                expect(res.body.bloodGroup).toBe(updatedUser.bloodGroup)
                expect(parseInt(res.body.location.coordinates[0])).toEqual(parseInt(updatedUser.longitude))
                expect(parseInt(res.body.location.coordinates[1])).toEqual(parseInt(updatedUser.latitude))
                expect(res.body.address).toBe(updatedUser.address)
                done();
            })
        })
        it("should update successfully when changing address", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: 41.6400,
                address: faker.address.streetAddress(),
                _id: id
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.firstName).toBe(updatedUser.firstName)
                expect(res.body.lastName).toBe(updatedUser.lastName)
                expect(res.body.email).toBe(updatedUser.email)
                expect(res.body.telephone).toBe(updatedUser.telephone)
                expect(res.body.bloodGroup).toBe(updatedUser.bloodGroup)
                expect(parseInt(res.body.location.coordinates[0])).toEqual(parseInt(updatedUser.longitude))
                expect(parseInt(res.body.location.coordinates[1])).toEqual(parseInt(updatedUser.latitude))
                expect(res.body.address).toBe(updatedUser.address)
                done();
            })
        })

        it("should respond by error when no _id is provided", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toBe(400)
                done();
            })
        })
        it("should respond by error when no _id is provided and ip is provided", function (done) {
            const updatedUser = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                ip: '1.2.3'
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toBe(400)
                done();
            })
        })

        it("should respond by error when no required item is not provided", function (done) {
            const updatedUser = {
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toBe(400)
                done();
            })
        })

        it("should respond by error when no required item is not provided and ip is provided", function (done) {
            const updatedUser = {
                lastName: newUser.lastName,
                email: newUser.email,
                telephone: newUser.telephone,
                bloodGroup: "O",
                longitude: newUser.longitude,
                latitude: newUser.latitude,
                address: newUser.address,
                ip: '1.2.3'
            }
            request.put('/users').send(updatedUser).end((err, res) => {
                expect(res.status).toBe(400)
                done();
            })
        })

    })
})