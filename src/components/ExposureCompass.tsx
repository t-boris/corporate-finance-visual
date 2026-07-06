import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Compass, ArrowDownRight, ArrowUpRight } from 'lucide-react'

/**
 * Live Session 7 — the general rule for hedging, applied to the real cases.
 *
 *   1. Determine the company's OPERATIONAL exposure (how does the risk factor
 *      move profits?).
 *   2. The financial position must move profits in the OPPOSITE direction.
 *
 * Cases: Nintendo (speculation), Rolls-Royce (hedging), Honda (natural hedge),
 * oil producers & Southwest (mostly unhedged since 2025).
 */
type Verdict = 'HEDGING' | 'SPECULATION' | 'NATURAL HEDGE' | 'UNHEDGED'

type Case = {
  key: string
  name: string
  factor: string
  exposure: string        // operational exposure description
  exposureDir: 'long' | 'short'
  exposureAsset: string   // what they're long/short of
  correctHedge: string
  actual: string
  verdict: Verdict
  detail: string
}

const CASES: Case[] = [
  {
    key: 'nintendo',
    name: 'Nintendo (2010)',
    factor: 'USD/JPY',
    exposure: '80%+ of revenue abroad (Wii, DS) in dollars & euros; costs in yen',
    exposureDir: 'long',
    exposureAsset: 'USD',
    correctHedge: 'SHORT dollars — borrow USD, or short $/¥ forwards/futures, or move costs into dollars',
    actual: 'Held $7.4B of CASH in foreign currencies (~70% of its cash: $3.4B USD + €2.7B) — MORE long-dollar exposure. Strong yen → ¥62.1B appraisal losses → first interim net loss in 7 years (¥2.01B).',
    verdict: 'SPECULATION',
    detail:
      'Wrong direction: operations were already long USD, and the cash pile doubled the bet. "Higher foreign interest rates" is a price view, not a hedge. Nintendo was searching for trading profits, not zero.',
  },
  {
    key: 'rr',
    name: 'Rolls-Royce (2017)',
    factor: 'USD/GBP',
    exposure: 'Engines & long-term service contracts priced in dollars; costs mostly in sterling (~£14B revenue)',
    exposureDir: 'long',
    exposureAsset: 'USD',
    correctHedge: 'SHORT dollars — sell forward $5–6B/yr of net dollar inflows',
    actual: 'Shorted dollars via forwards/futures: hedgebook $38B (~2.5× annual sales, covering multi-year contracts — engines fly 20+ years). Post-Brexit sterling crash → £4.4B mark-to-market loss → £4.6B pre-tax loss.',
    verdict: 'HEDGING',
    detail:
      'Correct direction, backed by future dollar income from signed contracts. The derivative loss mirrors more valuable dollar revenues — net ≈ 0, no cash impact while hedges stay open. "Searching for zero" — and finding it.',
  },
  {
    key: 'honda',
    name: 'Honda (today)',
    factor: 'USD/JPY',
    exposure: '~50% of car sales in the US; historically yen costs',
    exposureDir: 'long',
    exposureAsset: 'USD',
    correctHedge: 'SHORT dollars (futures) or borrow USD & invest in yen — or remove the exposure operationally',
    actual: 'Moved production to the US: costs and revenues share the dollar. 20-F: no hedging derivatives held FY2023–25; no significant foreign-currency debt.',
    verdict: 'NATURAL HEDGE',
    detail:
      'Operational hedging: same-currency costs and revenues insulate profitability from the exchange rate, eliminating the need for derivatives or balance-sheet positions altogether.',
  },
  {
    key: 'producers',
    name: 'US oil producers (2026)',
    factor: 'Oil price',
    exposure: 'Sell oil — profits rise with the price',
    exposureDir: 'long',
    exposureAsset: 'oil',
    correctHedge: 'SHORT oil futures — lock in a floor for revenues',
    actual: 'Hedge ratios collapsed: 51.7% entering 2020 → 21% of 2025 output → just 4% for 2026, "because prices have gone up."',
    verdict: 'SPECULATION',
    detail:
      '"Prices rose, so we hedge less" is a forecast — betting the rally continues. If the goal is guaranteeing a minimum value, high prices make hedging cheap insurance; cutting it is a price view.',
  },
  {
    key: 'southwest',
    name: 'Southwest Airlines (2025)',
    factor: 'Jet fuel price',
    exposure: 'Buys fuel — profits FALL when oil rises',
    exposureDir: 'short',
    exposureAsset: 'oil',
    correctHedge: 'LONG oil futures — gains on fuel-price spikes offset higher costs',
    actual: 'Hedged fuel since the 2000s, then stopped in 2025. CEO Bob Jordan: "with the exception of a couple of positive years, it\'s not been beneficial… for the past 10 to 15 years."',
    verdict: 'UNHEDGED',
    detail:
      'Judging insurance by its trading P&L. Unhedged consequences of a spike: financial-distress risk, compensation wrecked by an uncontrollable factor, and only partial ability to pass prices through to fares.',
  },
]

