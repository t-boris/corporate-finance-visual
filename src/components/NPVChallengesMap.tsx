import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sigma, Scale, Landmark, Gavel } from 'lucide-react'

/**
 * Module 8 · Overview — the course "tattoo" equation NPV = −I + PV(FCF)
 * and the three challenges that break the simple "just maximize NPV" rule.
 * Click a challenge to see how it undermines the equation.
 */
type Challenge = {
  key: string
  label: string
  icon: typeof Scale
  lesson: string
  headline: string
  detail: string
  accent: string // tailwind color stem, e.g. 'amber'
}

const CHALLENGES: Challenge[] = [
  {
    key: 'agency',
    label: 'Agency costs of debt',
    icon: Scale,
    lesson: 'Lessons 8·1–8·3',
    headline: 'Shareholders may fight NPV, not maximize it',
    detail:
      'With a lot of debt, shareholders can want to ACCEPT a negative-NPV project (excessive risk taking) or REJECT a positive-NPV project (underinvestment). The math says maximize NPV; the incentives say otherwise.',
    accent: 'amber',
  },
  {
    key: 'society',
    label: 'Finance & society',
    icon: Landmark,
    lesson: 'Lesson 8·4',
    headline: 'The firm’s NPV ≠ society’s NPV',
    detail:
      'Maximizing the firm’s NPV can impose costs on non-shareholders — pollution, tax avoidance, corruption. A bribe can be positive-NPV for the firm while destroying value for society (an externality).',
    accent: 'emerald',
  },
  {
    key: 'lawofone',
    label: 'NPV ≠ −I + PV(FCF)',
    icon: Gavel,
    lesson: 'Lesson 8·5',
    headline: 'When the equation itself fails',
    detail:
      'Same investment, cash flows and risk should give the same NPV (the law of one price). When they don’t, there is either an arbitrage — or a bias, like the higher fees HBCUs pay to issue identical bonds.',
    accent: 'sky',
  },
]

const ACCENT: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  amber: { border: 'border-amber-500/50', bg: 'bg-amber-500/10', text: 'text-amber-300', dot: 'bg-amber-400' },
  emerald: { border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  sky: { border: 'border-sky-500/50', bg: 'bg-sky-500/10', text: 'text-sky-300', dot: 'bg-sky-400' },
}

export function NPVChallengesMap() {
  const [active, setActive] = useState<string>('agency')
  const c = CHALLENGES.find((x) => x.key === active)!
  const a = ACCENT[c.accent]

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Sigma className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Module 8 · Map</div>
          <h3 className="font-display text-lg font-semibold">One equation, three challenges</h3>
        </div>
      </header>

      {/* The equation */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-brand-500/40 bg-brand-500/5 px-4 py-5 text-center"
      >
        <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">The course, in one line</div>
        <div className="font-mono text-2xl md:text-3xl font-semibold text-ink">NPV = −I + PV(FCF)</div>
        <div className="text-[12px] text-ink-muted mt-1">Invest if NPV &gt; 0 — easy in math, but three things break it.</div>
      </motion.div>

      {/* Connector */}
      <div className="flex justify-center my-2" aria-hidden>
        <div className="h-6 w-px bg-line" />
      </div>

      {/* Three challenge tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {CHALLENGES.map((x, i) => {
          const xa = ACCENT[x.accent]
          const isActive = x.key === active
          const Icon = x.icon
          return (
            <motion.button
              key={x.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              onClick={() => setActive(x.key)}
              className={[
                'text-left rounded-xl border p-3 transition-colors',
                isActive ? `${xa.border} ${xa.bg}` : 'border-line bg-surface-3/40 hover:border-brand-500/40',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={isActive ? xa.text : 'text-ink-muted'} />
                <span className="text-[10px] uppercase tracking-widest text-ink-muted">{x.lesson}</span>
              </div>
              <div className={`text-sm font-semibold ${isActive ? xa.text : 'text-ink'}`}>{x.label}</div>
            </motion.button>
          )
        })}
      </div>

      {/* Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={c.key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className={`mt-3 rounded-xl border ${a.border} ${a.bg} p-3`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`h-2 w-2 rounded-full ${a.dot}`} />
            <div className={`text-sm font-semibold ${a.text}`}>{c.headline}</div>
          </div>
          <p className="text-[13px] text-ink-soft leading-relaxed">{c.detail}</p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 text-[12px] text-ink-muted leading-relaxed">
        Not covered separately: corporate governance (managers vs shareholders) — that was Module 1, Lesson 4. It
        returns here only as the closing question, <em>whose NPV is it?</em>
      </p>
    </div>
  )
}
