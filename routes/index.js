const express = require('express')

const router = express.Router()

router.use('/question', require('./questionRoutes'))
router.use('/options', require('./optionRoutes'))
console.log('Router loaded')
module.exports = router
