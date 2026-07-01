import { useState, useEffect, useRef } from "react";

export default function OrderingQuestion({ question, onAnswer, revealed, userAnswer }) {
  const [order, setOrder] = useState(() =>
    [...question.items].sort(() => Math.random() - 0.5)
  );
  const initialRef = useRef(null);

  useEffect(() => {
    if (initialRef.current === null) {
      initialRef.current = order;
      onAnswer(order);
    }
  });

  const display = revealed && userAnswer ? userAnswer : order;

  function move(i, dir) {
    if (revealed) return;
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
    onAnswer(next);
  }

  function itemStatus(item, i) {
    if (!revealed) return null;
    return item === question.items[i] ? "correct" : "wrong";
  }

  const allCorrect = revealed && display.every((item, i) => item === question.items[i]);

  return (
    <div className="ordering-container">
      {display.map((item, i) => {
        const status = itemStatus(item, i);
        return (
          <div
            key={item}
            className={`ordering-item${revealed && status ? ` ordering-${status}` : ""}`}
          >
            <span className="ordering-num">{i + 1}</span>
            <span className="ordering-text">{item}</span>
            {!revealed && (
              <div className="ordering-arrows">
                <button className="order-arrow" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                <button className="order-arrow" onClick={() => move(i, 1)} disabled={i === display.length - 1}>↓</button>
              </div>
            )}
            {revealed && (
              <span className={`ordering-check ${status}`}>
                {status === "correct" ? "✓" : "✗"}
              </span>
            )}
          </div>
        );
      })}
      {revealed && !allCorrect && (
        <div className="ordering-correct-order">
          <div className="ordering-correct-title">Correct Order</div>
          {question.items.map((item, i) => (
            <div key={item} className="ordering-correct-item">
              <span className="ordering-num">{i + 1}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
