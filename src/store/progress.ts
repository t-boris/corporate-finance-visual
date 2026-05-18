import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProgressEntry, QuizAttempt } from '@/lib/types'

interface ProgressState {
  byModule: Record<number, ProgressEntry>
  attempts: QuizAttempt[]
  markVisited: (moduleId: number) => void
  recordAttempt: (attempt: QuizAttempt, score: number) => void
  reset: () => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      byModule: {},
      attempts: [],
      markVisited: (moduleId) =>
        set((s) => ({
          byModule: {
            ...s.byModule,
            [moduleId]: {
              moduleId,
              visitedAt: Date.now(),
              quizzesTaken: s.byModule[moduleId]?.quizzesTaken ?? 0,
              bestQuizScore: s.byModule[moduleId]?.bestQuizScore,
            },
          },
        })),
      recordAttempt: (attempt, score) =>
        set((s) => {
          const next = { ...s.byModule }
          for (const mid of attempt.config.moduleIds.filter((m) => m > 0)) {
            const prev = next[mid] ?? { moduleId: mid, visitedAt: Date.now(), quizzesTaken: 0 }
            next[mid] = {
              ...prev,
              quizzesTaken: prev.quizzesTaken + 1,
              bestQuizScore: Math.max(prev.bestQuizScore ?? 0, score),
            }
          }
          return { byModule: next, attempts: [attempt, ...s.attempts].slice(0, 50) }
        }),
      reset: () => set({ byModule: {}, attempts: [] }),
    }),
    { name: 'cf-progress' }
  )
)
