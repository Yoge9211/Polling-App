// IMPORT OPTION MODEL
const QuestionModel = require('../models/questions')

// IMPORT OPTION MODEL
const OptionModel = require('../models/options')

//  ADD VOTE CONTROLLER
module.exports.addVote = async (req, res) => {
  try {
    let id = req.params.id

    // check if the option exists for the question, add a new vote by incrementing 1
    await OptionModel.findByIdAndUpdate(id, { $inc: { votes: 1 } })

    return res.status(200).json({
      success: true,
      data: [],
      message: 'Voted Successfully!!',
    })
  } catch (error) {
    res.status(404).jjson({
      error: error.message,
      data: [],
      message: 'internal error while adding vote',
    })
  }
}

// DELETE OPTION CONTROLLER
module.exports.deleteOption = async (req, res) => {
  try {
    let id = req.params.id

    // Checking if option exists
    let option = await OptionModel.findById(id)

    // Checking if number of votes are > 0, if true an option will be deleted

    if (option.votes > 0) {
      return res.status(400).json({
        success: false,
        data: option,
        message: 'Option cannot be deleted, count of votes > 0!',
      })
    }

    // deleting option from question.options array first
    await QuestionModel.findByIdAndUpdate(option.question, {
      $pull: { options: id },
    })

    // Now deleting the option from the db
    await OptionModel.findByIdAndDelete(id)

    return res.status(200).json({
      success: true,
      data: [],
      message: 'Option Deleted Successfully!!',
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      data: [],
      message: 'Internal Server Error in deleting Option!',
    })
  }
}
