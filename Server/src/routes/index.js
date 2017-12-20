const router = require('express').Router()
const updateUserInfo = require('./update-user-info.route')
const removeUser = require('./remove-user.route')
const getUsers = require('./get-users.route')
const getUserDetailsIncludingRecords = require('./get-user-records.route')
const signup = require('./signup.route')
const login = require('./login.route')
const addRecord = require('./add-record.route')
const removeRecord = require('./remove-record.route')
const updateRecord = require('./update-record.route')
const updatePassword = require('./update-password.route')
const updateUserRole = require('./update-role.route')

const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')

router.post('/', signup)
router.post('/login', login)

router.put('/:id/info', verifyUser,  Authorize.allowSelfAdminAndManager,   updateUserInfo)
router.delete('/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetailsIncludingRecords)

router.post('/:id/timezones', verifyUser, Authorize.allowSelfAndAdminOnly, addRecord)
router.delete('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeRecord)
router.put('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, updateRecord)

router.put('/:id/password', verifyUser, Authorize.allowSelfAndAdminOnly, updatePassword)

router.patch('/:id/role', verifyUser, Authorize.allowAdminOnly, updateUserRole)

module.exports = router