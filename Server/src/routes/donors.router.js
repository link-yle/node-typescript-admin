const router = require('express').Router()
const { addDonor, findDonorAndUpdate, removeDonor, getDonorInfoById} = require('../controllers/donors.ctrl')



router.get('/:id', getDonorInfoById)
router.post('/', addDonor)
router.put('/', findDonorAndUpdate)
router.delete('/:id', removeDonor)

module.exports = router