import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Eye, EyeOff, Check, Clock, Zap, ListChecks, Trophy } from "lucide-react";
import { useLang, pick } from "../../lib/lang";
import { javaProjects } from "../../content/programming/java/projects";
import { useProgressStore } from "../../stores/useProgressStore";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const rtl = lang === "fa";
  const project = javaProjects.find((p) => p.slug === slug);
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());
  const [showSolution, setShowSolution] = useState(false);
  const { isProjectStepDone, toggleProjectStep, getProjectSteps } = useProgressStore();

  if (!project) {
    return (
      <div className="p-8">
        <p style={{ color: "var(--text-muted)" }}>Project not found.</p>
        <Link to="/programming/java/projects" style={{ color: "var(--accent-cyan)" }} className="mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const completedSteps = getProjectSteps(project.id);
  const progressPct = Math.round((completedSteps.length / project.steps.length) * 100);
  const isDone = completedSteps.length === project.steps.length;
  const stepXp = Math.floor(project.xp / project.steps.length);
  const earnedXp = Math.min(project.xp, completedSteps.length * stepXp) + (isDone ? Math.floor(project.xp * 0.5) : 0);

  const toggleHint = (i: number) => {
    const next = new Set(revealedHints);
    if (next.has(i)) next.delete(i); else next.add(i);
    setRevealedHints(next);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto" dir={rtl ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/programming/java/projects" className={`inline-flex items-center gap-2 text-sm mb-6 transition hover:opacity-80 ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} /> {pick(lang, "All projects", "همه پروژه‌ها")}
        </Link>

        <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {pick(lang, project.titleEn, project.titleFa)}
        </h1>
        <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
          {pick(lang, project.descEn, project.descFa)}
        </p>

        <div className={`flex items-center gap-4 text-sm mb-6 pb-6 ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-default)" }}>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {project.duration} min</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" style={{ color: "var(--accent-amber)" }} /> {project.xp} XP total</span>
          <span className="flex items-center gap-1.5"><ListChecks className="w-4 h-4" /> {project.steps.length} steps</span>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span style={{ color: "var(--text-muted)" }}>
              {pick(lang, "Progress", "پیشرفت")}: {completedSteps.length} / {project.steps.length}
            </span>
            <span className="flex items-center gap-1 font-mono" style={{ color: "var(--accent-amber)" }}>
              <Zap className="w-3.5 h-3.5" /> +{earnedXp} XP
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-overlay)" }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
              style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))" }}
            />
          </div>
        </div>

        {isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl flex items-center gap-3"
            style={{ background: "rgba(52,211,153,0.1)", border: "1px solid var(--accent-emerald)" }}
          >
            <Trophy className="w-6 h-6" style={{ color: "var(--accent-emerald)" }} />
            <div>
              <div className="font-semibold" style={{ color: "var(--accent-emerald)" }}>
                {pick(lang, "Project completed!", "پروژه تکمیل شد!")}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {pick(lang, "Bonus +50% earned", "پاداش +۵۰٪ گرفتی")}
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-8">
          <div className="text-xs font-semibold uppercase mb-2" style={{ color: "var(--accent-cyan)" }}>
            {pick(lang, "You will practice", "تمرین می‌کنی")}
          </div>
          <div className={`flex flex-wrap gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
            {pick(lang, project.conceptsEn, project.conceptsFa).map((c, i) => (
              <span key={i} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent-cyan)", border: "1px solid rgba(0,212,255,0.3)" }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          {pick(lang, "Step-by-step", "گام به گام")}
        </h2>
        <div className="space-y-3">
          {project.steps.map((step, i) => {
            const done = isProjectStepDone(project.id, i);
            const hintRevealed = revealedHints.has(i);
            return (
              <div key={i} className="p-5 rounded-2xl transition" style={{ background: "var(--bg-raised)", border: `1px solid ${done ? "var(--accent-emerald)" : "var(--border-default)"}` }}>
                <div className={`flex items-start gap-3 ${rtl ? "flex-row-reverse" : ""}`}>
                  <button
                    onClick={() => toggleProjectStep(project.id, i, project.steps.length, project.xp)}
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition hover:scale-110"
                    style={{
                      background: done ? "var(--accent-emerald)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${done ? "var(--accent-emerald)" : "var(--border-default)"}`,
                    }}
                  >
                    {done ? <Check className="w-4 h-4" style={{ color: "var(--bg-deepest)" }} /> : <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{i + 1}</span>}
                  </button>
                  <div className={`flex-1 ${rtl ? "text-right" : ""}`}>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-primary)", textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }}>
                      {pick(lang, step.stepEn, step.stepFa)}
                    </p>
                    {(step.hintEn || step.hintFa) && (
                      <button onClick={() => toggleHint(i)} className={`flex items-center gap-1.5 text-xs mb-2 transition hover:opacity-80 ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--accent-amber)" }}>
                        <Lightbulb className="w-3.5 h-3.5" />
                        {hintRevealed ? pick(lang, "Hide hint", "بستن راهنما") : pick(lang, "Show hint", "نمایش راهنما")}
                      </button>
                    )}
                    {hintRevealed && (
                      <div className={`p-2.5 rounded-lg text-xs mb-2 ${rtl ? "text-right" : ""}`} style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", color: "var(--text-secondary)" }}>
                        💡 {pick(lang, step.hintEn, step.hintFa)}
                      </div>
                    )}
                    {step.code && (
                      <pre className="p-3 rounded-lg overflow-x-auto text-xs font-mono" dir="ltr" style={{ background: "var(--bg-deepest)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
                        <code>{step.code}</code>
                      </pre>
                    )}
                  </div>
                  {done && (
                    <span className="text-xs font-mono shrink-0" style={{ color: "var(--accent-emerald)" }}>
                      +{stepXp} XP
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button onClick={() => setShowSolution(!showSolution)} className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${rtl ? "flex-row-reverse" : ""}`} style={{
            background: showSolution ? "rgba(52,211,153,0.1)" : "rgba(167,139,250,0.1)",
            border: `1px solid ${showSolution ? "var(--accent-emerald)" : "var(--accent-violet)"}`,
            color: showSolution ? "var(--accent-emerald)" : "var(--accent-violet)",
          }}>
            {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showSolution ? pick(lang, "Hide solution", "بستن راه‌حل") : pick(lang, "Reveal solution", "نمایش راه‌حل")}
          </button>

          {showSolution && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 space-y-4">
              {project.solution.map((file) => (
                <div key={file.name} className="rounded-xl overflow-hidden" style={{ background: "#0d1117", border: "1px solid var(--border-default)" }}>
                  <div className="px-4 py-2 flex items-center gap-2" style={{ background: "var(--bg-raised)", borderBottom: "1px solid var(--border-default)" }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>{file.name}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto" dir="ltr">
                    <code className="text-sm font-mono leading-relaxed whitespace-pre" style={{ color: "#e6edf3" }}>{file.content}</code>
                  </pre>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
