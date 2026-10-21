import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completed: Record<string, number>;
  projectSteps: Record<string, number[]>;
  projectDone: Record<string, number>;
  quizScore: Record<string, number>;
  xp: number;
  streak: number;
  lastActiveDate: string;
  daysInARow: number;

  markComplete: (lessonId: string, xpGain?: number) => void;
  unmarkComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;

  setQuizScore: (lessonId: string, pct: number, xpBonus: number) => void;
  getQuizScore: (lessonId: string) => number;

  toggleProjectStep: (
    projectId: string,
    stepIndex: number,
    totalSteps: number,
    totalXp: number
  ) => void;
  isProjectStepDone: (projectId: string, stepIndex: number) => boolean;
  getProjectSteps: (projectId: string) => number[];

  awardStreak: () => void;
  reset: () => void;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      projectSteps: {},
      projectDone: {},
      quizScore: {},
      xp: 0,
      streak: 0,
      lastActiveDate: "",
      daysInARow: 0,

      markComplete: (id, gain = 10) =>
        set((s) => {
          if (s.completed[id] !== undefined) return s;
          return {
            completed: { ...s.completed, [id]: gain },
            xp: s.xp + gain,
          };
        }),

      unmarkComplete: (id) =>
        set((s) => {
          const gained = s.completed[id];
          if (gained === undefined) return s;
          const next = { ...s.completed };
          delete next[id];
          return { completed: next, xp: Math.max(0, s.xp - gained) };
        }),

      isComplete: (id) => get().completed[id] !== undefined,

      setQuizScore: (lessonId, pct, xpBonus) =>
        set((s) => {
          const prev = s.quizScore[lessonId] ?? 0;
          if (pct <= prev) return s;
          return {
            quizScore: { ...s.quizScore, [lessonId]: pct },
            xp: s.xp + xpBonus,
          };
        }),

      getQuizScore: (lessonId) => get().quizScore[lessonId] ?? 0,

      // ============================================================
      // PROJECT STEP TOGGLE — XP calculated from actual completed count
      // ============================================================
      toggleProjectStep: (projectId, stepIndex, totalSteps, totalXp) =>
        set((s) => {
          const currentSteps = s.projectSteps[projectId] ?? [];
          const isCurrentlyDone = currentSteps.includes(stepIndex);

          // Compute new array of done steps
          const nextSteps = isCurrentlyDone
            ? currentSteps.filter((x) => x !== stepIndex)
            : [...currentSteps, stepIndex];

          // Compute the "should-be" XP from scratch based on step count
          const stepXp = Math.floor(totalXp / totalSteps);
          const allDone = nextSteps.length === totalSteps;
          const bonus = allDone ? Math.floor(totalXp * 0.5) : 0;

          // Total XP this project should give for the new state
          const correctTotal = nextSteps.length * stepXp + bonus;

          // What we previously gave for this project
          const previouslyGiven = s.projectDone[projectId] ?? 0;

          // Adjust global XP
          const delta = correctTotal - previouslyGiven;

          return {
            projectSteps: { ...s.projectSteps, [projectId]: nextSteps },
            projectDone: { ...s.projectDone, [projectId]: correctTotal },
            xp: Math.max(0, s.xp + delta),
          };
        }),

      isProjectStepDone: (projectId, stepIndex) =>
        (get().projectSteps[projectId] ?? []).includes(stepIndex),

      getProjectSteps: (projectId) => get().projectSteps[projectId] ?? [],

      awardStreak: () => {
        const today = todayKey();
        const { lastActiveDate, daysInARow } = get();
        if (lastActiveDate === today) return;

        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        let newDays = 1;
        if (lastActiveDate === yesterday) newDays = daysInARow + 1;
        const bonus = newDays % 7 === 0 ? 100 : 0;

        set({
          lastActiveDate: today,
          daysInARow: newDays,
          streak: newDays,
          xp: get().xp + bonus,
        });
      },

      reset: () =>
        set({
          completed: {},
          projectSteps: {},
          projectDone: {},
          quizScore: {},
          xp: 0,
          streak: 0,
          lastActiveDate: "",
          daysInARow: 0,
        }),
    }),
    {
      name: "cyberdojo-progress-v5",
      migrate: (persisted: any) => {
        if (!persisted) return persisted;
        const old = persisted.completed || {};
        const migrated: Record<string, number> = {};
        for (const k of Object.keys(old)) {
          migrated[k] = typeof old[k] === "number" ? old[k] : 10;
        }
        return {
          ...persisted,
          completed: migrated,
          projectSteps: persisted.projectSteps || {},
          projectDone: persisted.projectDone || {},
          quizScore: persisted.quizScore || {},
          daysInARow: persisted.daysInARow || 0,
          lastActiveDate: persisted.lastActiveDate || "",
        };
      },
    }
  )
);
