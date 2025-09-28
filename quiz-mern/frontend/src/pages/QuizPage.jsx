// src/pages/QuizPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';

export default function QuizPage() {
  const { quizId } = useParams();
  const {
    questions,
    loadQuestions,
    currentIndex,
    next,
    prev,
    selectAnswer,
    answers,
    submit,
    loading
  } = useQuiz();

  useEffect(() => {
    loadQuestions(quizId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  if (loading) return <main className="container card">Loading…</main>;
  if (!questions || questions.length === 0) return <main className="container card">No questions found for this quiz.</main>;

  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <main className="container">
      <header style={{marginBottom: 12}}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <div>
            <h2 className="title" style={{fontSize: '1.2rem'}}>Quiz</h2>
            <div className="meta">Question {currentIndex + 1} of {questions.length}</div>
          </div>
          <div className="meta">Answered: {Object.keys(answers).length} / {questions.length}</div>
        </div>
      </header>

      <QuestionCard
        question={q}
        selectedIndex={answers[q._id] ?? null}
        onSelect={(idx) => selectAnswer(q._id, idx)}
      />

      <div style={{display: 'flex', gap: 10, marginTop: 16}}>
        <button className="btn-ghost" onClick={prev} disabled={currentIndex === 0}>Previous</button>
        {!isLast ? (
          <button className="btn" style={{marginLeft: 'auto'}} onClick={next}>Next</button>
        ) : (
          <div style={{marginLeft: 'auto', display: 'flex', gap: 8}}>
            <button className="btn-ghost" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Review</button>
            <button
              className="btn"
              onClick={() => submit(quizId)}
              aria-label="Submit quiz and view results"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
