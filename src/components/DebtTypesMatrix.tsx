import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Landmark } from 'lucide-react'

/**
 * Lessons 6-2 / 6-3 — types of debt and bank vs. market financing.
 *
 * Top: recovery rates by debt type (secured bank debt >80% vs senior unsecured
 * bonds ~40%) — the core reason bank debt is "safer."
 * Bottom: Walmart (bonds) vs. Pricemark (bank loans) profiles, the lecture's
 * large-vs-small comparison.
 */
const RECOVERY = [
  { label: 'Secured bank debt', value: 82, color: 'rgb(16 185 129)' },
  { label: 'Senior unsecured bonds', value: 40, color: 'rgb(245 158 11)' },
  { label: 'Subordinated / equity', value: 12, color: 'rgb(239 68 68)' },
]

type Profile = {
  key: string
  name: string
  icon: 'big' | 'bank'
  size: string
  rating: string
  mainDebt: string
  rate: string
  secured: string
  control: string
  suits: string
}

const PROFILES: Profile[] = [
  {
    key: 'wmt', name: 'Walmart', icon: 'big',
    size: '~$785B market cap', rating: 'AA (rated)',
    mainDebt: 'Bonds (62%) + commercial paper + leases',
    rate: '10-yr YTM ≈ 5%', secured: 'Mostly unsecured', control: 'Arm\'s-length — keeps control',
    suits: 'Large, mature, high-rated → market (bonds)',
  },
  {
    key: 'pmk', name: 'Pricemark', icon: 'bank',
    size: '~$3B market cap', rating: 'BB− (pseudo, unrated)',
    mainDebt: 'Term loans (bank) + leases',
    rate: 'bank ≈ 8%', secured: 'Secured + covenants', control: 'Gives bank control',
    suits: 'Small, young, risky → bank',
  },
]

export function DebtTypesMatrix() {
  const [key, setKey] = useState('wmt')
  const p = PROFILES.find((f) => f.key === key) ?? PROFILES[0]

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Landmark className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lessons 6-2 / 6-3</div>
          <h3 className="font-display text-lg font-semibold">Bank vs. market — recovery, control, and who uses what</h3>
        </div>
      </header>

      {/* recovery bars */}
      <div className="rounded-xl border border-line bg-surface-3/40 p-4">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-2">Historical recovery rate in default (Moody&apos;s)</div>
        <div className="space-y-2.5">
          {RECOVERY.map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <div className="w-40 shrink-0 text-[13px] text-ink-soft">{r.label}</div>
              <div className="flex-1 h-6 rounded-md bg-surface-2/70 overflow-hidden">
                <motion.div
                  className="h-full rounded-md flex items-center justify-end pr-2"
                  style={{ background: r.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <span className="text-[11px] font-mono font-semibold text-white">{r.value}%</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-ink-muted mt-2">
          Collateral + covenants give banks priority and control → higher recovery → lower credit risk than bonds.
        </p>
      </div>

      {/* profile toggle */}
      <div className="inline-flex rounded-lg border border-line bg-surface-3/40 p-0.5 my-4 gap-0.5">
        {PROFILES.map((f) => (
          <button
            key={f.key}
            onClick={() => setKey(f.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors inline-flex items-center gap-1.5',
              key === f.key ? 'bg-brand-500/20 text-brand-200 border border-brand-500/50' : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {f.icon === 'big' ? <Building2 size={13} /> : <Landmark size={13} />}
            {f.name}
          </button>
        ))}
      </div>

      <motion.div
        key={p.key}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
      >
        <Row label="Size" value={p.size} />
        <Row label="Rating" value={p.rating} />
        <Row label="Main debt" value={p.mainDebt} />
        <Row label="Interest rate" value={p.rate} />
        <Row label="Security" value={p.secured} />
        <Row label="Control" value={p.control} />
      </motion.div>

      <div className="mt-3 rounded-lg border border-brand-500/40 bg-brand-500/5 p-3">
        <span className="text-[10px] uppercase tracking-widest text-brand-300">Why</span>
        <p className="text-[13px] text-ink-soft mt-0.5">{p.suits}</p>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        Pricemark pays ~8% to a bank while Walmart pays ~5% on bonds — not because bank debt is dearer, but because
        Pricemark is simply riskier. The real trade-off: bank debt cuts the rate but costs{' '}
        <span className="text-brand-300 font-medium">control</span> (collateral + covenants), so high-rated giants stick
        with arm&apos;s-length bonds.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="text-[13px] text-ink mt-0.5">{value}</div>
    </div>
  )
}
