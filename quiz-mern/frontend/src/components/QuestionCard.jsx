// src/components/QuestionCard.jsx
import React from 'react';

/**
 * Accessible QuestionCard using fieldset + radio inputs.
 * Props:
 *  - question: { _id, text, options: [] }
 *  - selectedIndex: number|null
 *  - onSelect(index)
 */
export default function QuestionCard({ question, selectedIndex, onSelect }) {
  if (!question) return null;

  return (
    <section className="card" aria-labelledby={`q-${question._id}-label`}>
      <div className="question-meta">
        <h4 id={`q-${question._id}-label`} className="title" style={{fontSize: '1.1rem'}}>
          {question.text}
        </h4>
      </div>

      <fieldset aria-labelledby={`q-${question._id}-label`} style={{border: 'none', padding: 0, margin: 0}}>
        <legend className="sr-only">Choose one answer</legend>

        <div className="options" role="radiogroup" aria-label={question.text}>
          {question.options.map((opt, idx) => {
            const checked = selectedIndex === idx;
            const optId = `opt-${question._id}-${idx}`;
            return (
              <label
                key={optId}
                htmlFor={optId}
                className="option"
                aria-pressed={checked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(idx);
                  }
                }}
              >
                <input
                  id={optId}
                  type="radio"
                  name={`q-${question._id}`}
                  checked={checked}
                  onChange={() => onSelect(idx)}
                  aria-checked={checked}
                  value={idx}
                />
                <span className="label">
                  <strong style={{width: 22, display:'inline-block'}}>{String.fromCharCode(65 + idx)}.</strong>
                  <span>{opt}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
