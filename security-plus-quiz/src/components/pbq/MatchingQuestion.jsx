import { useState } from "react";

export default function MatchingQuestion({ question, onAnswer, revealed, userAnswer }) {
  const terms = question.pairs.map(p => p.term);
  const [shuffledMatches] = useState(() =>
    [...question.pairs.map(p => p.match)].sort(() => Math.random() - 0.5)
  );
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [pairings, setPairings] = useState({});

  const display = revealed && userAnswer ? userAnswer : pairings;
  const matchToTerm = Object.fromEntries(Object.entries(display).map(([t, m]) => [m, t]));
  const termIdx = Object.fromEntries(terms.map((t, i) => [t, i]));
  const allPaired = Object.keys(pairings).length === terms.length;

  function handleTermClick(term) {
    if (revealed) return;
    setSelectedTerm(prev => prev === term ? null : term);
  }

  function handleMatchClick(match) {
    if (revealed || !selectedTerm) return;
    const updated = Object.fromEntries(Object.entries(pairings).filter(([, m]) => m !== match));
    delete updated[selectedTerm];
    updated[selectedTerm] = match;
    setPairings(updated);
    setSelectedTerm(null);
    if (Object.keys(updated).length === terms.length) {
      onAnswer(updated);
    } else {
      onAnswer(null);
    }
  }

  function termStatus(term) {
    if (!revealed) return null;
    const paired = question.pairs.find(p => p.term === term);
    return display[term] === paired?.match ? "correct" : "wrong";
  }

  function matchStatus(match) {
    if (!revealed) return null;
    const assignedTerm = matchToTerm[match];
    if (!assignedTerm) return "wrong";
    const paired = question.pairs.find(p => p.term === assignedTerm);
    return paired?.match === match ? "correct" : "wrong";
  }

  return (
    <div className="matching-container">
      {!revealed && (
        <p className="matching-hint">
          {selectedTerm
            ? `Selected: "${selectedTerm}" — now click a definition to match it`
            : `Click a term on the left, then click its matching definition on the right${allPaired ? " — all matched! Click Submit Answer." : ""}`}
        </p>
      )}
      <div className="matching-cols">
        <div className="matching-col">
          <div className="matching-col-label">Terms</div>
          {terms.map((term, i) => {
            const paired = !!display[term];
            const status = termStatus(term);
            return (
              <button
                key={term}
                className={`matching-item matching-term
                  ${selectedTerm === term ? "matching-selected" : ""}
                  ${paired && !selectedTerm ? "matching-paired" : ""}
                  ${revealed && status ? `matching-${status}` : ""}
                `}
                onClick={() => handleTermClick(term)}
              >
                {paired && (
                  <span className="matching-letter">{String.fromCharCode(65 + i)}</span>
                )}
                <span>{term}</span>
              </button>
            );
          })}
        </div>
        <div className="matching-col">
          <div className="matching-col-label">Definitions</div>
          {shuffledMatches.map((match) => {
            const pairedTerm = matchToTerm[match];
            const status = matchStatus(match);
            return (
              <button
                key={match}
                className={`matching-item matching-match
                  ${pairedTerm ? "matching-paired" : ""}
                  ${selectedTerm && !pairedTerm ? "matching-clickable" : ""}
                  ${revealed && status ? `matching-${status}` : ""}
                `}
                onClick={() => handleMatchClick(match)}
              >
                {pairedTerm && (
                  <span className="matching-letter">
                    {String.fromCharCode(65 + termIdx[pairedTerm])}
                  </span>
                )}
                <span>{match}</span>
              </button>
            );
          })}
        </div>
      </div>
      {revealed && (
        <div className="matching-answer-key">
          <div className="matching-key-title">Correct Matches</div>
          {question.pairs.map((p, i) => (
            <div key={p.term} className="matching-key-row">
              <span className="matching-key-letter">{String.fromCharCode(65 + i)}</span>
              <span className="matching-key-term">{p.term}</span>
              <span className="matching-arrow">→</span>
              <span className="matching-key-match">{p.match}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
