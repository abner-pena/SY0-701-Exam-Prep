import { useState } from "react";

export default function QuizScreen({ questions, onFinish, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isLast = current === questions.length - 1;
  const answered = Object.keys(answers).length;

  function handleSelect(idx) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  }

  function handleNext() {
    if (isLast) {
      onFinish(answers);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function handleSkip() {
    if (isLast) {
      onFinish(answers);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function optionClass(idx) {
    if (!revealed) return selected === idx ? "option selected" : "option";
    if (idx === q.answer) return "option correct";
    if (idx === selected && selected !== q.answer) return "option wrong";
    return "option";
  }

  return (
    <div className="screen quiz-screen">
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Exit quiz? Progress will be lost.</p>
            <div className="modal-btns">
              <button className="btn-danger" onClick={onBack}>Exit</button>
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="quiz-header">
        <button className="icon-btn" onClick={() => setShowConfirm(true)} aria-label="Exit quiz">✕</button>
        <div className="quiz-counter">
          {current + 1} / {questions.length}
        </div>
        <div className="score-badge">{answered} answered</div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="domain-tag">{q.domain}</div>

      <div className="question-card">
        <p className="question-text">{q.question}</p>

        <div className="options">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={optionClass(idx)}
              onClick={() => handleSelect(idx)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="option-text">{opt}</span>
              {revealed && idx === q.answer && (
                <span className="option-icon">✓</span>
              )}
              {revealed && idx === selected && selected !== q.answer && (
                <span className="option-icon">✗</span>
              )}
            </button>
          ))}
        </div>

        {revealed && (
          <div className="explanation">
            <div className="explanation-label">Explanation</div>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="quiz-footer">
        {!revealed && (
          <button className="btn-ghost" onClick={handleSkip}>
            Skip →
          </button>
        )}
        {revealed && (
          <button className="btn-primary" onClick={handleNext}>
            {isLast ? "View Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
