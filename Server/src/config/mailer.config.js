

module.exports = process.env.NODE_ENV === 'production' ?
    {
        service: 'Gmail',
        auth: {
            user: process.env.mailerUser,
            pass: process.env.mailerPass
        }
    } :
    {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ethrealUser,
            pass: process.env.ethrealPass,
        }
    }
