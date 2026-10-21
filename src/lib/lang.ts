import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "fa";

interface LangState {
  lang: Lang;
  toggle: () => void;
  set: (l: Lang) => void;
}

export const useLang = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "en",
      toggle: () => set({ lang: get().lang === "en" ? "fa" : "en" }),
      set: (lang) => set({ lang }),
    }),
    { name: "cyberdojo-lang-v2" }
  )
);

export function pick<T>(lang: Lang, en: T, fa: T): T {
  return lang === "fa" ? fa : en;
}
