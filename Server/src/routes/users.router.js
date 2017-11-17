const router = require('express').Router()
const { signup, getUser, getUsers, findUserAndUpdateRole, removeUser, findUserAndUpdateInfo, login } = require('../controllers/users.ctrl')
const { addTimeZone, removeTimeZone, updateTimeZone } = require('../controllers/timezones.ctrl')
const { verifyUser } = require('../modules/authentication')
const { authorize } = require('../modules/autherization')
const ROLES = require('../config/rolesConstants')

router.post('/', signup)
router.post('/login', login)

router.patch('/:id/info', verifyUser, authorize([ROLES.manager, ROLES.admin], { selfAuthorized: true }), findUserAndUpdateInfo)
router.delete('/:id', verifyUser, authorize([ROLES.admin, ROLES.manager], { selfAuthorized: false }), removeUser)
router.get('/:id', verifyUser, authorize([ROLES.admin, ROLES.manager], { selfAuthorized: false }), getUser)
router.get('/', verifyUser, authorize([ROLES.admin, ROLES.manager], { selfAuthorized: false }), getUsers)

router.post('/:id/timezones', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), addTimeZone)
router.delete('/:id/timezones', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), removeTimeZone)
router.put('/:id/timezones', verifyUser, authorize([ROLES.admin], { selfAuthorized: true }), updateTimeZone)

router.patch('/:id/roles', verifyUser, authorize([ROLES.admin], { selfAuthorized: false }), findUserAndUpdateRole)

module.exports = router