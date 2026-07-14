import { useState } from 'react'
import { motion } from 'framer-motion'
import { Landmark } from 'lucide-react'

/**
 * Module 8 · Lesson 8-1 — "Who gets what in bankruptcy."
 * Debt is fixed at $1M and senior. Drag the firm's asset value and watch how
 * the pie splits: creditors first (up to $1M), equity gets the residual
 * max(A − D, 0). Presets reproduce the XX / YY / ZZ examples.
 */
const DEBT = 1.0 // $M, fixed
const MAX_ASSETS = 3.0

type Preset = { key: string; name: string; assets: number; note: string }
const PRESETS: Preset[] = [
  { key: 'xx', name: 'XX Corp', assets: 3.0, note: 'Assets $3M — equity deep in the money' },
  { key: 'yy', name: 'YY Corp', assets: 1.0, note: 'Assets $1M — exactly enough to repay debt' },
  { key: 'zz', name: 'ZZ Corp', assets: 0.5, note: 'Assets $0.5M — bank recovers only half' },
]

const money = (m: number) => (m >= 1 || m <= -1 ? `$${m.toFixed(2)}M` : `$${Math.round(m * 1000)}k`)

export function BankruptcyWaterfall() {
  const [assets, setAssets] = useState(3.0)

  const debtRecovered = Math.min(assets, DEBT)
  const creditorShortfall = Math.max(DEBT - assets, 0)
  const equity = Math.max(assets - DEBT, 0)

  // bar heights as % of a fixed visual scale (MAX_ASSETS)
  const pct = (m: number) => `${(m / MAX_ASSETS) * 100}%`

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Landmark className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 8-1</div>
          <h3 className="font-display text-lg font-semibold">Who gets what in bankruptcy</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 items-center">
        {/* The stacked bar */}
        <div className="flex items-end justify-center gap-4">
          <div className="relative w-24 h-56 rounded-lg border border-line bg-surface-3/40 overflow-hidden flex flex-col-reverse">
            {/* debt repaid (senior, bottom) */}
            <motion.div
              className="w-full bg-emerald-500/70 flex items-center justify-center"
              animate={{ height: pct(debtRecovered) }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              {debtRecovered > 0.28 && (
                <span className="text-[10px] font-semibold text-white/90 rotate-0">Debt</span>
              )}
            </motion.div>
            {/* equity residual (on top) */}
            <motion.div
              className="w-full bg-brand-500/70 flex items-center justify-center"
              animate={{ height: pct(equity) }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              {equity > 0.28 && <span className="text-[10px] font-semibold text-white/90">Equity</span>}
            </motion.div>
            {/* debt line marker at $1M */}
            <div
              className="absolute left-0 w-full border-t border-dashed border-amber-400/80"
              style={{ bottom: pct(DEBT) }}
            >
              <span className="absolute -top-4 right-1 text-[9px] text-amber-300">debt $1M</span>
            </div>
          </div>
        </div>

        {/* Controls + readout */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-ink-muted uppercase tracking-widest">Asset value</label>
            <span className="font-mono text-sm text-ink">{money(assets)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={MAX_ASSETS}
            step={0.05}
            value={assets}
            onChange={(e) => setAssets(parseFloat(e.target.value))}
            className="w-full accent-brand-500"
          />

          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => setAssets(p.assets)}
                className={[
                  'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                  Math.abs(assets - p.assets) < 0.001
                    ? 'bg-brand-500/20 text-brand-200 border-brand-500/50'
                    : 'bg-surface-3/40 text-ink-soft border-line hover:border-brand-500/40',
                ].join(' ')}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3">
              <div className="text-[10px] uppercase tracking-widest text-emerald-400">Debtholders recover</div>
              <div className="font-mono text-lg text-ink">{money(debtRecovered)}</div>
              {creditorShortfall > 0 && (
                <div className="text-[11px] text-red-300 mt-0.5">short by {money(creditorShortfall)}</div>
              )}
            </div>
            <div className="rounded-xl border border-brand-500/40 bg-brand-500/5 p-3">
              <div className="text-[10px] uppercase tracking-widest text-brand-300">Equity = max(A−D, 0)</div>
              <div className="font-mono text-lg text-ink">{money(equity)}</div>
              {equity === 0 && <div className="text-[11px] text-ink-muted mt-0.5">wiped out (limited liability)</div>}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-ink-soft leading-relaxed">
        Debt is <strong>senior</strong> — creditors are paid first, up to the $1M owed. Equity is the{' '}
        <strong>residual claimant</strong>, worth <span className="font-mono">max(A − D, 0)</span>, and can never go
        below zero (<strong>limited liability</strong>). That floor is exactly why shareholders love risk when the firm
        is under water — the next two lessons.
      </p>
    </div>
  )
}
