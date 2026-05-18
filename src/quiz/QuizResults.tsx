import { motion } from 'framer-motion'
import { Check, X, RotateCcw, Home, Trophy, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { QuizQuestion } from '@/lib/types'
import { moduleById } from '@/data/modules'
import { ProgressRing } from '@/components/ProgressRing'

interface Props {
  questions: QuizQuestion[]
  answers: Record<string, number | null>
  onRestart: () => void
}

export function QuizResults({ questions, answers, onRestart }: Props) {
  const correct = questions.filter((q) => answers[q.id] === q.answerIndex).length
  const ratio = correct / questions.length
  const verdict =
    ratio >= 0.9 ? { tone: 'success', title: 'Outstanding', text: 'Strong mastery of the material.' }
    : ratio >= 0.7 ? { tone: 'brand', title: 'Solid pass', text: 'Good result — close the remaining gaps and you\'re done.' }
    : ratio >= 0.5 ? { tone: 'warn', title: 'Almost there', text: 'Worth a refresh of the material before the exam.' }
    : { tone: 'danger', title: 'Needs work', text: 'Re-read the module and try again — the basics matter.' }

  return (
    <div className="space-y-5">
      {/* ───── Hero score ───── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-6"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        >
          <ProgressRing
            value={ratio}
            size={140}
            stroke={12}
            color={
              verdict.tone === 'success' ? 'rgb(var(--success))'
              : verdict.tone === 'brand'  ? 'rgb(var(--brand-500))'
              : verdict.tone === 'warn'   ? 'rgb(var(--warn))'
              : 'rgb(var(--danger))'
            }
          >
            <div className="text-center">
              <div className="font-display text-3xl font-bold">{Math.round(ratio * 100)}%</div>
              <div className="text-[10px] text-ink-muted">{correct} / {questions.length}</div>
            </div>
          </ProgressRing>
        </motion.div>
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Quiz complete</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">{verdict.title}</h2>
          <p className="text-ink-soft mt-1 max-w-md">{verdict.text}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={onRestart} className="btn-primary"><RotateCcw size={14} /> Try again</button>
            <Link to="/" className="btn-outline"><Home size={14} /> Dashboard</Link>
            {ratio >= 0.9 && (
              <span className="pill-easy"><Trophy size={12} /> Top tier</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ───── Review ───── */}
      <section>
        <h3 className="font-display text-xl font-semibold mb-3">Review answers</h3>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const user = answers[q.id]
            const isCorrect = user === q.answerIndex
            const mod = moduleById(q.moduleId)
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 12) * 0.03 }}
                className="card p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 h-7 w-7 rounded-lg flex items-center justify-center shrink-0
                      ${isCorrect ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}`}
                  >
                    {isCorrect ? <Check size={14} /> : user === null || user === undefined ? <AlertCircle size={14} /> : <X size={14} />}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-mono text-ink-muted">Q{i + 1}</span>
                      {mod && (
                        <span className="pill" style={{ background: `${mod.accent}1f`, color: mod.accent, border: `1px solid ${mod.accent}55` }}>
                          M{mod.id}
                        </span>
                      )}
                      <span className={q.difficulty === 'easy' ? 'pill-easy' : q.difficulty === 'hard' ? 'pill-hard' : 'pill-medium'}>
                        {q.difficulty}
                      </span>
                    </div>
                    <div className="font-medium mt-1">{q.prompt}</div>
                    <div className="mt-2 text-sm">
                      <div className="text-success">Correct: <span className="font-semibold">{q.choices[q.answerIndex]}</span></div>
                      {user !== null && user !== undefined && user !== q.answerIndex && (
                        <div className="text-danger">Your answer: {q.choices[user]}</div>
                      )}
                      {(user === null || user === undefined) && (
                        <div className="text-ink-muted italic">Not answered</div>
                      )}
                    </div>
                    <div className="text-xs text-ink-soft mt-2 leading-relaxed">{q.explanation}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
