import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import { fmtPct } from '@/lib/finance'

/**
 * Lesson 5-3 — The M&M illusion: leverage does NOT mechanically lower WACC.
 *
 * Slide the leverage ratio L. Two readings of the WACC:
 *  - NAÏVE (red): hold r_E = 6% and r_D = 4% fixed → WACC falls as L rises.
 *  - M&M (green): r_E and r_D rise with L so the true WACC stays ≈ 5.6%.
 * Defaults reproduce PepsiCo: r_E 6%, r_D 4%, T 21%, base L 14%.
 */
const RE0 = 6, RD0 = 4, TAX = 21, L0 = 0.14
const naiveWacc = (L: number) => (1 - L) * RE0 + L * RD0 * (1 - TAX / 100)
// M&M (no-tax benchmark) keeps the cost of *assets* constant: r_E and r_D drift up with L.
const MM_CONST = (1 - L0) * RE0 + L0 * RD0 // unlevered asset return ≈ 5.7%
const mmRe = (L: number) => (MM_CONST - L * RD0) / (1 - L) // solve so (1-L)rE + L rD = const

export function MMWaccIllusion() {
  const [L, setL] = useState(0.14)
  const naive = naiveWacc(L)
  const reAdj = mmRe(L)
  const mm = (1 - L) * reAdj + L * RD0 * (1 - TAX / 100)

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Brain className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 5-3 · M&amp;M</div>
          <h3 className="font-display text-lg font-semibold">Does more debt lower the WACC?</h3>
        </div>
      </header>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Leverage ratio L = D/V</span>
          <span className="font-mono text-sm text-brand-300">{fmtPct(L, 0)}</span>
        </div>
        <input type="range" min={0} max={0.6} step={0.02} value={L} onChange={(e) => setL(+e.target.value)} className="w-full accent-brand-500" />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>0%</span><span>PepsiCo 14%</span><span>40%</span><span>60%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/5 p-3">
          <div className="text-[10px] uppercase tracking-widest text-rose-300 mb-1">Naïve (r_E, r_D fixed)</div>
          <div className="font-mono text-2xl text-rose-200">
            <motion.span key={naive.toFixed(2)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>{fmtPct(naive / 100, 1)}</motion.span>
          </div>
          <div className="text-[11px] text-ink-muted mt-1">WACC seems to fall — the illusion.</div>
        </div>
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3">
          <div className="text-[10px] uppercase tracking-widest text-emerald-300 mb-1">M&amp;M (risk-adjusted r_E)</div>
          <div className="font-mono text-2xl text-emerald-200">
            <motion.span key={mm.toFixed(2)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>{fmtPct(mm / 100, 1)}</motion.span>
          </div>
          <div className="text-[11px] text-ink-muted mt-1">r_E rises to {fmtPct(reAdj / 100, 1)} → WACC stays put.</div>
        </div>
      </div>

      <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-500/5 p-3 text-sm text-ink-soft">
        The naïve calc holds r_E = 6% and r_D = 4% constant, so WACC drops from 5.6% to ~4.9% at L = 40%. But leverage
        raises risk, so <span className="font-semibold text-amber-300">r_E (and r_D) rise</span>. Modigliani–Miller: in the
        ideal benchmark the cost of capital is independent of leverage.
      </div>
    </div>
  )
}
