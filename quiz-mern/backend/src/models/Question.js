// src/models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
  text: { type: String, required: true },
  options: {
    type: [{ type: String }],
    required: true,
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length >= 2,
      message: 'There must be at least two options'
    }
  },
  correctIndex: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Question', questionSchema);
