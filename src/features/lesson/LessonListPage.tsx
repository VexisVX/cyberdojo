import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Zap, BookOpen } from "lucide-react";
import { getLessonsByCategory } from "../../content";
import { useProgressStore } from "../../stores/useProgressStore";
import { Lesson } from "../../types/lesson";

const categoryMeta: Record<string, { title: string; desc: string; color: string }> = {
  network: { title: "Network", desc: "From OSI to HTTP/3 — everything about networking", color: "text-neon-cyan" },
  linux: { title: "Linux", desc: "Filesystem, permissions, processes, scripting", color: "text-neon-green" },
  pro: { title: "Pro / Security", desc: "Security, pentesting, cryptography — professional level", color: "text-neon-purple" },
};

export function LessonListPage() {
  const { category } = useParams<{ category: string }>();
  const lessons = getLessonsByCategory((category || "") as Lesson["category"]);
  const meta = categoryMeta[category || ""] || { title: "Lessons", desc: "", color: "text-neon-cyan" };
  const { isComplete } = useProgressStore();
  const doneCount = lessons.filter((l) => isComplete(l.id)).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-neon-cyan mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-bg-card border border-white/10 flex items-center justify-center">
            <BookOpen className={`w-5 h-5 ${meta.color}`} />
          </div>
          <h1 className="text-3xl font-bold">{meta.title}</h1>
        </div>
        <p className="text-text-muted">{meta.desc}</p>

        <div className="mt-6 mb-8 flex items-center gap-4">
          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-mono text-text-muted">{doneCount}/{lessons.length} · {pct}%</span>
        </div>
      </motion.div>

      <div className="space-y-3">
        {lessons.map((lesson, i) => {
          const done = isComplete(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/${lesson.category}/${lesson.slug}`}
                className="flex items-center gap-4 p-5 rounded-xl bg-bg-card/60 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-neon-green/10 border border-neon-green/30" : "bg-white/5 border border-white/10"}`}>
                  {done ? <Check className="w-5 h-5 text-neon-green" /> : <span className="text-sm font-mono text-text-muted">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-neon-cyan transition">{lesson.title}</h3>
                  <p className="text-sm text-text-muted truncate">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted shrink-0">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}m</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {lesson.xp}</span>
                  <ArrowRight className="w-4 h-4 group-hover:text-neon-cyan transition" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
