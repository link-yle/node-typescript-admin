const { setup } = require('../helpers/requestsSpecHelper')
let server, request
const { adminCredentials } = require('../constants/credentials')
describe("Users endpoint", function () {
	beforeAll(() => {
		[server, request] = setup()
	})
	afterAll(() => {
		server.close()
	})
	describe("Getting users", function () {
		let token
		beforeAll((done) => {
			request.post('/users/login').send(adminCredentials).end((err, res) => {
				token = res.body.token
				done()
			})
		})


		it("should get users successfully ", function (done) {
			request.get('/users/')
				.set({ 'Authorization': `Bearer ${token}` })
				.end((err, res) => {
					expect(res.status).toEqual(200)
					expect(Array.isArray(res.body)).toBe(true)
					expect(Array.isArray(res.body.timeZones)).toBe(false)
					done();
				})
		})


		it("should get userDetials successfully as admin", function (done) {
			request.get('/users/')
				.set({ 'Authorization': `Bearer ${token}` })
				.end((err, res) => {
					expect(res.status).toEqual(200)
					expect(Array.isArray(res.body)).toBe(true)
					request.get(`/users/${res.body[0]._id}`)
						.set({ 'Authorization': `Bearer ${token}` })
						.end((err, res) => {
							expect(res.status).toBe(200)
							done();
						})
				})
		})


	})
})