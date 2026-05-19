import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

/**
 * Profitability cascade — shows the income-statement waterfall from Revenue
 * down through EBITDA → EBIT → OPAT → Net Income. Uses Altice 2021 numbers.
 */
const CASCADE = [
  { label: 'Revenue',          value: 10092, color: '#6366f1', tag: 'Top line' },
  { label: 'COGS / OpEx',      value: -6300, color: '#475569', tag: '−' },
  { label: 'EBITDA',           value: 3792,  color: '#10b981', tag: 'Cash proxy' },
  { label: 'D&A',              value: -1250, color: '#475569', tag: '−' },
  { label: 'EBIT (Operating)', value: 2542,  color: '#3b82f6', tag: '=' },
  { label: 'Income Tax',       value: -295,  color: '#475569', tag: '−' },
  { label: 'OPAT',             value: 2247,  color: '#8b5cf6', tag: '★ key metric' },
  { label: 'Interest',         value: -1200, color: '#475569', tag: '−' },
  { label: 'Net Income',       value: 1047,  color: '#f59e0b', tag: 'Bottom line' },
]

export function ProfitabilityCascade() {
  const max = Math.max(...CASCADE.map((s) => Math.abs(s.value)))

  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <TrendingUp className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-5</div>
          <h3 className="font-display text-lg font-semibold">Profitability cascade · Altice 2021 ($ millions)</h3>
        </div>
      </header>

      <div className="space-y-2">
        {CASCADE.map((s, i) => {
          const pct = (Math.abs(s.value) / max) * 100
          const isNegative = s.value < 0
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[140px_1fr_120px] gap-3 items-center"
            >
              <div className="text-xs">
                <div className="font-medium">{s.label}</div>
                <div className="text-[10px] text-ink-muted">{s.tag}</div>
              </div>
              <div className="h-6 rounded-lg bg-surface-3 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  style={{ background: s.color }}
                  className="h-full rounded-lg flex items-center px-2 text-[10px] text-white/90"
                >
                  {isNegative ? '−' : ''}
                </motion.div>
              </div>
              <div className="text-right font-mono text-sm">
                {isNegative ? '−' : ''}${Math.abs(s.value).toLocaleString()}M
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <RatioBlock label="Asset Turnover" formula="Revenues / Assets" value="0.30" hint="Altice 2021" />
        <RatioBlock label="Net Profit Margin" formula="OPAT / Revenues" value="22.3%" hint="Strong margin" accent />
        <RatioBlock label="ROA (OPAT)" formula="OPAT / Assets" value="6.8%" hint="Profitability per $ of capital" />
      </div>

      <p className="text-xs text-ink-muted mt-4 leading-relaxed">
        <strong>OPAT</strong> sits near the top — it measures profits from the BUSINESS, before financing costs. We avoid
        Net Income because (a) it depends on capital structure (interest), and (b) one-time items at the bottom of the
        statement can distort it.
      </p>
    </div>
  )
}

function RatioBlock({
  label,
  formula,
  value,
  hint,
  accent = false,
}: { label: string; formula: string; value: string; hint: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-3 border ${accent ? 'border-brand-500/60 bg-brand-500/10' : 'border-line bg-surface-3/40'}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="font-mono text-xs text-ink-soft mt-1">{formula}</div>
      <div className="font-mono text-2xl font-semibold mt-1 text-brand-300">{value}</div>
      <div className="text-[10px] text-ink-muted">{hint}</div>
    </div>
  )
}
