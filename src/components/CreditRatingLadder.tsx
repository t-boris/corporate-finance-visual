import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'

/**
 * Lesson 6-1 — the S&P credit-rating ladder.
 *
 * AAA at the top down to D, with the investment-grade / junk break between
 * BBB− and BB+. Hovering/selecting a rung shows the firms from the lectures and
 * the ~10-year cumulative default probability for that grade.
 */
type Rung = {
  rating: string
  grade: 'ig' | 'junk'
  pd10: string          // ~10-yr cumulative default probability
  firms?: string[]
}

const LADDER: Rung[] = [
  { rating: 'AAA', grade: 'ig',   pd10: '~0.4%' },
  { rating: 'AA',  grade: 'ig',   pd10: '~0.8%', firms: ['Walmart (AA)', 'Meta (AA−)'] },
  { rating: 'A',   grade: 'ig',   pd10: '~1.7%', firms: ['PepsiCo (A+)'] },
  { rating: 'BBB', grade: 'ig',   pd10: '~5.3%', firms: ['Kraft-Heinz (BBB−)', 'median US firm @ 30% leverage'] },
  { rating: 'BB',  grade: 'junk', pd10: '~14%',  firms: ['Twitter (BB+)', 'Pricemark (BB−, pseudo)'] },
  { rating: 'B',   grade: 'junk', pd10: '~25%',  firms: ['Tenet Healthcare (B+)'] },
  { rating: 'CCC', grade: 'junk', pd10: '~45%' },
  { rating: 'CC/C', grade: 'junk', pd10: 'very high' },
  { rating: 'D',   grade: 'junk', pd10: 'in default' },
]

export function CreditRatingLadder() {
  const [sel, setSel] = useState('BBB')
  const selected = LADDER.find((r) => r.rating === sel) ?? LADDER[3]

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Layers className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 6-1</div>
          <h3 className="font-display text-lg font-semibold">The credit-rating ladder (S&P)</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4">
        {/* ladder */}
        <div className="space-y-1.5">
          {LADDER.map((r, i) => {
            const isSel = r.rating === sel
            const isIG = r.grade === 'ig'
            return (
              <div key={r.rating}>
                <button
                  onClick={() => setSel(r.rating)}
                  className={[
                    'w-full flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors',
                    isSel
                      ? 'border-brand-500/60 bg-brand-500/15'
                      : isIG
                        ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                        : 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50',
                  ].join(' ')}
                >
                  <span className="font-mono font-semibold text-ink">{r.rating}</span>
                  <span className={`text-[11px] ${isIG ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {isIG ? 'investment grade' : 'junk'}
                  </span>
                </button>
                {/* the famous breakpoint between BBB and BB */}
                {r.rating === 'BBB' && (
                  <div className="flex items-center gap-2 my-1.5 px-1">
                    <div className="h-px flex-1 bg-amber-500/50" />
                    <span className="text-[10px] uppercase tracking-widest text-amber-400">
                      BBB− │ BB+ — investment-grade cutoff
                    </span>
                    <div className="h-px flex-1 bg-amber-500/50" />
                  </div>
                )}
                {i === LADDER.length - 1 && null}
              </div>
            )
          })}
        </div>

        {/* detail panel */}
        <motion.div
          key={selected.rating}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-line bg-surface-3/40 p-4 h-fit"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-ink">{selected.rating}</span>
            <span className={`text-xs ${selected.grade === 'ig' ? 'text-emerald-300' : 'text-amber-300'}`}>
              {selected.grade === 'ig' ? 'Investment grade' : 'Speculative (junk)'}
            </span>
          </div>
          <div className="mt-3 rounded-lg border border-line bg-surface-2/60 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-ink-muted">~10-yr cumulative default prob.</div>
            <div className="font-mono text-lg text-brand-300">{selected.pd10}</div>
          </div>
          <div className="mt-3">
            <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1.5">Firms from the lectures</div>
            {selected.firms && selected.firms.length > 0 ? (
              <ul className="space-y-1">
                {selected.firms.map((f) => (
                  <li key={f} className="text-sm text-ink-soft flex gap-2">
                    <span className="text-brand-400">›</span>{f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted italic">No lecture example at this rung.</p>
            )}
          </div>
        </motion.div>
      </div>

      <p className="mt-4 text-[13px] text-ink-soft leading-relaxed">
        A rating is a <span className="text-brand-300 font-medium">summary measure of credit risk</span> — driven by
        profitability, size, leverage and cash-flow risk, not leverage alone. The break between{' '}
        <span className="text-amber-300 font-medium">BBB− and BB+</span> is pivotal: insurers can&apos;t hold junk, and a
        downgrade can cut off commercial paper and credit lines — which is why managers target a rating, not just a
        leverage ratio.
      </p>
    </div>
  )
}
