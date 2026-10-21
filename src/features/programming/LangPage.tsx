import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Zap, AlertTriangle, FolderCode } from "lucide-react";
import { getChaptersByLang } from "../../content/programming";
import { useLang, pick } from "../../lib/lang";
import { ProgLang, ProgLevel, ProgCategory } from "../../types/programming";
import { useProgressStore } from "../../stores/useProgressStore";
import { GlassCard } from "../../components/ui/GlassCard";

const levels: Record<ProgLevel, { en: string; fa: string; color: string; bg: string }> = {
  easy: { en: "Easy", fa: "آسان", color: "var(--accent-emerald)", bg: "rgba(52,211,153,0.15)" },
  medium: { en: "Medium", fa: "متوسط", color: "var(--accent-amber)", bg: "rgba(251,191,36,0.15)" },
  hard: { en: "Hard", fa: "پیشرفته", color: "var(--accent-rose)", bg: "rgba(251,113,133,0.15)" },
};

const CATEGORIES: { id: ProgCategory | "all"; en: string; fa: string }[] = [
  { id: "all", en: "All", fa: "همه" },
  { id: "basics", en: "Basics", fa: "مقدماتی" },
  { id: "oop", en: "OOP", fa: "شی‌گرا" },
  { id: "advanced", en: "Advanced", fa: "پیشرفته" },
  { id: "project", en: "Projects", fa: "پروژه" },
];

