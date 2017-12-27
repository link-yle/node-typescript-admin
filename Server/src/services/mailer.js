const nodemailer = require('nodemailer')
const envDpendendentMailConfig = require('../config/mailer.config')

function sendEmailWithCode(recepient, code) {
    let transporter = nodemailer.createTransport(envDpendendentMailConfig);
    return transporter.sendMail({
        from: envDpendendentMailConfig.auth.user,
        to: recepient,
        subject: 'Password Reset Code',
        text: `Here is your password reset code: ${code}`,
        html: `<p>Here is your password reset code: ${code}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })

}


module.exports  = { sendEmailWithCode }