import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, pick } from "../../lib/lang";
import { InstallTab } from "../../types/programming";

const icons: Record<string, string> = {
  arch: "🎩",
  ubuntu: "🟠",
  fedora: "🔵",
  windows: "🪟",
  macos: "🍎",
  debian: "🌀",
};

export function InstallTabs({ tabs }: { tabs: InstallTab[] }) {
  const { lang } = useLang();
  const rtl = lang === "fa";
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div
      className="my-6 rounded-2xl overflow-hidden"
      style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)" }}
    >
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b" style={{ borderColor: "var(--border-default)" }}>
        {tabs.map((t, i) => (
          <button
            key={t.os}
            onClick={() => setActive(i)}
            className="relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2"
            style={{
              color: active === i ? "var(--accent-cyan)" : "var(--text-muted)",
              background: active === i ? "rgba(0,212,255,0.05)" : "transparent",
            }}
          >
            <span className="text-base">{icons[t.icon] || "💻"}</span>
            {pick(lang, t.os, t.osFa)}
            {active === i && (
              <motion.div
                layoutId="install-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "var(--accent-cyan)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 space-y-3"
          dir={rtl ? "rtl" : "ltr"}
        >
          {tab.steps.map((step, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-start gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5"
                  style={{ background: "rgba(0,212,255,0.15)", color: "var(--accent-cyan)" }}
                >
                  {i + 1}
                </span>
                <p className={`text-sm leading-relaxed ${rtl ? "text-right" : ""}`} style={{ color: "var(--text-primary)" }}>
                  {pick(lang, step.textEn, step.textFa)}
                </p>
              </div>
              {step.code && (
                <pre
                  className="ml-8 p-3 rounded-lg overflow-x-auto text-xs font-mono"
                  dir="ltr"
                  style={{ background: "var(--bg-deepest)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}
                >
                  <code>{step.code}</code>
                </pre>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
