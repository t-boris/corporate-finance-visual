import { useState } from 'react'
import { motion } from 'framer-motion'
import { Banknote, Shuffle, TrendingDown, TrendingUp } from 'lucide-react'

/**
 * Means of payment & market reaction — Lesson 4-3.
 *
 * Two panels:
 *  (1) Cash vs stock toggle. In a stock deal the exchange ratio = offer/share ÷
 *      acquirer price, and because the target is paid in the acquirer's shares,
 *      a drop in the acquirer's price erodes the real value of the offer.
 *      HP–Compaq: $16 offer at HP $23 → 0.69 ratio; HP fell to $18, cutting the
 *      offer's real value to ~$11.4 (below Compaq's $12.35 pre-deal price).
 *  (2) Average announcement returns: targets ≈ +20%, acquirers ≈ 0%.
 */

const OFFER_PER_SHARE = 16 // $, the agreed cash-equivalent offer
const COMPAQ_PRE = 12.35 // $, Compaq pre-deal price

export function MeansOfPayment() {
  const [mode, setMode] = useState<'cash' | 'stock'>('stock')
  const [hpPrice, setHpPrice] = useState(23) // $, HP price after reaction

  // exchange ratio fixed at announcement using the pre-deal HP price ($23)
  const exchangeRatio = OFFER_PER_SHARE / 23
  // in a stock deal the realised value moves with HP's price
  const realValue = mode === 'stock' ? exchangeRatio * hpPrice : OFFER_PER_SHARE
  const targetHappy = realValue >= COMPAQ_PRE

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Shuffle className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 4-3
          </div>
          <h3 className="font-display text-lg font-semibold">
            Cash vs. stock — and how the market reacts
          </h3>
        </div>
      </header>

      {/* mode toggle */}
      <div className="flex gap-2 mb-4">
        {(['cash', 'stock'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              mode === m
                ? 'border-brand-500 bg-brand-500/10 text-ink'
                : 'border-line bg-surface-3/40 text-ink-muted hover:text-ink'
            }`}
          >
            {m === 'cash' ? <Banknote size={15} /> : <Shuffle size={15} />}
            {m === 'cash' ? 'Cash deal' : 'Stock deal'}
          </button>
        ))}
      </div>

      {mode === 'cash' ? (
        <div className="rounded-xl border border-line bg-surface-3/30 p-4 text-sm text-ink-soft space-y-2">
          <p>
            The acquirer pays <span className="font-mono text-ink">${OFFER_PER_SHARE}</span> per Compaq share in
            cash and buys out the target. Simple: Compaq shareholders exit at a fixed price; the assets now
            belong to HP shareholders. The offer value does <strong>not</strong> depend on HP&apos;s stock reaction.
          </p>
          <div className="font-mono text-center text-ink mt-2">
            $27B deal ÷ 1.689B shares ≈ ${OFFER_PER_SHARE}/share (fixed)
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-line bg-surface-3/30 p-4 text-sm text-ink-soft space-y-2 mb-3">
            <p>
              HP issues new shares to Compaq holders, who <strong>become HP shareholders</strong>. The{' '}
              <span className="text-ink">exchange ratio</span> is fixed at announcement using HP&apos;s pre-deal
              price of $23:
            </p>
            <div className="font-mono text-center text-ink">
              exchange ratio = $16 / $23 ≈ {exchangeRatio.toFixed(2)} HP shares per Compaq share
            </div>
            <p className="text-[12px] text-ink-muted">
              (The real deal used 0.6325.) Because payment is in HP stock, the value Compaq holders actually
              receive moves with HP&apos;s price.
            </p>
          </div>

          <div className="mb-2">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-ink-soft">HP share price after market reaction</span>
              <span className="font-mono text-sm text-brand-300">${hpPrice.toFixed(0)}</span>
            </div>
            <input type="range" min={14} max={28} step={1} value={hpPrice} onChange={(e) => setHpPrice(+e.target.value)} className="w-full accent-brand-500" />
            <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
              <span>$14</span><span>pre-deal $23</span><span>$28</span>
            </div>
          </div>

          <motion.div
            key={realValue.toFixed(2)}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className={`rounded-xl p-3 border text-sm flex gap-2 ${
              targetHappy ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'
            }`}
          >
            <div>
              Real value of offer = {exchangeRatio.toFixed(2)} × ${hpPrice.toFixed(0)} ={' '}
              <span className={`font-mono font-semibold ${targetHappy ? 'text-emerald-300' : 'text-danger'}`}>
                ${realValue.toFixed(2)}
              </span>{' '}
              vs. Compaq pre-deal <span className="font-mono">${COMPAQ_PRE}</span>.{' '}
              {targetHappy ? (
                <>Compaq holders gain.</>
              ) : (
                <>HP fell to $18 → offer worth only <span className="font-mono">${realValue.toFixed(2)}</span>, so Compaq holders sell <em>below</em> the pre-deal price — Compaq&apos;s stock fell too (famously unusual).</>
              )}
            </div>
          </motion.div>
        </>
      )}

      {/* market reaction bars */}
      <div className="mt-5">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">
          Average announcement returns (decades of research)
        </div>
        <div className="space-y-3">
          <ReactionBar label="Target" pct={20} tone="emerald" note="significant premium → deals are +NPV for targets" />
          <ReactionBar label="Acquirer" pct={0} tone="muted" note="≈ 0% — acquirers tend to overpay, transferring synergy to the target" />
        </div>
      </div>
    </div>
  )
}

function ReactionBar({ label, pct, tone, note }: { label: string; pct: number; tone: 'emerald' | 'muted'; note: string }) {
  const width = Math.max(4, (pct / 20) * 100)
  const color = tone === 'emerald' ? 'bg-emerald-500' : 'bg-ink-muted'
  const Icon = tone === 'emerald' ? TrendingUp : TrendingDown
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-ink flex items-center gap-1.5">
          <Icon size={14} className={tone === 'emerald' ? 'text-emerald-400' : 'text-ink-muted'} />
          {label}
        </span>
        <span className="font-mono text-sm text-ink">+{pct}%</span>
      </div>
      <div className="h-3 rounded-full bg-surface-3 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <div className="text-[11px] text-ink-muted mt-1">{note}</div>
    </div>
  )
}
