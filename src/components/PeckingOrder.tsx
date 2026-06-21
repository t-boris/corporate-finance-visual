import { motion } from 'framer-motion'
import { Layers, ArrowDown } from 'lucide-react'

/**
 * Lesson 5-4 — Evidence from the field: the pecking order.
 *
 * Left: the preference order (internal funds → debt → external equity).
 * Right: the stylized aggregate financing mix (share of investment funded),
 * with NEGATIVE net equity issuance — firms repurchase more than they issue.
 * Also surfaces the Eckbo–Masulis price-reaction fact.
 */
const TIERS = [
  { rank: '1st', label: 'Internal funds', note: 'own cash flows — the largest source', color: 'bg-emerald-500/70', share: 70 },
  { rank: '2nd', label: 'Debt', note: 'bonds & bank loans — usually positive net issuance', color: 'bg-cyan-500/70', share: 38 },
  { rank: '3rd', label: 'External equity', note: 'avoided — aggregate net issuance is NEGATIVE', color: 'bg-rose-500/70', share: -8 },
]

export function PeckingOrder() {
  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Layers className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 5-4</div>
          <h3 className="font-display text-lg font-semibold">The pecking order of financing</h3>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {/* preference ladder */}
        <div className="space-y-2">
          {TIERS.map((t, i) => (
            <div key={t.label}>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-line bg-surface-3/40 p-3 flex items-center gap-3"
              >
                <span className="font-mono text-xs text-brand-300 w-7 shrink-0">{t.rank}</span>
                <div>
                  <div className="font-semibold text-ink">{t.label}</div>
                  <div className="text-[12px] text-ink-muted">{t.note}</div>
                </div>
              </motion.div>
              {i < TIERS.length - 1 && (
                <div className="flex justify-center py-0.5 text-ink-muted">
                  <ArrowDown size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* aggregate mix bars (signed) */}
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-2">
            Aggregate financing of investment (stylized, U.S.)
          </div>
          <div className="space-y-3">
            {TIERS.map((t) => {
              const neg = t.share < 0
              const mag = Math.abs(t.share)
              return (
                <div key={t.label}>
                  <div className="flex justify-between text-[11px] text-ink-soft mb-1">
                    <span>{t.label}</span>
                    <span className={`font-mono ${neg ? 'text-rose-300' : 'text-ink'}`}>{neg ? '−' : '+'}{mag}%</span>
                  </div>
                  {/* centered zero baseline */}
                  <div className="relative h-6 rounded-md bg-surface-3/50 border border-line overflow-hidden">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-line" />
                    <motion.div
                      className={`absolute inset-y-0 ${t.color} ${neg ? 'right-1/2' : 'left-1/2'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mag / 2}%` }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-[11px] text-ink-muted mt-3">
            Net equity issuance is negative — firms repurchase more than they issue.
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border-l-4 border-l-brand-500 bg-brand-500/5 p-3 text-sm text-ink-soft">
        <span className="font-semibold text-brand-300">Eckbo &amp; Masulis (1995):</span> announcing a bond issue moves
        the stock ≈ 0%; announcing equity drops it ≈ 1.5%–3%. Markets read equity issuance as bad news — so debt is the
        preferred external source. Exceptions: M&amp;A, venture capital, IPOs, and special-situation SEOs.
      </div>
    </div>
  )
}
