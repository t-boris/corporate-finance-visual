import { useState } from 'react'
import { motion } from 'framer-motion'
import { Landmark, Scale } from 'lucide-react'

/**
 * Module 8 · Lesson 8-4 — the bribe as an NPV decision.
 * NPV_bribe = −bribe + p(win)·contract − p(detect)·fine, compared to
 * NPV_no-bribe = 0. Flip regulation on/off and watch the verdict flip.
 * Course figures: contract $10k, bribe $1k, p(win) 20%, fine $100k, p(detect) 2%.
 */
const CONTRACT = 10000
const BRIBE = 1000
const P_WIN = 0.2
const FINE = 100000
const P_DETECT = 0.02

const usd = (n: number) => `${n < 0 ? '−' : ''}$${Math.abs(Math.round(n)).toLocaleString('en-US')}`

export function BriberyNPVDecision() {
  const [regulated, setRegulated] = useState(true)

  const gain = P_WIN * CONTRACT // +2000
  const penalty = regulated ? P_DETECT * FINE : 0 // 2000 or 0
  const npvBribe = -BRIBE + gain - penalty
  const bribe = npvBribe > 0

  // contribution bar segments (absolute magnitudes)
  const segs = [
    { label: '− bribe', val: -BRIBE, cls: 'bg-red-500/70' },
    { label: '+ p(win)·contract', val: gain, cls: 'bg-emerald-500/70' },
    ...(regulated ? [{ label: '− p(detect)·fine', val: -penalty, cls: 'bg-red-500/70' }] : []),
  ]
  const scale = Math.max(gain, BRIBE + penalty) || 1

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Landmark className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 8-4</div>
          <h3 className="font-display text-lg font-semibold">To bribe or not to bribe?</h3>
        </div>
      </header>

      {/* regulation toggle */}
      <div className="inline-flex rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        <button
          onClick={() => setRegulated(false)}
          className={[
            'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
            !regulated ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
          ].join(' ')}
        >
          No regulation
        </button>
        <button
          onClick={() => setRegulated(true)}
          className={[
            'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
            regulated ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
          ].join(' ')}
        >
          Anti-bribery law (fine $100k · 2% detect)
        </button>
      </div>

      {/* the live equation */}
      <div className="rounded-lg bg-surface-3 border border-line p-3 text-center font-mono text-[13px] text-ink">
        NPV<sub>bribe</sub> = −$1,000 + 20%×$10,000 {regulated ? '− 2%×$100,000 ' : ''}={' '}
        <span className={bribe ? 'text-emerald-300' : 'text-red-300'}>{usd(npvBribe)}</span>
      </div>

      {/* contribution bars */}
      <div className="mt-4 space-y-1.5">
        {segs.map((sgroup) => (
          <div key={sgroup.label} className="flex items-center gap-2">
            <div className="w-40 text-[11px] text-ink-muted text-right shrink-0">{sgroup.label}</div>
            <div className="flex-1 h-4 rounded bg-surface-3/60 overflow-hidden relative">
              <motion.div
                className={`h-full ${sgroup.cls}`}
                initial={{ width: 0 }}
                animate={{ width: `${(Math.abs(sgroup.val) / scale) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
            <div className="w-16 text-[11px] font-mono text-ink text-right shrink-0">{usd(sgroup.val)}</div>
          </div>
        ))}
      </div>

      {/* verdict cards */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-line bg-surface-3/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">NPV · don&apos;t bribe</div>
          <div className="font-mono text-lg text-ink">$0</div>
        </div>
        <motion.div
          key={String(bribe)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={[
            'rounded-xl border p-3',
            bribe ? 'border-red-500/50 bg-red-500/10' : 'border-emerald-500/50 bg-emerald-500/10',
          ].join(' ')}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Verdict</div>
          <div className={`text-lg font-semibold ${bribe ? 'text-red-300' : 'text-emerald-300'}`}>
            {bribe ? 'Bribe (NPV > 0)' : 'Don’t bribe'}
          </div>
        </motion.div>
      </div>

      <div className="mt-3 rounded-xl border-l-4 border-l-brand-500 bg-brand-500/5 p-3 flex gap-2">
        <Scale size={16} className="text-brand-300 mt-0.5 shrink-0" />
        <p className="text-[13px] text-ink-soft leading-relaxed">
          Regulation flips the firm from <span className="font-mono">+$1,000</span> to{' '}
          <span className="font-mono">$0</span> — it <strong>destroys firm value</strong> yet benefits society by
          deterring the bribe. That gap is the module&apos;s point:{' '}
          <strong>
            NPV<sub>firm</sub> ≠ NPV<sub>society</sub>
          </strong>
          . The social cost of corruption never appears in the firm&apos;s own calculation.
        </p>
      </div>
    </div>
  )
}
