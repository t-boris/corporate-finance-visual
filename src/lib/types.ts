// ────────────────────────────────────────────────────────────────
// Доменные типы. Всё, что нужно для модулей/глоссария/тестов.
// ────────────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface ModuleMeta {
  id: number               // 1..8
  slug: string             // url-friendly id, напр. "objective-and-language"
  title: string            // полное название
  shortTitle: string       // короткое для меню
  tagline: string          // одна строка
  description: string      // 1–2 предложения
  status: 'ready' | 'in-progress' | 'planned'
  topics: string[]         // ключевые темы
  estimatedMinutes: number // время изучения
  accent: string           // hex для акцента карточки
  icon: string             // имя иконки lucide-react
}

export interface GlossaryTerm {
  term: string
  definition: string
  moduleId: number
  related?: string[]       // связанные термины
  formula?: string         // опциональная формула (LaTeX-like, но просто текст)
  tags?: string[]
}

export interface QuizQuestion {
  id: string
  moduleId: number
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
  difficulty: Difficulty
  topic?: string
}

export interface QuizConfig {
  moduleIds: number[]      // [0] = "все модули"
  count: 5 | 10 | 20
  timed: boolean
  minutes?: number         // длительность таймера, если timed
  difficulty: 'mixed' | Difficulty
}

export interface QuizAttempt {
  startedAt: number
  finishedAt?: number
  questionIds: string[]
  answers: Record<string, number | null>  // qid -> indexChoice
  config: QuizConfig
}

export interface ProgressEntry {
  moduleId: number
  visitedAt: number
  bestQuizScore?: number   // 0..1
  quizzesTaken: number
}