export function LangPage() {
  const params = useParams<{ lang?: string }>();
  const location = useLocation();
  const { lang } = useLang();
  const rtl = lang === "fa";
  const { isComplete } = useProgressStore();
  const [activeCat, setActiveCat] = useState<ProgCategory | "all">("all");

  // Get lang from params or fallback from URL
  let urlLang = params.lang;
  if (!urlLang) {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] === "programming" && parts[1]) urlLang = parts[1];
  }

  const chapters = urlLang ? getChaptersByLang(urlLang as ProgLang) : [];

  if (!chapters || chapters.length === 0) {
    return (
      <div className="p-8 max-w-3xl mx-auto" dir={rtl ? "rtl" : "ltr"}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--accent-rose)" }}>
          {pick(lang, "No chapters yet", "هنوز فصلی وجود ندارد")}
        </h1>
        <div className="p-4 rounded-xl mb-4" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: 13 }}>
          <p>urlLang = <strong>{String(urlLang)}</strong></p>
        </div>
        <Link to="/programming" style={{ color: "var(--accent-cyan)" }} className="inline-block mt-4">
          ← {pick(lang, "Back", "بازگشت")}
        </Link>
      </div>
    );
  }

  const allLessons = chapters.flatMap((c) => c.lessons);
  const totalCount = allLessons.length;
  const filteredCount = activeCat === "all" ? totalCount : allLessons.filter((l) => l.category === activeCat).length;

  return (
    <div className="p-8 max-w-5xl mx-auto" dir={rtl ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Back link */}
        <Link
          to="/programming"
          className={`inline-flex items-center gap-2 text-sm mb-6 transition hover:opacity-80 ${rtl ? "flex-row-reverse" : ""}`}
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
          {pick(lang, "Back to Programming", "بازگشت به برنامه‌نویسی")}
        </Link>

        {/* Header */}
        <div className={`flex items-center gap-3 mb-6 ${rtl ? "flex-row-reverse" : ""}`}>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(251,191,36,0.2), transparent)",
              border: "1px solid var(--accent-amber)",
              boxShadow: "0 0 24px rgba(251,191,36,0.2)",
            }}
          >
            <BookOpen className="w-6 h-6" style={{ color: "var(--accent-amber)" }} />
          </div>
          <div className={rtl ? "text-right" : ""}>
            <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {urlLang === "java" ? "Java" : urlLang}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {totalCount} {pick(lang, "lessons", "درس")}
            </p>
          </div>
        </div>

        {/* Special cards for Java */}
        {urlLang === "java" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            <Link to="/programming/java/errors" className="block">
              <GlassCard className={`p-5 group flex items-center gap-4 ${rtl ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(251,113,133,0.15)", border: "1px solid var(--accent-rose)" }}
                >
                  <AlertTriangle className="w-5 h-5" style={{ color: "var(--accent-rose)" }} />
                </div>
                <div className={`flex-1 ${rtl ? "text-right" : ""}`}>
                  <h3 className="font-semibold mb-0.5 transition group-hover:opacity-80" style={{ color: "var(--text-primary)" }}>
                    {pick(lang, "Common Errors", "خطاهای رایج")}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {pick(lang, "Every beginner's error, explained", "هر خطای مبتدی، توضیح داده شده")}
                  </p>
                </div>
                <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} style={{ color: "var(--text-muted)" }} />
              </GlassCard>
            </Link>

            <Link to="/programming/java/projects" className="block">
              <GlassCard className={`p-5 group flex items-center gap-4 ${rtl ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,212,255,0.15)", border: "1px solid var(--accent-cyan)" }}
                >
                  <FolderCode className="w-5 h-5" style={{ color: "var(--accent-cyan)" }} />
                </div>
                <div className={`flex-1 ${rtl ? "text-right" : ""}`}>
                  <h3 className="font-semibold mb-0.5 transition group-hover:opacity-80" style={{ color: "var(--text-primary)" }}>
                    {pick(lang, "Hands-on Projects", "پروژه‌های عملی")}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {pick(lang, "Build real programs step by step", "برنامه‌های واقعی گام‌به‌گام بساز")}
                  </p>
                </div>
                <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} style={{ color: "var(--text-muted)" }} />
              </GlassCard>
            </Link>
          </div>
        )}

        {/* Category filter */}
        <div className={`flex gap-2 mb-8 flex-wrap items-center ${rtl ? "flex-row-reverse" : ""}`}>
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--accent-cyan)" : "var(--text-muted)",
                  background: active ? "rgba(0,212,255,0.1)" : "transparent",
                  border: `1px solid ${active ? "var(--accent-cyan)" : "var(--border-default)"}`,
                }}
              >
                {pick(lang, cat.en, cat.fa)}
              </button>
            );
          })}
          <span className={`text-xs font-mono ${rtl ? "mr-auto" : "ml-auto"}`} style={{ color: "var(--text-subtle)" }}>
            {filteredCount} / {totalCount}
          </span>
        </div>

        {/* Lessons */}
        {chapters.map((ch) => {
          const filtered = ch.lessons.filter((l) => activeCat === "all" || l.category === activeCat);
          if (filtered.length === 0) return null;

          return (
            <div key={ch.id} className="mb-10">
              <div className={`flex items-center gap-3 mb-4 ${rtl ? "flex-row-reverse" : ""}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center glass-card">
                  <BookOpen className="w-4 h-4" style={{ color: "var(--accent-cyan)" }} />
                </div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {pick(lang, ch.titleEn, ch.titleFa)}
                </h2>
              </div>

              <div className="space-y-3">
                {filtered.map((lesson, i) => {
                  const done = isComplete(lesson.id);
                  const lvl = lesson.level ? levels[lesson.level] : null;

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link to={`/programming/${ch.lang}/${lesson.slug}`} className="block">
                        <GlassCard className={`flex items-center gap-4 p-5 group ${rtl ? "flex-row-reverse" : ""}`}>
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: done ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
                              border: `1px solid ${done ? "var(--accent-emerald)" : "var(--border-default)"}`,
                            }}
                          >
                            <span className="text-sm font-mono" style={{ color: done ? "var(--accent-emerald)" : "var(--text-muted)" }}>
                              {i + 1}
                            </span>
                          </div>

                          <div className={`flex-1 min-w-0 ${rtl ? "text-right" : ""}`}>
                            <div className={`flex items-center gap-2 mb-1 ${rtl ? "flex-row-reverse" : ""}`}>
                              <h3 className="font-semibold transition group-hover:opacity-80" style={{ color: "var(--text-primary)" }}>
                                {pick(lang, lesson.titleEn, lesson.titleFa)}
                              </h3>
                              {lvl && (
                                <span
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                                  style={{ background: lvl.bg, color: lvl.color }}
                                >
                                  {pick(lang, lvl.en, lvl.fa)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                              {pick(lang, lesson.descEn, lesson.descFa)}
                            </p>
                          </div>

                          <div
                            className={`flex items-center gap-3 text-xs shrink-0 ${rtl ? "flex-row-reverse" : ""}`}
                            style={{ color: "var(--text-muted)" }}
                          >
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {lesson.duration}m
                            </span>
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3" /> {lesson.xp}
                            </span>
                            <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                          </div>
                        </GlassCard>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
