import { useState } from 'react'
import { motion } from 'framer-motion'
import { LifeBuoy, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react'

/**
 * Liquidity risk & bank credit lines — Lesson 2-10.
 *
 *  1. Refinancing (rollover): pay maturing debt, issue new debt → ~zero net outflow.
 *  2. Liquidity risk: creditors may refuse to roll over.
 *  3. Credit line as insurance: pre-negotiated terms, a commitment fee, drawn in a crisis.
 *     Altice carried an undrawn ~$1.6B line; the COVID "dash for cash" (Acharya & Steffen)
 *     shows firms drawing lines en masse.
 */

export function LiquidityRiskCreditLine() {
  const [hasLine, setHasLine] = useState(true)

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <LifeBuoy className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Visualization · Lesson 2-10
          </div>
          <h3 className="font-display text-lg font-semibold">
            Liquidity risk & credit lines — Altice&apos;s backstop
          </h3>
        </div>
      </header>

      {/* Rollover diagram */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <RotateCcw size={14} className="text-brand-300" />
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            The normal case: refinancing (rollover)
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 text-center">
          <Node color="#ef4444" top="Repay" big="$812M" bottom="maturing debt" />
          <Plus />
          <Node color="#06b6d4" top="Issue new" big="$812M" bottom="similar debt" />
          <Equals />
          <Node color="#10b981" top="Net outflow" big="≈ $0" bottom="no cash leaves" />
        </div>
        <p className="text-[11px] text-ink-muted mt-3 leading-snug">
          Rolling debt over is routine — it explains how Altice runs with a low liquidity ratio and
          little excess cash flow. The danger is <strong>rollover risk</strong>: in a crisis,
          creditors may refuse.
        </p>
      </div>

      {/* Interactive crisis */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            A crisis hits — creditors refuse to refinance
          </div>
          <button
            onClick={() => setHasLine((v) => !v)}
            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              hasLine
                ? 'bg-emerald-500 text-white border-transparent'
                : 'bg-surface-3/40 border-line text-ink-soft'
            }`}
          >
            {hasLine ? 'Has $1.6B credit line ✓' : 'No credit line'}
          </button>
        </div>

        <motion.div
          key={hasLine ? 'line' : 'noline'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`rounded-lg p-3 flex items-start gap-3 border ${
            hasLine ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'
          }`}
        >
          {hasLine ? (
            <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
          ) : (
            <AlertTriangle className="text-danger shrink-0 mt-0.5" size={18} />
          )}
          <div className="text-sm">
            {hasLine ? (
              <>
                <span className="font-semibold text-emerald-300">Survives.</span> Terms were
                negotiated ahead of time, so the bank has effectively pre-agreed to lend. Altice draws
                on its <span className="font-mono">~$1.6B</span> undrawn line — a substitute for cash.
              </>
            ) : (
              <>
                <span className="font-semibold text-danger">Liquidity crisis.</span> Forced to cut
                CapEx that investors expected → stock falls → possible financial distress. Exactly the
                outcome a credit line is meant to prevent.
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Credit line = insurance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Fact label="Pre-negotiated" value="limit + rate" hint="fixed ahead of need; rate is a spread over a base rate" />
        <Fact label="Commitment fee" value="0.1–0.3% / yr" hint="$100–300K on a $100M line — like an insurance premium" />
        <Fact label="Altice (end 2021)" value="$1.6B undrawn" hint="even higher by March 2022 — the backstop" />
      </div>

      <p className="text-xs text-ink-muted mt-4 leading-relaxed">
        In the COVID shock of March 2020, firms drew down credit lines en masse — the{' '}
        <strong>&ldquo;dash for cash&rdquo;</strong> documented by Acharya &amp; Steffen, most acute
        among firms near the investment-grade boundary. Credit lines are corporate liquidity
        insurance.
      </p>
    </div>
  )
}

function Node({ color, top, big, bottom }: { color: string; top: string; big: string; bottom: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex-1 rounded-xl border p-2"
      style={{ borderColor: `${color}55`, background: `${color}12` }}
    >
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{top}</div>
      <div className="font-mono text-base font-semibold" style={{ color }}>
        {big}
      </div>
      <div className="text-[10px] text-ink-muted">{bottom}</div>
    </motion.div>
  )
}

function Plus() {
  return <span className="text-ink-muted text-lg shrink-0">+</span>
}
function Equals() {
  return <span className="text-ink-muted text-lg shrink-0">=</span>
}

function Fact({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface-3/40 p-3">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="font-mono text-sm font-semibold text-brand-300 mt-1">{value}</div>
      <div className="text-[10px] text-ink-muted mt-1 leading-snug">{hint}</div>
    </div>
  )
}
