import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, Zap } from 'lucide-react'
import { fmtUSD } from '@/lib/finance'

/**
 * Working-capital financing-shock multiplier — Lessons 2-8 & 2-9.
 *
 * Receivables case: sales need COGS = 92% of sales; the firm can finance a
 * fraction f of sales and has $15M of internal cash. Solving
 *   0.92·S = 15 + f·S   ⇒   S = 15 / (0.92 − f)
 * Achievable sales are min(demand, S). When financing is cut, sales fall even
 * though demand is intact — the lecture's $75M → $35.7M result at f = 50%.
 */

const DEMAND = 75 // $M / quarter
const COGS_RATIO = 0.92
const INTERNAL_CASH = 15 // $M available from own cash flow

export function WorkingCapitalShock() {
  const [financePct, setFinancePct] = useState(80)

  const f = financePct / 100
  const maxFundableSales = INTERNAL_CASH / (COGS_RATIO - f) // equilibrium of the spiral
  const sales = Math.max(0, Math.min(DEMAND, maxFundableSales))
  const constrained = sales < DEMAND - 0.01
  const lostSales = DEMAND - sales

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Zap className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lessons 2-8 & 2-9
          </div>
          <h3 className="font-display text-lg font-semibold">
            The financing-shock spiral — when cash, not demand, caps sales
          </h3>
        </div>
      </header>

      {/* slider */}
      <div className="mb-5">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Financeable fraction of sales</span>
          <span className="font-mono text-sm text-brand-300">{financePct}%</span>
        </div>
        <input
          type="range"
          min={40}
          max={85}
          step={1}
          value={financePct}
          onChange={(e) => setFinancePct(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-1">
          <span>crisis (50%)</span>
          <span>normal (80%)</span>
        </div>
      </div>

      {/* demand vs achievable */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <Bar label="Demand (customers want)" value={DEMAND} max={DEMAND} color="#06b6d4" />
        <Bar
          label="Achievable sales (financing-limited)"
          value={sales}
          max={DEMAND}
          color={constrained ? '#ef4444' : '#10b981'}
        />
        {constrained && (
          <div className="flex items-center gap-1.5 text-[11px] text-danger mt-1">
            <TrendingDown size={12} />
            <span className="font-mono">{fmtUSD(lostSales, 1)}M of demand unmet — purely a cash shortfall</span>
          </div>
        )}
      </div>

      {/* verdict */}
      <motion.div
        key={constrained ? 'c' : 'ok'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-3 mb-4 border text-sm ${
          constrained ? 'border-danger/40 bg-danger/5' : 'border-emerald-500/40 bg-emerald-500/5'
        }`}
      >
        {constrained ? (
          <>
            <span className="font-semibold text-danger">Cash crunch.</span> The firm can only fund{' '}
            <span className="font-mono">COGS = 15 + {f.toFixed(2)}·S</span>, so sales settle at{' '}
            <span className="font-mono">S = 15 / (0.92 − {f.toFixed(2)}) = {fmtUSD(sales, 1)}M</span>.
            Lower sales shrink the financeable base further — a self-reinforcing spiral.
          </>
        ) : (
          <>
            <span className="font-semibold text-emerald-300">No constraint.</span> Financing is ample,
            so sales meet demand at {fmtUSD(DEMAND, 0)}M. The cycle runs smoothly.
          </>
        )}
      </motion.div>

      {/* inventory analogue */}
      <div className="rounded-xl border border-line bg-surface-3/40 p-3">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">
          Same logic from the inventory side (Lesson 2-8)
        </div>
        <p className="text-xs text-ink-soft leading-relaxed">
          After a Q1 sales dip to $60M, the firm generates only $25.5M and needs $34.5M for next
          quarter&apos;s inventory. With no reserve it can buy just ~$51M of inventory → Q2 sales fall
          to <span className="font-mono">~$55.4M</span>. The remedy is the same: hold a healthy{' '}
          <strong>cash ratio</strong> or keep an undrawn <strong>credit line</strong>.
        </p>
      </div>
    </div>
  )
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between text-xs mb-1">
        <span className="text-ink-soft">{label}</span>
        <span className="font-mono" style={{ color }}>
          {fmtUSD(value, 1)}M
        </span>
      </div>
      <div className="h-6 rounded-lg bg-surface-3 overflow-hidden">
        <motion.div
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full rounded-lg"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}
