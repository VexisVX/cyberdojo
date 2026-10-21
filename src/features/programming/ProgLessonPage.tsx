import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Zap, RotateCcw } from "lucide-react";
import { getLessonBySlug } from "../../content/programming";
import { ProgBlockRenderer } from "../../components/programming/ProgBlockRenderer";
import { useProgressStore } from "../../stores/useProgressStore";
import { useLang, pick } from "../../lib/lang";
import { ProgLang } from "../../types/programming";

export function ProgLessonPage() {
  const { lang: urlLang, slug } = useParams<{ lang: string; slug: string }>();
  const { lang } = useLang();
  const rtl = lang === "fa";
  const navigate = useNavigate();
  const data = getLessonBySlug(urlLang as ProgLang, slug || "");
  const { isComplete, markComplete, unmarkComplete } = useProgressStore();

  if (!data) {
    return (
      <div className="p-8">
        <p style={{ color: "var(--text-muted)" }}>Lesson not found.</p>
        <Link to="/programming" style={{ color: "var(--accent-cyan)" }} className="mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const { chapter, lesson } = data;
  const idx = chapter.lessons.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? chapter.lessons[idx - 1] : null;
  const next = idx < chapter.lessons.length - 1 ? chapter.lessons[idx + 1] : null;
  const done = isComplete(lesson.id);

  return (
    <div className="p-8 grid-bounded bg-soft min-h-full" dir={rtl ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`flex items-center gap-2 text-sm mb-6 font-mono ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
            <Link to="/programming" className="hover:opacity-80">/programming</Link>
            <span>/</span>
            <Link to={`/programming/${chapter.lang}`} className="hover:opacity-80">{chapter.lang}</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>{lesson.slug}</span>
          </div>

          <div className="glass-card rounded-3xl p-8 mb-8">
            <h1 className={`text-4xl font-bold mb-3 ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>
              {pick(lang, lesson.titleEn, lesson.titleFa)}
            </h1>
            <p className={`text-lg mb-6 ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-muted)" }}>
              {pick(lang, lesson.descEn, lesson.descFa)}
            </p>
            <div className={`flex items-center gap-4 text-sm ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lesson.duration} min</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" style={{ color: "var(--accent-violet)" }} /> {lesson.xp} XP</span>
              {done && <span className="flex items-center gap-1.5" style={{ color: "var(--accent-emerald)" }}><Check className="w-4 h-4" /> {pick(lang, "Completed", "تکمیل شده")}</span>}
            </div>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)" }}>
            <article>
              {lesson.blocks.map((block, i) => (
                <ProgBlockRenderer key={i} block={block} index={i} lessonId={lesson.id} />
              ))}
            </article>
          </div>

          {/* Action buttons */}
          <div className="mt-8 space-y-3">
            {!done ? (
              <button
                onClick={() => markComplete(lesson.id, lesson.xp)}
                className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                style={{
                  background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))",
                  border: "2px solid var(--accent-emerald)",
                  color: "var(--accent-emerald)",
                }}
              >
                <Check className="w-5 h-5" /> {pick(lang, `Mark as complete (+${lesson.xp} XP)`, `علامت‌گذاری به‌عنوان تکمیل (+${lesson.xp} XP)`)}
              </button>
            ) : (
              <div className="space-y-2">
                <div
                  className="w-full py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    border: "2px solid var(--accent-emerald)",
                    color: "var(--accent-emerald)",
                  }}
                >
                  <Check className="w-5 h-5" /> {pick(lang, "Lesson completed", "درس تکمیل شد")}
                </div>
                <button
                  onClick={() => unmarkComplete(lesson.id)}
                  className="w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition hover:opacity-80"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border-default)" }}
                >
                  <RotateCcw className="w-4 h-4" /> {pick(lang, "Unmark (clicked by mistake)", "برداشتن علامت (اشتباه زدم)")}
                </button>
              </div>
            )}

            {next && (
              <button
                onClick={() => navigate(`/programming/${chapter.lang}/${next.slug}`)}
                className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))",
                  border: "2px solid var(--accent-cyan)",
                  color: "var(--accent-cyan)",
                }}
              >
                {pick(lang, "Next lesson", "درس بعدی")} <ArrowRight className={`w-5 h-5 ${rtl ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>

          {/* Prev / Next nav */}
          <div className={`mt-8 flex items-center justify-between gap-4 ${rtl ? "flex-row-reverse" : ""}`}>
            {prev ? (
              <button onClick={() => navigate(`/programming/${chapter.lang}/${prev.slug}`)} className={`flex-1 p-4 rounded-xl glass-card group ${rtl ? "text-right" : "text-left"}`}>
                <div className={`text-xs mb-1 flex items-center gap-1 ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
                  <ArrowLeft className={`w-3 h-3 ${rtl ? "rotate-180" : ""}`} /> {pick(lang, "Previous", "قبلی")}
                </div>
                <div className="font-semibold group-hover:opacity-80 transition" style={{ color: "var(--text-primary)" }}>
                  {pick(lang, prev.titleEn, prev.titleFa)}
                </div>
              </button>
            ) : <div className="flex-1" />}
            {next ? (
              <button onClick={() => navigate(`/programming/${chapter.lang}/${next.slug}`)} className={`flex-1 p-4 rounded-xl glass-card group ${rtl ? "text-left" : "text-right"}`}>
                <div className={`text-xs mb-1 flex items-center gap-1 ${rtl ? "justify-start flex-row-reverse" : "justify-end"}`} style={{ color: "var(--text-muted)" }}>
                  {pick(lang, "Next", "بعدی")} <ArrowRight className={`w-3 h-3 ${rtl ? "rotate-180" : ""}`} />
                </div>
                <div className="font-semibold group-hover:opacity-80 transition" style={{ color: "var(--text-primary)" }}>
                  {pick(lang, next.titleEn, next.titleFa)}
                </div>
              </button>
            ) : <div className="flex-1" />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
