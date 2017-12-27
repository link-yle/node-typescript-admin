const mailer = require('../../../src/services/mailer')






describe('allowed admin only', () => {
    it("should authorize admin successfully ", function (done) {
        mailer.sendEmailWithCode('sharief@aucegypt.edu', 123456).then(()=>{
            done()
        })
    })
})