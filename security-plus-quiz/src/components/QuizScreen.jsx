import { useState } from "react";

export default function QuizScreen({ questions, onFinish, onBack, cycleReset }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCycleNote, setShowCycleNote] = useState(cycleReset);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isLast = current === questions.length - 1;

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
    const base = "option";
    if (!revealed) return selected === idx ? `${base} option-selected` : base;
    if (idx === q.answer) return `${base} option-correct`;
    if (idx === selected && selected !== q.answer) return `${base} option-wrong`;
    return base;
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

      {showCycleNote && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="cycle-reset-title">Cycle Complete!</p>
            <p className="cycle-reset-body">You've seen all the questions in this pool. Starting a fresh cycle — questions will shuffle in a new random order.</p>
            <button className="btn-primary" onClick={() => setShowCycleNote(false)}>Got it →</button>
          </div>
        </div>
      )}

      <div className="quiz-header">
        <button className="icon-btn" onClick={() => setShowConfirm(true)} aria-label="Exit">✕</button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="quiz-counter">{current + 1}/{questions.length}</span>
      </div>

      <div className="question-block">
        <div className="question-label">QUESTION: {current + 1}</div>
        <p className="question-text">{q.question}</p>
      </div>

      <div className="options">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className={optionClass(idx)}
            onClick={() => handleSelect(idx)}
          >
            <span className={`opt-circle ${
              revealed && idx === q.answer ? "circle-correct" :
              revealed && idx === selected && selected !== q.answer ? "circle-wrong" :
              selected === idx && !revealed ? "circle-selected" : ""
            }`}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="opt-text">{opt}</span>
          </button>
        ))}
      </div>

      {revealed && (
        <div className="answer-section">
          <div className="answer-line">
            <span className="answer-label">Answer(s):</span>
            <span className="answer-value">{String.fromCharCode(65 + q.answer)}</span>
          </div>
          <div className="explanation-box">
            {q.optionExplanations ? (
              q.optionExplanations.map((expl, idx) => (
                <div
                  key={idx}
                  className={`opt-expl ${idx === q.answer ? "opt-expl-correct" : "opt-expl-wrong"}`}
                >
                  <span className="opt-expl-letter">{String.fromCharCode(65 + idx)}.</span>
                  <span className="opt-expl-text">{expl}</span>
                </div>
              ))
            ) : (
              <>
                <div className="explanation-title">Explanation:</div>
                <p className="explanation-text">{q.explanation}</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="quiz-footer">
        {!revealed ? (
          <button className="btn-ghost" onClick={handleSkip}>Skip →</button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            {isLast ? "View Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
