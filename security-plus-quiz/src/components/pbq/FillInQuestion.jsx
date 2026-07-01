import { useState } from "react";
import { isCorrect } from "../../utils/scoring";

export default function FillInQuestion({ question, onAnswer, revealed, userAnswer }) {
  const [text, setText] = useState(revealed && userAnswer ? userAnswer : "");

  function handleChange(e) {
    if (revealed) return;
    const val = e.target.value;
    setText(val);
    onAnswer(val.trim() ? val.trim() : null);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && text.trim()) {
      e.preventDefault();
    }
  }

  const correct = revealed && isCorrect(question, userAnswer ?? text);

  return (
    <div className="fillin-container">
      {!revealed && (
        <p className="fillin-hint">Type your answer below, then click Submit Answer.</p>
      )}
      <input
        type="text"
        className={`fillin-input${revealed ? (correct ? " fillin-correct" : " fillin-wrong") : ""}`}
        value={revealed ? (userAnswer ?? text) : text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your answer…"
        disabled={revealed}
        autoComplete="off"
        spellCheck={false}
      />
      {revealed && !correct && (
        <div className="fillin-reveal">
          <div className="fillin-reveal-label">Correct Answer</div>
          <div className="fillin-reveal-answer">{question.answer}</div>
        </div>
      )}
    </div>
  );
}
