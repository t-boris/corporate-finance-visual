import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

/**
 * Lesson 5-7 — The trade-off theory of capital structure.
 *
 * Value(L) = V_U + taxBenefit(L) − distressCost(L)
 *   taxBenefit(L) = a·L                (linear, rising)
 *   distressCost(L) = b·L²             (convex, rising faster)
 *   L* = a / (2b)  maximizes value.
 *
 * Three firm profiles change b (distress sensitivity), which shifts L*:
 *   - Average firm:  L* ≈ 30%, value gain ≈ 5% (Korteweg).
 *   - Safe/large/tangible:  L* higher (~45%).
 *   - Risky/young/volatile: L* lower (~15%), possibly toward 0.
 */
type Profile = 'risky' | 'average' | 'safe'
const A = 0.333
const B: Record<Profile, number> = { average: 0.555, risky: 1.111, safe: 0.370 }
const LABEL: Record<Profile, string> = {
  risky: 'Risky / young / volatile',
  average: 'Average U.S. firm',
  safe: 'Safe / large / tangible',
}

const W = 600, H = 280, PADL = 44, PADR = 16, PADT = 16, PADB = 36
const LMAX = 0.6
const x = (L: number) => PADL + (L / LMAX) * (W - PADL - PADR)
// value plotted relative to V_U baseline; scale so 0.08 fills the height
const VMAX = 0.09
const y = (v: number) => PADT + (1 - v / VMAX) * (H - PADT - PADB)

const tax = (L: number) => A * L
const dist = (b: number, L: number) => b * L * L
const value = (b: number, L: number) => tax(L) - dist(b, L)

function path(fn: (L: number) => number) {
  const pts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const L = (i / 60) * LMAX
    pts.push(`${x(L).toFixed(1)},${y(fn(L)).toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
}

export function TradeoffCurve() {
  const [profile, setProfile] = useState<Profile>('average')
  const b = B[profile]
  const Lstar = Math.min(A / (2 * b), LMAX)
  const gain = value(b, Lstar)

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <TrendingUp className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 5-7</div>
          <h3 className="font-display text-lg font-semibold">The trade-off model and L*</h3>
        </div>
      </header>

      <div className="inline-flex flex-wrap rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {(['risky', 'average', 'safe'] as Profile[]).map((p) => (
          <button
            key={p}
            onClick={() => setProfile(p)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              profile === p ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {LABEL[p]}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* axes */}
        <line x1={PADL} y1={H - PADB} x2={W - PADR} y2={H - PADB} stroke="rgb(var(--line))" />
        <line x1={PADL} y1={PADT} x2={PADL} y2={H - PADB} stroke="rgb(var(--line))" />
        <text x={(W) / 2} y={H - 6} textAnchor="middle" style={{ fill: 'rgb(var(--ink-muted))' }} fontSize="11">
          Leverage L = D / V
        </text>
        <text x={12} y={PADT + 8} style={{ fill: 'rgb(var(--ink-muted))' }} fontSize="11">Value</text>

        {/* tax benefit (green, rising) */}
        <path d={path((L) => tax(L))} fill="none" stroke="rgb(16 185 129)" strokeWidth={2} strokeDasharray="4 3" opacity={0.8} />
        {/* distress cost (amber, convex) — plotted as negative magnitude for reference */}
        <path d={path((L) => -dist(b, L))} fill="none" stroke="rgb(245 158 11)" strokeWidth={2} strokeDasharray="4 3" opacity={0.7} />
        {/* net value (brand) */}
        <motion.path
          key={profile}
          d={path((L) => value(b, L))}
          fill="none"
          stroke="rgb(var(--brand-500))"
          strokeWidth={3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* L* marker */}
        <motion.line
          x1={x(Lstar)} x2={x(Lstar)} y1={y(gain)} y2={H - PADB}
          stroke="rgb(var(--brand-500))" strokeWidth={1} strokeDasharray="3 3" opacity={0.6}
          animate={{ x1: x(Lstar), x2: x(Lstar) }}
        />
        <motion.circle cx={x(Lstar)} cy={y(gain)} r={5} fill="rgb(var(--brand-500))" animate={{ cx: x(Lstar), cy: y(gain) }} />
        <text x={x(Lstar)} y={H - PADB + 14} textAnchor="middle" style={{ fill: 'rgb(var(--brand-300))' }} fontSize="11" fontWeight="600">
          L* = {(Lstar * 100).toFixed(0)}%
        </text>
      </svg>

      <div className="flex flex-wrap gap-4 text-[11px] mt-2 mb-3">
        <Legend color="rgb(16 185 129)" label="Tax benefit (rises with L)" />
        <Legend color="rgb(245 158 11)" label="Distress cost (convex)" />
        <Legend color="rgb(var(--brand-500))" label="Net value = benefit − cost" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-brand-500/40 bg-brand-500/5 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Optimal leverage</div>
          <div className="font-mono text-xl text-brand-300">{(Lstar * 100).toFixed(0)}%</div>
        </div>
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Value gain at L*</div>
          <div className="font-mono text-xl text-emerald-300">+{(gain * 100).toFixed(1)}%</div>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        Riskier firms have a steeper distress cost, pushing L* down (toward 0 if there are no profits to shield). The
        average firm peaks near <span className="text-brand-300 font-medium">30%</span> for a ~5% value gain — but there is
        no single quantitative optimum for every firm (that&apos;s the model&apos;s limitation).
      </p>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-soft">
      <span className="inline-block w-4 h-0.5" style={{ background: color }} />
      {label}
    </span>
  )
}
