import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

/**
 * Lesson 5-3 — Why debt increases beta (the boom/bust example).
 *
 * All-equity firm worth 45 today; boom payoff 50 (p=0.75), bust 30 (p=0.25).
 * Add a slider for the debt payment D (0..20). Equity today = 45 − D, and
 * equity payoffs are 50−D / 30−D. The return spread widens as D rises:
 * +11%/−33% with no debt → +17%/−50% with D=15. Bigger swings = more
 * systematic risk = higher beta = higher required return on equity.
 */
const BOOM = 50, BUST = 30, V0 = 45

export function LeverageBeta() {
  const [d, setD] = useState(15)
  const eq0 = V0 - d
  const boomRet = (BOOM - d - eq0) / eq0
  const bustRet = (BUST - d - eq0) / eq0
  const spread = boomRet - bustRet

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Activity className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 5-3</div>
          <h3 className="font-display text-lg font-semibold">Debt amplifies risk (boom vs bust)</h3>
        </div>
      </header>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Debt payment D</span>
          <span className="font-mono text-sm text-brand-300">{d}</span>
        </div>
        <input type="range" min={0} max={20} step={1} value={d} onChange={(e) => setD(+e.target.value)} className="w-full accent-brand-500" />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>0 (all-equity)</span><span>lecture: 15</span><span>20</span>
        </div>
      </div>

      {/* returns gauge: a centered zero line with boom (up) and bust (down) */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-3">
        <div className="grid grid-cols-2 gap-6">
          <ReturnBar label="Boom (p=0.75)" ret={boomRet} positive />
          <ReturnBar label="Bust (p=0.25)" ret={bustRet} />
        </div>
        <div className="mt-3 text-center text-xs text-ink-muted">
          Equity value today = 45 − {d} = <span className="font-mono text-ink">{eq0}</span> · return spread ={' '}
          <motion.span key={spread.toFixed(2)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-mono text-brand-300">
            {(spread * 100).toFixed(0)} pts
          </motion.span>
        </div>
      </div>

      <div className="rounded-xl border-l-4 border-l-brand-500 bg-brand-500/5 p-3 text-sm text-ink-soft">
        As D rises, gains and losses both grow (D=0 → +11% / −33%; D=15 → +17% / −50%). Greater fluctuation = more{' '}
        <span className="font-semibold text-brand-300">systematic risk</span> → higher beta → shareholders demand a higher
        return on equity. This is the engine behind Modigliani–Miller.
      </div>
    </div>
  )
}

function ReturnBar({ label, ret, positive }: { label: string; ret: number; positive?: boolean }) {
  const pct = Math.min(Math.abs(ret) * 100, 100)
  return (
    <div>
      <div className="text-[11px] text-ink-muted mb-1">{label}</div>
      <div className="h-24 flex items-end">
        <motion.div
          className={`w-full rounded-t-md ${positive ? 'bg-emerald-500/70' : 'bg-rose-500/70'}`}
          animate={{ height: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        />
      </div>
      <div className={`text-center font-mono text-sm mt-1 ${positive ? 'text-emerald-300' : 'text-rose-300'}`}>
        {ret >= 0 ? '+' : ''}{(ret * 100).toFixed(0)}%
      </div>
    </div>
  )
}
