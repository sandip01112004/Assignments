import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QuizProvider } from './context/QuizContext'
import './index.css'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<QuizProvider>
<App />
</QuizProvider>
</BrowserRouter>
</React.StrictMode>
)