export type ErrorSeverity = "common" | "tricky" | "advanced";

export interface JavaError {
  id: string;
  title: string;
  titleFa: string;
  severity: ErrorSeverity;
  message: string; // the error text
  causeEn: string;
  causeFa: string;
  fixEn: string;
  fixFa: string;
  wrongCode?: string;
  rightCode?: string;
}

export interface ProjectStep {
  stepEn: string;
  stepFa: string;
  hintEn?: string;
  hintFa?: string;
  code?: string;
}

export interface ProjectFile {
  name: string;
  content: string;
}

export interface JavaProject {
  id: string;
  slug: string;
  level: "easy" | "medium" | "hard";
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  xp: number;
  duration: number;
  conceptsEn: string[];
  conceptsFa: string[];
  steps: ProjectStep[];
  solution: ProjectFile[];
}
