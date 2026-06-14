import { useMemo, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { pvAnnuity, fmtUSD } from '@/lib/finance'

/**
 * Why the horizon is infinity — Lesson 3-2.
 *
 * The receivables project's NPV using a FINITE horizon of N years is
 *   NPV(N) = 82 − 20 · annuity(10%, N)
 * As N grows it converges to the perpetuity answer of −$118M. At N = 30 it is
 * already −$106.54M; by ~100 years it is essentially the full −$118M — anything
 * later barely moves the needle. So the perpetuity formula (C/r) is not a
 * shortcut that loses accuracy; it is the correct, complete answer.
 */

const TODAY_GAIN = 82 // $M
const ANNUAL_LOSS = 20 // $M / year
const R = 0.1 // discount rate used in the lecture
const PERPETUITY_NPV = TODAY_GAIN - ANNUAL_LOSS / R // −118

export function PerpetuityConvergence() {
  const [years, setYears] = useState(30)

  const data = useMemo(() => {
    const arr: { n: number; npv: number }[] = []
    for (let n = 1; n <= 120; n++) {
      arr.push({ n, npv: TODAY_GAIN - pvAnnuity(ANNUAL_LOSS, R, n) })
    }
    return arr
  }, [])

  const npvAtN = TODAY_GAIN - pvAnnuity(ANNUAL_LOSS, R, years)
  const pctOfTotal = (npvAtN / PERPETUITY_NPV) * 100

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <span className="text-brand-400 font-mono text-lg leading-none">∞</span>
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-2
          </div>
          <h3 className="font-display text-lg font-semibold">
            Why the horizon is infinity — and why that&apos;s fine
          </h3>
        </div>
      </header>

      {/* the two formulas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Formula 1 · discount</div>
          <div className="font-mono text-sm text-ink mt-0.5">PV = C / (1 + R)^T</div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Formula 2 · growing perpetuity</div>
          <div className="font-mono text-sm text-ink mt-0.5">PV = C / (R − G)</div>
        </div>
      </div>

      {/* horizon slider */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Finite horizon N (years of −$20M)</span>
          <span className="font-mono text-sm text-brand-300">{years} yrs</span>
        </div>
        <input
          type="range"
          min={1}
          max={120}
          step={1}
          value={years}
          onChange={(e) => setYears(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgb(var(--line))" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="n"
              stroke="rgb(var(--ink-muted))"
              tick={{ fontSize: 11 }}
              ticks={[1, 30, 60, 90, 120]}
              label={{ value: 'horizon (years)', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'rgb(var(--ink-muted))' }}
            />
            <YAxis
              stroke="rgb(var(--ink-muted))"
              tick={{ fontSize: 11 }}
              width={52}
              tickFormatter={(v) => `$${v}M`}
              domain={[-130, 70]}
            />
            <Tooltip
              contentStyle={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--line))', borderRadius: 12, color: 'rgb(var(--ink))' }}
              formatter={(v: any) => [`${Number(v) >= 0 ? '+' : '−'}${fmtUSD(Math.abs(Number(v)), 1)}M`, 'NPV']}
              labelFormatter={(l) => `${l} years`}
            />
            <ReferenceLine y={PERPETUITY_NPV} stroke="#10b981" strokeDasharray="5 4" label={{ value: 'perpetuity −$118M', fontSize: 10, fill: '#10b981', position: 'insideTopRight' }} />
            <ReferenceLine y={0} stroke="rgb(var(--ink-muted))" strokeDasharray="2 6" />
            <ReferenceLine x={years} stroke="rgb(var(--brand-500))" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="npv" stroke="rgb(var(--brand-500))" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border border-line bg-surface-3/40 p-3 mt-3 text-sm text-ink-soft">
        At <span className="font-mono">{years}</span> years the NPV is{' '}
        <span className="font-mono text-ink">−{fmtUSD(Math.abs(npvAtN), 1)}M</span> —{' '}
        <span className="font-mono">{pctOfTotal.toFixed(1)}%</span> of the full perpetuity value of{' '}
        <span className="font-mono text-emerald-300">−$118M</span>. At 30 years you already reach{' '}
        −$106.54M; by ~100 years almost nothing is left to add. Distant cash flows discount to nearly
        zero, so <strong>C / r already captures the entire infinite future.</strong>
      </div>
    </div>
  )
}
