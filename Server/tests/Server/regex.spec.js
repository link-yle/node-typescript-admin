const { emailRegex, passwordRegex } = require('../../src/config/regexConstants')

describe("Regex", function () {
	describe("Password", function () {
		it("should accept password ", function () {
			expect(passwordRegex.test("12345656r")).toBe(true)
        })
        it("should accept special characters ", function () {
			expect(passwordRegex.test("12345656Rr$$")).toBe(true)
        })
        it("should accept Capital letters characters ", function () {
			expect(passwordRegex.test("1234565R")).toBe(true)
        })
        it("should not accept only number passwords passwords ", function () {
			expect(passwordRegex.test("123456789")).toBe(false)
        })
        it("should not accept small passwords ", function () {
			expect(passwordRegex.test("re")).toBe(false)
        })
        it("should not accept only letters passwords ", function () {
			expect(passwordRegex.test("hfgslrufds")).toBe(false)
        })
    })

    describe("Email", function () {
		it("should accept email ", function () {
			expect(emailRegex.test("test@test.com")).toBe(true)
        })
        it("should not accept if no @ is present ", function () {
			expect(emailRegex.test("testEmail")).toBe(false)
        })
        it("should not accept small emails ", function () {
			expect(emailRegex.test("r@")).toBe(false)
        })
    })
})