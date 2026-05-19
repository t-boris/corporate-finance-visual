import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

/**
 * Stock Price Composition — visually shows that today's stock price equals
 * the present value of ALL expected future cash flows. Interactive slider
 * over discount rate r controls how strongly distant cash flows fold into PV.
 */
export function StockPriceComposition() {
  const [r, setR] = useState(0.08)
  const [g, setG] = useState(0.03)

  // 10 future periods of cash flow growing at g, plus a terminal value
  const cf0 = 5
  const horizon = 10
  const flows = Array.from({ length: horizon }, (_, i) => cf0 * Math.pow(1 + g, i + 1))
  // Terminal value as growing perpetuity capitalised at year horizon
  const tv = (cf0 * Math.pow(1 + g, horizon + 1)) / (r - g)

  const pvs = flows.map((cf, i) => cf / Math.pow(1 + r, i + 1))
  const pvTV = tv / Math.pow(1 + r, horizon)
  const totalPV = pvs.reduce((a, b) => a + b, 0) + pvTV

  const maxBar = Math.max(...pvs, pvTV)

  return (
    <div className="card p-5">
      <header className="mb-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-1</div>
          <h3 className="font-display text-lg font-semibold">Stock price = Σ discounted future cash flows</h3>
          <p className="text-xs text-ink-muted mt-1">
            The bars below show the present value of each future cash flow. Their sum is today's stock price.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Today's stock price</div>
          <motion.div
            key={totalPV.toFixed(2)}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-mono text-2xl font-semibold text-brand-400"
          >
            ${totalPV.toFixed(2)}
          </motion.div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <label className="flex items-center gap-2 text-xs">
          <span className="w-32 text-ink-muted">Discount rate r:</span>
          <input
            type="range"
            min={0.04}
            max={0.20}
            step={0.005}
            value={r}
            onChange={(e) => setR(parseFloat(e.target.value))}
            className="flex-1 accent-brand-500"
          />
          <span className="font-mono w-14 text-right">{(r * 100).toFixed(1)}%</span>
        </label>
        <label className="flex items-center gap-2 text-xs">
          <span className="w-32 text-ink-muted">Growth rate g:</span>
          <input
            type="range"
            min={0}
            max={Math.min(0.08, r - 0.005)}
            step={0.005}
            value={g}
            onChange={(e) => setG(parseFloat(e.target.value))}
            className="flex-1 accent-brand-500"
          />
          <span className="font-mono w-14 text-right">{(g * 100).toFixed(1)}%</span>
        </label>
      </div>

      <div className="flex items-end gap-1 h-44 bg-surface-3/40 rounded-xl border border-line p-3 overflow-x-auto">
        {pvs.map((pv, i) => (
          <div key={i} className="flex flex-col items-center justify-end flex-1 min-w-[28px]">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(pv / maxBar) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-brand-400"
              style={{ minHeight: '4px' }}
              title={`Year ${i + 1}: PV = $${pv.toFixed(2)}`}
            />
            <div className="text-[9px] text-ink-muted mt-1">Y{i + 1}</div>
          </div>
        ))}
        {/* Terminal value */}
        <div className="flex flex-col items-center justify-end flex-1 min-w-[36px] border-l-2 border-dashed border-line pl-1 ml-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(pvTV / maxBar) * 100}%` }}
            transition={{ duration: 0.6, delay: horizon * 0.04 }}
            className="w-full rounded-t-md bg-gradient-to-t from-emerald-700 to-emerald-400"
            style={{ minHeight: '4px' }}
            title={`Terminal value PV: $${pvTV.toFixed(2)}`}
          />
          <div className="text-[9px] text-ink-muted mt-1">TV</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-xs">
        <div className="rounded-lg border border-line bg-surface-3/50 p-2">
          <div className="text-ink-muted">PV next year</div>
          <div className="font-mono text-base">${pvs[0].toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/50 p-2">
          <div className="text-ink-muted">PV year 5</div>
          <div className="font-mono text-base">${pvs[4].toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/50 p-2">
          <div className="text-ink-muted">PV terminal</div>
          <div className="font-mono text-base text-emerald-400">${pvTV.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-brand-400/60 bg-brand-500/10 p-2">
          <div className="text-ink-muted">Total</div>
          <div className="font-mono text-base text-brand-300">${totalPV.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex items-start gap-2 mt-4 text-xs text-ink-muted leading-relaxed">
        <Sparkles size={14} className="text-brand-400 shrink-0 mt-0.5" />
        <p>
          Increasing <span className="font-mono">r</span> compresses far-future cash flows toward zero — that's why
          high-rate environments deflate stock prices, especially for "long-duration" companies. Raising{' '}
          <span className="font-mono">g</span> lifts both the near and far cash flows.
        </p>
      </div>
    </div>
  )
}
