import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Calculator } from 'lucide-react'
import { fmtPct } from '@/lib/finance'

/**
 * Building the WACC from CAPM — Lessons 4-5 → 4-8 (PepsiCo, June 2022).
 *
 *   r_E  = R_f + β·(R_m − R_f)          CAPM
 *   WACC = r_E·(E/V) + r_D·(D/V)·(1−T)  market-value weights
 *
 * Defaults reproduce the lecture: R_f 3%, MRP 5%, r_D 4%, T 21%, D 40, E 240
 * (D/V = 14%). At β = 0.6 → r_E = 6% → WACC ≈ 5.6%. The beta range 0.4–0.8 maps
 * to WACC 4.7%–6.5%. A pitfall callout warns against book-value leverage.
 */

const RF = 3, MRP = 5, RD = 4, TAX = 21
const D = 40, E = 240 // $B, MARKET values
const V = D + E
const dv = D / V, ev = E / V

const waccAt = (beta: number) => {
  const re = RF + beta * MRP
  const wacc = re * ev + RD * dv * (1 - TAX / 100)
  return { re, wacc }
}

export function WACCBuilder() {
  const [beta, setBeta] = useState(0.6)
  const { re, wacc } = waccAt(beta)

  // stacked bar segments (out of max ~9% scale)
  const SCALE = 9
  const eqSeg = (re * ev) / SCALE * 100
  const dtSeg = (RD * dv * (1 - TAX / 100)) / SCALE * 100

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Calculator className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lessons 4-5 → 4-8
          </div>
          <h3 className="font-display text-lg font-semibold">
            Building PepsiCo&apos;s WACC from CAPM
          </h3>
        </div>
      </header>

      {/* CAPM chain */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-3 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <Chip label="Risk-free R_f" value={`${RF}%`} hint="30-yr T-bond" />
        <Chip label="Market premium" value={`${MRP}%`} hint="stocks − bonds" />
        <Chip label="Beta β" value={beta.toFixed(2)} hint="risk vs market" accent />
        <Chip label="r_E = R_f + β·MRP" value={fmtPct(re / 100, 1)} hint="cost of equity" accent />
      </div>

      {/* beta slider */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Beta (β) — drives the cost of equity</span>
          <span className="font-mono text-sm text-brand-300">{beta.toFixed(2)}</span>
        </div>
        <input type="range" min={0.4} max={1.2} step={0.05} value={beta} onChange={(e) => setBeta(+e.target.value)} className="w-full accent-brand-500" />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>0.4 → WACC 4.7%</span><span>PepsiCo ≈ 0.6</span><span>0.8 → 6.5%</span>
        </div>
      </div>

      {/* weighted-average bar */}
      <div className="mb-2 text-[11px] uppercase tracking-widest text-ink-muted">
        WACC = weighted average (market weights E/V = {fmtPct(ev, 0)}, D/V = {fmtPct(dv, 0)})
      </div>
      <div className="h-10 rounded-lg overflow-hidden flex border border-line mb-1">
        <motion.div
          className="bg-brand-500/80 flex items-center justify-center text-[10px] text-white"
          animate={{ width: `${eqSeg}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          equity {fmtPct((re * ev) / 100, 1)}
        </motion.div>
        <motion.div
          className="bg-cyan-600/80 flex items-center justify-center text-[10px] text-white"
          animate={{ width: `${dtSeg}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          debt {fmtPct((RD * dv * (1 - TAX / 100)) / 100, 1)}
        </motion.div>
        <div className="flex-1 bg-surface-3" />
      </div>

      <div className="rounded-lg bg-surface-3 border border-line p-3 text-center mb-3">
        <span className="font-mono text-sm">
          WACC = {fmtPct(re / 100, 1)}×{fmtPct(ev, 0)} + {RD}%×{fmtPct(dv, 0)}×(1−{TAX}%) ={' '}
          <motion.span key={wacc.toFixed(2)} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="text-emerald-300 font-semibold">
            {fmtPct(wacc / 100, 1)}
          </motion.span>
        </span>
      </div>

      {/* pitfall */}
      <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-500/5 p-3 text-sm text-ink-soft flex gap-2">
        <Scale size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">Use MARKET value of equity for leverage.</span>{' '}
          Book equity ignores future value, overstates D/V, puts too much weight on cheap debt, and
          <em> understates</em> the WACC — risking acceptance of negative-NPV projects. PepsiCo: D = $40B,
          E (market) = $240B → D/V = 14% (not the book-based number).
        </div>
      </div>
    </div>
  )
}

function Chip({ label, value, hint, accent }: { label: string; value: string; hint: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border px-2 py-2 ${accent ? 'border-brand-500/50 bg-brand-500/5' : 'border-line bg-surface-3/50'}`}>
      <div className="text-[10px] uppercase tracking-wide text-ink-muted leading-tight">{label}</div>
      <div className={`font-mono text-sm mt-0.5 ${accent ? 'text-brand-300' : 'text-ink'}`}>{value}</div>
      <div className="text-[9px] text-ink-muted mt-0.5">{hint}</div>
    </div>
  )
}
