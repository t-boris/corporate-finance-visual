import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gauge, CheckCircle2, XCircle } from 'lucide-react'

/**
 * Economic Value Added — Lessons 4-9 & 4-10.
 *
 *   EVA = OPAT − WACC × Operating Assets
 *
 * Two companies:
 *  · PepsiCo 2021 — OPAT $9.7B, operating assets $86.4B, WACC 4.7–6.5% → EVA
 *    stays positive (~$4.1B at the conservative 6.5%).
 *  · Altria's wine division (Ste Michelle) — OPAT $16.6M, operating assets
 *    ~$897M. The beta choice decides the WACC: the tobacco beta (0.5 → WACC
 *    ~5.0%) understates risk; the wine pure-play (Constellation Brands, β 1.07
 *    → WACC 7.2%) is correct. EVA is negative either way (−$28M vs −$48M).
 */

type Co = 'pepsi' | 'wine'
const DATA: Record<Co, { name: string; opat: number; assets: number; lo: number; hi: number; lecture: number }> = {
  pepsi: { name: 'PepsiCo (2021)', opat: 9700, assets: 86400, lo: 4.7, hi: 6.5, lecture: 5.6 },
  wine: { name: 'Altria · Ste Michelle wine (2021)', opat: 16.6, assets: 897.2, lo: 4.5, hi: 8, lecture: 7.2 },
}

const fmt = (m: number) => {
  const s = m < 0 ? '−' : ''
  const a = Math.abs(m)
  return a >= 1000 ? `${s}$${(a / 1000).toFixed(1)}B` : `${s}$${a.toFixed(a < 100 ? 1 : 0)}M`
}

export function EVAVisual() {
  const [co, setCo] = useState<Co>('pepsi')
  const d = DATA[co]
  const [wacc, setWacc] = useState(d.lecture)

  const charge = (wacc / 100) * d.assets
  const eva = d.opat - charge
  const good = eva >= 0

  const max = Math.max(d.opat, charge) * 1.1
  const switchCo = (next: Co) => { setCo(next); setWacc(DATA[next].lecture) }

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Gauge className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lessons 4-9 & 4-10
          </div>
          <h3 className="font-display text-lg font-semibold">
            Is it creating economic value? (EVA)
          </h3>
        </div>
      </header>

      {/* company toggle */}
      <div className="flex gap-2 mb-4">
        {(['pepsi', 'wine'] as const).map((c) => (
          <button
            key={c}
            onClick={() => switchCo(c)}
            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              co === c ? 'border-brand-500 bg-brand-500/10 text-ink' : 'border-line bg-surface-3/40 text-ink-muted hover:text-ink'
            }`}
          >
            {DATA[c].name}
          </button>
        ))}
      </div>

      {/* beta presets for wine */}
      {co === 'wine' && (
        <div className="rounded-xl border border-line bg-surface-3/30 p-3 mb-4">
          <div className="text-[11px] text-ink-muted mb-2">
            Which beta for the wine division? It sets the WACC:
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setWacc(5.0)}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-[11px] ${Math.abs(wacc - 5.0) < 0.05 ? 'border-amber-500 bg-amber-500/10 text-ink' : 'border-line text-ink-muted hover:text-ink'}`}
            >
              Tobacco β 0.5 → WACC ~5.0% <span className="text-amber-300">(wrong)</span>
            </button>
            <button
              onClick={() => setWacc(7.2)}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-[11px] ${Math.abs(wacc - 7.2) < 0.05 ? 'border-emerald-500 bg-emerald-500/10 text-ink' : 'border-line text-ink-muted hover:text-ink'}`}
            >
              Wine pure-play β 1.07 → WACC 7.2% <span className="text-emerald-300">(right)</span>
            </button>
          </div>
        </div>
      )}

      {/* bars */}
      <div className="rounded-xl border border-line bg-surface-3/30 p-4 mb-4 space-y-3">
        <Bar label="OPAT (operating profit after taxes)" value={d.opat} max={max} color="bg-emerald-500" valueLabel={fmt(d.opat)} />
        <Bar label={`Capital charge = WACC × operating assets`} value={charge} max={max} color="bg-amber-500" valueLabel={fmt(charge)} />
        <div className="border-t border-line pt-2 flex items-center justify-between">
          <span className="text-sm text-ink">EVA = OPAT − capital charge</span>
          <motion.span key={eva.toFixed(1)} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className={`font-mono text-base font-semibold ${good ? 'text-emerald-300' : 'text-danger'}`}>
            {fmt(eva)}
          </motion.span>
        </div>
      </div>

      {/* wacc slider */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-soft">WACC (operating assets = {fmt(d.assets)})</span>
          <span className="font-mono text-sm text-brand-300">{wacc.toFixed(1)}%</span>
        </div>
        <input type="range" min={d.lo} max={d.hi} step={0.1} value={wacc} onChange={(e) => setWacc(+e.target.value)} className="w-full accent-brand-500" />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>{d.lo}%</span><span>lecture {d.lecture}%</span><span>{d.hi}%</span>
        </div>
      </div>

      {/* verdict */}
      <motion.div
        key={good ? 'ok' : 'bad'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-3 border text-sm flex gap-2 ${good ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-danger/40 bg-danger/5'}`}
      >
        {good ? <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} /> : <XCircle className="text-danger shrink-0 mt-0.5" size={16} />}
        <div>
          {co === 'pepsi' ? (
            good
              ? <><span className="font-semibold text-emerald-300">Positive EVA at every WACC in the range.</span> Even at the conservative 6.5%, PepsiCo earns ~$4.1B of pure economic profit — it comfortably beats its cost of capital.</>
              : <>EVA turns negative only well above the plausible WACC range.</>
          ) : (
            <><span className="font-semibold text-danger">Negative EVA.</span> In 2021 the wine division did not cover its cost of capital. Using the wrong tobacco beta (~5.0%) would <em>understate</em> the loss (−$28M); the correct wine beta (7.2%) shows −$48M. Interpret with care — a young division may turn positive later.</>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function Bar({ label, value, max, color, valueLabel }: { label: string; value: number; max: number; color: string; valueLabel: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[12px] text-ink-soft">{label}</span>
        <span className="font-mono text-sm text-ink">{valueLabel}</span>
      </div>
      <div className="h-5 rounded-md bg-surface-3 overflow-hidden">
        <motion.div
          className={`h-full rounded-md ${color}`}
          animate={{ width: `${Math.max(2, (value / max) * 100)}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        />
      </div>
    </div>
  )
}
