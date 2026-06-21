import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

/**
 * Lessons 5-2 / 5-3 — "Dilution is an illusion" (and when it is REAL).
 *
 * A firm with market equity $262.2M and 27.6M shares (price $9.50) issues
 * 5.6M new shares at a chosen price. Slide the issue price:
 *  - At the fair price ($9.50) the new price stays $9.50 → no dilution.
 *  - Below fair (e.g. Ruth's $7.75) the price drops mechanically → REAL dilution.
 * The numerator (equity value + cash) and denominator (shares) both move, so
 * you can see why selling at fair value leaves price unchanged.
 */
const E0 = 262.2 // $M existing equity value
const N0 = 27.6 // M existing shares
const NEW = 5.6 // M new shares
const FAIR = E0 / N0 // = $9.50

export function DilutionIllusion() {
  const [price, setPrice] = useState(FAIR)
  const cash = NEW * price
  const newPrice = (E0 + cash) / (N0 + NEW)
  const real = newPrice < FAIR - 1e-6

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Scale className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lessons 5-2 / 5-3</div>
          <h3 className="font-display text-lg font-semibold">Is dilution real? Set the issue price</h3>
        </div>
      </header>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">Issue price per new share</span>
          <span className="font-mono text-sm text-brand-300">${price.toFixed(2)}</span>
        </div>
        <input
          type="range" min={6} max={12} step={0.05} value={price}
          onChange={(e) => setPrice(+e.target.value)}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>$7.75 (Ruth&apos;s SEO)</span>
          <span>fair = ${FAIR.toFixed(2)}</span>
          <span>$12.00</span>
        </div>
      </div>

      {/* price = numerator / denominator */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-3 text-center">
        <div className="font-mono text-sm text-ink-soft">
          P<sub>new</sub> = (${E0.toFixed(1)} + {NEW}×${price.toFixed(2)}) / ({N0} + {NEW})
        </div>
        <div className="font-mono text-sm text-ink-soft mt-1">
          = (${E0.toFixed(1)} + ${cash.toFixed(1)}) / {(N0 + NEW).toFixed(1)} ={' '}
          <motion.span
            key={newPrice.toFixed(2)}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className={real ? 'text-amber-300 font-semibold' : 'text-emerald-300 font-semibold'}
          >
            ${newPrice.toFixed(2)}
          </motion.span>
        </div>
      </div>

      {/* old vs new price bars */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Bar label="Old price" value={FAIR} max={12} color="bg-surface-3" />
        <Bar label="New price" value={newPrice} max={12} color={real ? 'bg-amber-500/70' : 'bg-emerald-500/70'} />
      </div>

      <div className={`rounded-xl border-l-4 p-3 text-sm text-ink-soft ${real ? 'border-l-amber-500 bg-amber-500/5' : 'border-l-emerald-500 bg-emerald-500/5'}`}>
        {real ? (
          <>
            <span className="font-semibold text-amber-300">Real dilution.</span> Selling below the fair price
            transfers value from existing holders — the price drops mechanically. This is the Ruth&apos;s 2020 case
            ($9.50 → ~$9.20 mechanically; it actually fell to $7.50 on the signal).
          </>
        ) : (
          <>
            <span className="font-semibold text-emerald-300">Dilution is an illusion.</span> At the fair price the
            cash raised exactly offsets the new shares — the stock price is unchanged. More shares ≠ lower price.
          </>
        )}
      </div>
    </div>
  )
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-ink-muted mb-1">
        <span>{label}</span>
        <span className="font-mono">${value.toFixed(2)}</span>
      </div>
      <div className="h-6 rounded-md bg-surface-3/50 overflow-hidden border border-line">
        <motion.div className={`h-full ${color}`} animate={{ width: `${(value / max) * 100}%` }} transition={{ type: 'spring', stiffness: 160, damping: 22 }} />
      </div>
    </div>
  )
}
