import { useMemo, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { futureValue, fmtUSD } from '@/lib/finance'

/**
 * Interactive Time Value of Money explorer.
 *
 * Пользователь крутит PV, ставку r и срок n — графики и числа реагируют живо.
 * Назначение — построить интуицию: «деньги растут экспоненциально, ставка двигает кривую».
 */
export function TVMExplorer() {
  const [pv, setPv] = useState(1000)
  const [r, setR] = useState(0.08)
  const [n, setN] = useState(10)

  const data = useMemo(() => {
    const arr: { year: number; fv: number; real: number }[] = []
    for (let t = 0; t <= n; t++) {
      arr.push({
        year: t,
        fv: futureValue(pv, r, t),
        // Сравнение с линейным простым процентом (без compounding) — наглядно показывает power of compounding
        real: pv * (1 + r * t),
      })
    }
    return arr
  }, [pv, r, n])

  const final = data[data.length - 1]?.fv ?? pv

  return (
    <div className="card p-5">
      <header className="flex items-end justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive</div>
          <h3 className="font-display text-lg font-semibold">Time Value of Money explorer</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-ink-muted">FV after {n} years</div>
          <div className="font-display text-2xl gradient-text font-semibold">{fmtUSD(final)}</div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <Slider label="PV (today)"  value={pv} min={100}  max={50000} step={100}  onChange={setPv} format={(v) => fmtUSD(v)} />
        <Slider label="Rate r"      value={r}  min={0}    max={0.30}  step={0.005} onChange={setR}  format={(v) => `${(v * 100).toFixed(1)}%`} />
        <Slider label="Years n"     value={n}  min={1}    max={40}    step={1}    onChange={setN}  format={(v) => `${v} yrs`} />
      </div>

      <div className="h-64">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gFv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="rgb(var(--brand-400))" stopOpacity={0.55} />
                <stop offset="95%" stopColor="rgb(var(--brand-400))" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="rgb(var(--accent))" stopOpacity={0.35} />
                <stop offset="95%" stopColor="rgb(var(--accent))" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgb(var(--line))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" stroke="rgb(var(--ink-muted))" tick={{ fontSize: 11 }} />
            <YAxis stroke="rgb(var(--ink-muted))" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${Math.round(v).toLocaleString()}`} width={70} />
            <Tooltip
              contentStyle={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--line))', borderRadius: 12, color: 'rgb(var(--ink))' }}
              formatter={(v: any) => fmtUSD(Number(v))}
              labelFormatter={(l) => `Year ${l}`}
            />
            <ReferenceLine y={pv} stroke="rgb(var(--ink-muted))" strokeDasharray="2 6" />
            <Area type="monotone" dataKey="real" stroke="rgb(var(--accent))" fill="url(#gReal)" strokeWidth={2} name="Simple interest" />
            <Area type="monotone" dataKey="fv"   stroke="rgb(var(--brand-500))" fill="url(#gFv)"   strokeWidth={2.5} name="Compound FV" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-ink-muted mt-2">
        Тёмная линия — compound interest <span className="font-mono">FV = PV·(1+r)<sup>n</sup></span>,
        светлая — simple interest <span className="font-mono">PV·(1+r·n)</span>. Разница — это «процент на процент».
      </p>
    </div>
  )
}

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format: (v: number) => string
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono font-semibold text-ink">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full mt-1 accent-brand-500"
      />
    </label>
  )
}
