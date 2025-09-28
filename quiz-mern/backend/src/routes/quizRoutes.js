// src/routes/quizRoutes.js
const express = require('express');
const { param, body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const {
  getQuizzes,
  getQuestionsForQuiz,
  submitAnswers
} = require('../controllers/quizController');

const router = express.Router();

// GET /api/quizzes
router.get('/', getQuizzes);

// GET /api/quizzes/:quizId/questions
router.get(
  '/:quizId/questions',
  param('quizId').isMongoId().withMessage('Invalid quizId'),
  validateRequest,
  getQuestionsForQuiz
);

// POST /api/quizzes/:quizId/submit
router.post(
  '/:quizId/submit',
  param('quizId').isMongoId().withMessage('Invalid quizId'),
  body('answers').isArray().withMessage('answers must be an array'),
  body('answers.*.questionId').isMongoId().withMessage('questionId must be a valid id'),
  body('answers.*.selectedIndex')
    .isInt({ min: 0 })
    .withMessage('selectedIndex must be an integer (0-based)'),
  validateRequest,
  submitAnswers
);

module.exports = router;
