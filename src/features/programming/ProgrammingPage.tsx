import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Coffee, ArrowRight } from "lucide-react";
import { useLang, pick } from "../../lib/lang";
import { GlassCard } from "../../components/ui/GlassCard";

const languages = [
  {
    id: "java",
    name: "Java",
    icon: Coffee,
    accent: "var(--accent-amber)",
    glow: "rgba(251, 191, 36, 0.35)",
    descEn: "Object-oriented, runs everywhere. The backbone of enterprise.",
    descFa: "شی‌گرا، همه‌جا اجرا می‌شه. ستون فقرات enterprise.",
    count: 1,
  },
];

export function ProgrammingPage() {
  const { lang } = useLang();
  const rtl = lang === "fa";

  return (
    <div className="p-8 max-w-6xl mx-auto" dir={rtl ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className={`flex items-center gap-3 mb-2 ${rtl ? "flex-row-reverse" : ""}`}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(251,191,36,0.15), transparent)",
              border: "1px solid var(--accent-amber)",
              boxShadow: "0 0 20px rgba(251,191,36,0.2)",
            }}
          >
            <Code2 className="w-5 h-5" style={{ color: "var(--accent-amber)" }} />
          </div>
          <h1 className={`text-3xl font-bold ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>
            {pick(lang, "Programming", "برنامه‌نویسی")}
          </h1>
        </div>
        <p className={`${rtl ? "text-right" : ""}`} style={{ color: "var(--text-muted)" }}>
          {pick(lang, "Learn to code — from basics to advanced", "یادگیری کد — از مقدماتی تا پیشرفته")}
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {languages.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link to={`/programming/${l.id}`} className="block">
              <GlassCard className="p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${l.glow}, transparent)`,
                      border: `1px solid ${l.accent}`,
                      boxShadow: `0 0 24px ${l.glow}`,
                    }}
                  >
                    <l.icon className="w-7 h-7" style={{ color: l.accent }} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
                    {l.count} {pick(lang, "chapter", "فصل")}
                  </span>
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 transition-colors ${rtl ? "text-right" : ""}`}
                  style={{ color: "var(--text-primary)" }}
                >
                  {l.name}
                </h3>
                <p className={`text-sm mb-4 ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-muted)" }}>
                  {pick(lang, l.descEn, l.descFa)}
                </p>
                <div
                  className={`flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${rtl ? "flex-row-reverse" : ""}`}
                  style={{ color: l.accent }}
                >
                  {pick(lang, "Start learning", "شروع یادگیری")}
                  <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
