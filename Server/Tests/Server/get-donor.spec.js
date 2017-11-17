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
	describe("Getting user", function () {
		const newUser = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			timeZones:[],
			password: '456565654ds'
		}
		let id
		beforeAll((done)=>{
			request.post('/users').send(newUser).end((err, res) => {
				id=res.body._id
				done()
			})
		})

		it("should get user successfully ", function (done) {
			request.get('/users/').end((err, res) => {
                expect(res.status).toEqual(200)
                expect(res.body.length).toBeTruthy()
				done();
			})
        })
    })
})