import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, ArrowRight } from 'lucide-react'

/**
 * Module 8 · Lesson 8-5 — the law of one price and arbitrage.
 * New York gold is fixed at $2,000; drag London's price. Profit = NY − London
 * ("buy low, sell high"). When competition converges the prices, the arbitrage
 * vanishes. The limits-to-arbitrage list explains why it does not make everyone
 * rich.
 */
const NY = 2000
const MIN = 1850
const MAX = 2000

const LIMITS = [
  ['Transaction costs', 'flights, fees — even online trades cost something'],
  ['Price risk', 'the price can move before you complete the trade'],
  ['Competition', 'others trade too, converging the two prices'],
  ['Scalability', 'supply and demand move against large volumes'],
]

export function ArbitrageFlow() {
  const [london, setLondon] = useState(1900)
  const profit = NY - london
  const isArb = profit > 0

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Coins className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 8-5</div>
          <h3 className="font-display text-lg font-semibold">Law of one price &amp; arbitrage</h3>
        </div>
      </header>

      {/* two markets with flow between */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-emerald-300">Buy · London</div>
          <div className="font-mono text-xl text-ink">${london.toLocaleString('en-US')}</div>
          <div className="text-[11px] text-ink-muted">1 oz gold</div>
        </div>

        <div className="flex flex-col items-center gap-1 px-1">
          <motion.div
            animate={isArb ? { x: [0, 8, 0] } : { x: 0 }}
            transition={{ repeat: isArb ? Infinity : 0, duration: 1.1, ease: 'easeInOut' }}
            className={isArb ? 'text-brand-300' : 'text-ink-muted'}
          >
            <ArrowRight size={22} />
          </motion.div>
          <span className="text-[9px] text-ink-muted whitespace-nowrap">ship / trade</span>
        </div>

        <div className="rounded-xl border border-brand-500/40 bg-brand-500/5 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-brand-300">Sell · New York</div>
          <div className="font-mono text-xl text-ink">${NY.toLocaleString('en-US')}</div>
          <div className="text-[11px] text-ink-muted">1 oz gold</div>
        </div>
      </div>

      {/* london slider */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-ink-muted uppercase tracking-widest">London price</label>
          <span className="font-mono text-sm text-ink">${london.toLocaleString('en-US')}</span>
        </div>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={10}
          value={london}
          onChange={(e) => setLondon(parseInt(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      {/* profit readout */}
      <motion.div
        key={isArb ? 'arb' : 'noarb'}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={[
          'mt-3 rounded-xl border p-3 flex items-center justify-between',
          isArb ? 'border-brand-500/50 bg-brand-500/10' : 'border-line bg-surface-3/40',
        ].join(' ')}
      >
        <div className="text-sm text-ink-soft">
          {isArb ? (
            <>
              <strong>Arbitrage:</strong> buy low, sell high — risk-free profit today.
            </>
          ) : (
            <>
              <strong>No arbitrage.</strong> Prices are equal — competition has converged them.
            </>
          )}
        </div>
        <div className={`font-mono text-lg ${isArb ? 'text-brand-200' : 'text-ink-muted'}`}>
          +${profit.toLocaleString('en-US')}
        </div>
      </motion.div>

      {/* limits */}
      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1.5">Why it doesn&apos;t make everyone rich</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {LIMITS.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-line bg-surface-3/40 px-2.5 py-1.5">
              <div className="text-[12px] font-semibold text-ink">{k}</div>
              <div className="text-[11px] text-ink-muted leading-snug">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[12px] text-ink-muted leading-relaxed">
        The same logic applies to a bundle (toothbrush $1 + toothpaste $4 should cost $5) — and, when a violation{' '}
        <em>cannot</em> be arbitraged away, it can signal something deeper than mispricing: bias.
      </p>
    </div>
  )
}
