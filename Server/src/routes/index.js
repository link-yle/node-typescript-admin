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
const validateSendMeRecoveryCodePayload = require('./send-me-recovery-code.validate')
const sendMeRecoveryCode = require('./send-me-recovery-code.route')
const updatePasswordByRecoveryCode = require('./update-password-by-recovery-code.route')
const validateUpdatePasswordByRecoveryCodePayload = require('./update-password-by-recovery-code.validate')
const validateVerifyActivationCodePayload = require('./verify-activation-code.validate')
const verifyActivationCode = require('./verify-activation-code')
const signupSecurely = require('./signup-secure')
const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')

router.post('/users/', validateSignupPayload, signup)
router.post('/users/secure', validateSignupPayload, signupSecurely)
router.post('/users/login', validateLoginPayload, login)
router.get('/activation', validateVerifyActivationCodePayload, verifyActivationCode)

router.get('/users/recovery_code/:email', validateSendMeRecoveryCodePayload, sendMeRecoveryCode)
router.post('/users/recovery_code', validateUpdatePasswordByRecoveryCodePayload, updatePasswordByRecoveryCode)

router.put('/users/:id/info', verifyUser, validateUpdateInfoPayload, Authorize.allowSelfAdminAndManager, updateUserInfo)
router.delete('/users/:id', verifyUser, Authorize.allowAdminAndManager, removeUser)
router.get('/users/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/users/:id', verifyUser, Authorize.allowSelfAndAdminOnly, getUserDetailsIncludingRecords)

router.post('/users/:id/timezones', verifyUser, validateAddRecordPayload, Authorize.allowSelfAndAdminOnly, addRecord)
router.delete('/users/:id/timezones/:timeZoneId', verifyUser, Authorize.allowSelfAndAdminOnly, removeRecord)
router.put('/users/:id/timezones/:timeZoneId', verifyUser, validateUpdateRecordPayload, Authorize.allowSelfAndAdminOnly, updateRecord)
router.put('/users/:id/password', verifyUser, validateUpdatePasswordPayload, Authorize.allowSelfAdminAndManager, updatePassword)
router.patch('/users/:id/role', verifyUser, validateUpdateRolePayload, Authorize.allowAdminOnly, updateUserRole)




// link="http://"+req.get('host')+"/verify?id="+rand;

// router.post()


module.exports = router