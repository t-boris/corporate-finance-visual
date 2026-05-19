import { motion } from 'framer-motion'
import { Telescope } from 'lucide-react'

/**
 * Valuation ratios visual — illustrates "FUTURE divided by PRESENT (or past)".
 * Plus a side-by-side comparison of Altice vs DISH using book-based M/B and Value/OPAT.
 */
type Co = { name: string; mb: number; vOpat: number; stockPerf: string; accent: string }

const COMPANIES: Co[] = [
  { name: 'Altice', mb: 1.32, vOpat: 18.5, stockPerf: '↓ Significant decline', accent: '#ef4444' },
  { name: 'DISH',   mb: 0.95, vOpat: 9.8,  stockPerf: '→ Roughly flat',        accent: '#10b981' },
]

export function ValuationRatiosViz() {
  const maxMB = Math.max(...COMPANIES.map((c) => c.mb)) * 1.3
  const maxV = Math.max(...COMPANIES.map((c) => c.vOpat)) * 1.3

  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <Telescope className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-7</div>
          <h3 className="font-display text-lg font-semibold">Valuation ratios = future ÷ present</h3>
        </div>
      </header>

      {/* Concept diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl border border-brand-500/60 bg-brand-500/10 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-brand-300">Numerator</div>
          <div className="font-mono text-base mt-1">Market Value</div>
          <div className="text-[11px] text-ink-muted mt-2">All discounted future cash flows</div>
        </div>
        <div className="rounded-xl border border-line bg-surface-3/40 p-3 text-center flex flex-col items-center justify-center">
          <div className="text-3xl text-ink-muted">÷</div>
          <div className="text-[11px] text-ink-muted mt-2">Yields</div>
          <div className="font-mono text-sm">"FUTURE ÷ PAST"</div>
        </div>
        <div className="rounded-xl border border-line bg-surface-3/40 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Denominator</div>
          <div className="font-mono text-base mt-1">Book Value · OPAT · Net Income</div>
          <div className="text-[11px] text-ink-muted mt-2">A fundamental from the present/past</div>
        </div>
      </div>

      {/* Comparison: M/B & Value/OPAT for two companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <RatioPanel
          title="Market-to-Book of Assets"
          formula="M/B = MV(Assets) / BV(Assets)"
          companies={COMPANIES.map((c) => ({ name: c.name, value: c.mb, accent: c.accent }))}
          maxVal={maxMB}
          unit="×"
          decimals={2}
        />
        <RatioPanel
          title="Value over OPAT (preferred)"
          formula="V/OPAT = MV(Assets) / OPAT"
          companies={COMPANIES.map((c) => ({ name: c.name, value: c.vOpat, accent: c.accent }))}
          maxVal={maxV}
          unit="×"
          decimals={1}
        />
      </div>

      {/* The apparent paradox */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-3 mt-4">
        <div className="text-[11px] uppercase tracking-widest text-amber-400 mb-1">⚠ Apparent paradox</div>
        <p className="text-xs text-ink-soft leading-relaxed">
          Altice has a HIGHER M/B than DISH, yet Altice's stock has performed WORSE recently. How? M/B compares the
          (drop-prone) future to a stale, possibly massaged book number. The <span className="font-mono">V/OPAT</span> ratio
          — based on actual operating profits — moves with stock performance, which is why the course prefers it.
        </p>
      </div>

      {/* Stock perf labels */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {COMPANIES.map((c) => (
          <div key={c.name} className="rounded-lg border border-line bg-surface-3/30 p-2">
            <div className="text-[10px] uppercase tracking-widest text-ink-muted">{c.name} · 3-year stock</div>
            <div className="text-sm" style={{ color: c.accent }}>{c.stockPerf}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RatioPanel({
  title,
  formula,
  companies,
  maxVal,
  unit,
  decimals,
}: {
  title: string
  formula: string
  companies: { name: string; value: number; accent: string }[]
  maxVal: number
  unit: string
  decimals: number
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-3/40 p-3">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{title}</div>
      <div className="font-mono text-xs text-ink-soft mb-3">{formula}</div>
      <div className="space-y-3">
        {companies.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: c.accent }}>{c.name}</span>
              <span className="font-mono">{c.value.toFixed(decimals)}{unit}</span>
            </div>
            <div className="h-3 rounded-full bg-surface-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(c.value / maxVal) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ backgroundColor: c.accent }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
