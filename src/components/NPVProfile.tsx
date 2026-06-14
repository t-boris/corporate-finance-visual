import { useMemo, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot,
} from 'recharts'
import { growingPerpetuity, fmtUSD, fmtPct } from '@/lib/finance'

/**
 * The NPV profile and the meaning of the IRR — Lessons 3-4 & 3-5.
 *
 * Project: invest $10,000 today, receive $500 next year growing 4% forever.
 *   NPV(R) = −10,000 + 500 / (R − 0.04)
 * The curve crosses zero exactly at the IRR of 9%. Left of it (lower discount
 * rate) NPV is positive; right of it NPV is negative. The slider reproduces the
 * lecture's two benchmarks: 8% → +$2,500, 10% → −$1,667.
 */

const INVEST = 10000
const C1 = 500
const G = 0.04
const IRR = 0.09 // solves 500/(R−0.04) = 10,000

const npvAt = (r: number) => -INVEST + growingPerpetuity(C1, r, G)

export function NPVProfile() {
  const [ratePct, setRatePct] = useState(8)
  const r = ratePct / 100
  const npv = npvAt(r)
  const good = r < IRR

  const data = useMemo(() => {
    const arr: { r: number; npv: number }[] = []
    for (let p = 6; p <= 16; p += 0.25) {
      arr.push({ r: p, npv: npvAt(p / 100) })
    }
    return arr
  }, [])

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <span className="text-brand-400 font-mono text-sm">IRR</span>
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-4 / 3-5
          </div>
          <h3 className="font-display text-lg font-semibold">
            The IRR is where the NPV curve crosses zero
          </h3>
        </div>
      </header>

      <p className="text-xs text-ink-muted mb-3">
        Project: <span className="font-mono text-ink-soft">−$10,000</span> today, then{' '}
        <span className="font-mono text-ink-soft">$500</span> growing 4% forever. IRR ={' '}
        <span className="font-mono text-brand-300">9%</span> (the rate that makes NPV = 0).
      </p>

      {/* benchmark slider */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Benchmark / discount rate</span>
          <span className="font-mono text-sm text-brand-300">{fmtPct(r, 2)}</span>
        </div>
        <input
          type="range"
          min={6}
          max={16}
          step={0.25}
          value={ratePct}
          onChange={(e) => setRatePct(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-1">
          <span>6%</span>
          <span>IRR 9%</span>
          <span>16%</span>
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgb(var(--line))" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="r"
              stroke="rgb(var(--ink-muted))"
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
              ticks={[6, 8, 9, 10, 12, 14, 16]}
              type="number"
              domain={[6, 16]}
            />
            <YAxis
              stroke="rgb(var(--ink-muted))"
              tick={{ fontSize: 11 }}
              width={58}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--line))', borderRadius: 12, color: 'rgb(var(--ink))' }}
              formatter={(v: any) => [`${Number(v) >= 0 ? '+' : '−'}${fmtUSD(Math.abs(Number(v)), 0)}`, 'NPV']}
              labelFormatter={(l) => `discount rate ${l}%`}
            />
            <ReferenceLine y={0} stroke="rgb(var(--ink-muted))" />
            <ReferenceLine x={9} stroke="#10b981" strokeDasharray="5 4" label={{ value: 'IRR 9%', fontSize: 10, fill: '#10b981', position: 'top' }} />
            <Line type="monotone" dataKey="npv" stroke="rgb(var(--brand-500))" strokeWidth={2.5} dot={false} />
            <ReferenceDot x={ratePct} y={npv} r={5} fill={good ? '#10b981' : '#ef4444'} stroke="rgb(var(--surface-2))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* verdict */}
      <Verdict good={good} r={r} npv={npv} />
    </div>
  )
}

function Verdict({ good, r, npv }: { good: boolean; r: number; npv: number }) {
  return (
    <div
      className={`rounded-xl p-3 border text-sm mt-3 ${
        good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'
      }`}
    >
      {good ? (
        <>
          <span className="font-semibold text-emerald-300">IRR (9%) &gt; benchmark ({fmtPct(r, 2)}) → accept.</span>{' '}
          NPV = −10,000 + 500/({fmtPct(r, 2)} − 4%) ={' '}
          <span className="font-mono">+{fmtUSD(npv, 0)}</span>. Below the IRR the NPV is positive.
        </>
      ) : (
        <>
          <span className="font-semibold text-danger">IRR (9%) &lt; benchmark ({fmtPct(r, 2)}) → reject.</span>{' '}
          NPV = −10,000 + 500/({fmtPct(r, 2)} − 4%) ={' '}
          <span className="font-mono">−{fmtUSD(Math.abs(npv), 0)}</span>. Above the IRR the NPV turns negative.
        </>
      )}
    </div>
  )
}
