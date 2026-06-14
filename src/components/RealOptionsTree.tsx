import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, CheckCircle2, XCircle } from 'lucide-react'
import { fmtUSD, fmtPct } from '@/lib/finance'

/**
 * Valuing R&D as a real option — Lesson 3-8.
 *
 * A drug company spends $30M on R&D. With probability p the drug succeeds: it
 * then invests $1B and earns cash flows worth $1,658M (PV), an NPV of $658M.
 * With probability 1−p it fails and earns nothing. There is a lag of L years
 * before the success/failure is known. At a 6% benchmark:
 *
 *   NPV(R&D) = −30 + p · 658 / 1.06^L
 *
 * Defaults (p = 5%, L = 3 yrs) give −$2.37M → reject, despite a $658M upside.
 * Break-even probability at L = 3 is ≈5.43%, so the decision is razor-thin —
 * the lesson is how sensitive R&D value is to the probability and the delay.
 */

const RD_COST = 30 // $M today
const FOLLOW_ON = 1000 // $M invested on success
const PV_SUCCESS = 1658.15 // $M present value of cash flows on success (precise; lecture rounds to $1,658M)
const CONDITIONAL_NPV = PV_SUCCESS - FOLLOW_ON // $658M — used in the math
const PV_LABEL = 1658 // rounded, for display
const NPV_SUCCESS_LABEL = 658 // rounded, for display (the lecture's headline $658M)
const R = 0.06

export function RealOptionsTree() {
  const [successPct, setSuccessPct] = useState(5)
  const [lag, setLag] = useState(3)

  const p = successPct / 100
  const discounted = (p * CONDITIONAL_NPV) / Math.pow(1 + R, lag)
  const npv = -RD_COST + discounted
  const good = npv > 0
  const breakeven = (RD_COST * Math.pow(1 + R, lag)) / CONDITIONAL_NPV // as a fraction

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <FlaskConical className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-8
          </div>
          <h3 className="font-display text-lg font-semibold">
            R&amp;D as a real option — the diabetes-drug decision tree
          </h3>
        </div>
      </header>

      {/* decision tree */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-3 mb-4">
        <svg viewBox="0 0 540 210" className="w-full" style={{ maxHeight: 230 }}>
          {/* root → success / failure branches */}
          <line x1="118" y1="105" x2="250" y2="48" stroke="rgb(var(--line))" strokeWidth={2} />
          <line x1="118" y1="105" x2="250" y2="162" stroke="rgb(var(--line))" strokeWidth={2} />

          {/* probability labels */}
          <text x="178" y="62" fontSize="11" fill="#10b981" className="font-mono">{fmtPct(p, 0)}</text>
          <text x="178" y="150" fontSize="11" fill="rgb(var(--ink-muted))" className="font-mono">{fmtPct(1 - p, 0)}</text>

          {/* root node */}
          <rect x="6" y="84" width="112" height="42" rx="8" fill="rgb(var(--surface-2))" stroke="rgb(var(--brand-500))" strokeWidth="1.5" />
          <text x="62" y="100" fontSize="10" textAnchor="middle" fill="rgb(var(--ink-muted))">R&amp;D today</text>
          <text x="62" y="116" fontSize="13" textAnchor="middle" fill="rgb(var(--ink))" className="font-mono">−${RD_COST}M</text>

          {/* success node */}
          <motion.rect
            key={`s${successPct}`}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            x="250" y="22" width="284" height="56" rx="8"
            fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.5"
          />
          <text x="262" y="40" fontSize="11" fill="#34d399">Success → invest ${FOLLOW_ON}M</text>
          <text x="262" y="56" fontSize="10" fill="rgb(var(--ink-muted))" className="font-mono">PV cash flows ${PV_LABEL.toLocaleString()}M</text>
          <text x="262" y="71" fontSize="12" fill="rgb(var(--ink))" className="font-mono">NPV | success = +${NPV_SUCCESS_LABEL}M</text>

          {/* failure node */}
          <rect x="250" y="138" width="200" height="46" rx="8" fill="rgba(239,68,68,0.06)" stroke="rgb(var(--line))" strokeWidth="1.5" />
          <text x="262" y="158" fontSize="11" fill="rgb(var(--ink-muted))">Failure</text>
          <text x="262" y="174" fontSize="12" fill="rgb(var(--ink))" className="font-mono">$0</text>
        </svg>
        <div className="text-[10px] text-ink-muted text-center mt-1">
          Drug phases compound to a low success rate: Phase 1→2 ≈ 70% · Phase 2→3 ≈ 33% · … · FDA ≈ 5%
        </div>
      </div>

      {/* sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-ink-soft">Probability of success</span>
            <span className="font-mono text-sm text-brand-300">{fmtPct(p, 0)}</span>
          </div>
          <input type="range" min={1} max={20} step={1} value={successPct} onChange={(e) => setSuccessPct(parseFloat(e.target.value))} className="w-full accent-brand-500" />
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-ink-soft">Lag before follow-on (years)</span>
            <span className="font-mono text-sm text-brand-300">{lag} yr</span>
          </div>
          <input type="range" min={1} max={6} step={1} value={lag} onChange={(e) => setLag(parseFloat(e.target.value))} className="w-full accent-brand-500" />
        </div>
      </div>

      {/* computation */}
      <div className="rounded-lg bg-surface-3 border border-line p-3 mb-3 text-center">
        <div className="font-mono text-sm text-ink">
          NPV = −{RD_COST} + {fmtPct(p, 0)} × {NPV_SUCCESS_LABEL} / 1.06<sup>{lag}</sup> ={' '}
          <span className={good ? 'text-emerald-300' : 'text-danger'}>
            {npv >= 0 ? '+' : '−'}{fmtUSD(Math.abs(npv), 2)}M
          </span>
        </div>
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
        {good ? <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} /> : <XCircle className="text-danger shrink-0 mt-0.5" size={16} />}
        <div>
          {good ? (
            <>
              <span className="font-semibold text-emerald-300">Invest in the R&amp;D.</span> The
              probability-weighted, discounted upside now exceeds the $30M cost.
            </>
          ) : (
            <>
              <span className="font-semibold text-danger">Do not invest.</span> Despite a{' '}
              <span className="font-mono">+${NPV_SUCCESS_LABEL}M</span> upside <em>if</em> it works, the high
              failure risk and {lag}-year delay make the NPV{' '}
              <span className="font-mono">−{fmtUSD(Math.abs(npv), 2)}M</span>.
            </>
          )}{' '}
          Break-even probability at {lag} yr ≈ <span className="font-mono">{fmtPct(breakeven, 1)}</span> —
          tiny changes in the estimate flip the decision.
        </div>
      </motion.div>
    </div>
  )
}
