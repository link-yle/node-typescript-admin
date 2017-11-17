
function authorize(roles, options) {
    return function (req, res, next) {
        const role = req.decoded.role
        const isTheSameUser = () => req.decoded._id === req.params.id        
        if ((options.selfAllowed && isTheSameUser()) || roles.find((item => item === role))) {
            next()
        }
        return res.status(401).send('Not Authorized.');
    }
}

module.exports = { authorize }

// function allowOnlyAdmin(req, res, next) {
//     if (admin(req)) {
//         next()
//     }
//     else return res.status(401).send('Not Authorized.');
// }

// function allowManagerAndAdmin(req, res, next) {
//     if (manager(req) || admin(req)) {
//         next()
//     }
//     else return res.status(401).send('Not Authorized.');
// }

// function allowSelfAndManagerAndAdmin(req, res, next) {
//     if (req.decoded.role === ROLES.manager || req.decoded.role === ROLES.admin || self(req)) {
//         next()
//     }
//     else return res.status(401).send('Not Authorized.');
// }

// function allowSelfAndAdmin(req, res, next) {
//     if (req.decoded.role === ROLES.admin || self()) {
//         next()
//     }
//     else return res.status(401).send('Not Authorized.');
// }

