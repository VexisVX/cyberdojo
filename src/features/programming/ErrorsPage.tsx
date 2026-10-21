import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, AlertCircle, Search } from "lucide-react";
import { useLang, pick } from "../../lib/lang";
import { javaErrors } from "../../content/programming/java/errors";
import { ErrorSeverity } from "../../types/programming-extra";
import { GlassCard } from "../../components/ui/GlassCard";

const severityMeta: Record<ErrorSeverity, { labelEn: string; labelFa: string; color: string; bg: string }> = {
  common: { labelEn: "Common", labelFa: "رایج", color: "var(--accent-emerald)", bg: "rgba(52,211,153,0.15)" },
  tricky: { labelEn: "Tricky", labelFa: "پیچیده", color: "var(--accent-amber)", bg: "rgba(251,191,36,0.15)" },
  advanced: { labelEn: "Advanced", labelFa: "پیشرفته", color: "var(--accent-rose)", bg: "rgba(251,113,133,0.15)" },
};

export function ErrorsPage() {
  const { lang } = useLang();
  const rtl = lang === "fa";
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = javaErrors.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q) ||
      e.causeEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8 max-w-5xl mx-auto" dir={rtl ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/programming/java" className={`inline-flex items-center gap-2 text-sm mb-6 transition hover:opacity-80 ${rtl ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} /> {pick(lang, "Back to Java", "بازگشت به جاوا")}
        </Link>

        <div className={`flex items-center gap-3 mb-2 ${rtl ? "flex-row-reverse" : ""}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,113,133,0.15)", border: "1px solid var(--accent-rose)" }}>
            <AlertTriangle className="w-5 h-5" style={{ color: "var(--accent-rose)" }} />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {pick(lang, "Java Errors", "خطاهای جاوا")}
          </h1>
        </div>
        <p className={`mb-6 ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-muted)" }}>
          {pick(lang, "The errors every Java beginner hits — and how to fix them.", "خطاهایی که هر مبتدی جاوا می‌بیند — و چطور حلشان کنیم.")}
        </p>

        <div className="relative mb-6">
          <Search className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-subtle)", left: rtl ? "auto" : 12, right: rtl ? 12 : "auto" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={pick(lang, "Search errors...", "جستجوی خطا...")}
            className="w-full py-2.5 rounded-xl outline-none transition"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border-default)",
              color: "var(--text-primary)",
              paddingLeft: rtl ? 12 : 40,
              paddingRight: rtl ? 40 : 12,
            }}
          />
        </div>

        <div className="space-y-3">
          {filtered.map((err, i) => {
            const isOpen = openId === err.id;
            const sev = severityMeta[err.severity];
            return (
              <motion.div
                key={err.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <GlassCard className="overflow-hidden">
                  <button
                    onClick={() => setOpenId(isOpen ? null : err.id)}
                    className={`w-full p-5 flex items-center gap-3 text-left ${rtl ? "flex-row-reverse" : ""}`}
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" style={{ color: sev.color }} />
                    <div className={`flex-1 ${rtl ? "text-right" : ""}`}>
                      <div className={`flex items-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
                        <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                          {pick(lang, err.title, err.titleFa)}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: sev.bg, color: sev.color }}>
                          {pick(lang, sev.labelEn, sev.labelFa)}
                        </span>
                      </div>
                      <code className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{err.message}</code>
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-5 pb-5 space-y-4"
                      style={{ borderTop: "1px solid var(--border-default)", paddingTop: 16 }}
                    >
                      <div>
                        <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--accent-amber)" }}>
                          {pick(lang, "Cause", "علت")}
                        </div>
                        <p className={`text-sm leading-relaxed ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-secondary)" }}>
                          {pick(lang, err.causeEn, err.causeFa)}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--accent-emerald)" }}>
                          {pick(lang, "Fix", "راه‌حل")}
                        </div>
                        <p className={`text-sm leading-relaxed ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-secondary)" }}>
                          {pick(lang, err.fixEn, err.fixFa)}
                        </p>
                      </div>
                      {err.wrongCode && (
                        <div>
                          <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--accent-rose)" }}>
                            {pick(lang, "Wrong", "غلط")}
                          </div>
                          <pre className="p-3 rounded-lg overflow-x-auto text-xs font-mono" dir="ltr" style={{ background: "var(--bg-deepest)", border: "1px solid var(--accent-rose)", color: "var(--text-secondary)" }}>
                            <code>{err.wrongCode}</code>
                          </pre>
                        </div>
                      )}
                      {err.rightCode && (
                        <div>
                          <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--accent-emerald)" }}>
                            {pick(lang, "Correct", "درست")}
                          </div>
                          <pre className="p-3 rounded-lg overflow-x-auto text-xs font-mono" dir="ltr" style={{ background: "var(--bg-deepest)", border: "1px solid var(--accent-emerald)", color: "var(--text-secondary)" }}>
                            <code>{err.rightCode}</code>
                          </pre>
                        </div>
                      )}
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
