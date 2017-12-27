const nodemailer = require('nodemailer')
const envDpendendentMailConfig = require('../config/mailer.config')
const senderEmail = envDpendendentMailConfig.auth.user
const transporter = nodemailer.createTransport(envDpendendentMailConfig);



function sendEmailWithCode(recepient, code) {
    return transporter.sendMail({
        from: senderEmail,
        to: recepient,
        subject: 'Password Reset Code',
        text: `Here is your password reset code: ${code}`,
        html: `<p>Here is your password reset code: ${code}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })
}



function sendActivationCode(recepient, code) {
    return transporter.sendMail({
        from: senderEmail,
        to: recepient,
        subject: 'Activation Code',
        text: `Here is your Activation Code : ${code}`,
        html: `<p>Here is your Activation Code : ${code}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })
}

module.exports  = { sendEmailWithCode, sendActivationCode }