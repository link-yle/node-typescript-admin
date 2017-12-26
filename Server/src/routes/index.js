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
const validateLoginPayload = require('./login.validate')
const validateSignupPayload = require('./signup.validate')
const validateUpdatePasswordPayload = require('./update-password.validate')
const validateUpdateRolePayload = require('./update-role.validate')
const validateUpdateInfoPayload = require('./update-user-info.validate')
const validateUpdateRecordPayload = require('./update-record.validate')
const validateAddRecordPayload = require('./add-record.validate')

const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')

router.post('/', validateSignupPayload, signup)
router.post('/login', validateLoginPayload,  login)

router.put('/:id/info', verifyUser,  validateUpdateInfoPayload, Authorize.allowSelfAdminAndManager,   updateUserInfo)
router.delete('/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetailsIncludingRecords)

router.post('/:id/timezones', verifyUser, validateAddRecordPayload, Authorize.allowSelfAndAdminOnly, addRecord)
router.delete('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeRecord)
router.put('/:id/timezones/:timeZoneId', verifyUser, validateUpdateRecordPayload,  Authorize.allowSelfAndAdminOnly, updateRecord)

router.put('/:id/password', verifyUser, validateUpdatePasswordPayload, Authorize.allowSelfAndAdminOnly, updatePassword)

router.patch('/:id/role', verifyUser, validateUpdateRolePayload, Authorize.allowAdminOnly, updateUserRole)

module.exports = router