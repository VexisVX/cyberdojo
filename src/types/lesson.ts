import { LucideIcon } from "lucide-react";

export interface LessonBlock {
  type: "paragraph" | "heading" | "code" | "list" | "callout" | "image";
  content?: string;
  lang?: string;
  variant?: "info" | "warning" | "success" | "danger";
  items?: string[];
  src?: string;
  alt?: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "network" | "linux" | "pro";
  duration: number;
  xp: number;
  blocks: LessonBlock[];
}

export interface Category {
  id: "network" | "linux" | "pro";
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  lessons: Lesson[];
}
