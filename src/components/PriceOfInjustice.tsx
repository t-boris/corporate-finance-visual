import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gavel } from 'lucide-react'

/**
 * Module 8 · Lesson 8-5 — using the law of one price to uncover injustice.
 * Three research findings where an "identical good" carries a different price
 * for a protected group, in a way risk cannot explain. Bars compare the
 * baseline to the affected group.
 */
type Case = {
  key: string
  tab: string
  title: string
  source: string
  baselineLabel: string
  affectedLabel: string
  baseline: number // relative bar value
  affected: number
  stat: string
  takeaway: string
}

const CASES: Case[] = [
  {
    key: 'hbcu',
    tab: 'HBCU bonds',
    title: 'HBCUs pay more to issue identical bonds',
    source: 'Dougal, Gao, Mayew & Parsons (2019)',
    baselineLabel: 'Other colleges · fee',
    affectedLabel: 'HBCU · fee',
    baseline: 100,
    affected: 120,
    stat: 'Underwriting fees ≈ 20% higher (bond prices slightly lower), controlling for size, location and rating.',
    takeaway: 'The authors rule out many risk stories and cannot rule out race.',
  },
  {
    key: 'auto',
    tab: 'Auto loans',
    title: 'Same credit score, higher interest',
    source: 'Butler, Mayer & Weston (2020)',
    baselineLabel: 'White borrowers · rate',
    affectedLabel: 'Black/Hispanic · rate',
    baseline: 100,
    affected: 100 + 70 / 10, // +70 bps shown on a scaled axis
    stat: 'Approved 1.5% less often, pay ≈ 70 bps (0.7%)/yr more interest — yet default LESS.',
    takeaway: 'Lower defaults at a higher price is the opposite of a risk explanation.',
  },
  {
    key: 'wage',
    tab: 'Wage gap',
    title: 'Same occupation, lower pay',
    source: 'Blau & Kahn (2017, JEL)',
    baselineLabel: 'Men · pay',
    affectedLabel: 'Women · pay',
    baseline: 100,
    affected: 91.6, // 8.4% less
    stat: 'From 1990–2010, within the same occupations women earned ≈ 8.4% less than men.',
    takeaway: 'A McKinsey report notes Covid hit women’s employment disproportionately.',
  },
]

export function PriceOfInjustice() {
  const [key, setKey] = useState('hbcu')
  const c = CASES.find((x) => x.key === key)!
  const max = Math.max(c.baseline, c.affected)

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Gavel className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 8-5</div>
          <h3 className="font-display text-lg font-semibold">Same good, different price → bias</h3>
        </div>
      </header>

      {/* tabs */}
      <div className="inline-flex flex-wrap rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {CASES.map((x) => (
          <button
            key={x.key}
            onClick={() => setKey(x.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              key === x.key ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={c.key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <div className="text-sm font-semibold text-ink">{c.title}</div>
          <div className="text-[11px] text-ink-muted mb-3">{c.source}</div>

          {/* comparison bars */}
          <div className="space-y-2">
            <BarRow label={c.baselineLabel} value={c.baseline} max={max} tone="base" />
            <BarRow label={c.affectedLabel} value={c.affected} max={max} tone="affected" />
          </div>

          <div className="mt-3 rounded-xl border border-line bg-surface-3/40 p-3">
            <p className="text-[13px] text-ink-soft leading-relaxed">{c.stat}</p>
            <p className="text-[12px] text-ink-muted italic mt-1">{c.takeaway}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 text-[12px] text-ink-muted leading-relaxed">
        If the &ldquo;good&rdquo; (an equal-risk bond, loan, or unit of labour) is really the same, the law of one price
        says the price should match. A persistent, non-arbitrageable gap points to bias — finance as a lens on
        injustice.
      </p>
    </div>
  )
}

function BarRow({
  label,
  value,
  max,
  tone,
}: {
  label: string
  value: number
  max: number
  tone: 'base' | 'affected'
}) {
  const pct = (value / max) * 100
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-0.5">
        <span className="text-ink-soft">{label}</span>
        <span className="font-mono text-ink-muted">{value.toFixed(1)}</span>
      </div>
      <div className="h-5 rounded bg-surface-3/60 overflow-hidden">
        <motion.div
          className={tone === 'base' ? 'h-full bg-brand-500/50' : 'h-full bg-amber-500/70'}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
