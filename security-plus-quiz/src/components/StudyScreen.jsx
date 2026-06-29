import { useState } from "react";

export default function StudyScreen({ questions, domains, onBack }) {
  const [domain, setDomain] = useState("all");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pool =
    domain === "all"
      ? questions
      : questions.filter((q) => q.domain === domain);

  const card = pool[cardIndex] || pool[0];

  function handleDomainChange(d) {
    setDomain(d);
    setCardIndex(0);
    setFlipped(false);
  }

  function next() {
    setCardIndex((i) => (i + 1) % pool.length);
    setFlipped(false);
  }

  function prev() {
    setCardIndex((i) => (i - 1 + pool.length) % pool.length);
    setFlipped(false);
  }

  if (!card) return null;

  return (
    <div className="screen study-screen">
      <div className="screen-header">
        <button className="icon-btn" onClick={onBack}>←</button>
        <h1>Study Mode</h1>
        <div />
      </div>

      <select
        className="select"
        value={domain}
        onChange={(e) => handleDomainChange(e.target.value)}
      >
        <option value="all">All Domains</option>
        {Object.values(domains).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <div className="card-counter">
        {cardIndex + 1} / {pool.length}
      </div>

      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="fc-domain-tag">{card.domain}</div>
            <p className="fc-question">{card.question}</p>
            <div className="fc-hint">Tap to reveal answer</div>
          </div>
          <div className="flashcard-back">
            <div className="fc-answer-label">Correct Answer</div>
            <p className="fc-answer">{card.options[card.answer]}</p>
            <div className="fc-divider" />
            <p className="fc-explanation">{card.explanation}</p>
          </div>
        </div>
      </div>

      <div className="study-nav">
        <button className="btn-secondary study-nav-btn" onClick={prev}>← Prev</button>
        <button className="btn-primary study-nav-btn" onClick={next}>Next →</button>
      </div>

      <div className="study-options-grid">
        {card.options.map((opt, idx) => (
          <div
            key={idx}
            className={`study-option ${idx === card.answer && flipped ? "correct" : ""}`}
          >
            <span className="study-opt-letter">{String.fromCharCode(65 + idx)}</span>
            <span>{opt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
