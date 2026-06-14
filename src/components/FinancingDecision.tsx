import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, AlertTriangle } from 'lucide-react'

/**
 * Financing-timing decision — Lesson 2-5.
 *
 * PepsiCo needs ~$2.9B in 2023. Toggle the 2023 market scenario (calm vs. crisis)
 * and compare two strategies: WAIT until needed vs. ISSUE EARLY + a precautionary
 * buffer held as cash. Under a crisis, waiting exposes the firm to rollover risk —
 * the Avis/Budget episode from Almeida & Weisbenner's research.
 */

type Outcome = { verdict: 'good' | 'ok' | 'bad'; text: string }

const MATRIX: Record<'calm' | 'crisis', { wait: Outcome; early: Outcome }> = {
  calm: {
    wait: { verdict: 'good', text: 'Markets are open. Issue at a normal rate and save the interest you would have paid in 2022. Slightly better.' },
    early: { verdict: 'ok', text: 'Safe, but you paid interest for a year on cash you did not yet need. A small, known cost.' },
  },
  crisis: {
    wait: { verdict: 'bad', text: 'Rollover risk strikes: banks say no, or the rate spikes. Budget was forced to refinance in 2008 and was later swallowed by Avis.' },
    early: { verdict: 'good', text: 'You locked in funding before the storm and hold a precautionary buffer. You ride the crisis out — like Avis.' },
  },
}

export function FinancingDecision() {
  const [scenario, setScenario] = useState<'calm' | 'crisis'>('crisis')
  const m = MATRIX[scenario]

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Clock className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 2-5
          </div>
          <h3 className="font-display text-lg font-semibold">
            When to raise $2.9B — and how much?
          </h3>
        </div>
      </header>

      {/* scenario toggle */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-ink-muted">2023 market conditions:</span>
        {(['calm', 'crisis'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`px-3 py-1 rounded-md text-xs font-medium border capitalize transition-colors ${
              scenario === s
                ? s === 'crisis'
                  ? 'bg-danger text-white border-transparent'
                  : 'bg-emerald-500 text-white border-transparent'
                : 'bg-surface-3/40 border-line text-ink-soft hover:text-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* two strategies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StrategyCard title="Wait — issue in 2023" subtitle="minimize interest paid" outcome={m.wait} scenario={scenario} />
        <StrategyCard title="Issue early + buffer" subtitle="precautionary borrowing" outcome={m.early} scenario={scenario} />
      </div>

      {/* how much */}
      <div className="rounded-xl border border-line bg-surface-3/40 p-3 mt-4">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">
          How much to borrow?
        </div>
        <p className="text-xs text-ink-soft leading-relaxed">
          Borrowing exactly $2.9B minimizes interest — but the forecast may be wrong. Borrowing{' '}
          <strong>more</strong> is safer, provided the excess is <strong>held as cash</strong>:
          holding cash is, in effect, the same as precautionary borrowing. Both buy insurance against
          future liquidity shocks.
        </p>
      </div>
    </div>
  )
}

function StrategyCard({
  title,
  subtitle,
  outcome,
  scenario,
}: {
  title: string
  subtitle: string
  outcome: Outcome
  scenario: string
}) {
  const tone =
    outcome.verdict === 'good'
      ? { c: '#10b981', Icon: ShieldCheck, label: 'Strong' }
      : outcome.verdict === 'bad'
        ? { c: '#ef4444', Icon: AlertTriangle, label: 'Exposed' }
        : { c: '#f59e0b', Icon: Clock, label: 'Acceptable' }
  const Icon = tone.Icon
  return (
    <motion.div
      key={scenario + title}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border p-3"
      style={{ borderColor: `${tone.c}55`, background: `${tone.c}10` }}
    >
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="font-semibold text-sm text-ink">{title}</div>
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">{subtitle}</div>
        </div>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white"
          style={{ background: tone.c }}
        >
          <Icon size={11} /> {tone.label}
        </span>
      </div>
      <p className="text-xs text-ink-soft leading-relaxed mt-1">{outcome.text}</p>
    </motion.div>
  )
}
