import { useState } from 'react'
import { motion } from 'framer-motion'
import { Combine, CheckCircle2, XCircle } from 'lucide-react'
import { fmtUSD, fmtPct } from '@/lib/finance'

/**
 * Synergy valuation & deal pricing — Lessons 4-2.
 *
 * The HP–Compaq (2002) case. Annual pre-tax cost savings, a one-off revenue
 * loss (scaled by the profit margin), taxes, a discount rate and a growth rate
 * feed a growing-perpetuity NPV brought back to the 2001 announcement year:
 *
 *   after-tax flow = (cost savings − margin·revenueLoss) · (1 − tax)
 *   synergy(2003)  = flow / (R − g)              ← perpetuity sits one year early
 *   synergy(2001)  = synergy(2003) / (1 + R)^2
 *
 * Defaults reproduce the lecture's $13.1B synergy. We then compare it with a
 * 30% premium on Compaq's $20.9B pre-deal equity to show the acquirer's NPV.
 */

const TARGET_VALUE = 20.9 // Compaq pre-deal equity, $B

export function SynergyValuation() {
  const [costSavings, setCostSavings] = useState(2.5) // $B annual, pre-tax
  const [revenueLoss, setRevenueLoss] = useState(4.1) // $B
  const [margin, setMargin] = useState(12) // %
  const [tax, setTax] = useState(26) // %
  const [discount, setDiscount] = useState(12) // %
  const [growth, setGrowth] = useState(3) // %
  const [premiumPct, setPremiumPct] = useState(30) // %

  const profitImpact = (margin / 100) * revenueLoss
  const preTaxFlow = costSavings - profitImpact
  const afterTaxFlow = preTaxFlow * (1 - tax / 100)
  const spread = (discount - growth) / 100
  const perpetuity = spread > 0 ? afterTaxFlow / spread : 0 // value at 2003
  const synergy = perpetuity / Math.pow(1 + discount / 100, 2) // back to 2001

  const premium = (premiumPct / 100) * TARGET_VALUE
  const acquirerNPV = synergy - premium
  const good = acquirerNPV > 0

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Combine className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 4-2
          </div>
          <h3 className="font-display text-lg font-semibold">
            Valuing synergies — the HP–Compaq deal
          </h3>
        </div>
      </header>

      {/* 2 + 2 = 5 banner */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-3 mb-4 flex items-center justify-center gap-3 text-center">
        <span className="font-mono text-lg text-ink">2&nbsp;+&nbsp;2</span>
        <span className="text-ink-muted">=</span>
        <motion.span
          key={synergy.toFixed(1)}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-mono text-lg text-emerald-300"
        >
          5
        </motion.span>
        <span className="text-[11px] text-ink-muted ml-2">
          synergy = the extra value the merger adds (the total NPV of the deal)
        </span>
      </div>

      {/* sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <Slider label="Annual cost savings (pre-tax)" value={`$${costSavings.toFixed(1)}B`}>
          <input type="range" min={0} max={5} step={0.1} value={costSavings} onChange={(e) => setCostSavings(+e.target.value)} className="w-full accent-brand-500" />
        </Slider>
        <Slider label="Revenue loss" value={`$${revenueLoss.toFixed(1)}B`}>
          <input type="range" min={0} max={8} step={0.1} value={revenueLoss} onChange={(e) => setRevenueLoss(+e.target.value)} className="w-full accent-brand-500" />
        </Slider>
        <Slider label="Profit margin" value={`${margin}%`}>
          <input type="range" min={5} max={30} step={1} value={margin} onChange={(e) => setMargin(+e.target.value)} className="w-full accent-brand-500" />
        </Slider>
        <Slider label="Tax rate" value={`${tax}%`}>
          <input type="range" min={0} max={40} step={1} value={tax} onChange={(e) => setTax(+e.target.value)} className="w-full accent-brand-500" />
        </Slider>
        <Slider label="Discount rate (R)" value={`${discount}%`}>
          <input type="range" min={4} max={20} step={0.5} value={discount} onChange={(e) => setDiscount(+e.target.value)} className="w-full accent-brand-500" />
        </Slider>
        <Slider label="Growth of synergies (g = inflation)" value={`${growth}%`}>
          <input type="range" min={0} max={8} step={0.5} value={growth} onChange={(e) => setGrowth(+e.target.value)} className="w-full accent-brand-500" />
        </Slider>
      </div>

      {/* computation chain */}
      <div className="rounded-lg bg-surface-3 border border-line p-3 mb-3 space-y-1.5 text-sm">
        <Row label="Profit impact of lost revenue = margin × revenue loss">
          {fmtPct(margin / 100, 0)} × ${revenueLoss.toFixed(1)}B = <span className="text-ink">${profitImpact.toFixed(2)}B</span>
        </Row>
        <Row label="Annual synergy, pre-tax = savings − profit impact">
          ${costSavings.toFixed(1)}B − ${profitImpact.toFixed(2)}B = <span className="text-ink">${preTaxFlow.toFixed(2)}B</span>
        </Row>
        <Row label="After tax = pre-tax × (1 − tax)">
          ${preTaxFlow.toFixed(2)}B × {fmtPct(1 - tax / 100, 0)} = <span className="text-ink">${afterTaxFlow.toFixed(2)}B</span>
        </Row>
        <Row label="Growing perpetuity (value at 2003) = flow / (R − g)">
          ${afterTaxFlow.toFixed(2)}B / {fmtPct(spread, 0)} = <span className="text-ink">${perpetuity.toFixed(1)}B</span>
        </Row>
        <Row label="Discount 2 years to 2001 = ÷ (1 + R)²">
          ${perpetuity.toFixed(1)}B / {(1 + discount / 100).toFixed(2)}² = <span className="text-emerald-300 font-semibold">${synergy.toFixed(1)}B</span>
        </Row>
      </div>

      {/* synergy vs premium */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <Stat label="Synergy value" value={`$${synergy.toFixed(1)}B`} tone="emerald" />
        <Stat label={`Premium (${premiumPct}% of $${TARGET_VALUE}B)`} value={`$${premium.toFixed(1)}B`} tone="amber" />
        <Stat label="Acquirer NPV = synergy − premium" value={`${acquirerNPV >= 0 ? '+' : '−'}$${Math.abs(acquirerNPV).toFixed(1)}B`} tone={good ? 'emerald' : 'danger'} />
      </div>

      <Slider label="Deal premium to Compaq" value={`${premiumPct}%`}>
        <input type="range" min={0} max={80} step={1} value={premiumPct} onChange={(e) => setPremiumPct(+e.target.value)} className="w-full accent-brand-500" />
      </Slider>

      {/* verdict */}
      <motion.div
        key={good ? 'ok' : 'bad'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-3 rounded-xl p-3 border text-sm flex gap-2 ${
          good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'
        }`}
      >
        {good ? <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} /> : <XCircle className="text-danger shrink-0 mt-0.5" size={16} />}
        <div>
          {good ? (
            <><span className="font-semibold text-emerald-300">Positive NPV for the acquirer.</span> Synergy beats the premium — HP keeps {fmtUSD(acquirerNPV * 1000, 0)}M of value.</>
          ) : (
            <><span className="font-semibold text-danger">Acquirer overpays.</span> The {premiumPct}% premium exceeds the synergy, so the deal destroys value for HP&apos;s own shareholders (great for Compaq, though).</>
          )}{' '}
          Max cash price for a break-even deal ≈ <span className="font-mono">${(TARGET_VALUE + synergy).toFixed(1)}B</span> (target value + synergy).
        </div>
      </motion.div>
    </div>
  )
}

function Slider({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-ink-soft">{label}</span>
        <span className="font-mono text-sm text-brand-300">{value}</span>
      </div>
      {children}
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
      <span className="text-[12px] text-ink-muted">{label}</span>
      <span className="font-mono text-[13px] text-ink-soft">{children}</span>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'emerald' | 'amber' | 'danger' }) {
  const color = tone === 'emerald' ? 'text-emerald-300' : tone === 'amber' ? 'text-amber-300' : 'text-danger'
  return (
    <div className="rounded-lg border border-line bg-surface-3/50 px-2 py-2">
      <div className="text-[10px] uppercase tracking-wide text-ink-muted leading-tight">{label}</div>
      <div className={`font-mono text-sm mt-1 ${color}`}>{value}</div>
    </div>
  )
}
