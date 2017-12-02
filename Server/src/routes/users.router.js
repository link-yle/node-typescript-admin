const router = require('express').Router()
const { signup, getUserDetails, getUsers, findUserAndUpdateRole, removeUser, findUserAndUpdateInfo, login } = require('../controllers/users.ctrl')
const { addTimeZone, removeTimeZone, updateTimeZone } = require('../controllers/timezones.ctrl')
const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')
const Validate = require('../core/input-validator')

router.post('/', Validate.attachSignupPayloadSchema, Validate.validateSchema, signup)
router.post('/login', Validate.attachLoginPayloadSchema, Validate.validateSchema, login)

router.put('/:id/info', verifyUser,  Authorize.allowSelfAdminAndManager,  Validate.attachInfoPayloadSchema, Validate.validateSchema, findUserAndUpdateInfo)
router.delete('/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetails)

router.post('/:id/timezones', verifyUser, Authorize.allowSelfAndAdminOnly, Validate.attachTimeZonePayloadSchema, Validate.validateSchema, addTimeZone)
router.delete('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeTimeZone)
router.put('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, Validate.attachTimeZonePayloadSchema, Validate.validateSchema, updateTimeZone)

router.patch('/:id/role', verifyUser, Authorize.allowAdminOnly, Validate.attachUpdateRolePayloadSchema, Validate.validateSchema, findUserAndUpdateRole)

module.exports = router