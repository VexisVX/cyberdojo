import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Zap, Home } from "lucide-react";
import { getLessonBySlug, getLessonsByCategory } from "../../content";
import { LessonBlock } from "../../components/lesson/LessonBlock";
import { useProgressStore } from "../../stores/useProgressStore";

export function LessonPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const lesson = getLessonBySlug(category || "", slug || "");
  const { isComplete, markComplete } = useProgressStore();

  if (!lesson) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link to="/" className="text-neon-cyan mt-4 inline-block">← Back home</Link>
      </div>
    );
  }

  const categoryLessons = getLessonsByCategory(lesson.category);
  const currentIdx = categoryLessons.findIndex((l) => l.id === lesson.id);
  const prev = currentIdx > 0 ? categoryLessons[currentIdx - 1] : null;
  const next = currentIdx < categoryLessons.length - 1 ? categoryLessons[currentIdx + 1] : null;
  const done = isComplete(lesson.id);

  return (
    <div className="p-8 grid-bounded bg-soft min-h-full">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-6 font-mono">
            <Link to="/" className="hover:text-neon-cyan"><Home className="w-4 h-4" /></Link>
            <span>/</span>
            <Link to={`/${lesson.category}`} className="hover:text-neon-cyan capitalize">{lesson.category}</Link>
            <span>/</span>
            <span className="text-text-primary">{lesson.slug}</span>
          </div>

          <div className="glass-card rounded-3xl p-8 mb-8">
            <h1 className="text-4xl font-bold mb-3">{lesson.title}</h1>
            <p className="text-lg text-text-muted mb-6">{lesson.description}</p>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lesson.duration} min</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-neon-purple" /> {lesson.xp} XP</span>
              {done && <span className="flex items-center gap-1.5 text-neon-green"><Check className="w-4 h-4" /> Completed</span>}
            </div>
          </div>

          <div className="bg-bg-panel/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
            <article>
              {lesson.blocks.map((block, i) => (
                <LessonBlock key={i} block={block} />
              ))}
            </article>
          </div>

          <div className="mt-8">
            {!done ? (
              <button onClick={() => markComplete(lesson.id, lesson.xp)} className="w-full py-4 rounded-2xl bg-neon-cyan/10 border-2 border-neon-cyan/30 text-neon-cyan font-semibold hover:bg-neon-cyan/20 transition flex items-center justify-center gap-2 shadow-neon">
                <Check className="w-5 h-5" /> Mark as complete (+{lesson.xp} XP)
              </button>
            ) : (
              <div className="w-full py-4 rounded-2xl bg-neon-green/10 border-2 border-neon-green/30 text-neon-green font-semibold text-center flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> Lesson completed
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            {prev ? (
              <button onClick={() => navigate(`/${prev.category}/${prev.slug}`)} className="flex-1 p-4 rounded-xl glass-card group text-left">
                <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Previous</div>
                <div className="font-semibold group-hover:text-neon-cyan transition">{prev.title}</div>
              </button>
            ) : <div className="flex-1" />}
            {next ? (
              <button onClick={() => navigate(`/${next.category}/${next.slug}`)} className="flex-1 p-4 rounded-xl glass-card group text-right">
                <div className="text-xs text-text-muted mb-1 flex items-center gap-1 justify-end">Next <ArrowRight className="w-3 h-3" /></div>
                <div className="font-semibold group-hover:text-neon-cyan transition">{next.title}</div>
              </button>
            ) : <div className="flex-1" />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
