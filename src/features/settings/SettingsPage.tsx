import { motion } from "framer-motion";
import { Palette, AlertTriangle, Info, Check } from "lucide-react";
import { useThemeStore } from "../../stores/useThemeStore";
import { THEMES, ThemeName } from "../../lib/theme";
import { useProgressStore } from "../../stores/useProgressStore";

export function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const reset = useProgressStore((s) => s.reset);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="mt-1" style={{ color: "var(--text-muted)" }}>Customize your experience</p>
      </motion.div>

      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5" style={{ color: "var(--accent-cyan)" }} />
          <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Theme</h2>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Choose your theme</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.keys(THEMES) as ThemeName[]).map((name) => {
            const th = THEMES[name];
            const isActive = theme === name;
            return (
              <button
                key={name}
                onClick={() => setTheme(name)}
                className="relative p-4 rounded-xl border-2 text-left transition-all"
                style={{
                  background: th.colors.bgBase,
                  borderColor: isActive ? "var(--accent-cyan)" : th.colors.borderDefault,
                  boxShadow: isActive ? "0 0 20px var(--glow-cyan)" : "none",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{th.emoji}</span>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: th.colors.accentCyan }}>
                      <Check className="w-4 h-4" style={{ color: th.colors.bgDeepest }} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="font-semibold mb-2" style={{ color: th.colors.textPrimary }}>{th.label}</div>
                <div className="flex gap-1">
                  <span className="w-5 h-5 rounded-full border" style={{ background: th.colors.accentCyan, borderColor: th.colors.borderDefault }} />
                  <span className="w-5 h-5 rounded-full border" style={{ background: th.colors.accentViolet, borderColor: th.colors.borderDefault }} />
                  <span className="w-5 h-5 rounded-full border" style={{ background: th.colors.accentEmerald, borderColor: th.colors.borderDefault }} />
                  <span className="w-5 h-5 rounded-full border" style={{ background: th.colors.accentRose, borderColor: th.colors.borderDefault }} />
                  <span className="w-5 h-5 rounded-full border" style={{ background: th.colors.accentAmber, borderColor: th.colors.borderDefault }} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5" style={{ color: "var(--accent-violet)" }} />
          <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>About</h2>
        </div>
        <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-default)" }}>
          <div>
            <div className="font-mono" style={{ color: "var(--accent-cyan)" }}>CyberDojo</div>
            <div className="text-xs font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>Tauri 2 + React + TS</div>
          </div>
          <div className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>Version 0.1.0</div>
        </div>
      </section>

      <section className="mt-10 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5" style={{ color: "var(--accent-rose)" }} />
          <h2 className="text-xl font-semibold" style={{ color: "var(--accent-rose)" }}>Danger Zone</h2>
        </div>
        <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: "rgba(251,113,133,0.05)", border: "1px solid var(--accent-rose)" }}>
          <div>
            <div className="font-semibold" style={{ color: "var(--text-primary)" }}>Reset all progress</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Are you sure? This will wipe all XP.</div>
          </div>
          <button
            onClick={() => { if (confirm("Reset all progress?")) reset(); }}
            className="px-4 py-2 rounded-lg text-sm font-mono transition hover:opacity-80"
            style={{ background: "rgba(251,113,133,0.15)", border: "1px solid var(--accent-rose)", color: "var(--accent-rose)" }}
          >
            reset
          </button>
        </div>
      </section>
    </div>
  );
}
