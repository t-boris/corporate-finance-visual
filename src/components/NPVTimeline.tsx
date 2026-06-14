import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, CheckCircle2, XCircle } from 'lucide-react'
import { fmtUSD, fmtPct } from '@/lib/finance'

/**
 * Incremental cash flows of the "speed up receivables" project — Lesson 3-1 & 3-3.
 *
 * The new collection system brings +$82M today but loses −$20M of sales every
 * year forever. The student moves the discount-rate slider and watches the NPV:
 *   NPV = 82 − 20 / r   ($M)
 * At the lecture's r = 10% the NPV is −$118M, so the project is rejected — and
 * because NPV equals the change in shareholder wealth, it would destroy $118M.
 * The break-even rate is 20/82 ≈ 24.4%, i.e. only an absurd discount rate could
 * justify the project.
 */

const TODAY_GAIN = 82 // $M collected sooner at t = 0
const ANNUAL_LOSS = 20 // $M of lost sales every year, forever

export function NPVTimeline() {
  const [ratePct, setRatePct] = useState(10)
  const r = ratePct / 100

  const pvLoss = ANNUAL_LOSS / r // PV of the −$20M perpetuity
  const npv = TODAY_GAIN - pvLoss
  const good = npv > 0
  const breakeven = ANNUAL_LOSS / TODAY_GAIN // ≈ 0.244

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Coins className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-1 / 3-3
          </div>
          <h3 className="font-display text-lg font-semibold">
            Should we speed up collecting receivables?
          </h3>
        </div>
      </header>

      {/* incremental cash-flow timeline */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-3">
          Incremental cash flows (new − old), $M
        </div>
        <div className="flex items-end gap-2 h-28">
          {/* t = 0 gain */}
          <CFBar label="t=0" value={TODAY_GAIN} max={TODAY_GAIN} positive />
          {/* t = 1..5 losses */}
          {[1, 2, 3, 4, 5].map((t) => (
            <CFBar key={t} label={`t=${t}`} value={-ANNUAL_LOSS} max={TODAY_GAIN} />
          ))}
          <div className="flex flex-col items-center justify-end h-full pb-5 text-ink-muted">
            <span className="text-lg leading-none">⋯</span>
            <span className="text-[10px]">∞</span>
          </div>
        </div>
        <div className="text-[11px] text-ink-muted mt-2">
          <span className="text-emerald-400 font-mono">+${TODAY_GAIN}M</span> today, then{' '}
          <span className="text-danger font-mono">−${ANNUAL_LOSS}M</span> every year forever
          (sales fall 2% when customers must pay sooner).
        </div>
      </div>

      {/* discount-rate slider */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Discount rate R</span>
          <span className="font-mono text-sm text-brand-300">{fmtPct(r, 1)}</span>
        </div>
        <input
          type="range"
          min={4}
          max={26}
          step={0.5}
          value={ratePct}
          onChange={(e) => setRatePct(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-1">
          <span>4%</span>
          <span>lecture: 10%</span>
          <span>break-even ≈ 24.4%</span>
        </div>
      </div>

      {/* NPV math */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <Stat label="Today" value={`+${fmtUSD(TODAY_GAIN)}M`} tone="pos" />
        <Stat label={`PV of −$20M / ${fmtPct(r, 0)}`} value={`−${fmtUSD(pvLoss, 1)}M`} tone="neg" />
        <Stat label="NPV" value={`${npv >= 0 ? '+' : '−'}${fmtUSD(Math.abs(npv), 1)}M`} tone={good ? 'pos' : 'neg'} />
      </div>

      {/* verdict */}
      <motion.div
        key={good ? 'ok' : 'bad'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-3 border text-sm flex gap-2 ${
          good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'
        }`}
      >
        {good ? (
          <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
        ) : (
          <XCircle className="text-danger shrink-0 mt-0.5" size={16} />
        )}
        <div>
          {good ? (
            <>
              <span className="font-semibold text-emerald-300">Accept.</span> NPV = 82 − 20/
              {fmtPct(r, 1)} = <span className="font-mono">+{fmtUSD(npv, 1)}M</span>. But note you
              needed a discount rate above <span className="font-mono">{fmtPct(breakeven, 1)}</span> to
              get here — unrealistically high.
            </>
          ) : (
            <>
              <span className="font-semibold text-danger">Reject — keep the old system.</span> NPV ={' '}
              82 − 20/{fmtPct(r, 1)} = <span className="font-mono">−{fmtUSD(Math.abs(npv), 1)}M</span>.
              Because NPV equals the change in shareholder wealth, taking it would destroy{' '}
              <span className="font-mono">{fmtUSD(Math.abs(npv), 1)}M</span> of value.
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function CFBar({ label, value, max, positive }: { label: string; value: number; max: number; positive?: boolean }) {
  const h = (Math.abs(value) / max) * 100
  return (
    <div className="flex-1 flex flex-col items-center justify-end h-full">
      <div className="flex-1 flex items-end w-full justify-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`w-full max-w-[34px] rounded-t ${positive ? 'bg-emerald-500' : 'bg-danger'}`}
          style={{ minHeight: 4 }}
        />
      </div>
      <span className="text-[9px] text-ink-muted mt-1">{label}</span>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'pos' | 'neg' }) {
  return (
    <div className="rounded-lg border border-line bg-surface-3/50 px-2 py-2">
      <div className="text-[9px] uppercase tracking-wider text-ink-muted leading-tight">{label}</div>
      <div className={`font-mono text-sm font-semibold mt-0.5 ${tone === 'pos' ? 'text-emerald-300' : 'text-danger'}`}>
        {value}
      </div>
    </div>
  )
}
