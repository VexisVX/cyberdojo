import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Zap } from "lucide-react";
import { useLang, pick } from "../../lib/lang";
import { QuizQuestion } from "../../types/programming";
import { useProgressStore } from "../../stores/useProgressStore";

interface QuizProps {
  questions: QuizQuestion[];
  lessonId?: string;
  xpReward?: number;
  onComplete?: (pct: number) => void;
}

export function Quiz({ questions, lessonId, xpReward = 15, onComplete }: QuizProps) {
  const { lang } = useLang();
  const rtl = lang === "fa";
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const { setQuizScore, getQuizScore } = useProgressStore();

  const q = questions[idx];
  const isLast = idx === questions.length - 1;
  const isCorrect = picked === q.correctIndex;
  const previousBest = lessonId ? getQuizScore(lessonId) : 0;

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      const pct = Math.round((score / questions.length) * 100);
      // Only award XP if passed AND improvement
      let bonus = 0;
      if (pct >= 70 && lessonId && pct > previousBest) {
        bonus = Math.floor(xpReward * (pct / 100));
        setQuizScore(lessonId, pct, bonus);
        setXpEarned(bonus);
      }
      setDone(true);
      if (onComplete) onComplete(pct);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setXpEarned(0);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-6 p-8 rounded-2xl text-center"
        style={{
          background: passed ? "rgba(52,211,153,0.08)" : "rgba(251,113,133,0.08)",
          border: `1px solid ${passed ? "var(--accent-emerald)" : "var(--accent-rose)"}`,
        }}
      >
        <Trophy
          className="w-12 h-12 mx-auto mb-3"
          style={{ color: passed ? "var(--accent-emerald)" : "var(--accent-rose)" }}
        />
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          {pick(lang, passed ? "Passed!" : "Try again", passed ? "قبول شدی!" : "دوباره تلاش کن")}
        </h3>
        <p className="text-4xl font-bold mb-2" style={{ color: passed ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
          {score}/{questions.length} ({pct}%)
        </p>

        {xpEarned > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: "rgba(251,191,36,0.15)", color: "var(--accent-amber)", border: "1px solid var(--accent-amber)" }}
          >
            <Zap className="w-4 h-4" />
            <span className="font-semibold">+{xpEarned} XP</span>
          </motion.div>
        )}

        {!passed && (
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            {pick(lang, "Need 70% to pass", "برای قبولی به ۷۰٪ نیاز داری")}
          </p>
        )}

        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition hover:opacity-80"
          style={{ background: "var(--bg-raised)", color: "var(--text-primary)", border: "1px solid var(--border-default)" }}
        >
          <RotateCcw className="w-4 h-4" /> {pick(lang, "Retry", "تلاش مجدد")}
        </button>
      </motion.div>
    );
  }

  return (
    <div
      className="my-6 p-6 rounded-2xl"
      style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)" }}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          {pick(lang, "Question", "سوال")} {idx + 1} / {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background:
                  i < idx ? "var(--accent-emerald)" : i === idx ? "var(--accent-cyan)" : "var(--border-default)",
              }}
            />
          ))}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
        {pick(lang, q.questionEn, q.questionFa)}
      </h3>

      <div className="space-y-2">
        {pick(lang, q.optionsEn, q.optionsFa).map((opt, i) => {
          const isPicked = picked === i;
          const isAnswer = i === q.correctIndex;
          const showCorrect = picked !== null && isAnswer;
          const showWrong = isPicked && !isAnswer;

          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={picked !== null}
              className="w-full p-3 rounded-xl text-sm text-left transition-all flex items-center gap-3"
              style={{
                background: showCorrect
                  ? "rgba(52,211,153,0.1)"
                  : showWrong
                  ? "rgba(251,113,133,0.1)"
                  : "var(--bg-deepest)",
                border: `1px solid ${
                  showCorrect ? "var(--accent-emerald)" : showWrong ? "var(--accent-rose)" : "var(--border-default)"
                }`,
                color: showCorrect ? "var(--accent-emerald)" : showWrong ? "var(--accent-rose)" : "var(--text-primary)",
                cursor: picked === null ? "pointer" : "default",
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {showCorrect && <CheckCircle2 className="w-5 h-5" />}
              {showWrong && <XCircle className="w-5 h-5" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {picked !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4">
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                background: isCorrect ? "rgba(52,211,153,0.05)" : "rgba(251,113,133,0.05)",
                border: `1px solid ${isCorrect ? "var(--accent-emerald)" : "var(--accent-rose)"}`,
                color: "var(--text-secondary)",
              }}
            >
              {pick(lang, q.explanationEn, q.explanationFa)}
            </div>
            <button
              onClick={next}
              className="mt-3 w-full py-2.5 rounded-lg text-sm font-medium transition hover:opacity-80"
              style={{ background: "var(--accent-cyan)", color: "var(--bg-deepest)" }}
            >
              {isLast ? pick(lang, "See results", "دیدن نتیجه") : pick(lang, "Next question", "سوال بعدی")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
