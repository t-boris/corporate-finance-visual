import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { fmtUSD } from '@/lib/finance'

/**
 * Interactive percentage-of-sales forecasting model — Lessons 2-1 to 2-4.
 *
 * Reproduces the PepsiCo expansion case. The student moves the revenue-growth
 * and 2023 CapEx sliders and watches the cash runway (2021 → 2023) respond,
 * together with the verdict: can the plan be funded with INTERNAL funds, or is
 * EXTERNAL financing needed?
 *
 * Model (calibrated to the lecture so the defaults reproduce the case):
 *   Revenueₜ   = Revenueₜ₋₁ × (1 + g)
 *   CFOₜ       = cfoMargin × Revenueₜ           (percentage-of-sales)
 *   Dividendₜ  = divMargin × Revenueₜ           (constant payout)
 *   ΔCashₜ     = CFOₜ − CapExₜ − Dividendₜ      (no new debt/equity → the question)
 *   Cashₜ      = Cashₜ₋₁ + ΔCashₜ               (balance-sheet identity)
 */

const REV_2021 = 79_474 // $M
const CASH_2021 = 5_998 // $M  (~$6.0B reserve)
const CL_2021 = 26_078 // current liabilities → 23% cash ratio in 2021
const CFO_MARGIN = 0.1429 // calibrated: CFO 2022 ≈ $11.8B at base case
const DIV_MARGIN = 0.0829 // calibrated: dividend 2022 ≈ $6.84B
const CAPEX_2022 = 5_000 // fixed by the plan

export function ForecastingModel() {
  const [growthPct, setGrowthPct] = useState(3.9)
  const [capex2023, setCapex2023] = useState(8_000)

  const model = useMemo(() => {
    const g = growthPct / 100
    const rev2022 = REV_2021 * (1 + g)
    const rev2023 = rev2022 * (1 + g)

    const year = (rev: number, capex: number) => {
      const cfo = CFO_MARGIN * rev
      const div = DIV_MARGIN * rev
      const dCash = cfo - capex - div
      return { rev, cfo, capex, div, dCash }
    }
    const y22 = year(rev2022, CAPEX_2022)
    const y23 = year(rev2023, capex2023)

    const cash2022 = CASH_2021 + y22.dCash
    const cash2023 = cash2022 + y23.dCash
    const minCash = Math.min(cash2022, cash2023)

    return {
      y22,
      y23,
      cash: [CASH_2021, cash2022, cash2023],
      cashRatio: [CASH_2021 / CL_2021, cash2022 / CL_2021, cash2023 / CL_2021],
      internallyFundable: minCash > 0,
      minCash,
    }
  }, [growthPct, capex2023])

  const maxCash = Math.max(...model.cash, 1)
  const years = ['2021', '2022', '2023']

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <LineChart className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lessons 2-1 → 2-4
          </div>
          <h3 className="font-display text-lg font-semibold">
            Forecasting PepsiCo&apos;s expansion · can it be funded internally?
          </h3>
        </div>
      </header>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <Slider
          label="Revenue growth (per year)"
          value={growthPct}
          min={-2}
          max={8}
          step={0.1}
          suffix="%"
          onChange={setGrowthPct}
        />
        <Slider
          label="2023 CapEx (expansion plan)"
          value={capex2023}
          min={3_000}
          max={16_000}
          step={500}
          format={(v) => `$${(v / 1000).toFixed(1)}B`}
          onChange={setCapex2023}
        />
      </div>

      {/* Cash runway */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-3">
          Cash on the balance sheet · Cashₜ = Cashₜ₋₁ + ΔCashₜ
        </div>
        <div className="flex items-end justify-around gap-3 h-44">
          {model.cash.map((c, i) => {
            const negative = c < 0
            const h = Math.max(6, (Math.abs(c) / maxCash) * 100)
            return (
              <div key={years[i]} className="flex flex-col items-center justify-end flex-1 h-full">
                <div className={`font-mono text-sm mb-1 ${negative ? 'text-danger' : 'text-ink'}`}>
                  {fmtUSD(c, 0)}M
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full max-w-[80px] rounded-t-lg"
                  style={{
                    background: negative
                      ? 'linear-gradient(180deg,#ef4444,#b91c1c)'
                      : 'linear-gradient(180deg,#06b6d4,#0e7490)',
                  }}
                />
                <div className="text-xs text-ink-muted mt-2">{years[i]}</div>
                <div className="text-[10px] text-ink-muted">
                  cash ratio {(model.cashRatio[i] * 100).toFixed(0)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Verdict */}
      <motion.div
        key={model.internallyFundable ? 'ok' : 'bad'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-3 mb-4 flex items-start gap-3 border ${
          model.internallyFundable
            ? 'border-emerald-500/40 bg-emerald-500/5'
            : 'border-danger/40 bg-danger/5'
        }`}
      >
        {model.internallyFundable ? (
          <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
        ) : (
          <AlertTriangle className="text-danger shrink-0 mt-0.5" size={18} />
        )}
        <div className="text-sm">
          {model.internallyFundable ? (
            <>
              <span className="font-semibold text-emerald-300">Fundable internally.</span>{' '}
              Cash stays positive (low point {fmtUSD(model.minCash, 0)}M). At the base case the cash
              ratio still slides from ~23% to ~12% — a CFO may issue debt anyway to keep a buffer.
            </>
          ) : (
            <>
              <span className="font-semibold text-danger">External financing needed.</span> Cash
              turns negative (low point {fmtUSD(model.minCash, 0)}M) — PepsiCo must raise new debt or
              equity to cover the plan.
            </>
          )}
        </div>
      </motion.div>

      {/* Year detail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: '2022', y: model.y22 },
          { label: '2023', y: model.y23 },
        ].map(({ label, y }) => (
          <div key={label} className="rounded-xl border border-line bg-surface-3/40 p-3">
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">
              {label} forecast
            </div>
            <Row k="Revenue (+g)" v={fmtUSD(y.rev, 0) + 'M'} />
            <Row k="CFO (% of sales)" v={fmtUSD(y.cfo, 0) + 'M'} accent />
            <Row k="− CapEx" v={'−' + fmtUSD(y.capex, 0) + 'M'} />
            <Row k="− Dividends" v={'−' + fmtUSD(y.div, 0) + 'M'} />
            <div className="border-t border-line my-1.5" />
            <Row
              k="= Δ Cash"
              v={(y.dCash < 0 ? '−' : '') + fmtUSD(Math.abs(y.dCash), 0) + 'M'}
              danger={y.dCash < 0}
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-ink-muted mt-4 leading-relaxed">
        The key item to forecast is <strong>cash</strong>: it is simply last year&apos;s cash plus
        the year&apos;s net change. New debt and equity issuance are set to <strong>zero</strong> —
        that is exactly the question being tested, not an assumption.
      </p>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix?: string
  format?: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-ink-soft">{label}</span>
        <span className="font-mono text-sm text-brand-300">
          {format ? format(value) : `${value}${suffix ?? ''}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-brand-500"
      />
    </div>
  )
}

function Row({ k, v, accent, danger }: { k: string; v: string; accent?: boolean; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs py-0.5">
      <span className="text-ink-muted">{k}</span>
      <span
        className={`font-mono ${
          danger ? 'text-danger' : accent ? 'text-brand-300' : 'text-ink-soft'
        }`}
      >
        {v}
      </span>
    </div>
  )
}
