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



function sendActivationLink(recepient, link) {
    return transporter.sendMail({
        from: senderEmail,
        to: recepient,
        subject: 'Activation',
        text: `Here is your Activation: ${link}`,
        html: `<p>Here is your Activation: ${link}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })
}

module.exports  = { sendEmailWithCode, sendActivationLink }