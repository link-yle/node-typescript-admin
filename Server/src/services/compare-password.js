const bcrypt = require('bcrypt')


const comparePassword = (toBeExaminedPassword, realPassword) => new Promise((res, rej) =>
    bcrypt.compare(toBeExaminedPassword, realPassword, (err, isMatch) => err ? rej(err) : res(isMatch)))


module.exports = { comparePassword }