import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeName, applyTheme } from "../lib/theme";

interface ThemeState {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "midnight",
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
    }),
    {
      name: "cyberdojo-theme-v3",
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);

export { THEMES } from "../lib/theme";
export type { ThemeName, ThemeColors } from "../lib/theme";
