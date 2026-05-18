// ────────────────────────────────────────────────────────────────
// Domain types. Everything modules, glossary, and quizzes share.
// ────────────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface ModuleMeta {
  id: number               // 1..8
  slug: string             // url-friendly id, e.g. "objective-and-language"
  title: string            // full title
  shortTitle: string       // shorter title for menus
  tagline: string          // one-line tagline
  description: string      // 1–2 sentence summary
  status: 'ready' | 'in-progress' | 'planned'
  topics: string[]         // key topics covered
  estimatedMinutes: number // approximate study time
  accent: string           // hex colour used as the module accent
  icon: string             // lucide-react icon name
}

export interface GlossaryTerm {
  term: string
  definition: string
  moduleId: number
  related?: string[]       // related terms
  formula?: string         // optional formula (free-form text, not LaTeX)
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
  moduleIds: number[]      // [0] means "all modules"
  count: 5 | 10 | 20
  timed: boolean
  minutes?: number         // timer length when timed === true
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
