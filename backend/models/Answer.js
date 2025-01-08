const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId, // Reference to the Question model
      answer: String, // The user's answer
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now, // Automatically track submission time
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
