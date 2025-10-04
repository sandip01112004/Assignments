# 📘 Online Quiz Application (MERN)

## 1. Project Overview
The **Online Quiz Application** is a full-stack MERN project that allows users to take a quiz, navigate between questions, submit their answers, and view their score at the end.  

### ✨ Core Features
- **Quiz flow**: start → answer questions → submit → see score  
- **Backend (Express + MongoDB)**  
  - Stores quiz data (questions, options, correct answers)  
  - API to fetch quiz questions **(without answers)**  
  - API to submit answers, calculate score, and return results  
- **Frontend (React + Vite)**  
  - Start page, quiz page, and results page  
  - Navigation (Next/Previous), Submit button  
  - Accessible UI with ARIA labels and keyboard navigation  
- **Bonus Features**  
  - Timer with auto-submit  
  - Results page highlights correct and incorrect answers  
  - Simple backend unit tests for scoring logic  

---

## 2. Tech Stack
- **Frontend**: React (Vite), CSS modules  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Mongoose ODM)  
- **Testing**: Jest (backend scoring logic)  

---

## 3. Setup & Run Instructions

### Prerequisites
- Node.js (>= 18)  
- npm or yarn  
- MongoDB (local or Atlas)  

---

### Step 1: Clone repo
```bash
git clone https://github.com/<your-username>/quiz-mern.git
cd quiz-mern
