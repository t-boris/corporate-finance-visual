import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

/**
 * Working-capital cash-conversion-cycle visual — Lessons 2-6 & 2-7.
 *
 *  1. NWC = Receivables + Inventory − Payables (composition).
 *  2. An illustrative CCC timeline showing the formula.
 *  3. Real-company comparison (Boeing / Airbus / Walmart) — all figures from the lecture.
 */

// Illustrative decomposition (clearly labelled) used only to teach the formula.
const ILLUS = { inventory: 60, collection: 30, payable: 50 }
const ILLUS_CCC = ILLUS.inventory + ILLUS.collection - ILLUS.payable // 40

type Company = {
  name: string
  ccc: number
  accent: string
  facts: string
}

const COMPANIES: Company[] = [
  {
    name: 'Boeing (2021)',
    ccc: 484,
    accent: '#ef4444',
    facts: 'Carried 474 days of inventory (up from 278 in 2017). It takes ~1.5 years to turn a sale into cash — the nature of building airplanes.',
  },
  {
    name: 'Airbus',
    ccc: 180,
    accent: '#f59e0b',
    facts: 'Much shorter than Boeing, but still about six months. Heavy-equipment manufacturing inherently needs large inventory.',
  },
  {
    name: 'Walmart (2021)',
    ccc: 6,
    accent: '#10b981',
    facts: 'Just 6 days — down from 12 in 2014. A retailer sells inventory fast and stretches supplier payments, almost eliminating the cycle.',
  },
]

export function WorkingCapitalCycle() {
  const [active, setActive] = useState(0)
  const company = COMPANIES[active]
  const maxCcc = Math.max(...COMPANIES.map((c) => c.ccc))

  // timeline scaling
  const span = ILLUS.inventory + ILLUS.collection
  const invW = (ILLUS.inventory / span) * 100
  const colW = (ILLUS.collection / span) * 100
  const payW = (ILLUS.payable / span) * 100

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <RefreshCw className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Visualization · Lessons 2-6 & 2-7
          </div>
          <h3 className="font-display text-lg font-semibold">
            The Cash Conversion Cycle — how long cash is tied up
          </h3>
        </div>
      </header>

      {/* NWC composition */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">
          Net Working Capital
        </div>
        <div className="flex items-center gap-2 flex-wrap text-sm">
          <Chip color="#06b6d4" sign="">Receivables</Chip>
          <span className="text-ink-muted">+</span>
          <Chip color="#6366f1" sign="">Inventory</Chip>
          <span className="text-ink-muted">−</span>
          <Chip color="#10b981" sign="">Payables</Chip>
          <span className="text-ink-muted">=</span>
          <span className="font-mono font-semibold text-ink">NWC</span>
        </div>
        <p className="text-[11px] text-ink-muted mt-2 leading-snug">
          Receivables and inventory <strong>tie up</strong> cash; payables (borrowing from
          suppliers) <strong>free</strong> it. A rise in NWC is an investment — a negative cash flow.
        </p>
      </div>

      {/* Illustrative CCC timeline */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            CCC timeline · illustrative
          </div>
          <div className="font-mono text-xs text-ink-soft">
            {ILLUS.collection} + {ILLUS.inventory} − {ILLUS.payable} ={' '}
            <span className="text-brand-300 font-semibold">{ILLUS_CCC} days</span>
          </div>
        </div>

        {/* operating cycle: inventory then collection */}
        <div className="flex h-7 rounded-lg overflow-hidden mb-1">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${invW}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center text-[10px] text-white"
            style={{ background: '#6366f1' }}
          >
            Inventory {ILLUS.inventory}d
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${colW}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="h-full flex items-center justify-center text-[10px] text-white"
            style={{ background: '#06b6d4' }}
          >
            Collection {ILLUS.collection}d
          </motion.div>
        </div>
        <div className="text-[10px] text-ink-muted mb-3">
          ↑ Operating cycle — buy inventory → sell → get paid
        </div>

        {/* payables offset */}
        <div className="flex h-7 rounded-lg overflow-hidden bg-surface-3">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${payW}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="h-full flex items-center justify-center text-[10px] text-white rounded-lg"
            style={{ background: '#10b981' }}
          >
            − Payables {ILLUS.payable}d
          </motion.div>
        </div>
        <div className="text-[10px] text-ink-muted mt-1">
          ↑ Suppliers finance part of it, shortening the cycle
        </div>
      </div>

      {/* Real-company comparison */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-3">
          Real companies · CCC depends on the business
        </div>
        <div className="flex gap-2 mb-3">
          {COMPANIES.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                i === active
                  ? 'text-white border-transparent'
                  : 'bg-surface-3/40 border-line text-ink-soft hover:text-ink'
              }`}
              style={i === active ? { background: c.accent } : undefined}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {COMPANIES.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-28 text-xs text-ink-soft shrink-0">{c.name}</div>
              <div className="flex-1 h-5 rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(c.ccc / maxCcc) * 100}%`, opacity: i === active ? 1 : 0.45 }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: c.accent }}
                />
              </div>
              <div className="w-20 text-right font-mono text-xs text-ink">{c.ccc} days</div>
            </div>
          ))}
        </div>

        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-ink-soft mt-3 leading-relaxed"
        >
          <span className="font-semibold" style={{ color: company.accent }}>
            {company.name}:
          </span>{' '}
          {company.facts}
        </motion.p>
      </div>
    </div>
  )
}

function Chip({ children, color }: { children: React.ReactNode; color: string; sign: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs font-medium text-white"
      style={{ background: color }}
    >
      {children}
    </span>
  )
}
