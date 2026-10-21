import { useEffect } from "react";
import { Flame, Zap, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useProgressStore } from "../../stores/useProgressStore";
import { useLang } from "../../lib/lang";

export function Topbar() {
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.streak);
  const awardStreak = useProgressStore((s) => s.awardStreak);
  const { lang, toggle } = useLang();

  // Award streak on mount (only once per day)
  useEffect(() => {
    awardStreak();
  }, [awardStreak]);

  return (
    <header className="h-14 shrink-0 topbar-bg flex items-center justify-between px-6 z-10">
      <div className="text-sm font-mono flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
        <span style={{ color: "var(--accent-emerald)" }}>~</span>
        <span style={{ color: "var(--text-secondary)" }}>welcome back, hacker</span>
        <span className="animate-pulse" style={{ color: "var(--accent-cyan)" }}>▌</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "EN" : "FA"}
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)", color: "var(--accent-amber)" }} title={`${streak} day streak`}>
          <Flame className="w-3.5 h-3.5" />
          {streak}
        </div>
        <motion.div
          key={xp}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)", color: "var(--accent-violet)" }}
        >
          <Zap className="w-3.5 h-3.5" />
          {xp} XP
        </motion.div>
      </div>
    </header>
  );
}
