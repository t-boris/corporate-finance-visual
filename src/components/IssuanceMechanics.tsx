import { useState } from 'react'
import { motion } from 'framer-motion'
import { Landmark, Coins } from 'lucide-react'

/**
 * Lesson 5-1 — Mechanics of Debt vs Equity Issuance (PepsiCo raises $7B).
 *
 * Toggle between a $7B DEBT issue (4% → $280M interest) and a $7B EQUITY
 * issue ($173/share → 40.46M new shares). The three rows show what changes
 * on the income statement, the cash flow statement, and the ownership side.
 * Debt hits earnings (interest); equity leaves earnings untouched but adds
 * shares. Both end with a positive change in cash.
 */
type Mode = 'debt' | 'equity'

const rows: Record<Mode, { label: string; income: string; cash: string; cost: string }[]> = {
  debt: [
    { label: 'Income statement', income: 'Interest expense +$280M → earnings ↓', cash: '', cost: '' },
    { label: 'Cash flow statement', income: '', cash: 'Net borrowing +$7B (financing) → Δcash ≈ +$6.9B', cost: '' },
    { label: 'Cost of the choice', income: '', cash: '', cost: 'Fixed interest of $280M / year, forever until repaid' },
  ],
  equity: [
    { label: 'Income statement', income: 'No interest → earnings UNCHANGED', cash: '', cost: '' },
    { label: 'Cash flow statement', income: '', cash: 'Net stock issuance +$7B (financing) → Δcash positive', cost: '' },
    { label: 'Cost of the choice', income: '', cash: '', cost: '+40.46M shares (= $7B / $173): same profit split among more owners' },
  ],
}

export function IssuanceMechanics() {
  const [mode, setMode] = useState<Mode>('debt')
  const accent = mode === 'debt' ? 'text-cyan-300' : 'text-brand-300'

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        {mode === 'debt' ? <Landmark className="text-cyan-400" size={18} /> : <Coins className="text-brand-400" size={18} />}
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 5-1</div>
          <h3 className="font-display text-lg font-semibold">PepsiCo raises $7B — debt or equity?</h3>
        </div>
      </header>

      <div className="inline-flex rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4">
        {(['debt', 'equity'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={[
              'px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors',
              mode === m ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            Issue {m}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {rows[mode].map((r, i) => {
          const text = r.income || r.cash || r.cost
          return (
            <motion.div
              key={r.label + mode}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-line bg-surface-3/40 p-3"
            >
              <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-0.5">{r.label}</div>
              <div className={`text-sm font-medium ${i === 0 ? accent : 'text-ink'}`}>{text}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Mini label="Amount raised" value="$7.0B" />
        <Mini label={mode === 'debt' ? 'New interest' : 'New shares'} value={mode === 'debt' ? '$280M/yr' : '40.46M'} accent />
        <Mini label="Δ cash" value="Positive" />
      </div>

      <p className="mt-4 text-[13px] text-ink-soft leading-relaxed">
        {mode === 'debt' ? (
          <>Debt adds <span className="text-cyan-300 font-medium">interest</span> and lowers earnings — but EBIT is unchanged.</>
        ) : (
          <>Equity leaves the income statement <span className="text-brand-300 font-medium">untouched</span>; its only cost is more shares. Dividends are a <em>separate</em> payout decision.</>
        )}
      </p>
    </div>
  )
}

function Mini({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border px-2 py-2 ${accent ? 'border-brand-500/50 bg-brand-500/5' : 'border-line bg-surface-3/50'}`}>
      <div className="text-[9px] uppercase tracking-wide text-ink-muted">{label}</div>
      <div className={`font-mono text-sm mt-0.5 ${accent ? 'text-brand-300' : 'text-ink'}`}>{value}</div>
    </div>
  )
}
