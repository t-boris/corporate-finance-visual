import { useState } from 'react'
import { QuizConfigForm } from '@/quiz/QuizConfigForm'
import { QuizPlayer } from '@/quiz/QuizPlayer'
import { QuizResults } from '@/quiz/QuizResults'
import { buildQuiz, scoreQuiz } from '@/quiz/quizUtils'
import { useProgress } from '@/store/progress'
import type { QuizAttempt, QuizConfig, QuizQuestion } from '@/lib/types'

type Stage = 'config' | 'play' | 'results'

export function QuizPage() {
  const [stage, setStage] = useState<Stage>('config')
  const [cfg, setCfg] = useState<QuizConfig | null>(null)
  const [qs, setQs] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const recordAttempt = useProgress((s) => s.recordAttempt)

  const start = (c: QuizConfig) => {
    const built = buildQuiz(c)
    setCfg(c)
    setQs(built)
    setAnswers({})
    setStage('play')
  }

  const finish = (a: Record<string, number | null>) => {
    setAnswers(a)
    if (cfg) {
      const score = scoreQuiz(qs, a)
      const attempt: QuizAttempt = {
        startedAt: Date.now(),
        finishedAt: Date.now(),
        questionIds: qs.map((q) => q.id),
        answers: a,
        config: cfg,
      }
      recordAttempt(attempt, score)
    }
    setStage('results')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {stage === 'config' && (
        <>
          <header className="mb-5">
            <h1 className="font-display text-3xl font-bold">Quiz</h1>
            <p className="text-ink-muted">
              Multiple-choice вопросы по курсу. 20% easy · 60% medium · 20% hard в режиме «mixed».
            </p>
          </header>
          <QuizConfigForm onStart={start} />
        </>
      )}
      {stage === 'play' && cfg && qs.length > 0 && (
        <QuizPlayer questions={qs} config={cfg} onFinish={finish} />
      )}
      {stage === 'results' && (
        <QuizResults
          questions={qs}
          answers={answers}
          onRestart={() => setStage('config')}
        />
      )}
    </div>
  )
}
