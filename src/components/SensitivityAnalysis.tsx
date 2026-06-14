import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { fmtUSD } from '@/lib/finance'

/**
 * Sensitivity analysis — Lesson 4-4.
 *
 * The Module-3 machine ($40M, +$9M/yr, 10 yrs). NPV is linear in sales volume:
 * lecture anchors NPV(1M)=−$16M, NPV(3M)=+$17.5M (base, expected value),
 * NPV(5M)=+$51M → slope $16.75M per million units. Break-even ≈ 1.965M units.
 * Lesson: the base-case NPV (expected value) is unchanged; a negative worst case
 * is NOT a reason to reject — it is a planning/validation tool.
 */

const BASE_UNITS = 3
const BASE_NPV = 17.5 // $M at the expected value
const SLOPE = 16.75 // $M NPV per +1M units
const BREAKEVEN = (BASE_UNITS - BASE_NPV / SLOPE) // ≈ 1.96M units

const npvAt = (units: number) => BASE_NPV + SLOPE * (units - BASE_UNITS)

export function SensitivityAnalysis() {
  const [units, setUnits] = useState(3)
  const npv = npvAt(units)
  const good = npv >= 0

  // chart geometry
  const W = 520, H = 200, padL = 44, padB = 28, padT = 12, padR = 12
  const xMin = 1, xMax = 5
  const yMin = -20, yMax = 55
  const x = (u: number) => padL + ((u - xMin) / (xMax - xMin)) * (W - padL - padR)
  const y = (v: number) => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB)
  const line = `${x(xMin)},${y(npvAt(xMin))} ${x(xMax)},${y(npvAt(xMax))}`

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 4-4
          </div>
          <h3 className="font-display text-lg font-semibold">
            How sensitive is NPV to the sales forecast?
          </h3>
        </div>
      </header>

      <div className="rounded-xl border border-line bg-surface-3/30 p-3 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 230 }}>
          {/* zero line */}
          <line x1={padL} y1={y(0)} x2={W - padR} y2={y(0)} stroke="rgb(var(--line))" strokeWidth={1} strokeDasharray="4 4" />
          <text x={padL - 6} y={y(0) + 3} fontSize="9" textAnchor="end" fill="rgb(var(--ink-muted))">$0</text>
          <text x={padL - 6} y={y(50) + 3} fontSize="9" textAnchor="end" fill="rgb(var(--ink-muted))">$50M</text>
          <text x={padL - 6} y={y(-15) + 3} fontSize="9" textAnchor="end" fill="rgb(var(--ink-muted))">−$15M</text>

          {/* x ticks */}
          {[1, 2, 3, 4, 5].map((u) => (
            <text key={u} x={x(u)} y={H - 8} fontSize="9" textAnchor="middle" fill="rgb(var(--ink-muted))">{u}M</text>
          ))}
          <text x={(W + padL) / 2} y={H} fontSize="9" textAnchor="middle" fill="rgb(var(--ink-muted))">units sold</text>

          {/* NPV line */}
          <polyline points={line} fill="none" stroke="rgb(var(--brand-500))" strokeWidth={2.5} />

          {/* break-even marker */}
          <circle cx={x(BREAKEVEN)} cy={y(0)} r={4} fill="rgb(var(--surface-2))" stroke="#f59e0b" strokeWidth={2} />
          <text x={x(BREAKEVEN)} y={y(0) - 8} fontSize="9" textAnchor="middle" fill="#f59e0b">break-even ≈ 1.965M</text>

          {/* base (expected) marker */}
          <circle cx={x(BASE_UNITS)} cy={y(BASE_NPV)} r={3} fill="#10b981" />
          <text x={x(BASE_UNITS) + 6} y={y(BASE_NPV) - 4} fontSize="9" fill="#34d399">base 3M → +$17.5M</text>

          {/* live point */}
          <motion.circle
            cx={x(units)} cy={y(npv)} r={6}
            fill={good ? '#10b981' : 'rgb(var(--danger))'}
            animate={{ cx: x(units), cy: y(npv) }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </svg>
      </div>

      {/* slider */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Sales volume (expected = 3M units)</span>
          <span className="font-mono text-sm text-brand-300">{units.toFixed(1)}M units</span>
        </div>
        <input type="range" min={1} max={5} step={0.1} value={units} onChange={(e) => setUnits(+e.target.value)} className="w-full accent-brand-500" />
      </div>

      <div className="rounded-lg bg-surface-3 border border-line p-3 text-center mb-3">
        <span className="font-mono text-sm">
          NPV at {units.toFixed(1)}M units ={' '}
          <span className={good ? 'text-emerald-300' : 'text-danger'}>
            {npv >= 0 ? '+' : '−'}{fmtUSD(Math.abs(npv), 1)}M
          </span>
        </span>
      </div>

      <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-500/5 p-3 text-sm text-ink-soft">
        <span className="font-semibold text-amber-300">Don&apos;t reject on the worst case.</span>{' '}
        The project&apos;s NPV is still <span className="font-mono">+$17.5M</span> at the <em>expected</em> value of
        3M units. Almost any project is negative under <em>some</em> assumption — value creation requires risk.
        Use sensitivity analysis to validate the forecast and find the break-even (~1.965M units), not to kill the project.
      </div>
    </div>
  )
}
