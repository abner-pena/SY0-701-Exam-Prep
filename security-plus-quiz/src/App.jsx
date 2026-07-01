import { useState, useCallback, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import ReviewScreen from "./components/ReviewScreen";
import StudyScreen from "./components/StudyScreen";
import { questions, DOMAINS } from "./data/questions";

const QUIZ_SIZE = 90;
const SEEN_KEY = "spq_seen_v1";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadSeen() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveSeen(set) {
  localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [theme, setTheme] = useState("dark");
  const [seenIds, setSeenIds] = useState(loadSeen);
  const [cycleReset, setCycleReset] = useState(false);
  const [timedMode, setTimedMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() =>
    setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  const startQuiz = useCallback(({ domain = "all", timed = false } = {}) => {
    const pool =
      domain === "all"
        ? questions
        : questions.filter((q) => q.domain === domain);

    let currentSeen = loadSeen();
    let unseen = pool.filter((q) => !currentSeen.has(q.id));
    let didReset = false;

    if (unseen.length < QUIZ_SIZE) {
      const poolIds = new Set(pool.map((q) => q.id));
      const newSeen = new Set([...currentSeen].filter((id) => !poolIds.has(id)));
      saveSeen(newSeen);
      setSeenIds(newSeen);
      currentSeen = newSeen;
      unseen = pool.filter((q) => !currentSeen.has(q.id));
      didReset = true;
    }

    const selected = shuffle(unseen).slice(0, Math.min(QUIZ_SIZE, unseen.length));
    setQuizQuestions(selected);
    setAnswers({});
    setSelectedDomain(domain);
    setCycleReset(didReset);
    setTimedMode(timed);
    setScreen("quiz");
  }, []);

  const finishQuiz = useCallback((finalAnswers) => {
    setAnswers(finalAnswers);
    const currentSeen = loadSeen();
    quizQuestions.forEach((q) => currentSeen.add(q.id));
    saveSeen(currentSeen);
    setSeenIds(new Set(currentSeen));
    setScreen("results");
  }, [quizQuestions]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(SEEN_KEY);
    setSeenIds(new Set());
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
          seenCount={seenIds.size}
          totalCount={questions.length}
          onResetProgress={resetProgress}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          questions={quizQuestions}
          onFinish={finishQuiz}
          onBack={goHome}
          cycleReset={cycleReset}
          timed={timedMode}
        />
      )}
      {screen === "results" && (
        <ResultsScreen
          questions={quizQuestions}
          answers={answers}
          onRetry={() => startQuiz({ domain: selectedDomain, timed: timedMode })}
          onHome={goHome}
          onReview={goReview}
          seenCount={seenIds.size}
          totalCount={questions.length}
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
