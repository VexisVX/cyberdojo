import { motion } from "framer-motion";
import { Info, CheckCircle, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";
import { ProgBlock } from "../../types/programming";
import { useLang, pick } from "../../lib/lang";
import { InstallTabs } from "./InstallTabs";
import { Quiz } from "./Quiz";

const calloutStyles = {
  info: { bg: "rgba(0,212,255,0.05)", border: "var(--accent-cyan)", color: "var(--accent-cyan)", Icon: Info },
  success: { bg: "rgba(52,211,153,0.05)", border: "var(--accent-emerald)", color: "var(--accent-emerald)", Icon: CheckCircle },
  warning: { bg: "rgba(251,191,36,0.05)", border: "var(--accent-amber)", color: "var(--accent-amber)", Icon: AlertTriangle },
  danger: { bg: "rgba(251,113,133,0.05)", border: "var(--accent-rose)", color: "var(--accent-rose)", Icon: AlertCircle },
};

export function ProgBlockRenderer({ block, index, lessonId }: { block: ProgBlock; index: number; lessonId?: string }) {
  const { lang } = useLang();
  const rtl = lang === "fa";
  const content = pick(lang, block.en, block.fa) || "";
  const items = pick(lang, block.itemsEn, block.itemsFa) || [];

  const anim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.04 },
  };

  switch (block.type) {
    case "heading":
      return (
        <motion.h2 {...anim} className={`text-2xl font-bold mt-10 mb-4 first:mt-0 ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>
          {content}
        </motion.h2>
      );

    case "paragraph":
      return (
        <motion.p {...anim} className={`leading-loose mb-4 text-[15px] ${rtl ? "text-right" : ""}`} dir={rtl ? "rtl" : "ltr"} style={{ color: "var(--text-secondary)" }}>
          {content}
        </motion.p>
      );

    case "code":
      return (
        <motion.div {...anim} className="mb-6 rounded-xl overflow-hidden" style={{ background: "#0d1117", border: "1px solid var(--border-default)" }}>
          <div className="px-4 py-2 flex items-center gap-2" style={{ background: "var(--bg-raised)", borderBottom: "1px solid var(--border-default)" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[11px] font-mono uppercase" style={{ color: "var(--text-muted)" }}>{block.lang || "code"}</span>
          </div>
          <pre className="p-4 overflow-x-auto" dir="ltr">
            <code className="text-sm font-mono leading-relaxed whitespace-pre" style={{ color: "#e6edf3" }}>{block.code}</code>
          </pre>
        </motion.div>
      );

    case "list":
      return (
        <ul className={`mb-6 space-y-2 ${rtl ? "text-right" : ""}`} dir={rtl ? "rtl" : "ltr"}>
          {items.map((item, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: rtl ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 text-[15px]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent-cyan)" }} />
              <span className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item}</span>
            </motion.li>
          ))}
        </ul>
      );

    case "callout": {
      const s = calloutStyles[block.variant || "info"];
      return (
        <motion.div {...anim} className="my-6 p-4 rounded-xl flex gap-3" dir={rtl ? "rtl" : "ltr"} style={{ background: s.bg, border: `1px solid ${s.border}` }}>
          <s.Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: s.color }} />
          <p className={`text-sm leading-relaxed ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>{content}</p>
        </motion.div>
      );
    }

    case "tip":
      return (
        <motion.div {...anim} className="my-6 p-4 rounded-xl flex gap-3" dir={rtl ? "rtl" : "ltr"} style={{ background: "rgba(167,139,250,0.05)", border: "1px solid var(--accent-violet)" }}>
          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent-violet)" }} />
          <p className={`text-sm leading-relaxed ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>{content}</p>
        </motion.div>
      );

    case "tabs":
      return block.tabs ? <motion.div {...anim}><InstallTabs tabs={block.tabs} /></motion.div> : null;

    case "quiz":
      return block.questions ? <motion.div {...anim}><Quiz questions={block.questions} lessonId={lessonId} xpReward={15} /></motion.div> : null;

    default:
      return null;
  }
}
