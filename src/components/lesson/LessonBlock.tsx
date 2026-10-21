import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { LessonBlock as Block } from "../../types/lesson";

const calloutStyles = {
  info: { bg: "bg-neon-cyan/5", border: "border-neon-cyan/30", text: "text-neon-cyan", Icon: Info },
  success: { bg: "bg-neon-green/5", border: "border-neon-green/30", text: "text-neon-green", Icon: CheckCircle },
  warning: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-400", Icon: AlertTriangle },
  danger: { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-400", Icon: AlertCircle },
};

export function LessonBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl font-bold mt-10 mb-4 first:mt-0 text-text-primary">
          {block.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-text-muted leading-relaxed mb-4 text-[15px]">
          {block.content}
        </p>
      );
    case "code":
      return (
        <div className="mb-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
          <div className="px-4 py-2 bg-bg-panel/80 border-b border-white/5 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[11px] font-mono text-text-muted uppercase">
              {block.lang || "text"}
            </span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-[#e6edf3] leading-relaxed whitespace-pre">
              {block.content}
            </code>
          </pre>
        </div>
      );
    case "list":
      return (
        <ul className="mb-6 space-y-2">
          {block.items?.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 text-text-muted text-[15px]"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      );
    case "callout": {
      const style = calloutStyles[block.variant || "info"];
      return (
        <div className={`my-6 p-4 rounded-xl ${style.bg} border ${style.border} flex gap-3`}>
          <style.Icon className={`w-5 h-5 ${style.text} shrink-0 mt-0.5`} />
          <p className="text-sm leading-relaxed text-text-primary">{block.content}</p>
        </div>
      );
    }
    default:
      return null;
  }
}
