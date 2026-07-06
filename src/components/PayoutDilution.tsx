import { useState } from 'react'
import { motion } from 'framer-motion'
import { Recycle } from 'lucide-react'

/**
 * Lesson 6-4 — "dilution is an illusion" for buybacks.
 *
 * Firm: equity value $80,000 = 1,000 shares × $80.
 * Naïve view forgets the cash:   P_naive = equity / (shares − n)
 * Correct view spends cash:       P_correct = (equity − price·n) / (shares − n)
 * At the market price P_correct = $80 (NPV = 0). Below market → price rises
 * (good for stayers); above market → price falls.
 */
const EQUITY = 80000
const SHARES = 1000
const P0 = 80

export function PayoutDilution() {
  const [n, setN] = useState(100)          // shares repurchased
  const [price, setPrice] = useState(80)   // repurchase price

  const remaining = SHARES - n
  const cash = price * n
  const naive = EQUITY / remaining
  const correct = (EQUITY - cash) / remaining
  const npvPerShare = correct - P0

  const bars = [
    { label: 'Start price', value: P0, color: 'rgb(var(--ink-muted))' },
    { label: 'Naïve (forgets cash)', value: naive, color: 'rgb(239 68 68)' },
    { label: 'Correct (spends cash)', value: correct, color: 'rgb(var(--brand-500))' },
  ]
  const maxV = Math.max(...bars.map((b) => b.value), 90)

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Recycle className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 6-4</div>
          <h3 className="font-display text-lg font-semibold">Dilution is an illusion (buyback edition)</h3>
        </div>
      </header>

      {/* bars */}
      <div className="space-y-2.5">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <div className="w-40 shrink-0 text-[13px] text-ink-soft">{b.label}</div>
            <div className="flex-1 h-7 rounded-md bg-surface-2/70 overflow-hidden">
              <motion.div
                className="h-full rounded-md flex items-center justify-end pr-2"
                style={{ background: b.color }}
                animate={{ width: `${Math.min(100, (b.value / maxV) * 100)}%` }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[11px] font-mono font-semibold text-white">${b.value.toFixed(2)}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted">Shares repurchased</span>
            <span className="font-mono text-xs text-brand-300">{n}</span>
          </div>
          <input type="range" min={0} max={300} step={10} value={n} onChange={(e) => setN(parseInt(e.target.value))} className="w-full accent-brand-500" />
        </div>
        <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted">Repurchase price</span>
            <span className="font-mono text-xs text-brand-300">${price}</span>
          </div>
          <input type="range" min={60} max={100} step={1} value={price} onChange={(e) => setPrice(parseInt(e.target.value))} className="w-full accent-brand-500" />
        </div>
      </div>

      {/* readout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <Stat label="Cash spent" value={`$${cash.toLocaleString()}`} tone="muted" />
        <Stat label="Shares left" value={`${remaining}`} tone="muted" />
        <Stat label="New price" value={`$${correct.toFixed(2)}`} tone="brand" />
        <Stat
          label="NPV / share"
          value={`${npvPerShare >= 0 ? '+' : ''}$${npvPerShare.toFixed(2)}`}
          tone={Math.abs(npvPerShare) < 0.01 ? 'muted' : npvPerShare > 0 ? 'emerald' : 'amber'}
        />
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        Set the price to the market <span className="font-mono text-brand-300">$80</span>: the &ldquo;correct&rdquo; bar
        stays at $80 — the cash spent exactly offsets the smaller share count, so{' '}
        <span className="text-brand-300 font-medium">NPV = 0</span>. Only buying <em>below</em> market lifts the price for
        the remaining holders; buying <em>above</em> destroys value. The naïve red bar — which forgets the cash — is the
        illusion.
      </p>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'brand' | 'amber' | 'emerald' | 'muted' }) {
  const ring: Record<string, string> = {
    brand: 'border-brand-500/40 bg-brand-500/5 text-brand-300',
    amber: 'border-amber-500/40 bg-amber-500/5 text-amber-300',
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300',
    muted: 'border-line bg-surface-3/60 text-ink',
  }
  return (
    <div className={`rounded-lg border p-3 text-center ${ring[tone]}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="font-mono text-lg mt-0.5">{value}</div>
    </div>
  )
}
