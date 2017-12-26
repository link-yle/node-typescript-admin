const { allowAdminAndManager, allowAdminOnly, allowSelfAdminAndManager, allowSelfAndAdminOnly, preventRegularUsers } = require('../../../src/core/authorization')
const { admin, manager, regular } = require('../../../src/config/rolesConstants')
const proxyquire = require('proxyquire')

describe("Auth", function () {

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
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', admin)
            allowAdminOnly(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize manager ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            allowAdminOnly(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


        it("should not authorize self ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            allowAdminOnly(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })

        it("should not authorize other user ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            allowAdminOnly(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })



    describe('allowed admin and self only', () => {
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            allowSelfAndAdminOnly(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize manager ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            allowSelfAndAdminOnly(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


        it("should authorize self ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            allowSelfAndAdminOnly(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize other user ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            allowSelfAndAdminOnly(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })


    describe('allowed manager and admin', () => {
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            allowAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should authorize manager ", async function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(regular)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })


        it("should not authorize self ", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(regular)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })

        it("should not authorize other user ", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(regular)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })

        it("manager should not lookup managers ", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', manager)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(manager)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


        it("manager should not lookup admins ", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', manager)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(admin)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })










    describe('allowed manager and admin', () => {
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            allowSelfAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should authorize manager to lookup regular users", async function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(regular)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize manager to lookup other managers", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(manager)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


        it("should not authorize manager to lookup other admins", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(admin)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })

        it("should authorize admin to lookup any user", async function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)

            let dbStub = { getUserRole: id => new Promise((res, rej) => res(regular)) }
            let auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()

            dbStub = { getUserRole: id => new Promise((res, rej) => res(manager)) }
            auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalledTimes(2)

            dbStub = { getUserRole: id => new Promise((res, rej) => res(admin)) }
            auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyAuthorized).toHaveBeenCalledTimes(3)
        })

        it("should not authorize self ", async function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            const dbStub = { getUserRole: id => new Promise((res, rej) => res(regular)) }
            const auth = proxyquire('../../src/core/authorization', { '../data-layer/db.ctrl': dbStub });
            await auth.allowAdminAndManager(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })
    })





    describe('prevent regular users', () => {
        it("should authorize admin successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            preventRegularUsers(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should authorize manager successfully ", function () {
            const spyAuthorized = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            preventRegularUsers(req, res, next)
            expect(spyAuthorized).toHaveBeenCalled()
        })

        it("should not authorize regular users ", function () {
            const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', regular)
            preventRegularUsers(req, res, next)
            expect(spyNotAuthorized).toHaveBeenCalled()
        })


    })



})

