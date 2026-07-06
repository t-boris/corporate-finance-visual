import { useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch } from 'lucide-react'

/**
 * Lesson 6-1 — Credit risk: YTM vs. cost of debt.
 *
 * Two-state, one-year tree:
 *   - no default (prob 1−p):  return = +YTM
 *   - default     (prob p):   return = recovery − 1
 *   Cost of debt r_D = (1−p)·YTM + p·(recovery − 1).
 *
 * Presets reproduce the lecture / quiz numbers exactly.
 */
type Preset = {
  key: string
  label: string
  rating: string
  ytm: number      // %
  pd: number       // % per year
  rec: number      // % recovery
}

const PRESETS: Preset[] = [
  { key: 'kh',   label: 'Kraft-Heinz',     rating: 'BBB−', ytm: 4.2, pd: 0.4, rec: 40 },
  { key: 'tenet', label: 'Tenet Healthcare', rating: 'B+',  ytm: 6.0, pd: 2.9, rec: 40 },
  { key: 'bbb',  label: 'BBB (quiz)',      rating: 'BBB',  ytm: 4.0, pd: 0.5, rec: 40 },
  { key: 'bb',   label: 'BB− (quiz)',      rating: 'BB−',  ytm: 7.0, pd: 3.5, rec: 40 },
]

const RISK_FREE = 2.4 // 10-yr US Treasury, April 2022

export function CreditRiskTree() {
  const [ytm, setYtm] = useState(4.2)
  const [pd, setPd] = useState(0.4)
  const [rec, setRec] = useState(40)
  const [active, setActive] = useState('kh')

  const p = pd / 100
  const defaultReturn = rec - 100            // % return upon default (recovery − 1)
  const rD = (1 - p) * ytm + p * defaultReturn
  const spread = rD - RISK_FREE
  const gap = ytm - rD

  const applyPreset = (pr: Preset) => {
    setYtm(pr.ytm); setPd(pr.pd); setRec(pr.rec); setActive(pr.key)
  }

  // tree geometry
  const W = 560, H = 220
  const x0 = 20, xMid = 200, xEnd = 380
  const yMid = H / 2
  const yUp = 56, yDown = H - 56

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <GitBranch className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 6-1</div>
          <h3 className="font-display text-lg font-semibold">Credit-risk tree: YTM vs. cost of debt</h3>
        </div>
      </header>

      {/* presets */}
      <div className="inline-flex flex-wrap rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {PRESETS.map((pr) => (
          <button
            key={pr.key}
            onClick={() => applyPreset(pr)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              active === pr.key ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {pr.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* branches */}
        <motion.line
          x1={xMid} y1={yMid} x2={xEnd} y2={yUp}
          stroke="rgb(16 185 129)" strokeWidth={2 + 6 * (1 - p)} opacity={0.5}
          animate={{ x1: xMid, y1: yMid }}
        />
        <motion.line
          x1={xMid} y1={yMid} x2={xEnd} y2={yDown}
          stroke="rgb(239 68 68)" strokeWidth={2 + 6 * p} opacity={0.6}
          animate={{ x1: xMid, y1: yMid }}
        />
        <line x1={x0} y1={yMid} x2={xMid} y2={yMid} stroke="rgb(var(--line))" strokeWidth={2} />

        {/* root node */}
        <circle cx={xMid} cy={yMid} r={6} fill="rgb(var(--brand-500))" />
        <text x={x0} y={yMid - 10} style={{ fill: 'rgb(var(--ink-soft))' }} fontSize="12">Buy bond</text>

        {/* no-default node */}
        <circle cx={xEnd} cy={yUp} r={5} fill="rgb(16 185 129)" />
        <text x={xEnd + 12} y={yUp - 4} style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600">
          No default · {(100 - pd).toFixed(2)}%
        </text>
        <text x={xEnd + 12} y={yUp + 12} style={{ fill: 'rgb(16 185 129)' }} fontSize="12" fontFamily="monospace">
          return = +{ytm.toFixed(2)}%
        </text>

        {/* default node */}
        <circle cx={xEnd} cy={yDown} r={5} fill="rgb(239 68 68)" />
        <text x={xEnd + 12} y={yDown - 4} style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600">
          Default · {pd.toFixed(2)}%
        </text>
        <text x={xEnd + 12} y={yDown + 12} style={{ fill: 'rgb(239 68 68)' }} fontSize="12" fontFamily="monospace">
          return = {defaultReturn.toFixed(0)}% (recovery {rec}%)
        </text>
      </svg>

      {/* sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <Slider label="Yield to maturity" value={ytm} min={2} max={12} step={0.1} unit="%" onChange={(v) => { setYtm(v); setActive('') }} />
        <Slider label="Default prob. / yr" value={pd} min={0} max={10} step={0.1} unit="%" onChange={(v) => { setPd(v); setActive('') }} />
        <Slider label="Recovery rate" value={rec} min={0} max={100} step={5} unit="%" onChange={(v) => { setRec(v); setActive('') }} />
      </div>

      {/* results */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <Stat label="YTM (promised)" value={`${ytm.toFixed(2)}%`} tone="muted" />
        <Stat label="Cost of debt r_D" value={`${rD.toFixed(2)}%`} tone="brand" />
        <Stat label="YTM − r_D gap" value={`${gap.toFixed(2)}%`} tone="amber" />
        <Stat label="Spread vs 2.4% UST" value={`${spread.toFixed(2)}%`} tone="emerald" />
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        The <span className="text-emerald-300 font-medium">YTM</span> is only the <em>promised</em> return. The expected
        return — the <span className="text-brand-300 font-medium">cost of debt r_D</span> used in the WACC — subtracts the
        default branch. The gap is tiny for high-grade names (Kraft-Heinz: 4.2% → 3.9%) but large for junk
        (Tenet: 6.0% → 4.1%). Rule of thumb: adjust whenever the rating is below A.
      </p>
    </div>
  )
}

function Slider({
  label, value, min, max, step, unit, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</span>
        <span className="font-mono text-xs text-brand-300">{value.toFixed(step < 1 ? 1 : 0)}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-brand-500"
      />
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'brand' | 'amber' | 'emerald' | 'muted' }) {
  const ring: Record<string, string> = {
    brand: 'border-brand-500/40 bg-brand-500/5 text-brand-300',
    amber: 'border-amber-500/40 bg-amber-500/5 text-amber-300',
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300',
    muted: 'border-line bg-surface-3/60 text-ink',
  }
  return (
    <div className={`rounded-lg border p-3 text-center ${ring[tone]}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="font-mono text-lg mt-0.5">{value}</div>
    </div>
  )
}
