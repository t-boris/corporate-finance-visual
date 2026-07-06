import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

/**
 * Lesson 7-2 — currency forward: locking in the rate.
 *
 * Lecture example: August 2025, a US company must pay £200M to a UK supplier
 * in December 2025. Spot = $1.328/£, December forward = $1.329/£.
 * Hedged payment = 200M × 1.329 = $265.8M — irrespective of the December spot.
 */
const NOTIONAL = 200 // £M
const FORWARD = 1.329
const SPOT_AUG = 1.328

export function ForwardHedgeLock() {
  const [spotDec, setSpotDec] = useState(1.5) // December spot $/£

  const unhedged = NOTIONAL * spotDec // $M
  const hedged = NOTIONAL * FORWARD // $M = 265.8
  const diff = unhedged - hedged // >0 → hedge saved money

  const maxV = NOTIONAL * 1.6
  const wUnhedged = (unhedged / maxV) * 100
  const wHedged = (hedged / maxV) * 100

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Lock className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 7-2</div>
          <h3 className="font-display text-lg font-semibold">Forward hedge: paying £200M in December</h3>
        </div>
      </header>

      <div className="text-[13px] text-ink-soft mb-3">
        August 2025: spot <span className="font-mono text-ink">${SPOT_AUG}/£</span> · December forward{' '}
        <span className="font-mono text-brand-300">${FORWARD}/£</span> → locked payment{' '}
        <span className="font-mono text-brand-300">${hedged.toFixed(1)}M</span>. Drag the December spot:
      </div>

      {/* December spot slider */}
      <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-ink-muted">December spot rate</span>
          <span className="font-mono text-xs text-brand-300">${spotDec.toFixed(3)}/£</span>
        </div>
        <input
          type="range"
          min={1.0}
          max={1.6}
          step={0.001}
          value={spotDec}
          onChange={(e) => setSpotDec(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>£ depreciates ($1.00)</span>
          <span>spot 1.328</span>
          <span>£ appreciates ($1.60)</span>
        </div>
      </div>

      {/* bars */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <div className="w-44 shrink-0 text-[13px] text-ink-soft">Unhedged (pay spot)</div>
          <div className="flex-1 h-8 rounded-md bg-surface-2/70 overflow-hidden">
            <motion.div
              className="h-full rounded-md flex items-center justify-end pr-2"
              style={{ background: 'rgb(239 68 68)' }}
              animate={{ width: `${wUnhedged}%` }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[11px] font-mono font-semibold text-white">${unhedged.toFixed(1)}M</span>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-44 shrink-0 text-[13px] text-ink-soft">
            Hedged (locked {FORWARD})
          </div>
          <div className="flex-1 h-8 rounded-md bg-surface-2/70 overflow-hidden">
            <motion.div
              className="h-full rounded-md flex items-center justify-end pr-2"
              style={{ background: 'rgb(var(--brand-500))' }}
              animate={{ width: `${wHedged}%` }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[11px] font-mono font-semibold text-white">${hedged.toFixed(1)}M</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* verdict */}
      <div
        className={`mt-4 rounded-lg border p-3 text-center ${
          Math.abs(diff) < 1
            ? 'border-line bg-surface-3/60 text-ink'
            : diff > 0
              ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300'
              : 'border-amber-500/40 bg-amber-500/5 text-amber-300'
        }`}
      >
        <div className="text-[10px] uppercase tracking-widest text-ink-muted">Hedge vs. no hedge</div>
        <div className="font-mono text-lg mt-0.5">
          {diff > 0 ? `saved $${diff.toFixed(1)}M` : diff < 0 ? `"overpaid" $${(-diff).toFixed(1)}M` : '±0'}
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        The company is <strong>long pounds, short dollars</strong> in the forward: in December it pays{' '}
        <span className="font-mono">$265.8M</span>, receives £200M, and pays the supplier — whatever the spot does. At{' '}
        <span className="font-mono">$1.50/£</span> the hedge saves $34.2M; at <span className="font-mono">$1.00/£</span>{' '}
        it &ldquo;overpays&rdquo; $65.8M. Why the overpay is <em>not</em> a mistake → next lesson: hedging is the search
        for zero.
      </p>
    </div>
  )
}
