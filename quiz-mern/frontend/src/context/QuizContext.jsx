import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'


const QuizContext = createContext()


export function useQuiz() {
return useContext(QuizContext)
}


export function QuizProvider({ children }) {
const [questions, setQuestions] = useState([]) // array of questions
const [answers, setAnswers] = useState({}) // { questionId: selectedIndex }
const [currentIndex, setCurrentIndex] = useState(0)
const [loading, setLoading] = useState(false)
const [result, setResult] = useState(null)
const navigate = useNavigate()


const loadQuestions = async (quizId) => {
setLoading(true)
try {
const res = await api.get(`/quizzes/${quizId}/questions`)
setQuestions(res.data.questions || [])
setAnswers({})
setCurrentIndex(0)
setResult(null)
} finally {
setLoading(false)
}
}


const selectAnswer = (questionId, selectedIndex) => {
setAnswers(prev => ({ ...prev, [questionId]: selectedIndex }))
}


const next = () => setCurrentIndex(i => Math.min(i + 1, questions.length - 1))
const prev = () => setCurrentIndex(i => Math.max(i - 1, 0))


const submit = async (quizId) => {
const payload = {
answers: Object.keys(answers).map(qid => ({ questionId: qid, selectedIndex: answers[qid] }))
}
setLoading(true)
try {
const res = await api.post(`/quizzes/${quizId}/submit`, payload)
setResult(res.data)
navigate(`/results/${quizId}`, { state: { result: res.data } })
return res.data
} catch (err) {
console.error(err)
throw err
} finally {
setLoading(false)
}
}


return (
<QuizContext.Provider value={{ questions, answers, currentIndex, loading, result, loadQuestions, selectAnswer, next, prev, submit }}>
{children}
</QuizContext.Provider>
)
}