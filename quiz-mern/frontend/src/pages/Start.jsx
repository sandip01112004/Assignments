// src/pages/Start.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get('/quizzes')
      .then(r => {
        if (!mounted) return;
        setQuizzes(r.data.quizzes || []);
      })
      .catch(err => {
        console.error('Failed to load quizzes', err);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <main className="container">
      <header className="card" style={{marginBottom: 18}}>
        <h1 className="title">Welcome to the Quiz App</h1>
        <p className="subtitle">Choose a quiz and test your knowledge. This app is keyboard and screen-reader friendly.</p>
      </header>

      {loading ? (
        <div className="card">Loading quizzes…</div>
      ) : (
        <div className="card" style={{display: 'grid', gap: 10}}>
          {quizzes.length === 0 ? (
            <div className="meta">No quizzes available yet.</div>
          ) : (
            quizzes.map(q => (
              <div key={q._id} className="quiz-item" role="article" aria-labelledby={`quiz-${q._id}`}>
                <div style={{flex: 1}}>
                  <h2 id={`quiz-${q._id}`} style={{margin: 0, fontSize: '1rem', fontWeight: 700}}>{q.title}</h2>
                  <p className="meta" style={{marginTop: 6}}>{q.description}</p>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() => navigate(`/quiz/${q._id}`)}
                    aria-label={`Start quiz ${q.title}`}
                  >
                    Start
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
