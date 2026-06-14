import { useState } from 'react'
import { motion } from 'framer-motion'
import { Equal, ArrowRight } from 'lucide-react'
import { fmtUSD } from '@/lib/finance'

/**
 * NPV ≡ change in shareholder wealth — Lesson 3-3.
 *
 * Stock price = PV of future cash flows. NPV = PV of incremental cash flows.
 * The two definitions are identical, so taking a project moves shareholder
 * wealth by exactly its NPV. The slider lets the student pick any project NPV
 * and watch firm wealth move one-for-one, with the accept/reject verdict.
 */

const BASE_WEALTH = 1000 // $M of existing shareholder wealth (illustrative)

export function NPVShareholderEquivalence() {
  const [npv, setNpv] = useState(-118)
  const good = npv > 0
  const newWealth = BASE_WEALTH + npv

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Equal className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-3
          </div>
          <h3 className="font-display text-lg font-semibold">
            NPV <span className="text-brand-300">=</span> change in shareholder wealth
          </h3>
        </div>
      </header>

      {/* the equivalence, spelled out */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
        <DefCard title="Stock price" body="PV of all future cash flows, discounted to today" />
        <div className="flex items-center justify-center text-brand-300 font-bold text-xl rotate-90 sm:rotate-0">=</div>
        <DefCard title="NPV" body="PV of all incremental cash flows, discounted to today" />
      </div>

      {/* project NPV slider */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Project NPV ($M)</span>
          <span className={`font-mono text-sm ${good ? 'text-emerald-300' : 'text-danger'}`}>
            {npv >= 0 ? '+' : '−'}{fmtUSD(Math.abs(npv), 0)}M
          </span>
        </div>
        <input
          type="range"
          min={-150}
          max={150}
          step={1}
          value={npv}
          onChange={(e) => setNpv(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-1">
          <span>−$150M</span>
          <span>receivables: −$118M</span>
          <span>+$150M</span>
        </div>
      </div>

      {/* wealth bridge */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <WealthPill label="Wealth before" value={BASE_WEALTH} />
          <div className="flex flex-col items-center text-ink-muted">
            <ArrowRight size={18} />
            <span className={`font-mono text-xs ${good ? 'text-emerald-300' : 'text-danger'}`}>
              {npv >= 0 ? '+' : '−'}{fmtUSD(Math.abs(npv), 0)}M
            </span>
          </div>
          <motion.div
            key={newWealth}
            initial={{ scale: 0.96, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <WealthPill label="Wealth after" value={newWealth} tone={good ? 'pos' : 'neg'} />
          </motion.div>
        </div>
      </div>

      {/* verdict */}
      <motion.div
        key={good ? 'ok' : 'bad'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-3 border text-sm ${
          good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'
        }`}
      >
        {good ? (
          <>
            <span className="font-semibold text-emerald-300">Positive NPV → accept.</span> The project
            creates <span className="font-mono">{fmtUSD(npv, 0)}M</span> of shareholder wealth.
            Maximizing NPV <em>is</em> maximizing shareholder value.
          </>
        ) : (
          <>
            <span className="font-semibold text-danger">Negative NPV → reject.</span> Taking it would
            destroy <span className="font-mono">{fmtUSD(Math.abs(npv), 0)}M</span> of shareholder
            wealth — the finance professor&apos;s job is to stop ideas like this.
          </>
        )}
      </motion.div>

      {/* caveats */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-[10px] text-ink-muted mr-1">Equivalence can break under:</span>
        {['asymmetric information', 'market inefficiency', 'high leverage (debt ↔ equity conflict)'].map((c) => (
          <span key={c} className="pill bg-surface-3 border border-line text-ink-soft text-[10px]">{c}</span>
        ))}
      </div>
    </div>
  )
}

function DefCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex-1 rounded-xl border border-brand-500/40 bg-brand-500/5 p-3">
      <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">{title}</div>
      <div className="text-xs text-ink-soft leading-relaxed">{body}</div>
    </div>
  )
}

function WealthPill({ label, value, tone }: { label: string; value: number; tone?: 'pos' | 'neg' }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div
        className={`font-display text-xl font-semibold mt-0.5 ${
          tone === 'pos' ? 'text-emerald-300' : tone === 'neg' ? 'text-danger' : 'text-ink'
        }`}
      >
        {fmtUSD(value, 0)}M
      </div>
    </div>
  )
}
