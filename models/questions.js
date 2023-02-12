const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
  },
  {
    timestamps: true,
  },
)
module.exports = mongoose.model('Question', questionSchema)
