const router = require('express').Router()
const { signup, getUserDetails, getUsers, findUserAndUpdateRole, removeUser, findUserAndUpdateInfo, login } = require('../controllers/users.ctrl')
const { addTimeZone, removeTimeZone, updateTimeZone } = require('../controllers/timezones.ctrl')
const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')
const Validate = require('../core/input-validator')

router.post('/', Validate.SignupPayloadSchema, signup)
router.post('/login', Validate.LoginPayloadSchema, login)

router.put('/:id/info', verifyUser,  Authorize.allowSelfAdminAndManager,  Validate.InfoPayloadSchema, findUserAndUpdateInfo)
router.delete('/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetails)

router.post('/:id/timezones', verifyUser, Authorize.allowSelfAndAdminOnly, Validate.TimeZonePayloadSchema, addTimeZone)
router.delete('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeTimeZone)
router.put('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, Validate.TimeZonePayloadSchema, updateTimeZone)

router.patch('/:id/role', verifyUser, Authorize.allowAdminOnly, Validate.UpdateRolePayloadSchema, findUserAndUpdateRole)

module.exports = router