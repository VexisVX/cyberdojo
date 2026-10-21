/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          deepest: "var(--bg-deepest)",
          base: "var(--bg-base)",
          raised: "var(--bg-raised)",
          overlay: "var(--bg-overlay)",
        },
        surface: {
          DEFAULT: "var(--bg-base)",
          raised: "var(--bg-raised)",
        },
        border: {
          subtle: "var(--border-subtle)",
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
        },
        accent: {
          cyan: "var(--accent-cyan)",
          violet: "var(--accent-violet)",
          emerald: "var(--accent-emerald)",
          rose: "var(--accent-rose)",
          amber: "var(--accent-amber)",
        },
        // Aliases for backward compat
        neon: {
          cyan: "var(--accent-cyan)",
          purple: "var(--accent-violet)",
          green: "var(--accent-emerald)",
          pink: "var(--accent-rose)",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
        glow: "0 0 20px var(--glow-cyan)",
        "glow-violet": "0 0 20px var(--glow-violet)",
      },
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "grid-subtle":
          "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
