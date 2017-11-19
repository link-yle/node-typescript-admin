const { getToken, verifyUser } = require('../../src/core/authentication')

class MockRequest {
    constructor(token) {
        this.decoded = {}
        this.headers = {
            authorization: `Bearer ${token}`
        }
        this.app = {
            get(x) {
                return 'secret'
            }
        }
    }
}

class MockResponse {
    status(num) {
        toBeSpied.notAuthorized()
        return this
    }
    json(str) {

    }
}

const toBeSpied = {
    notAuthorized() {
        return null
    },
    authorized() {
        return null
    }
}

const next = () => toBeSpied.authorized()


describe('Authentication', () => {

    it("should authenticate token successfully ", function () {
        const token = getToken('123', 'role', 'secret')
        const req = new MockRequest(token)
        const res = new MockResponse()
        const spyAuthorized = spyOn(toBeSpied, 'authorized')
        verifyUser(req, res, next)
        expect(spyAuthorized).toHaveBeenCalled()
    })


    it("should not authenticate token if secret is wrong ", function () {
        const token = getToken('123', 'role', 'wrongSecret')
        const req = new MockRequest(token)
        const res = new MockResponse()
        const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
        verifyUser(req, res, next)
        expect(spyNotAuthorized).toHaveBeenCalled()
    })

    it("should not authenticate token if token is wrong ", function () {
        const token = getToken('123', 'role', 'secret') + 'wrong'
        const req = new MockRequest(token)
        const res = new MockResponse()
        const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
        verifyUser(req, res, next)
        expect(spyNotAuthorized).toHaveBeenCalled()
    })

})

