export function isCorrect(q, answer) {
  if (answer === undefined || answer === null) return false;
  const type = q.type || "mcq";
  if (type === "mcq") return answer === q.answer;
  if (type === "matching") {
    return Array.isArray(q.pairs) && q.pairs.every(p => answer[p.term] === p.match);
  }
  if (type === "ordering") {
    if (!Array.isArray(answer) || answer.length !== q.items.length) return false;
    return answer.every((item, i) => item === q.items[i]);
  }
  if (type === "fillin") {
    const normalize = (s) => String(s).toLowerCase().trim().replace(/[-\s]+/g, " ");
    const norm = normalize(answer);
    return normalize(q.answer) === norm || (q.aliases || []).some(a => normalize(a) === norm);
  }
  return false;
}
