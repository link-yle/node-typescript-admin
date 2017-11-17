const { setup } = require('./helpers/requestsSpecHelper')
const faker = require('faker')
let server, request

describe("Users endpoint", function () {
	beforeAll(() => {
		[server, request] = setup()

	})
	afterAll(() => {
        server.close()
	})
	describe("Deleting user", function () {
		const newUser = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			timeZones:[],
			password: '456565654ds'
		}
		let id
		beforeEach((done)=>{
			request.post('/users').send(newUser).end((err, res) => {
				id=res.body._id
				done()
			})
		})

		it("should delete successfully ", function (done) {
			request.delete('/users/'+ id).end((err, res) => {
                expect(res.status).toEqual(200)
				done();
			})
        })
        it("should respond by 404 error when id is not provided ", function (done) {
			request.delete('/users/').end((err, res) => {
                expect(res.status).toEqual(404)
				done();
			})
        })
        it("should respond by error when id is wrong ", function (done) {
			request.delete('/users/'+ 53).end((err, res) => {
                expect(res.status).toEqual(400)
				done();
			})
        })
    })
})