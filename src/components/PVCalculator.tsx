import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { presentValue, pvAnnuity, perpetuity, growingPerpetuity, fmtUSD, fmtPct } from '@/lib/finance'

type Mode = 'single' | 'annuity' | 'perpetuity' | 'growing'

/**
 * Универсальный PV-калькулятор: переключение между single CF, annuity,
 * perpetuity и growing perpetuity. Цель — натренировать выбор правильной формулы.
 */
export function PVCalculator() {
  const [mode, setMode] = useState<Mode>('single')
  const [fv, setFv] = useState(1000)
  const [c, setC] = useState(100)
  const [r, setR] = useState(0.08)
  const [n, setN] = useState(5)
  const [g, setG] = useState(0.03)

  const result = useMemo(() => {
    switch (mode) {
      case 'single':     return presentValue(fv, r, n)
      case 'annuity':    return pvAnnuity(c, r, n)
      case 'perpetuity': return perpetuity(c, r)
      case 'growing':    return growingPerpetuity(c, r, g)
    }
  }, [mode, fv, c, r, n, g])

  return (
    <div className="card p-5">
      <header className="mb-3">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive</div>
        <h3 className="font-display text-lg font-semibold">Present Value calculator</h3>
        <p className="text-sm text-ink-muted">Переключи режим — формула меняется, число пересчитывается.</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['single', 'annuity', 'perpetuity', 'growing'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
              ${mode === m
                ? 'bg-brand-500 text-white border-brand-500 shadow-soft'
                : 'bg-surface-3 text-ink-soft border-line hover:border-brand-400'}`}
          >
            {m === 'single' && 'Single CF'}
            {m === 'annuity' && 'Annuity'}
            {m === 'perpetuity' && 'Perpetuity'}
            {m === 'growing' && 'Growing perp'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {mode === 'single' && (
          <Input label="FV" value={fv} step={50} onChange={setFv} prefix="$" />
        )}
        {(mode === 'annuity' || mode === 'perpetuity' || mode === 'growing') && (
          <Input label="C (cash per period)" value={c} step={10} onChange={setC} prefix="$" />
        )}
        <Input label="r" value={r} step={0.005} min={0} max={1} onChange={setR} suffix="%" pct />
        {(mode === 'single' || mode === 'annuity') && (
          <Input label="n (years)" value={n} step={1} min={1} max={60} onChange={setN} />
        )}
        {mode === 'growing' && (
          <Input label="g" value={g} step={0.005} min={0} max={0.99} onChange={setG} suffix="%" pct />
        )}
      </div>

      <motion.div
        key={`${mode}-${result}`}
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="mt-5 rounded-xl border border-line bg-surface-3/60 p-4 flex items-center justify-between"
      >
        <div className="font-mono text-xs sm:text-sm text-ink-soft">
          {mode === 'single'     && <>PV = FV / (1+r)<sup>n</sup> = {fmtUSD(fv)} / (1 + {fmtPct(r)})<sup>{n}</sup></>}
          {mode === 'annuity'    && <>PV = C · [1 − (1+r)<sup>−n</sup>] / r</>}
          {mode === 'perpetuity' && <>PV = C / r</>}
          {mode === 'growing'    && <>PV = C / (r − g), r &gt; g</>}
        </div>
        <ArrowRight className="text-brand-400 mx-3 shrink-0" size={16} />
        <div className="text-right">
          <div className="text-[11px] text-ink-muted uppercase tracking-wider">Present Value</div>
          <div className="font-display text-2xl gradient-text font-semibold">
            {isFinite(result) ? fmtUSD(result) : '∞'}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Input({
  label, value, step, min, max, onChange, prefix, suffix, pct,
}: {
  label: string
  value: number
  step: number
  min?: number
  max?: number
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
  pct?: boolean
}) {
  const display = pct ? (value * 100).toString() : value.toString()
  return (
    <label className="block">
      <div className="text-xs text-ink-muted">{label}</div>
      <div className="mt-1 flex items-center bg-surface-3 border border-line rounded-lg focus-within:border-brand-400">
        {prefix && <span className="px-2 text-ink-muted text-sm">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          className="w-full bg-transparent px-2 py-2 text-sm font-mono focus:outline-none"
          value={display}
          step={pct ? step * 100 : step}
          min={pct && min != null ? min * 100 : min}
          max={pct && max != null ? max * 100 : max}
          onChange={(e) => {
            const num = parseFloat(e.target.value)
            if (Number.isFinite(num)) onChange(pct ? num / 100 : num)
          }}
        />
        {suffix && <span className="px-2 text-ink-muted text-sm">{suffix}</span>}
      </div>
    </label>
  )
}
