// src/pages/Results.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Results() {
  const { state } = useLocation();
  const result = state?.result;
  const liveRef = useRef(null);

  useEffect(() => {
    if (liveRef.current && result) {
      liveRef.current.textContent = `You scored ${result.score} out of ${result.total}.`;
    }
  }, [result]);

  if (!result) {
    return (
      <main className="container card">
        <h2 className="title">No result found</h2>
        <p className="meta">Please take the quiz first.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="card" aria-labelledby="results-title">
        <h2 id="results-title" className="title">Results</h2>
        <p className="subtitle">Well done — here's how you performed</p>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12}}>
          <div>
            <div className="meta">Score</div>
            <div style={{fontSize: '1.6rem', fontWeight: 800}}>{result.score} / {result.total}</div>
          </div>
          <div aria-hidden>
            <span className={`result-badge ${result.score === result.total ? 'result-correct' : ''}`}>
              {result.score === result.total ? 'Perfect' : 'Completed'}
            </span>
          </div>
        </div>

        <div className="result-list" aria-live="polite" aria-atomic="true" ref={liveRef}>
          {/* Details */}
          {result.details.map(d => (
            <div key={d.questionId} className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <div className="meta">Question ID: <span style={{fontFamily: 'monospace'}}>{d.questionId}</span></div>
                <div style={{marginTop: 6}}>
                  <div className="meta">Selected: {d.selectedIndex === null ? '—' : String.fromCharCode(65 + d.selectedIndex)}</div>
                  <div className="meta">Correct: {String.fromCharCode(65 + d.correctIndex)}</div>
                </div>
              </div>
              <div>
                {d.isCorrect ? (
                  <div className="result-badge result-correct" role="status" aria-live="polite">Correct</div>
                ) : (
                  <div className="result-badge result-wrong" role="status" aria-live="polite">Wrong</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
