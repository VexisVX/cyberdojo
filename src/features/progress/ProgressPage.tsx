import { motion } from "framer-motion";
import { Zap, Flame, Trophy, BookOpen, Code2 } from "lucide-react";
import { useProgressStore } from "../../stores/useProgressStore";

export function ProgressPage() {
  const { xp, streak, completed, projectDone, quizScore } = useProgressStore();
  const lessonsDone = Object.keys(completed).length;
  const projectsDone = Object.keys(projectDone).filter((id) => projectDone[id] > 0).length;
  const quizzesPassed = Object.values(quizScore).filter((p) => p >= 70).length;

  const stats = [
    { label: "Total XP", value: xp, icon: Zap, color: "var(--accent-violet)" },
    { label: "Streak", value: `${streak} days`, icon: Flame, color: "var(--accent-amber)" },
    { label: "Lessons", value: lessonsDone, icon: BookOpen, color: "var(--accent-cyan)" },
    { label: "Projects", value: projectsDone, icon: Code2, color: "var(--accent-emerald)" },
    { label: "Quizzes passed", value: quizzesPassed, icon: Trophy, color: "var(--accent-rose)" },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Progress
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl"
              style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)" }}
            >
              <s.icon className="w-5 h-5 mb-3" style={{ color: s.color }} />
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
