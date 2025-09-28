// src/controllers/quizController.js
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const mongoose = require('mongoose');
const scoreCalculator = require('../utils/scoreCalculator');

exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().select('_id title description').lean();
    res.json({ quizzes });
  } catch (err) {
    next(err);
  }
};

exports.getQuestionsForQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: 'Invalid quizId' });
    }

    const quizExists = await Quiz.exists({ _id: quizId });
    if (!quizExists) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Return only _id, text, options (hide correctIndex)
    const questions = await Question.find({ quizId })
      .select('_id text options')
      .lean();

    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

exports.submitAnswers = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: 'Invalid quizId' });
    }

    const quiz = await Quiz.findById(quizId).lean();
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid payload: answers must be an array' });
    }

    // Fetch all questions for this quiz including correctIndex
    const questions = await Question.find({ quizId }).lean();

    // If no questions found
    if (!questions.length) {
      return res.status(400).json({ error: 'No questions available for this quiz' });
    }

    // Use scoring util
    const result = scoreCalculator(questions, answers);

    // Return results (details include correctIndex so frontend can show correct/wrong)
    res.json({
      quizId,
      title: quiz.title,
      score: result.score,
      total: result.total,
      details: result.details
    });
  } catch (err) {
    next(err);
  }
};
