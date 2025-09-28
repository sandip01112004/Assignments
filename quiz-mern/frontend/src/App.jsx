import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import QuizPage from './pages/QuizPage'
import Results from './pages/Results'


export default function App() {
return (
<div className="min-h-screen bg-gray-50 text-gray-900">
<Routes>
<Route path="/" element={<Start />} />
<Route path="/quiz/:quizId" element={<QuizPage />} />
<Route path="/results/:quizId" element={<Results />} />
</Routes>
</div>
)
}