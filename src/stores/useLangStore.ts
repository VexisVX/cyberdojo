import { create } from "zustand";
export type Lang = "en";
interface LangState { lang: Lang; setLang: (l: Lang) => void; }
export const useLangStore = create<LangState>(() => ({ lang: "en", setLang: () => {} }));
