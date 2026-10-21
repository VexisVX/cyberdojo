import { ProgChapter, ProgLang } from "../../types/programming";
import { javaChapter1 } from "./java/chapter1";

export const allChapters: ProgChapter[] = [javaChapter1];

export function getChaptersByLang(lang: ProgLang): ProgChapter[] {
  return allChapters.filter((c) => c.lang === lang);
}

export function getChapter(lang: ProgLang, id: string): ProgChapter | undefined {
  return allChapters.find((c) => c.lang === lang && c.id === id);
}

export function getLessonBySlug(lang: ProgLang, slug: string) {
  for (const ch of allChapters) {
    if (ch.lang !== lang) continue;
    const lesson = ch.lessons.find((l) => l.slug === slug);
    if (lesson) return { chapter: ch, lesson };
  }
  return null;
}
