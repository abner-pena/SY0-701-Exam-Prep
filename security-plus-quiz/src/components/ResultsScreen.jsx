import { DOMAINS } from "../data/questions";

const PASS_SCORE = 750;
const MIN_SCORE = 100;
const MAX_SCORE = 900;

function scaledScore(correct, total) {
  return Math.round(MIN_SCORE + (correct / total) * (MAX_SCORE - MIN_SCORE));
}

export default function ResultsScreen({ questions, answers, onRetry, onHome, onReview }) {
  const total = questions.length;
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const skipped = total - Object.keys(answers).length;
  const score = scaledScore(correct, total);
  const passed = score >= PASS_SCORE;
  const scoreColor = passed ? "var(--green)" : "var(--red)";

  const domainResults = Object.values(DOMAINS).map((domain) => {
    const dqs = questions.filter((q) => q.domain === domain);
    if (dqs.length === 0) return null;
    const dCorrect = dqs.filter((q) => answers[q.id] === q.answer).length;
    const pct = Math.round((dCorrect / dqs.length) * 100);
    return { domain, correct: dCorrect, total: dqs.length, pct };
  }).filter(Boolean);

  const circumference = 2 * Math.PI * 52;
  const fillRatio = correct / total;
  const strokeOffset = circumference - fillRatio * circumference;
  const passMarkOffset = -(((PASS_SCORE - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * circumference - 2);

  return (
    <div className="screen results-screen">
      <div className="results-header">
        <h1>Quiz Complete</h1>
        <div className="result-badge" style={{ color: scoreColor }}>
          {passed ? "PASSED" : "NEEDS WORK"}
        </div>
      </div>

      <div className="score-circle-wrapper">
        <svg width="140" height="140" viewBox="0 0 120 120">
          {/* Track */}
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10"
            style={{ stroke: "var(--bg3)" }} />
          {/* Score arc */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={scoreColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          {/* 750 passing threshold tick */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            strokeWidth="10"
            stroke="var(--bg)"
            strokeDasharray={`4 ${circumference - 4}`}
            strokeDashoffset={passMarkOffset}
            strokeLinecap="butt"
            transform="rotate(-90 60 60)"
            opacity="0.9"
          />
        </svg>
        <div className="score-center">
          <span className="score-num" style={{ color: scoreColor }}>{score}</span>
          <span className="score-sub">/900</span>
          <span className="score-pass-label">pass: 750</span>
        </div>
      </div>

      <div className="results-stats">
        <div className="rs-card correct">
          <span className="rs-num">{correct}</span>
          <span className="rs-label">Correct</span>
        </div>
        <div className="rs-card wrong">
          <span className="rs-num">{total - correct - skipped}</span>
          <span className="rs-label">Wrong</span>
        </div>
        <div className="rs-card skipped">
          <span className="rs-num">{skipped}</span>
          <span className="rs-label">Skipped</span>
        </div>
      </div>

      {domainResults.length > 1 && (
        <div className="card">
          <h2 className="section-title">By Domain</h2>
          {domainResults.map(({ domain, correct: dc, total: dt, pct }) => (
            <div key={domain} className="domain-result">
              <div className="dr-top">
                <span className="dr-name">{domain.split(" ").slice(0, 2).join(" ")}</span>
                <span className="dr-score" style={{ color: pct < 75 ? "var(--red)" : "var(--text2)" }}>
                  {dc}/{dt}
                </span>
              </div>
              <div className="dr-bar">
                <div
                  className="dr-fill"
                  style={{ width: `${pct}%`, background: pct < 75 ? "var(--red)" : "var(--text3)" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="results-tip">
        {!passed
          ? `Score ${score}/900 — you need 750 to pass. Keep studying!`
          : score >= 800
            ? `Score ${score}/900 — excellent! You're well above the passing threshold.`
            : `Score ${score}/900 — you passed! Aim for 800+ to feel confident on exam day.`}
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onRetry}>Retry Quiz</button>
        <button className="btn-secondary" onClick={onReview}>Review Answers</button>
        <button className="btn-ghost" onClick={onHome}>Home</button>
      </div>
    </div>
  );
}
