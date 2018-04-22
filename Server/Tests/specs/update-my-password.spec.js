const { setup } = require('../helpers/requestsSpecHelper')
const faker = require('faker')


let server, request

describe("Users endpoint", function () {
    beforeAll(() => {
        [server, request] = setup()
    })
    afterAll(() => {
        server.close()
    })
    describe("Updating my password", function () {
        const newUser = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            timeZones: [],
            password: '1234567a'
        }
        const loginPayload = {  email: newUser.email,  password: newUser.password  }
        const updatePasswordPayload = {
            oldPassword: newUser.password,
            newPassword: '1234567b'
        }
        let token
        beforeAll((done) => {
            request.post('/users').send(newUser).end(() => {
                request.post('/users/login').send(loginPayload).end((err, res) => {
                    token = res.body.token
                    done();
                })
            })
        })



        it("should update password and be able to login afterwards", function (done) {
            request.put(`/password`)
                .set({ 'Authorization': `Bearer ${token}` })
                .send(updatePasswordPayload)
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    request.post('/users/login').send(loginPayload).end((err, res) => {
                        expect(res.status).toBe(401)
                        request.post('/users/login').send({ email: loginPayload.email, password: updatePasswordPayload.newPassword }).end((err, res) => {
                            expect(res.status).toBe(200)
                            done();
                        })
                    })
                })
        })

        it("should throw error in case old password provided is wrong", function (done) {
            request.put(`/password`)
                .set({ 'Authorization': `Bearer ${token}` })
                .send({
                    oldPassword: 'sddddddas',
                    newPassword: '1234567b'
                })
                .end((err, res) => {
                    expect(res.status).toBe(400)
                    done()
                })
        })




    })
})