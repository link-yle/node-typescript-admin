const router = require('express').Router()
const { signup, getUserDetails, getUsers, findUserAndUpdateRole, removeUser, findUserAndUpdateInfo, login } = require('../controllers/users.ctrl')
const { addTimeZone, removeTimeZone, updateTimeZone } = require('../controllers/timezones.ctrl')
const { verifyUser } = require('../core/authentication')
const { authorize } = require('../core/authorization')
const Validate = require('../core/validator')
const ROLES = require('../config/rolesConstants')

router.post('/', Validate.attachSignupPayloadSchema, Validate.validateSchema, signup)
router.post('/login', Validate.attachLoginPayloadSchema, Validate.validateSchema, login)

router.put('/:id/info', verifyUser,  authorize([ROLES.manager, ROLES.admin], { selfAuthorized: true }), Validate.attachInfoPayloadSchema, Validate.validateSchema, findUserAndUpdateInfo)
router.delete('/:id', verifyUser, authorize([ROLES.admin, ROLES.manager], { selfAuthorized: false }), removeUser)
router.get('/', verifyUser, authorize([ROLES.admin, ROLES.manager], { selfAuthorized: false }), getUsers)
router.get('/:id', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), getUserDetails)

router.post('/:id/timezones', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), Validate.attachTimeZonePayloadSchema, Validate.validateSchema, addTimeZone)
router.delete('/:id/timezones/:timeZoneId', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), removeTimeZone)
router.put('/:id/timezones/:timeZoneId', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), Validate.attachTimeZonePayloadSchema, Validate.validateSchema, updateTimeZone)

router.patch('/:id/role', verifyUser, authorize([ROLES.admin], { selfAuthorized: false }), Validate.attachUpdateRolePayloadSchema, Validate.validateSchema, findUserAndUpdateRole)

module.exports = router