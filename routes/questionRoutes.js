const express = require('express')
const QuestionController = require('../controllers/QuestionController')

const router = express.Router()

router.post('/create', QuestionController.createQuestion)
router.post('/:id/options/create', QuestionController.createOption)
router.delete('/:id/delete', QuestionController.deleteQuestion)
router.get('/:id', QuestionController.viewQuestion)
module.exports = router
