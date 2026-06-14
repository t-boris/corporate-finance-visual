import { useState } from 'react'
import { motion } from 'framer-motion'
import { HandCoins, ArrowRight } from 'lucide-react'
import { fmtUSD } from '@/lib/finance'

/**
 * Factoring implied-rate explorer — Lesson 2-6.
 *
 * A $300M receivable due in one year. Move the slider to set the cash a bank
 * advances today; the implied annual interest rate updates live.
 *   implied rate = Face / Advance − 1
 * The lecture's example: advance $280M → 300/280 − 1 ≈ 7.14%.
 */

const FACE = 300 // $M, collected in one year

export function FactoringExplorer() {
  const [advance, setAdvance] = useState(280)
  const impliedRate = FACE / advance - 1
  const cost = FACE - advance

  // colour the rate: green if cheap, amber mid, red if expensive
  const rateColor =
    impliedRate < 0.05 ? '#10b981' : impliedRate < 0.12 ? '#f59e0b' : '#ef4444'

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <HandCoins className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 2-6
          </div>
          <h3 className="font-display text-lg font-semibold">
            Factoring receivables — what rate are you really paying?
          </h3>
        </div>
      </header>

      {/* now vs later */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex-1 rounded-xl border border-brand-500/40 bg-brand-500/5 p-4 text-center">
          <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">Cash today</div>
          <motion.div key={advance} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="font-mono text-2xl font-semibold text-ink">
            {fmtUSD(advance, 0)}M
          </motion.div>
          <div className="text-[10px] text-ink-muted">from the bank now</div>
        </div>
        <ArrowRight className="text-ink-muted shrink-0" />
        <div className="flex-1 rounded-xl border border-line bg-surface-3/40 p-4 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">In 1 year</div>
          <div className="font-mono text-2xl font-semibold text-ink">{fmtUSD(FACE, 0)}M</div>
          <div className="text-[10px] text-ink-muted">face value of the receivable</div>
        </div>
      </div>

      {/* slider */}
      <div className="mb-5">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Cash advanced today</span>
          <span className="font-mono text-sm text-brand-300">{fmtUSD(advance, 0)}M</span>
        </div>
        <input
          type="range"
          min={240}
          max={300}
          step={1}
          value={advance}
          onChange={(e) => setAdvance(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      {/* results */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-surface-3/40 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Discount taken</div>
          <div className="font-mono text-xl font-semibold text-ink mt-1">{fmtUSD(cost, 0)}M</div>
          <div className="text-[10px] text-ink-muted">Face − Advance</div>
        </div>
        <div
          className="rounded-xl border p-3 text-center"
          style={{ borderColor: `${rateColor}66`, background: `${rateColor}14` }}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Implied annual rate</div>
          <motion.div
            key={Math.round(impliedRate * 10000)}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xl font-semibold mt-1"
            style={{ color: rateColor }}
          >
            {(impliedRate * 100).toFixed(2)}%
          </motion.div>
          <div className="text-[10px] text-ink-muted">Face / Advance − 1</div>
        </div>
      </div>

      <p className="text-xs text-ink-muted mt-4 leading-relaxed">
        Getting cash early is never free. At an advance of <span className="font-mono">$280M</span> the
        firm implicitly pays <span className="font-mono">≈7.14%</span> — selling a receivable is
        economically the same as borrowing against it. The same logic underlies early-payment
        discounts and supplier financing.
      </p>
    </div>
  )
}
