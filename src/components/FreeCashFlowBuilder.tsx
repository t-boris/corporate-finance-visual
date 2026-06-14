import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { Cog } from 'lucide-react'
import { npv as npvOf, irr as irrOf, fmtUSD, fmtPct } from '@/lib/finance'

/**
 * The "magic formula" free-cash-flow builder — Lesson 3-7.
 *
 * FCF = Sales − Costs − Taxes − Investments. The machine: 3,000 units × $4,
 * cost $0.8/unit + $600 fixed → Sales − Costs = $9,000; $40,000 investment;
 * $4,000 pre-tax salvage; 21% tax; 8% discount (numbers from Sensitivity_*2018).
 *
 * Toggle the tax regime:
 *   • Before 2018 — accelerated depreciation over 5 yrs ($8,000/yr) → NPV $15,880, IRR 16.4%
 *   • After 2018  — full expensing in year 0 → a year-0 tax shield → NPV $17,572, IRR 18.8%
 * Full expensing pulls the tax shield forward, so it RAISES both NPV and IRR.
 */

const SALES_COSTS = 9000
const INVEST = 40000
const SALVAGE_AFTER_TAX = 3160 // $4,000 × (1 − 0.21), asset fully depreciated
const TAX = 0.21
const RATE = 0.08
type Regime = 'before' | 'after'

function buildRows(regime: Regime) {
  const dep = Array(11).fill(0)
  const taxable = Array(11).fill(0)
  if (regime === 'after') {
    dep[0] = INVEST
    taxable[0] = -INVEST
    for (let t = 1; t <= 10; t++) taxable[t] = SALES_COSTS
  } else {
    for (let t = 1; t <= 5; t++) dep[t] = INVEST / 5 // 8,000
    for (let t = 1; t <= 10; t++) taxable[t] = SALES_COSTS - dep[t]
  }
  const taxes = taxable.map((ti) => +(ti * TAX).toFixed(0))
  const invest = Array(11).fill(0)
  invest[0] = -INVEST
  invest[10] = SALVAGE_AFTER_TAX
  const fcf = Array.from({ length: 11 }, (_, t) =>
    (t === 0 ? 0 : SALES_COSTS) - taxes[t] + invest[t],
  )
  return { dep, taxable, taxes, invest, fcf }
}

export function FreeCashFlowBuilder() {
  const [regime, setRegime] = useState<Regime>('after')
  const rows = useMemo(() => buildRows(regime), [regime])

  const metrics = useMemo(() => {
    const calc = (rg: Regime) => {
      const { fcf } = buildRows(rg)
      return { npv: npvOf(fcf, RATE), irr: irrOf(fcf) ?? 0 }
    }
    return { before: calc('before'), after: calc('after') }
  }, [])
  const cur = regime === 'after' ? metrics.after : metrics.before

  const chartData = rows.fcf.map((v, t) => ({ t, fcf: v }))

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Cog className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-7
          </div>
          <h3 className="font-display text-lg font-semibold">
            Free cash flow: Sales − Costs − Taxes − Investments
          </h3>
        </div>
      </header>

      {/* regime toggle */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-ink-muted">Tax regime:</span>
        {([
          ['before', 'Before 2018 · accelerated dep.'],
          ['after', 'After 2018 · full expensing'],
        ] as [Regime, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setRegime(id)}
            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              regime === id
                ? 'bg-brand-500/15 border-brand-500/60 text-brand-200'
                : 'bg-surface-3/40 border-line text-ink-soft hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* NPV / IRR cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard label="NPV @ 8%" value={fmtUSD(cur.npv, 0)} sub={regime === 'after' ? 'vs $15,880 before' : 'vs $17,572 after'} highlight />
        <MetricCard label="IRR" value={fmtPct(cur.irr, 1)} sub={regime === 'after' ? 'vs 16.4% before' : 'vs 18.8% after'} highlight />
      </div>

      {/* FCF bar chart */}
      <div className="h-48 mb-3">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgb(var(--line))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="t" stroke="rgb(var(--ink-muted))" tick={{ fontSize: 11 }} label={{ value: 'year', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'rgb(var(--ink-muted))' }} />
            <YAxis stroke="rgb(var(--ink-muted))" tick={{ fontSize: 11 }} width={50} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--line))', borderRadius: 12, color: 'rgb(var(--ink))' }}
              formatter={(v: any) => [fmtUSD(Number(v), 0), 'FCF']}
              labelFormatter={(l) => `Year ${l}`}
            />
            <ReferenceLine y={0} stroke="rgb(var(--ink-muted))" />
            <Bar dataKey="fcf" radius={[3, 3, 0, 0]}>
              {chartData.map((d) => (
                <Cell key={d.t} fill={d.fcf < 0 ? '#ef4444' : '#10b981'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* spreadsheet */}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="text-ink-muted">
              <th className="text-left font-medium py-1 pr-2 sticky left-0 bg-surface-2">$ / year</th>
              {Array.from({ length: 11 }, (_, t) => (
                <th key={t} className="px-1.5 py-1 text-right font-mono font-medium">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono">
            <Row label="Sales − Costs" vals={rows.fcf.map((_, t) => (t === 0 ? 0 : SALES_COSTS))} />
            <Row label="Depreciation" vals={rows.dep} muted />
            <Row label="Taxable income" vals={rows.taxable} muted />
            <Row label="Taxes (21%)" vals={rows.taxes} muted />
            <Row label="Investment" vals={rows.invest} muted />
            <Row label="Free cash flow" vals={rows.fcf} strong />
          </tbody>
        </table>
      </div>

      <motion.div
        key={regime}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-line bg-surface-3/40 p-3 mt-3 text-xs text-ink-soft leading-relaxed"
      >
        {regime === 'after' ? (
          <>
            <strong className="text-ink">Full expensing</strong> deducts the whole $40,000 in year 0,
            creating a <span className="font-mono text-emerald-300">−$8,400</span> tax (a refund/offset).
            Pulling the shield forward lifts NPV to <span className="font-mono">$17,572</span> and IRR to{' '}
            <span className="font-mono">18.8%</span>.
          </>
        ) : (
          <>
            <strong className="text-ink">Accelerated depreciation</strong> writes off $8,000/yr for 5
            years, so taxable income is only $1,000 early (tax $210), then jumps to $9,000 (tax $1,890).
            NPV <span className="font-mono">$15,880</span>, IRR <span className="font-mono">16.4%</span>.
          </>
        )}{' '}
        The same magic formula works either way — only the <strong>Taxes</strong> row changes.
      </motion.div>
    </div>
  )
}

function Row({ label, vals, muted, strong }: { label: string; vals: number[]; muted?: boolean; strong?: boolean }) {
  return (
    <tr className={`border-t border-line/50 ${strong ? 'text-ink font-semibold' : muted ? 'text-ink-muted' : 'text-ink-soft'}`}>
      <td className="text-left py-1 pr-2 whitespace-nowrap sticky left-0 bg-surface-2 font-sans">{label}</td>
      {vals.map((v, t) => (
        <td key={t} className="px-1.5 py-1 text-right">
          {v === 0 ? <span className="text-ink-muted/40">·</span> : v < 0 ? `(${Math.abs(v).toLocaleString()})` : v.toLocaleString()}
        </td>
      ))}
    </tr>
  )
}

function MetricCard({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${highlight ? 'border-brand-500/40 bg-brand-500/5' : 'border-line bg-surface-3/40'}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="font-display text-2xl font-semibold text-ink mt-0.5">{value}</div>
      <div className="text-[10px] text-ink-muted mt-0.5">{sub}</div>
    </div>
  )
}
