const router = require('express').Router()


const addRecord = require('./records/add-record.route')
const removeRecord = require('./records/remove-record.route')
const updateRecord = require('./records/update-record.route')
const validateUpdateRecord = require('./records/update-record.validate')
const validateAddRecord = require('./records/add-record.validate')
const getUserDetailsIncludingRecords = require('./records/get-user-records.route')


const updateUserInfo = require('./user/update-user-info.route')
const removeUser = require('./user/remove-user.route')
const validateUpdateRole = require('./user/update-role.validate')
const validateUpdateInfo = require('./user/update-user-info.validate')
const updateUserRole = require('./user/update-role.route')
const getUsers = require('./user/get-users.route')


const signup = require('./security/signup.route')
const login = require('./security/login.route')
const updateMyPassword = require('./security/update-my-password.route')
const validateLogin = require('./security/login.validate')
const validateSignup = require('./security/signup.validate')
const validateUpdateMyPassword = require('./security/update-my-password.validate')
const validateSendMeRecoveryCode = require('./security/send-me-recovery-code.validate')
const sendMeRecoveryCode = require('./security/send-me-recovery-code.route')
const updatePasswordByRecoveryCode = require('./security/update-password-by-recovery-code.route')
const validateUpdatePasswordByRecoveryCode = require('./security/update-password-by-recovery-code.validate')
const validateVerifyActivationCode = require('./security/verify-activation-code.validate')
const verifyActivationCode = require('./security/verify-activation-code.route')
const verifyRecoveryCode = require('./security/verify-recovery-code.route')
const signupSecurely = require('./security/signup-secure.route')
const activateUserAdministratively = require('./security/activate-user-administratively.route')
const changeOtherUserPassword = require('./security/change-other-user-password.route')
const validatechangeOtherUserPassword = require('./security/change-other-user-password.validate')


const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')

router.post('/users/', validateSignup, signup)
router.post('/users/secure', validateSignup, signupSecurely)
router.post('/activation', validateVerifyActivationCode, verifyActivationCode)

router.patch('/activation/administration/:id', verifyUser, Authorize.allowAdminAndManager, activateUserAdministratively)

router.post('/users/login', validateLogin, login)
router.post('/password_recovery_requests', validateSendMeRecoveryCode, sendMeRecoveryCode)
router.get('/password_recovery_requests', validateVerifyActivationCode, verifyRecoveryCode)
router.put('/password', verifyUser, validateUpdateMyPassword, updateMyPassword)
router.put('/users/:id/password', verifyUser, validatechangeOtherUserPassword, Authorize.allowAdminAndManager,  changeOtherUserPassword)



router.post('/users/recovery_code', validateUpdatePasswordByRecoveryCode, updatePasswordByRecoveryCode)

router.put('/users/:id/info', verifyUser, validateUpdateInfo, Authorize.allowSelfAdminAndManager, updateUserInfo)
router.delete('/users/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/users/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/users/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetailsIncludingRecords)

router.post('/users/:id/timezones', verifyUser, validateAddRecord, Authorize.allowSelfAndAdminOnly, addRecord)
router.delete('/users/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeRecord)
router.put('/users/:id/timezones/:timeZoneId', verifyUser, validateUpdateRecord, Authorize.allowSelfAndAdminOnly, updateRecord)

router.patch('/users/:id/role', verifyUser, validateUpdateRole, Authorize.allowAdminOnly, updateUserRole)





module.exports = router