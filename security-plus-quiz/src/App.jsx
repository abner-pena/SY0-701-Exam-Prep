import { useState, useCallback, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import ReviewScreen from "./components/ReviewScreen";
import StudyScreen from "./components/StudyScreen";
import { questions, DOMAINS } from "./data/questions";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() =>
    setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  const startQuiz = useCallback(({ domain = "all", count = 20 } = {}) => {
    const pool =
      domain === "all"
        ? questions
        : questions.filter((q) => q.domain === domain);
    const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
    setQuizQuestions(selected);
    setAnswers({});
    setSelectedDomain(domain);
    setScreen("quiz");
  }, []);

  const finishQuiz = useCallback((finalAnswers) => {
    setAnswers(finalAnswers);
    setScreen("results");
  }, []);

  const goHome = useCallback(() => setScreen("home"), []);
  const goReview = useCallback(() => setScreen("review"), []);
  const goStudy = useCallback(() => setScreen("study"), []);

  return (
    <div className="app">
      {screen === "home" && (
        <HomeScreen
          onStartQuiz={startQuiz}
          onStudy={goStudy}
          domains={DOMAINS}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen questions={quizQuestions} onFinish={finishQuiz} onBack={goHome} />
      )}
      {screen === "results" && (
        <ResultsScreen
          questions={quizQuestions}
          answers={answers}
          onRetry={() => startQuiz({ domain: selectedDomain })}
          onHome={goHome}
          onReview={goReview}
        />
      )}
      {screen === "review" && (
        <ReviewScreen questions={quizQuestions} answers={answers} onBack={() => setScreen("results")} />
      )}
      {screen === "study" && (
        <StudyScreen questions={questions} domains={DOMAINS} onBack={goHome} />
      )}
    </div>
  );
}
