import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

/**
 * Lesson 7-3 — futures, marking to market, and "hedging is the search for zero".
 *
 * Lecture example: a US company will RECEIVE £1M in December, so it shorts
 * 16 pound futures (£62,500 each) at $1.329/£ with a $100,000 margin deposit.
 * If the futures rate moves to 1.4: futures P&L = −$71,000, but the receivable
 * gains +$71,000 → net = 0. The margin account absorbs the daily loss.
 */
const NOTIONAL = 1_000_000 // £
const ENTRY = 1.329
const MARGIN0 = 100_000

export function FuturesSearchForZero() {
  const [rate, setRate] = useState(1.4) // current futures rate

  const futuresPnl = (ENTRY - rate) * NOTIONAL // short: gains when rate falls
  const operationalPnl = (rate - ENTRY) * NOTIONAL // £1M receivable value change
  const net = futuresPnl + operationalPnl // always 0
  const margin = MARGIN0 + Math.min(futuresPnl, 0) // losses deducted from margin
  const marginCall = margin < 0

  const MAX = 120_000
  const fmt = (v: number) =>
    `${v < 0 ? '−' : v > 0 ? '+' : ''}$${Math.abs(Math.round(v)).toLocaleString()}`

  const Bar = ({ label, value, color }: { label: string; value: number; color: string }) => {
    const w = Math.min(50, (Math.abs(value) / MAX) * 50)
    return (
      <div className="flex items-center gap-3">
        <div className="w-44 shrink-0 text-[13px] text-ink-soft">{label}</div>
        <div className="flex-1 relative h-8 rounded-md bg-surface-2/70 overflow-hidden">
          {/* zero axis */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgb(var(--line))]" />
          <motion.div
            className="absolute top-1 bottom-1 rounded"
            style={{ background: color }}
            animate={{
              left: value >= 0 ? '50%' : `${50 - w}%`,
              width: `${w}%`,
            }}
            transition={{ duration: 0.3 }}
          />
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-[11px] font-mono font-semibold ${
              value >= 0 ? 'left-[52%]' : 'right-[52%]'
            }`}
            style={{ color }}
          >
            {fmt(value)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Scale className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 7-3</div>
          <h3 className="font-display text-lg font-semibold">The search for zero: short £1M futures at 1.329</h3>
        </div>
      </header>

      <div className="text-[13px] text-ink-soft mb-3">
        Receiving £1M in December → short <span className="font-mono text-ink">16 contracts</span> (£1M / £62,500) at{' '}
        <span className="font-mono text-brand-300">$1.329/£</span>, margin deposit{' '}
        <span className="font-mono text-ink">$100,000</span>. Move the futures rate:
      </div>

      {/* rate slider */}
      <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-ink-muted">Futures rate today</span>
          <span className="font-mono text-xs text-brand-300">${rate.toFixed(3)}/£</span>
        </div>
        <input
          type="range"
          min={1.23}
          max={1.43}
          step={0.001}
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>£ depreciates</span>
          <span>entry 1.329</span>
          <span>£ appreciates (lecture: 1.400)</span>
        </div>
      </div>

      {/* P&L bars around zero */}
      <div className="space-y-2.5">
        <Bar label="Futures position (short £)" value={futuresPnl} color="rgb(239 68 68)" />
        <Bar label="£1M receivable (operations)" value={operationalPnl} color="rgb(16 185 129)" />
        <Bar label="NET — the hedge target" value={net} color="rgb(var(--brand-400))" />
      </div>

      {/* margin + net readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <div className="rounded-lg border border-line bg-surface-3/60 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Futures P&amp;L</div>
          <div className={`font-mono text-lg mt-0.5 ${futuresPnl < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {fmt(futuresPnl)}
          </div>
        </div>
        <div
          className={`rounded-lg border p-3 text-center ${
            marginCall ? 'border-red-500/50 bg-red-500/10' : 'border-line bg-surface-3/60'
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Margin account (CME)</div>
          <div className={`font-mono text-lg mt-0.5 ${marginCall ? 'text-red-300' : 'text-ink'}`}>
            {marginCall ? 'MARGIN CALL' : `$${Math.round(margin).toLocaleString()}`}
          </div>
          <div className="text-[10px] text-ink-muted mt-0.5">
            {futuresPnl < 0 ? 'losses deducted daily (marking to market)' : 'gains credited · earns interest'}
          </div>
        </div>
        <div className="rounded-lg border border-brand-500/40 bg-brand-500/5 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Net gain</div>
          <div className="font-mono text-lg mt-0.5 text-brand-300">$0</div>
          <div className="text-[10px] text-ink-muted mt-0.5">always — that&apos;s hedging</div>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        At the lecture&apos;s <span className="font-mono">1.400</span>: futures lose{' '}
        <span className="font-mono text-red-400">$71,000</span> (margin falls to $29,000), the receivable gains{' '}
        <span className="font-mono text-emerald-400">$71,000</span> — net <strong>zero</strong>. The CFO made{' '}
        <strong>no mistake</strong>: hedging eliminates risk, it doesn&apos;t chase trading profits. Flipping to a long
        position because the pound &ldquo;will keep rising&rdquo; would be <strong>speculation</strong>.
      </p>
    </div>
  )
}
