const { authorize } = require('../../src/core/authorization')
const { admin, manager, regular } = require('../../src/config/rolesConstants')


describe("Acting as same user", function () {

    class MockRequest {
        constructor(paramsId, decodedId, role) {
            this.params = { id: paramsId }
            this.decoded = { _id: decodedId, role: role }
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


    describe('allowed admin only', () => {
        const fn = authorize([admin], { selfAuthorized: false })
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', admin)
            fn(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize manager ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


        it("should not authorize self ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })

        it("should not authorize other user ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })



    describe('allowed admin and self only', () => {
        const fn = authorize([admin], { selfAuthorized: true })
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            fn(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize manager ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


        it("should authorize self ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            fn(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize other user ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })


    describe('allowed manager and admin', () => {
        const fn = authorize([admin, manager], { selfAuthorized: false })
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            fn(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should authorize manager ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            fn(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })


        it("should not authorize self ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })

        it("should not authorize other user ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            fn(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })









})

