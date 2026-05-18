import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Timer, TimerOff, Sparkles, Hash } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { MODULES } from '@/data/modules'
import { QUESTIONS } from '@/data/questions'
import type { QuizConfig, Difficulty } from '@/lib/types'

interface Props {
  onStart: (cfg: QuizConfig) => void
}

const COUNTS: QuizConfig['count'][] = [5, 10, 20]
const DIFFICULTIES: { value: 'mixed' | Difficulty; label: string; description: string }[] = [
  { value: 'mixed',  label: 'Mixed',  description: '20/60/20 — exam-style mix' },
  { value: 'easy',   label: 'Easy',   description: 'Warm-up · easy only' },
  { value: 'medium', label: 'Medium', description: 'Mid-difficulty questions' },
  { value: 'hard',   label: 'Hard',   description: 'Challenge mode · hard only' },
]

export function QuizConfigForm({ onStart }: Props) {
  const [params] = useSearchParams()
  const initialModule = Number(params.get('module') || '0')

  const [moduleIds, setModuleIds] = useState<number[]>(initialModule ? [initialModule] : [0])
  const [count, setCount] = useState<QuizConfig['count']>(10)
  const [timed, setTimed] = useState(false)
  const [minutes, setMinutes] = useState(10)
  const [difficulty, setDifficulty] = useState<QuizConfig['difficulty']>('mixed')

  // How many questions are available given the current filters.
  const availableCount = (() => {
    const ids = moduleIds.includes(0) ? null : moduleIds
    return QUESTIONS.filter((q) => (!ids || ids.includes(q.moduleId)))
      .filter((q) => difficulty === 'mixed' || q.difficulty === difficulty).length
  })()

  // If Easy/Hard alone doesn't have 20 items, downgrade the count to the largest feasible value.
  useEffect(() => {
    if (availableCount < count) {
      const next = COUNTS.filter((c) => c <= availableCount).pop()
      if (next) setCount(next)
    }
  }, [availableCount, count])

  const toggleModule = (id: number) => {
    if (id === 0) { setModuleIds([0]); return }
    setModuleIds((prev) => {
      const without0 = prev.filter((p) => p !== 0)
      return without0.includes(id) ? without0.filter((p) => p !== id) : [...without0, id]
    })
  }

  const canStart = availableCount >= count && availableCount > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 space-y-6"
    >
      <header>
        <div className="text-[11px] uppercase tracking-widest text-ink-muted">Configure</div>
        <h2 className="font-display text-2xl font-bold">Build your quiz</h2>
      </header>

      {/* ───── Modules ───── */}
      <section>
        <div className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">Modules</div>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={moduleIds.includes(0)}
            onClick={() => toggleModule(0)}
            color="#6366f1"
            label="All modules"
          />
          {MODULES.map((m) => {
            const has = QUESTIONS.some((q) => q.moduleId === m.id)
            if (!has) {
              return (
                <Chip
                  key={m.id}
                  disabled
                  color={m.accent}
                  label={`M${m.id} (no Q)`}
                  title={`${m.shortTitle} — questions will be added with the module content`}
                />
              )
            }
            return (
              <Chip
                key={m.id}
                active={moduleIds.includes(m.id)}
                onClick={() => toggleModule(m.id)}
                color={m.accent}
                label={`M${m.id} · ${m.shortTitle}`}
              />
            )
          })}
        </div>
      </section>

      {/* ───── Count ───── */}
      <section>
        <div className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">Number of questions</div>
        <div className="grid grid-cols-3 gap-2">
          {COUNTS.map((c) => {
            const disabled = c > availableCount
            return (
              <button
                key={c}
                disabled={disabled}
                onClick={() => setCount(c)}
                className={`relative rounded-xl border p-3 text-center transition-all
                  ${count === c
                    ? 'border-brand-500 bg-brand-500/10 shadow-glow'
                    : 'border-line bg-surface-3 hover:border-brand-400'}
                  ${disabled ? 'opacity-40 cursor-not-allowed hover:border-line' : ''}`}
              >
                <Hash size={14} className="absolute top-2 left-2 text-ink-muted" />
                <div className="font-display text-2xl font-bold">{c}</div>
                <div className="text-[11px] text-ink-muted">questions</div>
              </button>
            )
          })}
        </div>
        <div className="text-xs text-ink-muted mt-2">
          Available in pool: <span className="font-mono text-ink">{availableCount}</span>
        </div>
      </section>

      {/* ───── Difficulty ───── */}
      <section>
        <div className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">Difficulty</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={`text-left rounded-xl border p-3 transition-all
                ${difficulty === d.value
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-line bg-surface-3 hover:border-brand-400'}`}
            >
              <div className="font-display font-semibold">{d.label}</div>
              <div className="text-[11px] text-ink-muted leading-snug mt-0.5">{d.description}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ───── Timing ───── */}
      <section>
        <div className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">Time limit</div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setTimed(false)}
            className={`btn ${!timed ? 'btn-primary' : 'btn-outline'}`}
          >
            <TimerOff size={14} /> Untimed
          </button>
          <button
            onClick={() => setTimed(true)}
            className={`btn ${timed ? 'btn-primary' : 'btn-outline'}`}
          >
            <Timer size={14} /> Timed
          </button>
          {timed && (
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={60}
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
                className="w-40 accent-brand-500"
              />
              <span className="font-mono text-sm">{minutes} min</span>
            </div>
          )}
        </div>
      </section>

      <button
        disabled={!canStart}
        onClick={() =>
          onStart({
            moduleIds: moduleIds.length === 0 ? [0] : moduleIds,
            count,
            timed,
            minutes: timed ? minutes : undefined,
            difficulty,
          })
        }
        className="btn-primary w-full justify-center text-base py-3"
      >
        <Play size={16} /> Start quiz
        {!canStart && <Sparkles size={14} className="text-warn" />}
      </button>
    </motion.div>
  )
}

function Chip({
  active, disabled, onClick, color, label, title,
}: {
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  color: string
  label: string
  title?: string
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      style={
        active
          ? { background: color, borderColor: color, color: 'white' }
          : { background: 'rgb(var(--surface-3))', borderColor: 'rgb(var(--line))', color: 'rgb(var(--ink-soft))' }
      }
    >
      {label}
    </button>
  )
}
