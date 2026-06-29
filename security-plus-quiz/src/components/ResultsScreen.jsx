import { DOMAINS } from "../data/questions";

export default function ResultsScreen({ questions, answers, onRetry, onHome, onReview }) {
  const total = questions.length;
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const skipped = total - Object.keys(answers).length;
  const pct = Math.round((correct / total) * 100);
  const passed = pct >= 75;

  const domainResults = Object.values(DOMAINS).map((domain) => {
    const dqs = questions.filter((q) => q.domain === domain);
    if (dqs.length === 0) return null;
    const dCorrect = dqs.filter((q) => answers[q.id] === q.answer).length;
    return { domain, correct: dCorrect, total: dqs.length, pct: Math.round((dCorrect / dqs.length) * 100) };
  }).filter(Boolean);

  function gradeColor(p) {
    if (p >= 80) return "#10b981";
    if (p >= 75) return "#f59e0b";
    return "#ef4444";
  }

  const circumference = 2 * Math.PI * 52;
  const strokeOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="screen results-screen">
      <div className="results-header">
        <h1>Quiz Complete</h1>
        <div className="result-badge" style={{ color: passed ? "#10b981" : "#ef4444" }}>
          {passed ? "PASSED" : "NEEDS WORK"}
        </div>
      </div>

      <div className="score-circle-wrapper">
        <svg width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={gradeColor(pct)}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="score-center">
          <span className="score-pct" style={{ color: gradeColor(pct) }}>{pct}%</span>
          <span className="score-sub">{correct}/{total}</span>
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
          {domainResults.map(({ domain, correct: dc, total: dt, pct: dp }) => (
            <div key={domain} className="domain-result">
              <div className="dr-top">
                <span className="dr-name">{domain.split(" ").slice(0, 2).join(" ")}</span>
                <span className="dr-score" style={{ color: gradeColor(dp) }}>{dc}/{dt}</span>
              </div>
              <div className="dr-bar">
                <div
                  className="dr-fill"
                  style={{ width: `${dp}%`, background: gradeColor(dp) }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="results-tip">
        {pct < 75
          ? "The passing score is 750/900. Keep studying — you're making progress!"
          : "Great score! Aim for consistent 80%+ across all domains."}
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onRetry}>Retry Quiz</button>
        <button className="btn-secondary" onClick={onReview}>Review Answers</button>
        <button className="btn-ghost" onClick={onHome}>Home</button>
      </div>
    </div>
  );
}
