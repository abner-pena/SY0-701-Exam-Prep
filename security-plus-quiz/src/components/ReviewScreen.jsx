import { useState } from "react";
import { isCorrect } from "../utils/scoring";

export default function ReviewScreen({ questions, answers, onBack }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = questions.filter((q) => {
    const answered = answers[q.id] !== undefined;
    const correct = isCorrect(q, answers[q.id]);
    if (filter === "wrong") return answered && !correct;
    if (filter === "correct") return correct;
    if (filter === "skipped") return !answered;
    return true;
  });

  function statusLabel(q) {
    if (answers[q.id] === undefined) return { label: "Skipped", cls: "tag-skip" };
    if (isCorrect(q, answers[q.id])) return { label: "Correct", cls: "tag-correct" };
    return { label: "Wrong", cls: "tag-wrong" };
  }

  return (
    <div className="screen review-screen">
      <div className="screen-header">
        <button className="icon-btn" onClick={onBack}>←</button>
        <h1>Review Answers</h1>
        <div />
      </div>

      <div className="filter-tabs">
        {["all", "wrong", "correct", "skipped"].map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">No questions in this category.</div>
      )}

      <div className="review-list">
        {filtered.map((q, i) => {
          const { label, cls } = statusLabel(q);
          const isOpen = expanded === q.id;
          const userAnswer = answers[q.id];
          const isPBQ = !!(q.type && q.type !== "mcq");

          return (
            <div key={q.id} className={`review-item ${cls}`}>
              <button
                className="review-header"
                onClick={() => setExpanded(isOpen ? null : q.id)}
              >
                <span className="review-num">Q{i + 1}</span>
                <span className="review-q">{q.question}</span>
                <span className={`review-tag ${cls}`}>{label}</span>
                <span className="review-chevron">{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <div className="review-body">
                  {isPBQ ? (
                    <PBQReview question={q} userAnswer={userAnswer} />
                  ) : (
                    <>
                      <div className="review-options">
                        {q.options.map((opt, idx) => {
                          let ocls = "ro";
                          if (idx === q.answer) ocls += " ro-correct";
                          if (idx === userAnswer && userAnswer !== q.answer) ocls += " ro-wrong";
                          return (
                            <div key={idx} className={ocls}>
                              <span className="ro-letter">{String.fromCharCode(65 + idx)}</span>
                              <span>{opt}</span>
                              {idx === q.answer && <span className="ro-icon">✓</span>}
                              {idx === userAnswer && userAnswer !== q.answer && <span className="ro-icon">✗</span>}
                            </div>
                          );
                        })}
                      </div>
                      {q.optionExplanations ? (
                        <div className="review-opt-expls">
                          {q.optionExplanations.map((expl, idx) => (
                            <div
                              key={idx}
                              className={`opt-expl ${idx === q.answer ? "opt-expl-correct" : "opt-expl-wrong"}`}
                            >
                              <span className="opt-expl-letter">{String.fromCharCode(65 + idx)}.</span>
                              <span className="opt-expl-text">{expl}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="review-explanation">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </>
                  )}
                  {isPBQ && (
                    <div className="review-explanation">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                  <div className="review-domain-tag">{q.domain}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PBQReview({ question, userAnswer }) {
  if (question.type === "matching") {
    return (
      <div className="pbq-review">
        <div className="pbq-review-title">Correct Matches</div>
        {question.pairs.map((p, i) => {
          const userMatch = userAnswer?.[p.term];
          const correct = userMatch === p.match;
          return (
            <div key={p.term} className={`pbq-review-row ${correct ? "pbq-row-correct" : "pbq-row-wrong"}`}>
              <span className="pbq-review-letter">{String.fromCharCode(65 + i)}</span>
              <span className="pbq-review-term">{p.term}</span>
              <span className="pbq-review-arrow">→</span>
              <span className="pbq-review-match">{p.match}</span>
              {userAnswer && !correct && (
                <span className="pbq-review-user">(you chose: {userMatch ?? "—"})</span>
              )}
              <span className={`pbq-review-icon ${correct ? "correct" : "wrong"}`}>
                {userAnswer ? (correct ? "✓" : "✗") : "—"}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (question.type === "ordering") {
    return (
      <div className="pbq-review">
        <div className="pbq-review-title">Correct Order</div>
        {question.items.map((item, i) => {
          const userItem = userAnswer?.[i];
          const correct = userItem === item;
          return (
            <div key={item} className={`pbq-review-order-row ${userAnswer ? (correct ? "pbq-row-correct" : "pbq-row-wrong") : ""}`}>
              <span className="ordering-num">{i + 1}</span>
              <span>{item}</span>
              {userAnswer && !correct && (
                <span className="pbq-review-user">(you had: {userItem ?? "—"})</span>
              )}
              {userAnswer && (
                <span className={`pbq-review-icon ${correct ? "correct" : "wrong"}`}>
                  {correct ? "✓" : "✗"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (question.type === "fillin") {
    const correct = isCorrect(question, userAnswer);
    return (
      <div className="pbq-review">
        <div className="pbq-review-title">Fill-In Answer</div>
        <div className={`pbq-review-fillin ${correct ? "pbq-row-correct" : "pbq-row-wrong"}`}>
          <span className="pbq-review-label">Correct: </span>
          <span className="pbq-review-answer">{question.answer}</span>
          {userAnswer && (
            <>
              <span className="pbq-review-label" style={{ marginLeft: 12 }}>Your answer: </span>
              <span className={correct ? "" : "pbq-wrong-text"}>{userAnswer}</span>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
