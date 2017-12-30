const usersModel = require('../models/users.model')

module.exports = (_id) => {
    return usersModel.update({ _id }, { active: true })
}
