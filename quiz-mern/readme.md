📘 Online Quiz Application (MERN)
1. Project Overview

The Online Quiz Application is a full-stack MERN project that allows users to take a quiz, navigate between questions, submit their answers, and view their score at the end.

✨ Core Features

Quiz flow: start → answer questions → submit → see score.

Backend (Express + MongoDB)

Stores quiz data (questions, options, correct answers).

API to fetch quiz questions (without answers).

API to submit answers, calculate score, and return results.

Frontend (React + Vite)

Start page, quiz page, and results page.

Navigation (Next/Previous), Submit button.

Accessible UI with ARIA labels and keyboard navigation.

Bonus Features

Timer with auto-submit.

Results page highlights correct and incorrect answers.

Simple backend unit tests for scoring logic.

2. Tech Stack

Frontend: React (Vite), CSS modules

Backend: Node.js, Express

Database: MongoDB (Mongoose ODM)

Testing: Jest (backend scoring logic)

3. Setup & Run Instructions
Prerequisites

Node.js (>= 18)

npm or yarn

MongoDB (local or Atlas)

Step 1: Clone repo
git clone https://github.com/<your-username>/quiz-mern.git
cd quiz-mern

Step 2: Backend setup
cd backend
cp .env.example .env
# edit .env with your Mongo URI (default: mongodb://localhost:27017/quizdb)
npm install
npm run seed    # populate quiz + sample questions
npm run dev     # start server (http://localhost:5000)

Step 3: Frontend setup
cd ../frontend
cp .env.example .env   # optional (VITE_API_BASE=http://localhost:5000/api)
npm install
npm run dev            # start frontend (http://localhost:5173)

Step 4: Open app

Frontend will be available at:
👉 http://localhost:5173

4. Running Tests

We use Jest for backend scoring logic.

cd backend
npm test


This runs unit tests for:

Correct/incorrect scoring

Partial/mixed answers

5. Assumptions & Design Choices

Quiz model: currently supports a single quiz with multiple questions. Extension to multiple quizzes is straightforward.

Seed data: a script (npm run seed) sets up the DB so anyone can run the project without a pre-existing dataset.

Security:

.env files are not committed.

.env.example is provided with placeholders.

Frontend:

State management is handled using React’s useState + useEffect (no Redux for simplicity).

Accessible UI: semantic elements, ARIA labels, focusable controls.

Timer: fixed countdown per quiz; auto-submits on expiry.

Scoring logic: backend only checks against correct options; no partial credit.

6. Future Improvements

User authentication and multiple quizzes per user.

Admin panel to create/manage quizzes.

Docker setup for one-command run.

CI pipeline with automated tests.
