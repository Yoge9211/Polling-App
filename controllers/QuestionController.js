// IMPORT OPTION MODEL
const QuestionModel = require('../models/questions')

// IMPORT OPTION MODEL
const OptionModel = require('../models/options')

// CREATE QUESTION CONTROLLER
module.exports.createQuestion = async (req, res) => {
  try {
    const requestData = req.body
    console.log(requestData)
    const findQuestion = await QuestionModel.findOne({
      id: requestData.id,
    })
    if (findQuestion) {
      return res.status(200).json({
        success: false,
        data: findQuestion,
        message: 'Change Question Number',
      })
    }
    const question = await QuestionModel.create(requestData)
    question.save()
    if (question) {
      return res.status(201).json({
        success: true,
        data: question,
        message: 'Question created successfully',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: error.message,
      data: [],
      message: 'internal server error',
    })
  }
}

// DELETE QUESTION CONTROLLER
module.exports.deleteQuestion = async (req, res) => {
  try {
    let id = req.params.id

    let question = await QuestionModel.findById(id).populate({
      path: 'options',
      select: 'votes',
    })

    if (question) {
      // checking if any option has some votes already
      let options = question.options

      for (let i = 0; i < options.length; i++) {
        if (options[i].votes > 0) {
          return res.status(404).json({
            message:
              "Question cannot be deleted, it's options are voted already !",
          })
        }
      }

      // if no any votes on any option of question
      await OptionModel.deleteMany({ question: id })
      await QuestionModel.findByIdAndDelete(id)

      return res.status(200).json({
        message: 'Question deleted Successfully!!',
      })
    } else {
      return res.status(404).json({
        message: 'Question not found!',
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      data: [],
      message: 'Internal Server Error While deleting an Question',
    })
  }
}

// CREATE OPTIONSS CONTROLLER
module.exports.createOption = async (req, res) => {
  try {
    let question = await QuestionModel.findById(req.params.id)
    if (question) {
      const id = question.options.length + 1

      let option = await OptionModel.create({
        id: id,
        question: req.params.id,
        text: req.body.text,
        votes: 0,
      })

      option.link_to_vote =
        'http://localhost:3300/options/' + option._id + '/addVote'

      option.save()

      question.options.push(option)
      question.save()

      return res.status(200).json({
        option,
        message: 'New Option Created Successfully!!',
      })
    }
    return res.status(200).json({
      success: true,
      data: [],
      message: 'No question exist with this id',
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      data: [],
      message: 'Internal Server Error While Creating an Option!',
    })
  }
}

// VIEW QUESTION CONTROLLER
module.exports.viewQuestion = async (req, res) => {
  try {
    let questionFind = await QuestionModel.findById(req.params.id).populate(
      'options',
    )

    if (questionFind) {
      return res.status(200).json({
        success: true,
        data: questionFind,
        message: 'Question displayed successfully!!',
      })
    }
  } catch (err) {
    console.log('Error while Viewing Questions', err)
    return res.status(500).json({
      error: err.message,
      data: [],
      message: 'Internal Server Error while viewing Question!',
    })
  }
}
