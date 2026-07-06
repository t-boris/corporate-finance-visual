import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gauge } from 'lucide-react'

/**
 * Lesson 6-1 — using the credit rating to read capital structure.
 *
 * PepsiCo (15% leverage, A+) and Twitter (17% leverage, BB+) have almost the
 * same leverage, yet the rating flips the conclusion:
 *   - PepsiCo's own trade-off optimum is high (~35%) → at 15% it is UNDERlevered.
 *   - Twitter is a risky growth firm: its optimum is low (~10%) → at 17% it is OVERlevered.
 * The rating reveals the firm-specific L* that raw leverage hides.
 */
type Firm = {
  key: string
  name: string
  rating: string
  leverage: number   // actual leverage, fraction
  lstar: number      // firm-specific optimal leverage, fraction
  verdict: string
  tone: 'emerald' | 'amber'
}

const FIRMS: Firm[] = [
  { key: 'pep', name: 'PepsiCo',  rating: 'A+',  leverage: 0.15, lstar: 0.35, verdict: 'Underlevered — can add debt', tone: 'emerald' },
  { key: 'twtr', name: 'Twitter', rating: 'BB+', leverage: 0.17, lstar: 0.10, verdict: 'Overlevered — junk despite low leverage', tone: 'amber' },
]

// value-vs-leverage hill peaking at lstar: v(L) = 1 − k·(L − L*)²
const W = 600, H = 280, PADL = 44, PADR = 20, PADT = 18, PADB = 38
const LMAX = 0.6
const x = (L: number) => PADL + (L / LMAX) * (W - PADL - PADR)
const y = (v: number) => PADT + (1 - v) * (H - PADT - PADB)
const curve = (lstar: number, k: number) => (L: number) => 1 - k * (L - lstar) ** 2

function path(fn: (L: number) => number) {
  const pts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const L = (i / 60) * LMAX
    pts.push(`${x(L).toFixed(1)},${y(fn(L)).toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
}

export function RatingVsLeverage() {
  const [key, setKey] = useState('pep')
  const firm = FIRMS.find((f) => f.key === key) ?? FIRMS[0]

  // firm curve (steeper for the risky firm so its peak is sharper/lower-L*)
  const k = firm.key === 'twtr' ? 9 : 4
  const fn = curve(firm.lstar, k)
  // median-firm reference curve, L*≈0.30
  const medFn = curve(0.30, 4)

  const vAtActual = fn(firm.leverage)
  const isUnder = firm.leverage < firm.lstar

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Gauge className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 6-1</div>
          <h3 className="font-display text-lg font-semibold">Same leverage, opposite verdict — read the rating</h3>
        </div>
      </header>

      <div className="inline-flex rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {FIRMS.map((f) => (
          <button
            key={f.key}
            onClick={() => setKey(f.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              key === f.key ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {f.name} · {f.rating}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* axes */}
        <line x1={PADL} y1={H - PADB} x2={W - PADR} y2={H - PADB} stroke="rgb(var(--line))" />
        <line x1={PADL} y1={PADT} x2={PADL} y2={H - PADB} stroke="rgb(var(--line))" />
        <text x={W / 2} y={H - 8} textAnchor="middle" style={{ fill: 'rgb(var(--ink-muted))' }} fontSize="11">
          Leverage L = D / (D + E)
        </text>
        <text x={12} y={PADT + 8} style={{ fill: 'rgb(var(--ink-muted))' }} fontSize="11">Value</text>

        {/* median-firm reference */}
        <path d={path(medFn)} fill="none" stroke="rgb(var(--ink-muted))" strokeWidth={1.5} strokeDasharray="4 4" opacity={0.5} />
        <text x={x(0.30)} y={y(medFn(0.30)) - 8} textAnchor="middle" style={{ fill: 'rgb(var(--ink-muted))' }} fontSize="10">
          median firm L*≈30%
        </text>

        {/* firm curve */}
        <motion.path
          key={firm.key}
          d={path(fn)}
          fill="none"
          stroke="rgb(var(--brand-500))"
          strokeWidth={3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* firm optimum */}
        <circle cx={x(firm.lstar)} cy={y(1)} r={4} fill="rgb(var(--brand-500))" />
        <text x={x(firm.lstar)} y={y(1) - 8} textAnchor="middle" style={{ fill: 'rgb(var(--brand-300))' }} fontSize="10" fontWeight="600">
          L* {(firm.lstar * 100).toFixed(0)}%
        </text>

        {/* actual leverage marker */}
        <motion.line
          x1={x(firm.leverage)} x2={x(firm.leverage)} y1={y(vAtActual)} y2={H - PADB}
          stroke={firm.tone === 'emerald' ? 'rgb(16 185 129)' : 'rgb(245 158 11)'}
          strokeWidth={2} strokeDasharray="3 3"
          animate={{ x1: x(firm.leverage), x2: x(firm.leverage) }}
        />
        <motion.circle
          cx={x(firm.leverage)} cy={y(vAtActual)} r={6}
          fill={firm.tone === 'emerald' ? 'rgb(16 185 129)' : 'rgb(245 158 11)'}
          animate={{ cx: x(firm.leverage), cy: y(vAtActual) }}
        />
        <text
          x={x(firm.leverage)} y={H - PADB + 14} textAnchor="middle"
          style={{ fill: firm.tone === 'emerald' ? 'rgb(16 185 129)' : 'rgb(245 158 11)' }} fontSize="11" fontWeight="600"
        >
          actual {(firm.leverage * 100).toFixed(0)}%
        </text>

        {/* under/over arrow */}
        <text x={x((firm.leverage + firm.lstar) / 2)} y={y(1) + 30} textAnchor="middle" style={{ fill: 'rgb(var(--ink-soft))' }} fontSize="11">
          {isUnder ? '← room to add debt' : 'past its optimum →'}
        </text>
      </svg>

      <div className={`mt-3 rounded-lg border p-3 ${firm.tone === 'emerald' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-amber-500/40 bg-amber-500/5'}`}>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink">{firm.name} · rating {firm.rating}</span>
          <span className={`text-sm font-medium ${firm.tone === 'emerald' ? 'text-emerald-300' : 'text-amber-300'}`}>
            {firm.verdict}
          </span>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        PepsiCo and Twitter sit at almost the same leverage (15% vs 17%), but the trade-off model alone would mislead you.
        The <span className="text-brand-300 font-medium">rating</span> reveals the firm-specific optimum: PepsiCo&apos;s
        A+ says it is <span className="text-emerald-300 font-medium">underlevered</span>; Twitter&apos;s junk BB+ says it
        is <span className="text-amber-300 font-medium">overlevered</span> because its profits lie in the future.
      </p>
    </div>
  )
}
