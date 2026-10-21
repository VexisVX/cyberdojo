// ============================================================
//  CyberDojo — Professional Color System
//  Inspired by Tokyo Night / Linear / Vercel
// ============================================================

export type ThemeName = "midnight" | "matrix" | "ocean" | "sunset" | "light";

export interface ThemeColors {
  // Surfaces (3 levels of depth)
  bgDeepest: string;   // outermost background
  bgBase: string;      // panels, cards base
  bgRaised: string;    // elevated cards, hover
  bgOverlay: string;   // popovers, tooltips

  // Borders (subtle → visible)
  borderSubtle: string;
  borderDefault: string;
  borderStrong: string;

  // Text (4 levels)
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textSubtle: string;

  // Accents
  accentCyan: string;
  accentViolet: string;
  accentEmerald: string;
  accentRose: string;
  accentAmber: string;

  // Glows (rgba versions for shadows)
  glowCyan: string;
  glowViolet: string;
  glowEmerald: string;
}

export const THEMES: Record<ThemeName, { label: string; emoji: string; colors: ThemeColors }> = {
  midnight: {
    label: "Midnight",
    emoji: "🌙",
    colors: {
      bgDeepest: "#0a0e1a",
      bgBase: "#11151f",
      bgRaised: "#1a1f2e",
      bgOverlay: "#232838",

      borderSubtle: "rgba(255,255,255,0.04)",
      borderDefault: "rgba(255,255,255,0.08)",
      borderStrong: "rgba(255,255,255,0.14)",

      textPrimary: "#e2e8f0",
      textSecondary: "#b4bcc9",
      textMuted: "#8b95a8",
      textSubtle: "#5a6478",

      accentCyan: "#00d4ff",
      accentViolet: "#a78bfa",
      accentEmerald: "#34d399",
      accentRose: "#fb7185",
      accentAmber: "#fbbf24",

      glowCyan: "rgba(0, 212, 255, 0.35)",
      glowViolet: "rgba(167, 139, 250, 0.35)",
      glowEmerald: "rgba(52, 211, 153, 0.35)",
    },
  },
  matrix: {
    label: "Matrix",
    emoji: "🟢",
    colors: {
      bgDeepest: "#050806",
      bgBase: "#0a100c",
      bgRaised: "#0f1a13",
      bgOverlay: "#15251a",

      borderSubtle: "rgba(120,255,160,0.06)",
      borderDefault: "rgba(120,255,160,0.12)",
      borderStrong: "rgba(120,255,160,0.22)",

      textPrimary: "#d4f4dd",
      textSecondary: "#a3d9ae",
      textMuted: "#6bae78",
      textSubtle: "#3f6b48",

      accentCyan: "#22ff88",
      accentViolet: "#66ff99",
      accentEmerald: "#22ff88",
      accentRose: "#ff6b9d",
      accentAmber: "#a0ff66",

      glowCyan: "rgba(34, 255, 136, 0.35)",
      glowViolet: "rgba(102, 255, 153, 0.35)",
      glowEmerald: "rgba(34, 255, 136, 0.35)",
    },
  },
  ocean: {
    label: "Ocean",
    emoji: "🌊",
    colors: {
      bgDeepest: "#070f1a",
      bgBase: "#0d1825",
      bgRaised: "#152236",
      bgOverlay: "#1e2f47",

      borderSubtle: "rgba(120,180,255,0.05)",
      borderDefault: "rgba(120,180,255,0.1)",
      borderStrong: "rgba(120,180,255,0.2)",

      textPrimary: "#e0ecf8",
      textSecondary: "#a8bfd8",
      textMuted: "#6f8aad",
      textSubtle: "#46617f",

      accentCyan: "#38bdf8",
      accentViolet: "#818cf8",
      accentEmerald: "#2dd4bf",
      accentRose: "#f472b6",
      accentAmber: "#fbbf24",

      glowCyan: "rgba(56, 189, 248, 0.35)",
      glowViolet: "rgba(129, 140, 248, 0.35)",
      glowEmerald: "rgba(45, 212, 191, 0.35)",
    },
  },
  sunset: {
    label: "Sunset",
    emoji: "🌅",
    colors: {
      bgDeepest: "#120a12",
      bgBase: "#1a1018",
      bgRaised: "#251820",
      bgOverlay: "#31222c",

      borderSubtle: "rgba(255,180,120,0.05)",
      borderDefault: "rgba(255,180,120,0.1)",
      borderStrong: "rgba(255,180,120,0.2)",

      textPrimary: "#f8e8e0",
      textSecondary: "#d8b8a8",
      textMuted: "#a88470",
      textSubtle: "#705650",

      accentCyan: "#fbbf24",
      accentViolet: "#f472b6",
      accentEmerald: "#34d399",
      accentRose: "#fb7185",
      accentAmber: "#fb923c",

      glowCyan: "rgba(251, 191, 36, 0.35)",
      glowViolet: "rgba(244, 114, 182, 0.35)",
      glowEmerald: "rgba(52, 211, 153, 0.35)",
    },
  },
  light: {
    label: "Light",
    emoji: "☀️",
    colors: {
      bgDeepest: "#f8fafc",
      bgBase: "#ffffff",
      bgRaised: "#f1f5f9",
      bgOverlay: "#e2e8f0",

      borderSubtle: "rgba(0,0,0,0.04)",
      borderDefault: "rgba(0,0,0,0.08)",
      borderStrong: "rgba(0,0,0,0.15)",

      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
      textSubtle: "#94a3b8",

      accentCyan: "#0284c7",
      accentViolet: "#7c3aed",
      accentEmerald: "#059669",
      accentRose: "#e11d48",
      accentAmber: "#d97706",

      glowCyan: "rgba(2, 132, 199, 0.2)",
      glowViolet: "rgba(124, 58, 237, 0.2)",
      glowEmerald: "rgba(5, 150, 105, 0.2)",
    },
  },
};

export function applyTheme(name: ThemeName) {
  const c = THEMES[name].colors;
  const root = document.documentElement;

  // Surfaces
  root.style.setProperty("--bg-deepest", c.bgDeepest);
  root.style.setProperty("--bg-base", c.bgBase);
  root.style.setProperty("--bg-raised", c.bgRaised);
  root.style.setProperty("--bg-overlay", c.bgOverlay);

  // Borders
  root.style.setProperty("--border-subtle", c.borderSubtle);
  root.style.setProperty("--border-default", c.borderDefault);
  root.style.setProperty("--border-strong", c.borderStrong);

  // Text
  root.style.setProperty("--text-primary", c.textPrimary);
  root.style.setProperty("--text-secondary", c.textSecondary);
  root.style.setProperty("--text-muted", c.textMuted);
  root.style.setProperty("--text-subtle", c.textSubtle);

  // Accents
  root.style.setProperty("--accent-cyan", c.accentCyan);
  root.style.setProperty("--accent-violet", c.accentViolet);
  root.style.setProperty("--accent-emerald", c.accentEmerald);
  root.style.setProperty("--accent-rose", c.accentRose);
  root.style.setProperty("--accent-amber", c.accentAmber);

  // Glows
  root.style.setProperty("--glow-cyan", c.glowCyan);
  root.style.setProperty("--glow-violet", c.glowViolet);
  root.style.setProperty("--glow-emerald", c.glowEmerald);

  // Body bg
  document.body.style.background = c.bgDeepest;
  document.body.style.color = c.textPrimary;
}
