const express = require('express')
const OptionController = require('../controllers/OptionController')

const router = express.Router()
router.post('/:id/addVote', OptionController.addVote)
router.delete('/:id/delete', OptionController.deleteOption)
module.exports = router
