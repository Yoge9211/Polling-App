const mongoose = require('mongoose')

// Create the Option Schema
const optionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
    },
    link_to_vote: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Option', optionSchema)
