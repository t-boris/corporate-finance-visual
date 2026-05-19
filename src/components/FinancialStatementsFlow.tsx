import { motion } from 'framer-motion'
import { FileSpreadsheet, Clock, RefreshCw } from 'lucide-react'

/**
 * Visual map of the three core financial statements and how they connect.
 * BS = stock (snapshot in time); IS = flow over period; CFS = bridge between IS and BS.
 */
export function FinancialStatementsFlow() {
  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <FileSpreadsheet className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-4 to 1-6</div>
          <h3 className="font-display text-lg font-semibold">Three statements · how they connect</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatementCard
          icon={<Clock size={16} />}
          stamp="STOCK"
          name="Balance Sheet"
          stampColor="#6366f1"
          line1="At a single point in time"
          rows={[
            ['Current assets',     'Current liabilities'],
            ['Non-current assets', 'Non-current liabilities'],
            ['—',                  'Equity'],
          ]}
          identity="Assets = Liabilities + Equity"
        />

        <StatementCard
          icon={<RefreshCw size={16} />}
          stamp="FLOW"
          name="Income Statement"
          stampColor="#10b981"
          line1="Over a period (quarter / year)"
          rows={[
            ['Revenue',          '+'],
            ['− COGS / OpEx',    ''],
            ['= EBIT',           ''],
            ['− Interest',       ''],
            ['− Tax',            ''],
            ['= Net Income',     ''],
          ]}
          identity="OPAT = Operating Income − Tax"
        />

        <StatementCard
          icon={<RefreshCw size={16} />}
          stamp="FLOW"
          name="Cash Flow Statement"
          stampColor="#f59e0b"
          line1="Reconciles Net Income → cash"
          rows={[
            ['Net Income (start)',  '+'],
            ['+ D&A · ΔNWC',        'Operating'],
            ['− CapEx · M&A',       'Investing'],
            ['+ Debt − Buybacks',   'Financing'],
            ['= Δ Cash',            ''],
          ]}
          identity="Net change in cash = CFO + CFI + CFF"
        />
      </div>

      {/* Bridges */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg border border-line bg-surface-3/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Bridge 1</div>
          <div className="text-ink-soft">
            <strong>IS → BS:</strong> Net Income flows into <em>Retained Earnings</em> on the Balance Sheet.
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Bridge 2</div>
          <div className="text-ink-soft">
            <strong>CFS starts from IS:</strong> The first line of CFS is Net Income from the bottom of IS.
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/40 p-3">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Bridge 3</div>
          <div className="text-ink-soft">
            <strong>CFS ends at BS:</strong> Δ Cash from CFS = change in Cash line on the Balance Sheet.
          </div>
        </div>
      </div>
    </div>
  )
}

function StatementCard({
  icon, stamp, name, stampColor, line1, rows, identity,
}: {
  icon: React.ReactNode
  stamp: string
  name: string
  stampColor: string
  line1: string
  rows: [string, string][]
  identity: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-line bg-surface-3/40 p-3"
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-flex items-center justify-center h-6 w-6 rounded-md text-white text-xs"
          style={{ background: stampColor }}
        >
          {icon}
        </span>
        <span className="font-semibold">{name}</span>
        <span
          className="ml-auto text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-full border"
          style={{ borderColor: stampColor, color: stampColor }}
        >
          {stamp}
        </span>
      </div>
      <div className="text-[11px] text-ink-muted mb-2">{line1}</div>

      <div className="rounded-lg bg-surface-3/60 border border-line overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-2 px-2 py-1 text-[11px] border-b border-line/50 last:border-b-0"
          >
            <span className="text-ink-soft truncate">{row[0]}</span>
            <span className="text-ink-muted text-right truncate">{row[1]}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 px-2 py-1.5 rounded-md bg-brand-500/10 border border-brand-500/30 text-[11px] font-mono text-brand-300 text-center">
        {identity}
      </div>
    </motion.div>
  )
}
