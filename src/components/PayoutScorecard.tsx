import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale } from 'lucide-react'

/**
 * Lessons 6-5 / 6-6 — dividends vs. repurchases "horse race."
 *
 * Five dimensions; repurchases win or tie on most, yet dividends persist
 * (the dividend puzzle). Click a row to reveal the reasoning.
 */
type Criterion = {
  key: string
  label: string
  winner: 'repurchase' | 'dividend' | 'tie'
  detail: string
}

const CRITERIA: Criterion[] = [
  { key: 'tax', label: 'Taxes', winner: 'repurchase',
    detail: 'Only sellers are taxed, and only on the gain above cost basis; a dividend taxes all holders at up to ~20%. Repurchases win.' },
  { key: 'sig', label: 'Signaling', winner: 'tie',
    detail: 'Both signal future performance. Repurchases additionally signal undervaluation; dividends signal stability via the expectation of continuation. It depends on what you want to signal.' },
  { key: 'eps', label: 'EPS management', winner: 'repurchase',
    detail: 'Buybacks cut share count and mechanically lift EPS; dividends change neither net income nor shares. ~37% of buybacks come from firms about to just miss the EPS target.' },
  { key: 'flex', label: 'Flexibility', winner: 'repurchase',
    detail: 'A one-off buyback creates no expectation of repetition; dividends are sticky and punished ~−7% if cut. Repurchases win.' },
  { key: 'cash', label: 'Cash management', winner: 'tie',
    detail: 'Both return cash and curb the free-cash-flow problem (~$0.07 destroyed per $1 of excess cash). A tie.' },
]

const COLORS = {
  repurchase: 'rgb(99 102 241)',
  dividend: 'rgb(16 185 129)',
  tie: 'rgb(148 163 184)',
}

export function PayoutScorecard() {
  const [open, setOpen] = useState<string | null>('tax')

  const repWins = CRITERIA.filter((c) => c.winner === 'repurchase').length
  const ties = CRITERIA.filter((c) => c.winner === 'tie').length

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Scale className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lessons 6-5 / 6-6</div>
          <h3 className="font-display text-lg font-semibold">Dividends vs. repurchases — the horse race</h3>
        </div>
      </header>

      {/* header row */}
      <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-2 mb-2 text-[11px] uppercase tracking-widest text-ink-muted">
        <div>Criterion</div>
        <div className="text-center">Dividend</div>
        <div className="text-center">Repurchase</div>
      </div>

      <div className="space-y-1.5">
        {CRITERIA.map((c) => {
          const isOpen = open === c.key
          return (
            <div key={c.key} className="rounded-lg border border-line bg-surface-3/40 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : c.key)}
                className="w-full grid grid-cols-[1.1fr_1fr_1fr] gap-2 items-center px-3 py-2.5 text-left hover:bg-surface-3/60 transition-colors"
              >
                <span className="text-sm font-medium text-ink">{c.label}</span>
                <Cell active={c.winner === 'dividend'} tie={c.winner === 'tie'} kind="dividend" />
                <Cell active={c.winner === 'repurchase'} tie={c.winner === 'tie'} kind="repurchase" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="px-3 pb-3 text-[13px] text-ink-soft leading-relaxed">{c.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* tally */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="rounded-lg border p-3 text-center" style={{ borderColor: COLORS.repurchase + '66', background: COLORS.repurchase + '11' }}>
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Repurchase wins</div>
          <div className="font-mono text-xl" style={{ color: COLORS.repurchase }}>{repWins}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/60 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Ties</div>
          <div className="font-mono text-xl text-ink">{ties}</div>
        </div>
        <div className="rounded-lg border p-3 text-center" style={{ borderColor: COLORS.dividend + '66', background: COLORS.dividend + '11' }}>
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Dividend wins</div>
          <div className="font-mono text-xl" style={{ color: COLORS.dividend }}>0</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/5 p-3">
        <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">The dividend puzzle</div>
        <p className="text-[13px] text-ink-soft leading-relaxed">
          Repurchases win or tie on every dimension — and since the 1982 SEC <span className="font-medium">Rule 10b-18</span> safe
          harbor they have overtaken dividends — yet firms still pay large dividends. Why? Behavioral preference for
          &ldquo;real&rdquo; cash, dividends&apos; stronger stability signal, and CFOs&apos; fear of buying back at a high
          price.
        </p>
      </div>
    </div>
  )
}

function Cell({ active, tie, kind }: { active: boolean; tie: boolean; kind: 'dividend' | 'repurchase' }) {
  const color = COLORS[kind]
  if (active && !tie) {
    return (
      <div className="flex justify-center">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ background: color + '22', color }}
        >
          ✓ wins
        </motion.span>
      </div>
    )
  }
  if (tie) {
    return <div className="flex justify-center"><span className="text-[11px] text-ink-muted">tie</span></div>
  }
  return <div className="flex justify-center"><span className="text-[11px] text-ink-muted">—</span></div>
}
