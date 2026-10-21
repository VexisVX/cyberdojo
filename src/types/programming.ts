export type ProgLang = "java" | "python" | "javascript" | "cpp" | "go" | "rust";
export type ProgLevel = "easy" | "medium" | "hard";
export type ProgCategory = "basics" | "oop" | "advanced" | "project";

export interface InstallTab {
  os: string;
  osFa: string;
  icon: "arch" | "ubuntu" | "fedora" | "windows" | "macos" | "debian";
  steps: { textEn: string; textFa: string; code?: string }[];
}

export interface QuizQuestion {
  questionEn: string;
  questionFa: string;
  optionsEn: string[];
  optionsFa: string[];
  correctIndex: number;
  explanationEn: string;
  explanationFa: string;
}

export interface ProgBlock {
  type: "heading" | "paragraph" | "code" | "list" | "callout" | "tip" | "tabs" | "quiz";
  en?: string;
  fa?: string;
  lang?: string;
  variant?: "info" | "success" | "warning" | "danger";
  itemsEn?: string[];
  itemsFa?: string[];
  code?: string;
  tabs?: InstallTab[];
  questions?: QuizQuestion[];
}

export interface ProgLesson {
  id: string;
  slug: string;
  lang: ProgLang;
  level?: ProgLevel;      // ← اختیاری
  category?: ProgCategory; // ← اختیاری
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  duration: number;
  xp: number;
  blocks: ProgBlock[];
}

export interface ProgChapter {
  id: string;
  lang: ProgLang;
  titleEn: string;
  titleFa: string;
  lessons: ProgLesson[];
}
