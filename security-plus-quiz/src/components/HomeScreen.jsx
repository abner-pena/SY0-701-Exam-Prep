import { useState } from "react";
import { questions } from "../data/questions";

export default function HomeScreen({ onStartQuiz, onStudy, domains, theme, onToggleTheme, seenCount, totalCount, onResetProgress }) {
  const [domain, setDomain] = useState("all");
  const [timed, setTimed] = useState(false);

  const domainList = Object.values(domains);
  const poolSize =
    domain === "all"
      ? questions.length
      : questions.filter((q) => q.domain === domain).length;

  const domainCounts = {};
  for (const d of domainList) {
    domainCounts[d] = questions.filter((q) => q.domain === d).length;
  }

  const cycleProgress = Math.round((seenCount / totalCount) * 100);

  return (
    <div className="screen home-screen">
      <div className="home-topbar">
        <div className="badge">SY0-701</div>
        <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="home-header">
        <h1 className="title">Security+</h1>
        <p className="subtitle">CompTIA Exam Prep</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{totalCount}</span>
          <span className="stat-label">Questions</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">5</span>
          <span className="stat-label">Domains</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">90</span>
          <span className="stat-label">Per Quiz</span>
        </div>
      </div>

      <div className="progress-card card">
        <div className="progress-card-header">
          <span className="progress-card-title">Cycle Progress</span>
          <span className="progress-card-count">{seenCount} / {totalCount}</span>
        </div>
        <div className="cycle-bar">
          <div className="cycle-fill" style={{ width: `${cycleProgress}%` }} />
        </div>
        <div className="progress-card-footer">
          <span className="progress-card-sub">{totalCount - seenCount} questions remaining this cycle</span>
          {seenCount > 0 && (
            <button className="reset-btn" onClick={onResetProgress}>Reset</button>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Quick Quiz</h2>

        <label className="field-label">Domain</label>
        <select
          className="select"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="all">All Domains ({questions.length} questions)</option>
          {domainList.map((d) => (
            <option key={d} value={d}>
              {d} ({domainCounts[d]})
            </option>
          ))}
        </select>

        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-label">Timed Mode</span>
            <span className="toggle-sub">90 min · like the real exam</span>
          </div>
          <button
            className={`toggle-switch ${timed ? "on" : ""}`}
            onClick={() => setTimed((t) => !t)}
            aria-label="Toggle timed mode"
          />
        </div>

        <p className="quiz-info-line">
          90 random questions · shuffled · no repeats until cycle complete
        </p>

        <button className="btn-primary" onClick={() => onStartQuiz({ domain, timed })}>
          Start Quiz →
        </button>
      </div>

      <div className="domains-card card">
        <h2 className="section-title">Exam Domains</h2>
        <div className="domain-list">
          {[
            { name: domains.GENERAL_SECURITY, pct: "12%" },
            { name: domains.THREATS, pct: "22%" },
            { name: domains.ARCHITECTURE, pct: "18%" },
            { name: domains.OPERATIONS, pct: "28%" },
            { name: domains.PROGRAM_MANAGEMENT, pct: "20%" },
          ].map(({ name, pct }) => (
            <div key={name} className="domain-item">
              <div className="domain-dot" />
              <div className="domain-info">
                <span className="domain-name">{name}</span>
                <span className="domain-pct">{pct} of exam</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-secondary" onClick={onStudy}>
        Study Mode (Flashcards)
      </button>
    </div>
  );
}
