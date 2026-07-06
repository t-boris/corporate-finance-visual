import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'

/**
 * Lesson 7-1 — when does hedging create value?
 *
 * The lecture's airline diagram: profit depends on the oil price
 * (low oil → high profit, high oil → low profit).
 *   - No debt:     volatility per se doesn't matter → hedging ≈ value-neutral.
 *   - High leverage: high oil → profit below the debt payment → financial
 *     distress → destroys value → hedging the oil price creates value.
 */
export function DistressHedging() {
  const [levered, setLevered] = useState(true)
  const [oil, setOil] = useState(78) // $/bbl

  // Profit falls linearly with the oil price (illustrative numbers).
  const profit = Math.round(160 - 1.5 * oil) // $M
  const debtPayment = 55 // $M required if levered
  const inDistress = levered && profit < debtPayment

  // chart geometry
  const W = 560
  const H = 220
  const PAD = { l: 46, r: 16, t: 18, b: 34 }
  const oilMin = 40
  const oilMax = 110
  const profMin = 0
  const profMax = 100
  const x = (o: number) => PAD.l + ((o - oilMin) / (oilMax - oilMin)) * (W - PAD.l - PAD.r)
  const y = (p: number) => H - PAD.b - ((Math.max(p, profMin) - profMin) / (profMax - profMin)) * (H - PAD.t - PAD.b)

  const lineStart = { ox: oilMin, p: 160 - 1.5 * oilMin }
  const lineEnd = { ox: oilMax, p: 160 - 1.5 * oilMax }
  // oil price at which profit crosses the debt payment: 160 − 1.5·o = 55 → o = 70
  const oilAtDebt = (160 - debtPayment) / 1.5

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Plane className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 7-1</div>
          <h3 className="font-display text-lg font-semibold">The airline: when hedging oil creates value</h3>
        </div>
      </header>

      {/* leverage toggle */}
      <div className="inline-flex rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {[
          { key: false, label: 'No debt' },
          { key: true, label: 'Highly levered' },
        ].map((t) => (
          <button
            key={String(t.key)}
            onClick={() => setLevered(t.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              levered === t.key
                ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50'
                : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* axes */}
        <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="rgb(var(--line))" strokeWidth={1} />
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="rgb(var(--line))" strokeWidth={1} />
        <text x={W - PAD.r} y={H - 12} textAnchor="end" className="fill-[rgb(var(--ink-muted))] text-[10px]">
          Oil price ($/bbl) →
        </text>
        <text x={PAD.l - 8} y={PAD.t + 4} textAnchor="end" className="fill-[rgb(var(--ink-muted))] text-[10px]">
          Profit
        </text>

        {/* distress zone (levered only): oil above crossing point */}
        {levered && (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x={x(oilAtDebt)}
            y={PAD.t}
            width={Math.max(0, x(oilMax) - x(oilAtDebt))}
            height={H - PAD.t - PAD.b}
            fill="rgb(239 68 68)"
            fillOpacity={0.08}
          />
        )}

        {/* debt payment line */}
        {levered && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line
              x1={PAD.l}
              y1={y(debtPayment)}
              x2={W - PAD.r}
              y2={y(debtPayment)}
              stroke="rgb(239 68 68)"
              strokeDasharray="5 4"
              strokeWidth={1.5}
            />
            <text x={W - PAD.r - 4} y={y(debtPayment) - 6} textAnchor="end" className="fill-red-400 text-[10px] font-medium">
              Debt payment ($55M)
            </text>
          </motion.g>
        )}

        {/* profit line */}
        <line
          x1={x(lineStart.ox)}
          y1={y(lineStart.p)}
          x2={x(lineEnd.ox)}
          y2={y(lineEnd.p)}
          stroke="rgb(var(--brand-400))"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <text x={x(44)} y={y(160 - 1.5 * 44) - 8} className="fill-[rgb(var(--brand-300))] text-[10px] font-medium">
          Low oil → high profit
        </text>
        <text x={x(88)} y={y(160 - 1.5 * 88) - 10} className="fill-[rgb(var(--brand-300))] text-[10px] font-medium">
          High oil → low profit
        </text>

        {/* current point */}
        <motion.circle
          animate={{ cx: x(oil), cy: y(profit) }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          r={7}
          fill={inDistress ? 'rgb(239 68 68)' : 'rgb(16 185 129)'}
          stroke="white"
          strokeWidth={2}
        />

        {levered && (
          <text x={x(oilAtDebt)} y={H - PAD.b + 14} textAnchor="middle" className="fill-red-400 text-[10px]">
            distress threshold
          </text>
        )}
      </svg>

      {/* oil slider */}
      <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2 mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-ink-muted">Oil price</span>
          <span className="font-mono text-xs text-brand-300">${oil}/bbl</span>
        </div>
        <input
          type="range"
          min={oilMin}
          max={oilMax}
          step={1}
          value={oil}
          onChange={(e) => setOil(parseInt(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      {/* readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <div className="rounded-lg border border-line bg-surface-3/60 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Airline profit</div>
          <div className="font-mono text-lg mt-0.5 text-ink">${profit}M</div>
        </div>
        <div
          className={`rounded-lg border p-3 text-center ${
            levered ? 'border-line bg-surface-3/60 text-ink' : 'border-line bg-surface-3/30 text-ink-muted'
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Debt payment due</div>
          <div className="font-mono text-lg mt-0.5">{levered ? '$55M' : '—'}</div>
        </div>
        <div
          className={`rounded-lg border p-3 text-center ${
            inDistress
              ? 'border-red-500/50 bg-red-500/10 text-red-300'
              : 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300'
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Status</div>
          <div className="font-mono text-lg mt-0.5">{inDistress ? 'DISTRESS' : 'OK'}</div>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        {levered ? (
          <>
            With high leverage, an oil-price spike pushes profit below the debt payment → <strong>financial
            distress</strong>, a higher cost of capital, lost value. Hedging the oil price removes that scenario — a{' '}
            <span className="text-emerald-400 font-medium">good reason to hedge</span>.
          </>
        ) : (
          <>
            With no debt, volatile profits never threaten a default. Diversified shareholders don&apos;t pay for lower
            volatility per se — hedging is roughly <span className="text-brand-300 font-medium">value-neutral</span>{' '}
            (the compensation argument may still apply).
          </>
        )}
      </p>
    </div>
  )
}
