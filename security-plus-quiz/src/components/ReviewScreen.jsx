import { useState } from "react";

export default function ReviewScreen({ questions, answers, onBack }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = questions.filter((q) => {
    if (filter === "wrong") return answers[q.id] !== q.answer && answers[q.id] !== undefined;
    if (filter === "correct") return answers[q.id] === q.answer;
    if (filter === "skipped") return answers[q.id] === undefined;
    return true;
  });

  function statusLabel(q) {
    if (answers[q.id] === undefined) return { label: "Skipped", cls: "tag-skip" };
    if (answers[q.id] === q.answer) return { label: "Correct", cls: "tag-correct" };
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
