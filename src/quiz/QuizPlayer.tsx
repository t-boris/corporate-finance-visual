import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Clock, ChevronRight, ChevronLeft, Flag } from 'lucide-react'
import type { QuizConfig, QuizQuestion } from '@/lib/types'
import { moduleById } from '@/data/modules'
import { ProgressRing } from '@/components/ProgressRing'

interface Props {
  questions: QuizQuestion[]
  config: QuizConfig
  onFinish: (answers: Record<string, number | null>) => void
}

export function QuizPlayer({ questions, config, onFinish }: Props) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const total = questions.length
  const q = questions[idx]
  const answered = Object.values(answers).filter((v) => v !== null && v !== undefined).length

  // Timer
  const totalSeconds = (config.minutes ?? 0) * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  useEffect(() => {
    if (!config.timed) return
    if (secondsLeft <= 0) { onFinish(answers); return }
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [config.timed, secondsLeft]) // eslint-disable-line

  const timeRatio = config.timed && totalSeconds > 0 ? secondsLeft / totalSeconds : 1
  const mm = Math.floor(secondsLeft / 60)
  const ss = String(secondsLeft % 60).padStart(2, '0')

  const select = (qi: number) => {
    if (revealed[q.id]) return
    setAnswers((a) => ({ ...a, [q.id]: qi }))
    setRevealed((r) => ({ ...r, [q.id]: true }))
  }

  const next = () => {
    if (idx < total - 1) setIdx(idx + 1)
    else onFinish({ ...answers })
  }
  const prev = () => idx > 0 && setIdx(idx - 1)

  const mod = useMemo(() => moduleById(q.moduleId), [q])

  return (
    <div className="space-y-5">
      {/* ───── Header bar ───── */}
      <div className="card p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
            Q {idx + 1} / {total}
          </span>
          {mod && (
            <span className="pill" style={{ background: `${mod.accent}1f`, color: mod.accent, border: `1px solid ${mod.accent}55` }}>
              M{mod.id}
            </span>
          )}
          <span className={`pill ${q.difficulty === 'easy' ? 'pill-easy' : q.difficulty === 'hard' ? 'pill-hard' : 'pill-medium'}`}>
            {q.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {config.timed && (
            <div className="flex items-center gap-2">
              <ProgressRing value={timeRatio} size={40} stroke={4} color={timeRatio < 0.2 ? 'rgb(var(--danger))' : 'rgb(var(--brand-500))'}>
                <Clock size={12} />
              </ProgressRing>
              <span className="font-mono text-sm">{mm}:{ss}</span>
            </div>
          )}
          <ProgressRing value={answered / total} size={40} stroke={4} color="rgb(var(--success))">
            <span className="text-[10px]">{answered}/{total}</span>
          </ProgressRing>
        </div>
      </div>

      {/* ───── Question ───── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="card p-6"
        >
          <h3 className="font-display text-lg sm:text-xl font-semibold leading-snug">{q.prompt}</h3>

          <div className="mt-5 space-y-2">
            {q.choices.map((c, i) => {
              const userAns = answers[q.id]
              const isUser = userAns === i
              const isCorrect = q.answerIndex === i
              const showResult = revealed[q.id]

              let cls = 'card-hover'
              let icon: React.ReactNode = null
              if (showResult) {
                if (isCorrect) {
                  cls = 'border-success bg-success/10'
                  icon = <Check size={16} className="text-success" />
                } else if (isUser) {
                  cls = 'border-danger bg-danger/10'
                  icon = <X size={16} className="text-danger" />
                } else {
                  cls = 'opacity-60'
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className={`w-full flex items-center gap-3 text-left rounded-xl border border-line bg-surface-3 px-4 py-3 transition-all ${cls}`}
                >
                  <span className="h-7 w-7 rounded-lg bg-surface-2 border border-line text-xs font-mono flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm flex-1">{c}</span>
                  {icon}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {revealed[q.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-xl border border-brand-500/30 bg-brand-500/5 p-3"
              >
                <div className="text-[11px] uppercase tracking-widest text-brand-400 mb-1">Explanation</div>
                <p className="text-sm text-ink-soft">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* ───── Footer nav ───── */}
      <div className="flex items-center justify-between">
        <button onClick={prev} disabled={idx === 0} className="btn-ghost">
          <ChevronLeft size={14} /> Previous
        </button>
        <div className="hidden sm:flex gap-1">
          {questions.map((qq, i) => {
            const ans = answers[qq.id]
            const done = ans !== undefined && ans !== null
            return (
              <button
                key={qq.id}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-6 rounded-full transition-all
                  ${i === idx ? 'bg-brand-500' : done ? 'bg-brand-500/40' : 'bg-line'}`}
                aria-label={`Go to question ${i + 1}`}
              />
            )
          })}
        </div>
        <button onClick={next} className="btn-primary">
          {idx === total - 1 ? <><Flag size={14} /> Finish</> : <>Next <ChevronRight size={14} /></>}
        </button>
      </div>
    </div>
  )
}
