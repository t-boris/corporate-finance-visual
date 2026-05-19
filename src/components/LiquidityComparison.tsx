import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'

/**
 * Compares the three liquidity ratios (current, quick, cash) across Altice, DISH and Boeing —
 * the same companies discussed in Lesson 1-4. Recovery rates from Berger, Ofek & Swary (1996)
 * are shown below the chart.
 */
type Row = { name: string; current: number; quick: number; cash: number; accent: string; note: string }

const COMPANIES: Row[] = [
  {
    name: 'Altice',
    current: 0.30,
    quick: 0.21,
    cash: 0.07,
    accent: '#ef4444',
    note: 'Telecom — very low liquidity across all three ratios',
  },
  {
    name: 'DISH',
    current: 1.50,
    quick: 0.97,
    cash: 0.55,
    accent: '#10b981',
    note: 'Same industry as Altice — far healthier liquidity profile',
  },
  {
    name: 'Boeing',
    current: 1.33,
    quick: 0.36,
    cash: 0.18,
    accent: '#f59e0b',
    note: 'Inventory-heavy ($78.8B of $108.7B). Quick ratio reveals the weakness.',
  },
]

const RECOVERY = [
  { label: 'Cash',        pct: 100, color: '#10b981' },
  { label: 'Receivables', pct: 72,  color: '#3b82f6' },
  { label: 'Inventory',   pct: 55,  color: '#f59e0b' },
]

export function LiquidityComparison() {
  const maxVal = Math.max(...COMPANIES.flatMap((c) => [c.current, c.quick, c.cash])) * 1.15

  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <Droplets className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-4</div>
          <h3 className="font-display text-lg font-semibold">Liquidity ratios: Altice vs DISH vs Boeing</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
        {COMPANIES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-line bg-surface-3/40 p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold" style={{ color: c.accent }}>{c.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-muted">3 ratios</div>
            </div>
            {[
              { label: 'Current', value: c.current },
              { label: 'Quick',   value: c.quick },
              { label: 'Cash',    value: c.cash },
            ].map((row) => {
              const widthPct = (row.value / maxVal) * 100
              const healthy = row.value >= 1
              return (
                <div key={row.label} className="mb-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-ink-soft">{row.label}</span>
                    <span className={`font-mono ${healthy ? 'text-emerald-400' : 'text-ink'}`}>
                      {row.value.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-3 overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${widthPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.08 }}
                      style={{ backgroundColor: c.accent }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              )
            })}
            <p className="text-[11px] text-ink-muted mt-2 leading-snug">{c.note}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface-3/30 p-3">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">
          Why exclude inventory · Berger, Ofek &amp; Swary (1996)
        </div>
        <p className="text-xs text-ink-soft mb-3">
          Recovery rates in distress sales — every dollar of current asset returns:
        </p>
        <div className="flex flex-col gap-2">
          {RECOVERY.map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-xs">
              <div className="w-24 text-ink-muted">{r.label}</div>
              <div className="flex-1 h-3 rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: r.color }}
                />
              </div>
              <div className="w-12 font-mono text-right">{r.pct}¢</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-ink-muted mt-3 leading-snug">
          Inventory recovers only ≈ 55¢ per dollar. That's why the <span className="font-mono">quick ratio</span> excludes it,
          and Boeing's current ratio of 1.33 dramatically overstates its real short-term liquidity.
        </p>
      </div>
    </div>
  )
}
