import type { QuizConfig, QuizQuestion } from '@/lib/types'
import { QUESTIONS } from '@/data/questions'

/**
 * Random selection of `count` questions according to the config.
 * When `difficulty === 'mixed'`, the count is split 20/60/20 (easy/medium/hard).
 */
export function buildQuiz(cfg: QuizConfig): QuizQuestion[] {
  const inModule = (q: QuizQuestion) =>
    cfg.moduleIds.includes(0) || cfg.moduleIds.includes(q.moduleId)

  const pool = QUESTIONS.filter(inModule)

  if (cfg.difficulty !== 'mixed') {
    const filtered = pool.filter((q) => q.difficulty === cfg.difficulty)
    return shuffle(filtered).slice(0, cfg.count)
  }

  // Mixed: 20/60/20
  const target = {
    easy: Math.round(cfg.count * 0.2),
    medium: Math.round(cfg.count * 0.6),
    hard: cfg.count - Math.round(cfg.count * 0.2) - Math.round(cfg.count * 0.6),
  }
  const buckets = {
    easy: shuffle(pool.filter((q) => q.difficulty === 'easy')),
    medium: shuffle(pool.filter((q) => q.difficulty === 'medium')),
    hard: shuffle(pool.filter((q) => q.difficulty === 'hard')),
  }
  const picked: QuizQuestion[] = []
  ;(['easy', 'medium', 'hard'] as const).forEach((d) => {
    picked.push(...buckets[d].slice(0, target[d]))
  })
  // Top up from the full pool if any difficulty bucket fell short
  if (picked.length < cfg.count) {
    const rest = shuffle(pool.filter((q) => !picked.includes(q)))
    picked.push(...rest.slice(0, cfg.count - picked.length))
  }
  return shuffle(picked).slice(0, cfg.count)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function scoreQuiz(qs: QuizQuestion[], answers: Record<string, number | null>): number {
  if (qs.length === 0) return 0
  let ok = 0
  for (const q of qs) if (answers[q.id] === q.answerIndex) ok++
  return ok / qs.length
}
