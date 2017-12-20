const router = require('express').Router()
const { signup, getUserDetails, getUsers, findUserAndUpdateRole, removeUser, findUserAndUpdateInfo, login, updateMyPassword } = require('../controllers/users.ctrl')
const { addTimeZone, removeTimeZone, updateTimeZone } = require('../controllers/timezones.ctrl')
const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')

router.post('/', signup)
router.post('/login', login)

router.put('/:id/info', verifyUser,  Authorize.allowSelfAdminAndManager,   findUserAndUpdateInfo)
router.delete('/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetails)

router.post('/:id/timezones', verifyUser, Authorize.allowSelfAndAdminOnly, addTimeZone)
router.delete('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeTimeZone)
router.put('/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, updateTimeZone)

router.put('/:id/password', verifyUser, Authorize.allowSelfAndAdminOnly, updateMyPassword)

router.patch('/:id/role', verifyUser, Authorize.allowAdminOnly, findUserAndUpdateRole)

module.exports = router