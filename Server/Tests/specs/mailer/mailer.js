const nodemailer = require('nodemailer')
process.on('unhandledRejection', up => { throw up })

var mailConfig;
if (process.env.NODE_ENV === 'production') {
    // all emails are delivered to destination
    mailConfig = {
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'real.user',
            pass: 'verysecret'
        }
    };
} else {
    // all emails are catched by ethereal.email
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'haum5tiboxvxlxqz@ethereal.email',
            pass: 'wRFKsTeR35GJ4dBbet'
        }
    };
}
let transporter = nodemailer.createTransport(mailConfig);


transporter.sendMail({
    from: 'sender@server.com',
    to: 'sharief@aucegypt.edu',
    subject: 'Password Reset Code',
    text: 'Here is your password reset code: 1213521546',
    html: '<p>Here is your password reset code: 1213521546</p>'
}).then(info => {
    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
}).catch(err => { throw err })