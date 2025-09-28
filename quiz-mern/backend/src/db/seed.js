// src/db/seed.js
require('dotenv').config();
const connectDB = require('../config/db');
const Quiz = require('../models/quiz');
const Question = require('../models/Question');

const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data (safe for assignment)
    await Question.deleteMany({});
    await Quiz.deleteMany({});

    // Create quiz
    const quiz = await Quiz.create({
      title: 'General Knowledge - Sample',
      description: 'A 5-question sample quiz for the assignment'
    });

    const questions = [
      {
        quizId: quiz._id,
        text: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctIndex: 2
      },
      {
        quizId: quiz._id,
        text: 'Which language runs in a browser?',
        options: ['Python', 'C++', 'JavaScript', 'Java'],
        correctIndex: 2
      },
      {
        quizId: quiz._id,
        text: '2 + 2 equals?',
        options: ['3', '4', '22', '5'],
        correctIndex: 1
      },
      {
        quizId: quiz._id,
        text: 'HTML stands for?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'Hyperlinks Text Mark Language',
          'Home Tool Markup Language'
        ],
        correctIndex: 0
      },
      {
        quizId: quiz._id,
        text: 'Which of these is NOT a JavaScript data type?',
        options: ['Undefined', 'Number', 'Float', 'Boolean'],
        correctIndex: 2
      }
    ];

    await Question.insertMany(questions);

    console.log('✅ Seed complete');
    console.log('Quiz ID:', quiz._id.toString());
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
