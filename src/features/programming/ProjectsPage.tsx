import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FolderCode, Clock, Zap } from "lucide-react";
import { useLang, pick } from "../../lib/lang";
import { javaProjects } from "../../content/programming/java/projects";
import { GlassCard } from "../../components/ui/GlassCard";

const levelColor: Record<string, string> = {
  easy: "var(--accent-emerald)",
  medium: "var(--accent-amber)",
  hard: "var(--accent-rose)",
};

export function ProjectsPage() {
  const { lang } = useLang();
  const rtl = lang === "fa";

  return (
    <div className="p-8 max-w-5xl mx-auto" dir={rtl ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/programming/java" className={`inline-flex items-center gap-2 text-sm mb-6 transition hover:opacity-80 ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} /> {pick(lang, "Back to Java", "بازگشت به جاوا")}
        </Link>

        <div className={`flex items-center gap-3 mb-2 ${rtl ? "flex-row-reverse" : ""}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.15)", border: "1px solid var(--accent-cyan)" }}>
            <FolderCode className="w-5 h-5" style={{ color: "var(--accent-cyan)" }} />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {pick(lang, "Java Projects", "پروژه‌های جاوا")}
          </h1>
        </div>
        <p className={`mb-8 ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-muted)" }}>
          {pick(lang, "Hands-on projects with step-by-step hints and solutions.", "پروژه‌های عملی با راهنمای گام‌به‌گام و راه‌حل.")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {javaProjects.map((p, i) => {
            const color = levelColor[p.level];
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/programming/java/projects/${p.slug}`} className="block">
                  <GlassCard className="p-6 group h-full">
                    <div className={`flex items-start justify-between mb-3 ${rtl ? "flex-row-reverse" : ""}`}>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase" style={{ background: `${color}20`, color }}>
                        {p.level}
                      </span>
                      <span className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
                        <Zap className="w-3 h-3 inline" /> {p.xp} XP
                      </span>
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 group-hover:opacity-80 transition ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>
                      {pick(lang, p.titleEn, p.titleFa)}
                    </h3>
                    <p className={`text-sm mb-3 leading-relaxed ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-muted)" }}>
                      {pick(lang, p.descEn, p.descFa)}
                    </p>
                    <div className={`flex items-center gap-3 text-xs ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.duration} min</span>
                      <span className="flex items-center gap-1">
                        <ArrowRight className={`w-3 h-3 ${rtl ? "rotate-180" : ""}`} />
                        {p.steps.length} {pick(lang, "steps", "مرحله")}
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
