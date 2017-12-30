const router = require('express').Router()


const addRecord = require('./records/add-record.route')
const removeRecord = require('./records/remove-record.route')
const updateRecord = require('./records/update-record.route')
const validateUpdateRecordPayload = require('./records/update-record.validate')
const validateAddRecordPayload = require('./records/add-record.validate')
const getUserDetailsIncludingRecords = require('./records/get-user-records.route')


const updateUserInfo = require('./user/update-user-info.route')
const removeUser = require('./user/remove-user.route')
const validateUpdateRolePayload = require('./user/update-role.validate')
const validateUpdateInfoPayload = require('./user/update-user-info.validate')
const updateUserRole = require('./user/update-role.route')
const getUsers = require('./user/get-users.route')


const signup = require('./security/signup.route')
const login = require('./security/login.route')
const updatePassword = require('./security/update-password.route')
const validateLoginPayload = require('./security/login.validate')
const validateSignupPayload = require('./security/signup.validate')
const validateUpdatePasswordPayload = require('./security/update-password.validate')
const validateSendMeRecoveryLinkPayload = require('./security/send-me-recovery-code.validate')
const sendMeRecoveryLink = require('./security/send-me-recovery-code.route')
const updatePasswordByRecoveryCode = require('./security/update-password-by-recovery-code.route')
const validateUpdatePasswordByRecoveryCodePayload = require('./security/update-password-by-recovery-code.validate')
const validateVerifyActivationCodePayload = require('./security/verify-activation-code.validate')
const verifyActivationCode = require('./security/verify-activation-code.route')
const verifyRecoveryCode = require('./security/verify-recovery-code.route')
const signupSecurely = require('./security/signup-secure.route')
const validateSignupSecurelyPayload = require('./security/signup-secure.validate')


const { verifyUser } = require('../core/authentication')
const Authorize = require('../core/authorization')

router.post('/users/', validateSignupPayload, signup)
router.post('/users/secure', validateSignupSecurelyPayload, signupSecurely)
router.get('/activation', validateVerifyActivationCodePayload, verifyActivationCode)


router.post('/users/login', validateLoginPayload, login)
router.post('/password_recovery_requests', validateSendMeRecoveryLinkPayload, sendMeRecoveryLink)
router.get('/password_recovery_requests', validateVerifyActivationCodePayload, verifyRecoveryCode)



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




module.exports = router