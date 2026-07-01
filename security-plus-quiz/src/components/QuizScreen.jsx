import { useState, useEffect, useRef, useCallback } from "react";
import MatchingQuestion from "./pbq/MatchingQuestion";
import OrderingQuestion from "./pbq/OrderingQuestion";
import FillInQuestion from "./pbq/FillInQuestion";

const TOTAL_SECONDS = 90 * 60;

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function QuizScreen({ questions, onFinish, onBack, cycleReset, timed }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [pbqAnswer, setPbqAnswer] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCycleNote, setShowCycleNote] = useState(cycleReset);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  const latestAnswers = useRef({});
  const finished = useRef(false);

  useEffect(() => { latestAnswers.current = answers; }, [answers]);

  useEffect(() => {
    if (!timed) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timed]);

  useEffect(() => {
    if (timed && timeLeft === 0 && !finished.current) {
      finished.current = true;
      onFinish(latestAnswers.current);
    }
  }, [timed, timeLeft, onFinish]);

  const q = questions[current];
  const isPBQ = !!(q.type && q.type !== "mcq");
  const progress = ((current + 1) / questions.length) * 100;
  const isLast = current === questions.length - 1;
  const timerWarning = timed && timeLeft <= 300;

  function handleSelect(idx) {
    if (revealed || isPBQ) return;
    setSelected(idx);
    setRevealed(true);
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  }

  const handlePBQAnswer = useCallback((answer) => {
    setPbqAnswer(answer);
  }, []);

  function handlePBQSubmit() {
    if (!pbqAnswer || finished.current) return;
    setAnswers((prev) => ({ ...prev, [q.id]: pbqAnswer }));
    setRevealed(true);
  }

  function advance() {
    if (finished.current) return;
    if (isLast) {
      finished.current = true;
      onFinish(latestAnswers.current);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setPbqAnswer(null);
    }
  }

  function handleNext() { advance(); }
  function handleSkip() { if (!finished.current) advance(); }

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
        {timed && (
          <span className={`quiz-timer${timerWarning ? " warning" : ""}`}>
            {formatTime(timeLeft)}
          </span>
        )}
      </div>

      <div className="question-block">
        <div className="question-label">
          QUESTION: {current + 1}
          {isPBQ && <span className="pbq-tag">PBQ</span>}
        </div>
        <p className="question-text">{q.question}</p>
      </div>

      {isPBQ ? (
        <>
          {q.type === "matching" && (
            <MatchingQuestion
              question={q}
              onAnswer={handlePBQAnswer}
              revealed={revealed}
              userAnswer={answers[q.id]}
            />
          )}
          {q.type === "ordering" && (
            <OrderingQuestion
              question={q}
              onAnswer={handlePBQAnswer}
              revealed={revealed}
              userAnswer={answers[q.id]}
            />
          )}
          {q.type === "fillin" && (
            <FillInQuestion
              question={q}
              onAnswer={handlePBQAnswer}
              revealed={revealed}
              userAnswer={answers[q.id]}
            />
          )}
        </>
      ) : (
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
      )}

      {revealed && (
        <div className="answer-section">
          {!isPBQ && (
            <div className="answer-line">
              <span className="answer-label">Answer(s):</span>
              <span className="answer-value">{String.fromCharCode(65 + q.answer)}</span>
            </div>
          )}
          <div className="explanation-box">
            {!isPBQ && q.optionExplanations ? (
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
        {revealed ? (
          <button className="btn-primary" onClick={handleNext}>
            {isLast ? "View Results" : "Next Question →"}
          </button>
        ) : isPBQ ? (
          <>
            <button
              className="btn-primary"
              onClick={handlePBQSubmit}
              disabled={!pbqAnswer}
            >
              Submit Answer
            </button>
            <button className="btn-ghost" onClick={handleSkip}>Skip →</button>
          </>
        ) : (
          <button className="btn-ghost" onClick={handleSkip}>Skip →</button>
        )}
      </div>
    </div>
  );
}