const VERDICT_STYLE: Record<Verdict, string> = {
  HEDGING: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  SPECULATION: 'border-red-500/50 bg-red-500/10 text-red-300',
  'NATURAL HEDGE': 'border-brand-500/50 bg-brand-500/10 text-brand-300',
  UNHEDGED: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
}

export function ExposureCompass() {
  const [key, setKey] = useState('nintendo')
  const c = CASES.find((x) => x.key === key)!
  const oppositeDir = c.exposureDir === 'long' ? 'short' : 'long'

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Compass className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Live session</div>
          <h3 className="font-display text-lg font-semibold">The general rule: exposure → opposite position</h3>
        </div>
      </header>

      {/* case picker */}
      <div className="inline-flex flex-wrap rounded-lg border border-line bg-surface-3/40 p-0.5 mb-4 gap-0.5">
        {CASES.map((x) => (
          <button
            key={x.key}
            onClick={() => setKey(x.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              key === x.key ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {x.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={c.key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          {/* step 1 → step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-surface-3/40 p-3">
              <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">
                1 · Operational exposure ({c.factor})
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                {c.exposureDir === 'long' ? (
                  <ArrowUpRight size={18} className="text-emerald-400" />
                ) : (
                  <ArrowDownRight size={18} className="text-red-400" />
                )}
                <span className="font-mono text-sm font-semibold text-ink uppercase">
                  {c.exposureDir} {c.exposureAsset}
                </span>
              </div>
              <div className="text-[13px] text-ink-soft leading-relaxed">{c.exposure}</div>
            </div>
            <div className="rounded-xl border border-brand-500/40 bg-brand-500/5 p-3">
              <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">
                2 · Correct financial position (opposite)
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                {oppositeDir === 'long' ? (
                  <ArrowUpRight size={18} className="text-emerald-400" />
                ) : (
                  <ArrowDownRight size={18} className="text-red-400" />
                )}
                <span className="font-mono text-sm font-semibold text-brand-300 uppercase">
                  {oppositeDir} {c.exposureAsset}
                </span>
              </div>
              <div className="text-[13px] text-ink-soft leading-relaxed">{c.correctHedge}</div>
            </div>
          </div>

          {/* what they actually did */}
          <div className="rounded-xl border border-line bg-surface-3/40 p-3 mt-3">
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="text-[10px] uppercase tracking-widest text-ink-muted">3 · What the company actually did</div>
              <span className={`pill border text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${VERDICT_STYLE[c.verdict]}`}>
                {c.verdict}
              </span>
            </div>
            <div className="text-[13px] text-ink-soft leading-relaxed">{c.actual}</div>
            <div className="text-[12px] text-ink-muted leading-relaxed mt-2 italic">{c.detail}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        Two-step test from the live session: find the <strong>operational exposure</strong>, then check whether the
        financial position moves profits in the <strong>opposite</strong> direction. Same direction = speculation, no
        matter how it&apos;s labeled. <em>Rolls-Royce was searching for zero; Nintendo for trading profits.</em>
      </p>
    </div>
  )
}
