import { networkLessons } from "./network/lessons";
import { linuxLessons } from "./linux/lessons";
import { proLessons } from "./pro/lessons";
import { Lesson } from "../types/lesson";

export const allLessons: Lesson[] = [
  ...networkLessons,
  ...linuxLessons,
  ...proLessons,
];

export function getLessonsByCategory(category: Lesson["category"]): Lesson[] {
  return allLessons.filter((l) => l.category === category);
}

export function getLessonBySlug(category: string, slug: string): Lesson | undefined {
  return allLessons.find((l) => l.category === category && l.slug === slug);
}
