import { useState } from 'react'
import { motion } from 'framer-motion'
import { Receipt } from 'lucide-react'
import { fmtUSD } from '@/lib/finance'

/**
 * Lesson 5-5 — The effect of leverage on taxes and profits (OPAT rises).
 *
 * PepsiCo: EBIT ≈ $13.044B, base interest $1.695B, tax rate 21%.
 * Slide the NEW debt issued (0..20B at 4%). More debt → more interest →
 * lower taxable income → lower taxes → OPAT (= EBIT − taxes) RISES, even
 * though net income (after interest) falls. Debt "takes money from the govt."
 *
 * OPAT here follows the FIN 570 convention: OPAT = EBIT − taxes (as reported).
 */
const EBIT = 13.044, BASE_INT = 1.695, T = 0.21

function calc(newDebt: number) {
  const interest = BASE_INT + newDebt * 0.04
  const ebt = EBIT - interest
  const taxes = Math.max(ebt, 0) * T
  const netIncome = ebt - taxes
  const opat = EBIT - taxes // course definition
  return { interest, taxes, netIncome, opat }
}

export function LeverageTaxShield() {
  const [debt, setDebt] = useState(7)
  const base = calc(0)
  const now = calc(debt)
  const taxSaving = base.taxes - now.taxes

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Receipt className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 5-5</div>
          <h3 className="font-display text-lg font-semibold">More debt → less tax → higher OPAT</h3>
        </div>
      </header>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">New debt issued (at 4%)</span>
          <span className="font-mono text-sm text-brand-300">${debt.toFixed(0)}B</span>
        </div>
        <input type="range" min={0} max={20} step={1} value={debt} onChange={(e) => setDebt(+e.target.value)} className="w-full accent-brand-500" />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>$0B</span><span>$7B</span><span>$20B</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <Stat label="Interest" value={fmtUSD(now.interest * 1e9)} up />
        <Stat label="Taxes" value={fmtUSD(now.taxes * 1e9)} down good />
        <Stat label="Net income" value={fmtUSD(now.netIncome * 1e9)} down />
        <Stat label="OPAT = EBIT − tax" value={fmtUSD(now.opat * 1e9)} up good accent />
      </div>

      {/* OPAT bar vs baseline */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-3 mb-3">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-2">OPAT vs no-debt baseline</div>
        <div className="relative h-7 rounded-md bg-surface-3/50 overflow-hidden border border-line">
          <div className="absolute inset-y-0 left-0 bg-ink-muted/20" style={{ width: '90%' }} />
          <motion.div
            className="h-full bg-emerald-500/70 flex items-center justify-end pr-2 text-[10px] text-white"
            animate={{ width: `${(now.opat / (EBIT)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
          >
            {fmtUSD(now.opat * 1e9)}
          </motion.div>
        </div>
        <div className="text-[11px] text-ink-muted mt-2">
          Tax saving vs baseline:{' '}
          <motion.span key={taxSaving.toFixed(3)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-mono text-emerald-300">
            {fmtUSD(taxSaving * 1e9)}
          </motion.span>{' '}
          — money taken from the government.
        </div>
      </div>

      <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-500/5 p-3 text-sm text-ink-soft">
        <span className="font-semibold text-amber-300">The puzzle:</span> if OPAT only rises with leverage, why is average
        U.S. leverage just ~30% (and lower for profitable firms)? There must be a hidden cost — the cost of financial
        distress (Lesson 5-6).
      </div>
    </div>
  )
}

function Stat({ label, value, up, down, good, accent }: { label: string; value: string; up?: boolean; down?: boolean; good?: boolean; accent?: boolean }) {
  return (
    <div className={`rounded-lg border px-2 py-2 ${accent ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-line bg-surface-3/50'}`}>
      <div className="text-[9px] uppercase tracking-wide text-ink-muted leading-tight">{label}</div>
      <div className={`font-mono text-sm mt-0.5 ${good ? 'text-emerald-300' : 'text-ink'}`}>{value}</div>
      <div className="text-[9px] text-ink-muted mt-0.5">{up ? '▲ rises' : down ? '▼ falls' : ''}</div>
    </div>
  )
}
