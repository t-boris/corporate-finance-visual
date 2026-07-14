import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Scale, ArrowRight } from 'lucide-react'

/**
 * Module 8 · Lessons 8-2 & 8-3 — the two agency costs of debt, side by side.
 * Toggle between Excessive Risk Taking (shareholders TAKE a −NPV project) and
 * Underinvestment (shareholders REJECT a +NPV project). Both use Scooter Inc.
 * ($1M loan, $900k assets). Rows show payoff without vs with the project for
 * the firm, debtholders and equity, colour-coded by who wins and who loses.
 */
type Row = { party: string; without: string; withP: string; delta: number; note: string }
type Scenario = {
  key: string
  tab: string
  title: string
  project: string
  npv: string
  rows: Row[]
  verdict: string
  verdictBad: boolean
  fix: string
}

const SCENARIOS: Scenario[] = [
  {
    key: 'risk',
    tab: 'Excessive risk taking',
    title: 'Excessive risk taking — a −$100k gamble gets taken',
    project: 'No-cost risky bet: 50% → assets $1.3M, 50% → assets $0.3M (E[value] = $0.8M).',
    npv: 'Firm NPV = $0.8M − $0.9M = −$100k → should REJECT',
    rows: [
      { party: 'Firm (total)', without: '$900k', withP: '$800k', delta: -100, note: 'value destroyed' },
      { party: 'Debtholders', without: '$900k', withP: '$650k', delta: -250, note: '0.5×$1M + 0.5×$0.3M' },
      { party: 'Equity', without: '$0', withP: '$150k', delta: 150, note: '0.5×$300k + 0.5×$0' },
    ],
    verdict: 'Shareholders TAKE the negative-NPV project — nothing to lose, and the downside falls on creditors.',
    verdictBad: true,
    fix: 'Fix: covenants (cap risky investments) + monitoring by the lender.',
  },
  {
    key: 'under',
    tab: 'Underinvestment',
    title: 'Underinvestment — a +$50k project gets rejected',
    project: 'Riskless project: invest $100k today → $150k next year (shareholders must fund the $100k).',
    npv: 'Firm NPV = $150k − $100k = +$50k → should ACCEPT',
    rows: [
      { party: 'Firm (net)', without: '$900k', withP: '$950k', delta: 50, note: 'value created, net of $100k in' },
      { party: 'Debtholders', without: '$900k', withP: '$1,000k', delta: 100, note: 'now fully repaid' },
      { party: 'Equity', without: '$0', withP: '−$50k', delta: -50, note: 'inject $100k, get $50k back' },
    ],
    verdict: 'Shareholders REJECT the positive-NPV project — they fund it, but the bank reaps the benefit.',
    verdictBad: true,
    fix: 'Fix: project finance (separate company) or a debt haircut — see below.',
  },
]

function DeltaPill({ delta }: { delta: number }) {
  const good = delta > 0
  const zero = delta === 0
  return (
    <span
      className={[
        'font-mono text-xs font-semibold px-2 py-0.5 rounded-full border',
        zero
          ? 'text-ink-muted border-line'
          : good
            ? 'text-emerald-300 border-emerald-500/50 bg-emerald-500/10'
            : 'text-red-300 border-red-500/50 bg-red-500/10',
      ].join(' ')}
    >
      {good ? '+' : ''}
      {delta}k
    </span>
  )
}

export function AgencyCostExplorer() {
  const [key, setKey] = useState('risk')
  const s = SCENARIOS.find((x) => x.key === key)!

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Scale className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lessons 8-2 / 8-3</div>
          <h3 className="font-display text-lg font-semibold">The two agency costs of debt · Scooter Inc.</h3>
        </div>
      </header>

      {/* toggle */}
      <div className="inline-flex rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {SCENARIOS.map((x) => (
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
          key={s.key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <div className="text-sm font-semibold text-ink mb-1">{s.title}</div>
          <p className="text-[13px] text-ink-soft leading-relaxed">{s.project}</p>
          <div className="mt-2 rounded-lg bg-surface-3 border border-line p-2 text-center font-mono text-[13px] text-ink">
            {s.npv}
          </div>

          {/* payoff table */}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-3 border-b border-line text-ink">
                  <th className="px-3 py-2 text-left font-semibold">Party</th>
                  <th className="px-3 py-2 text-right font-semibold">Without</th>
                  <th className="px-3 py-2 text-center font-semibold" aria-hidden></th>
                  <th className="px-3 py-2 text-right font-semibold">With project</th>
                  <th className="px-3 py-2 text-right font-semibold">Δ</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.party} className="border-b border-line/50">
                    <td className="px-3 py-2 text-ink font-medium">
                      {r.party}
                      <div className="text-[11px] text-ink-muted font-normal">{r.note}</div>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-ink-soft">{r.without}</td>
                    <td className="px-1 py-2 text-center text-ink-muted">
                      <ArrowRight size={13} className="inline" />
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-ink">{r.withP}</td>
                    <td className="px-3 py-2 text-right">
                      <DeltaPill delta={r.delta} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* verdict */}
          <div
            className={[
              'mt-3 rounded-xl border-l-4 p-3',
              s.verdictBad ? 'border-l-red-500 bg-red-500/5' : 'border-l-emerald-500 bg-emerald-500/5',
            ].join(' ')}
          >
            <div className="text-[10px] uppercase tracking-widest text-red-300 mb-1">What actually happens</div>
            <div className="text-[13px] text-ink-soft leading-relaxed">{s.verdict}</div>
          </div>
          <p className="mt-2 text-[12px] text-ink-muted italic">{s.fix}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
