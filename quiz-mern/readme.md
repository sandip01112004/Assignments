# 📘 Online Quiz Application (MERN)

## Overview
A full-stack MERN application where users can take a quiz, navigate between questions, submit answers, and view their score at the end.  

### Features
- Quiz flow: Start → Answer → Submit → Score  
- **Backend (Express + MongoDB)**  
  - Store questions and answers  
  - API to fetch questions (without answers)  
  - API to calculate and return score  
- **Frontend (React + Vite)**  
  - Start page, quiz page, results page  
  - Next/Previous navigation, Submit button  
  - Accessible UI with ARIA labels  
- **Bonus**: Timer (auto-submit) + results with correct/incorrect answers  
- **Tests**: Jest unit tests for backend scoring logic  

---

## Tech Stack
React (Vite) • Node.js • Express • MongoDB • Jest  

---

## Setup

### Prerequisites
- Node.js (>= 18)  
- MongoDB (local or Atlas)  

### Steps
```bash
# Clone repo
git clone https://github.com/<your-username>/assignments.git
cd quiz-mern

# Backend
cd backend
cp .env.example .env      # add your Mongo URI
npm install
npm run seed              # seed questions
npm run dev               # server at http://localhost:5000

# Frontend
cd ../frontend
cp .env.example .env      # optional (VITE_API_BASE=http://localhost:5000/api)
npm install
npm run dev               # frontend at http://localhost:5173
