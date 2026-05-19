import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

/**
 * Leverage visual — shows the difference between BOOK-based and MARKET-based
 * leverage with a draggable stock price. Demonstrates why Altice's "negative
 * book equity" doesn't actually mean bankruptcy.
 */
export function LeverageVisual() {
  // Default to Altice-like data — large book equity hole, positive market cap
  const [liabilities] = useState(35) // $B
  const [bookAssets] = useState(33)  // $B  → negative book equity = -2
  const [marketCap, setMarketCap] = useState(12) // $B  (slider)

  const bookEquity = bookAssets - liabilities
  const marketAssets = liabilities + marketCap
  const bookLeverage = liabilities / Math.max(bookAssets, 0.0001) // technically meaningless
  const marketLeverage = liabilities / marketAssets

  const bankrupt = bookLeverage > 1

  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <Scale className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-4.3</div>
          <h3 className="font-display text-lg font-semibold">Why we use MARKET equity (Altice case)</h3>
        </div>
      </header>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-xs">
          <span className="w-44 text-ink-muted">Market cap (drag):</span>
          <input
            type="range"
            min={1}
            max={40}
            step={0.5}
            value={marketCap}
            onChange={(e) => setMarketCap(parseFloat(e.target.value))}
            className="flex-1 accent-brand-500"
          />
          <span className="font-mono w-16 text-right">${marketCap.toFixed(1)}B</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BOOK side */}
        <div className="rounded-xl border border-line bg-surface-3/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-ink-muted">Book values</span>
            {bankrupt && (
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                Apparently bankrupt
              </span>
            )}
          </div>

          <BalanceDiagram
            left={{ label: 'Assets', value: bookAssets, color: '#6366f1' }}
            right={[
              { label: 'Liabilities', value: liabilities, color: '#ef4444' },
              { label: 'Equity', value: bookEquity, color: bookEquity < 0 ? '#ef4444' : '#10b981' },
            ]}
          />

          <div className="text-xs space-y-1 mt-3">
            <div className="flex justify-between text-ink-soft"><span>Assets (book)</span><span className="font-mono">${bookAssets.toFixed(1)}B</span></div>
            <div className="flex justify-between text-ink-soft"><span>Liabilities</span><span className="font-mono">${liabilities.toFixed(1)}B</span></div>
            <div className="flex justify-between font-semibold border-t border-line pt-1">
              <span>Book Equity</span>
              <span className={`font-mono ${bookEquity < 0 ? 'text-red-400' : ''}`}>
                ${bookEquity.toFixed(1)}B
              </span>
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-ink-muted">
              <span>"Book" leverage = L / Assets</span>
              <span className="font-mono">{bookLeverage.toFixed(2)} {bankrupt && '⚠'}</span>
            </div>
          </div>
        </div>

        {/* MARKET side */}
        <div className="rounded-xl border border-brand-500/60 bg-brand-500/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-brand-300">Market values · correct</span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Solvent
            </span>
          </div>

          <BalanceDiagram
            left={{ label: 'Mkt Value of Assets', value: marketAssets, color: '#6366f1' }}
            right={[
              { label: 'Liabilities', value: liabilities, color: '#ef4444' },
              { label: 'Market Cap', value: marketCap, color: '#10b981' },
            ]}
          />

          <div className="text-xs space-y-1 mt-3">
            <div className="flex justify-between text-ink-soft"><span>Mkt Value of Assets</span><span className="font-mono">${marketAssets.toFixed(1)}B</span></div>
            <div className="flex justify-between text-ink-soft"><span>Liabilities</span><span className="font-mono">${liabilities.toFixed(1)}B</span></div>
            <div className="flex justify-between font-semibold border-t border-line pt-1">
              <span>Market Equity</span>
              <span className="font-mono text-emerald-400">${marketCap.toFixed(1)}B</span>
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-brand-300">
              <span>Market leverage = L / (L + MktCap)</span>
              <motion.span
                key={marketLeverage.toFixed(2)}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-mono"
              >
                {marketLeverage.toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-ink-muted mt-4 leading-relaxed">
        Book equity may be negative because accounting captures only the past. Market value reflects discounted future cash
        flows — the firm is solvent as long as <span className="font-mono">L &lt; MV(Assets)</span>.
        US firms average <span className="font-mono">25–30%</span> leverage. Above ~50% is high; above ~75% is alarming.
      </p>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// Small horizontal bar diagram: assets stack on the left, liabilities + equity on the right.
// ────────────────────────────────────────────────────────────────
function BalanceDiagram({
  left,
  right,
}: {
  left: { label: string; value: number; color: string }
  right: { label: string; value: number; color: string }[]
}) {
  const total = left.value
  const rightTotal = right.reduce((s, r) => s + r.value, 0)
  const scale = Math.max(total, rightTotal)

  return (
    <div className="grid grid-cols-2 gap-2 h-24">
      {/* Assets stack */}
      <div className="relative rounded-lg overflow-hidden border border-line bg-surface-3/60">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${(left.value / scale) * 100}%` }}
          transition={{ duration: 0.6 }}
          style={{ background: left.color }}
          className="absolute bottom-0 left-0 right-0"
        />
        <div className="absolute inset-0 flex items-end p-1 text-[10px] text-white/90 font-mono">
          {left.label}
        </div>
      </div>
      {/* L+E stack */}
      <div className="relative rounded-lg overflow-hidden border border-line bg-surface-3/60">
        {(() => {
          let acc = 0
          return right
            .filter((r) => r.value > 0)
            .map((r) => {
              const heightPct = (r.value / scale) * 100
              const bottomPct = (acc / scale) * 100
              acc += r.value
              return (
                <motion.div
                  key={r.label}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.6 }}
                  style={{ background: r.color, bottom: `${bottomPct}%` }}
                  className="absolute left-0 right-0"
                  title={`${r.label}: ${r.value.toFixed(1)}`}
                />
              )
            })
        })()}
      </div>
    </div>
  )
}
