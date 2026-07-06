import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Vault, Check, X, Minus } from 'lucide-react'

/**
 * Lesson 7-5 — liquidity as a substitute for hedging.
 *
 * The lecture's commercial-paper problem: issue $100M in 3 months at
 * today's 4.5% (= SOFR 4.3% + 0.2% spread). Compare three strategies
 * under three shocks. SOFR futures hedge only the base rate; issuing
 * TODAY and holding the cash hedges base rate AND spread.
 */
type Shock = 'sofrUp' | 'spreadUp' | 'ratesDown'

const SHOCKS: { key: Shock; label: string; desc: string }[] = [
  { key: 'sofrUp', label: 'SOFR ↑ (4.3 → 4.6%)', desc: 'base rate rises; spread unchanged → market rate 4.8%' },
  { key: 'spreadUp', label: 'CP spread ↑ (0.2 → 0.5%)', desc: 'a CP-market crisis (like post-2008); SOFR flat → market rate 4.8%' },
  { key: 'ratesDown', label: 'SOFR ↓ (4.3 → 4.0%)', desc: 'rates fall → market rate 4.2% — remember, hedging cuts both ways' },
]

type Verdict = { icon: 'ok' | 'fail' | 'neutral'; text: string }

const OUTCOMES: Record<Shock, { wait: Verdict; futures: Verdict; today: Verdict }> = {
  sofrUp: {
    wait: { icon: 'fail', text: 'Issues at 4.8% — pays 0.3% more. Unhedged.' },
    futures: { icon: 'ok', text: 'Issues at 4.8%, but the short SOFR futures profit offsets it → effective ≈ 4.5%.' },
    today: { icon: 'ok', text: 'Already borrowed at 4.5%; cash sits in a safe asset. Rate locked.' },
  },
  spreadUp: {
    wait: { icon: 'fail', text: 'Issues at 4.8% (spread 0.5%). Unhedged.' },
    futures: { icon: 'fail', text: 'SOFR flat → futures pay nothing. No futures exist on THIS firm\'s paper — spread risk unhedged.' },
    today: { icon: 'ok', text: 'Borrowed at 4.5% before the crisis — base AND spread locked. The full hedge.' },
  },
  ratesDown: {
    wait: { icon: 'ok', text: 'Issues at 4.2% — got lucky. But luck is not a strategy.' },
    futures: { icon: 'neutral', text: 'Issues at 4.2%, futures lose the same → effective 4.5%. Zero, as designed.' },
    today: { icon: 'neutral', text: 'Locked 4.5%, market now 4.2% — the "cost" of certainty. Zero either way.' },
  },
}

const STRATEGIES: { key: 'wait' | 'futures' | 'today'; name: string; sub: string }[] = [
  { key: 'wait', name: 'Do nothing', sub: 'wait 3 months, issue at market' },
  { key: 'futures', name: 'Short SOFR futures', sub: 'derivative hedge (base rate only)' },
  { key: 'today', name: 'Issue today + hold cash', sub: 'liquidity as a substitute for hedging' },
]

function VerdictIcon({ v }: { v: Verdict['icon'] }) {
  if (v === 'ok') return <Check size={16} className="text-emerald-400 shrink-0" />
  if (v === 'fail') return <X size={16} className="text-red-400 shrink-0" />
  return <Minus size={16} className="text-ink-muted shrink-0" />
}

export function LiquidityHedgeMatrix() {
  const [shock, setShock] = useState<Shock>('spreadUp')
  const active = SHOCKS.find((s) => s.key === shock)!

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Vault className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 7-5</div>
          <h3 className="font-display text-lg font-semibold">Hedging the $100M CP issuance: three strategies</h3>
        </div>
      </header>

      <div className="text-[13px] text-ink-soft mb-3">
        Plan: issue <span className="font-mono text-ink">$100M</span> of commercial paper in 3 months. Today&apos;s rate:{' '}
        <span className="font-mono text-brand-300">4.5%</span> = SOFR 4.3% + spread 0.2%. Pick the shock:
      </div>

      {/* shock picker */}
      <div className="inline-flex flex-wrap rounded-lg border border-line bg-surface-3/40 p-0.5 mb-1 gap-0.5">
        {SHOCKS.map((s) => (
          <button
            key={s.key}
            onClick={() => setShock(s.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              shock === s.key
                ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50'
                : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="text-[11px] text-ink-muted mb-4">{active.desc}</div>

      {/* strategy outcomes */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {STRATEGIES.map((st, i) => {
            const v = OUTCOMES[shock][st.key]
            return (
              <motion.div
                key={`${shock}-${st.key}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className={[
                  'rounded-xl border p-3 flex items-start gap-3',
                  v.icon === 'ok'
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : v.icon === 'fail'
                      ? 'border-red-500/40 bg-red-500/5'
                      : 'border-line bg-surface-3/40',
                ].join(' ')}
              >
                <VerdictIcon v={v.icon} />
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {st.name} <span className="text-[11px] font-normal text-ink-muted">· {st.sub}</span>
                  </div>
                  <div className="text-[13px] text-ink-soft mt-0.5 leading-relaxed">{v.text}</div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        Liquidity is the only strategy that survives the <strong>spread shock</strong> — but it isn&apos;t free: the
        cash must sit in a low-return safe asset (Treasuries, deposits), the interest is <strong>taxable</strong>, and
        there is the <strong>temptation to spend it</strong>. Rule: if a liquid derivative covers the whole risk, it is
        usually cheaper — when it can&apos;t (spreads, missing markets), liquidity steps in.
      </p>
    </div>
  )
}
