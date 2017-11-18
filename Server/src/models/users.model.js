const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const userSchema = require('./user.schema')
const { emailRegex, passwordRegex } = require('../config/regexConstants')

// email validation
userSchema.path('email').validate((email) =>
    emailRegex.test(email),
    'The email entered is invalid.')

// password validation
userSchema.path('password').validate(password => {
     return passwordRegex.test(password)
}, 'Password must be at least 6 characters and contain at least one letter and one number.');


userSchema.pre('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);