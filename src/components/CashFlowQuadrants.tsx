import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'

/**
 * Cash-flow quadrants — classifies a firm by the SIGN of its 3 cash-flow sections.
 * Lesson 1-6: A startup looks like (−, −, +); a mature firm returning cash like (+, −, −).
 */
type Sign = '+' | '−' | '0'
type Profile = {
  cfo: Sign
  cfi: Sign
  cff: Sign
  title: string
  desc: string
  accent: string
  example: string
}

const PROFILES: Profile[] = [
  {
    cfo: '+', cfi: '−', cff: '−',
    title: 'Mature & profitable, returning cash',
    desc: 'Generates cash internally, invests in business, pays back debt or buys back stock.',
    accent: '#10b981',
    example: 'Apple, Microsoft (steady state)',
  },
  {
    cfo: '−', cfi: '−', cff: '+',
    title: 'Growth-stage startup',
    desc: 'Burns cash from operations, invests aggressively, funded by debt or equity issuance.',
    accent: '#6366f1',
    example: 'Early Uber, Amazon (1997–2003)',
  },
  {
    cfo: '+', cfi: '+', cff: '−',
    title: 'Mature, downsizing',
    desc: 'Cash from ops; sells assets/divisions; returns proceeds to investors.',
    accent: '#f59e0b',
    example: 'Conglomerate divesting non-core',
  },
  {
    cfo: '+', cfi: '−', cff: '+',
    title: 'Profitable but still investing',
    desc: 'Generates cash and ALSO raises external capital — heavy CapEx or M&A.',
    accent: '#06b6d4',
    example: 'DISH 2020–2021 (5G build-out)',
  },
  {
    cfo: '−', cfi: '+', cff: '−',
    title: 'Distressed',
    desc: 'Negative operating cash, liquidating assets, repaying debt — survival mode.',
    accent: '#ef4444',
    example: 'Pre-bankruptcy restructuring',
  },
  {
    cfo: '+', cfi: '−', cff: '0',
    title: 'Self-funded steady',
    desc: 'Operating cash covers all investing; no external financing needed.',
    accent: '#8b5cf6',
    example: 'Walmart, Procter & Gamble',
  },
]

function SignBadge({ value }: { value: Sign }) {
  const colors: Record<string, string> = {
    '+': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40',
    '−': 'text-red-400 bg-red-500/10 border-red-500/40',
    '0': 'text-ink-muted bg-surface-3 border-line',
  }
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-base font-bold border ${colors[value]}`}
    >
      {value}
    </span>
  )
}

export function CashFlowQuadrants() {
  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <Wallet className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-6</div>
          <h3 className="font-display text-lg font-semibold">What the SIGNS in the Cash Flow Statement tell you</h3>
        </div>
      </header>

      <div className="rounded-xl bg-surface-3/40 border border-line p-3 mb-4 text-xs text-ink-soft">
        <strong>Sign convention:</strong> + means cash <em>flows into</em> the firm,
        − means cash <em>flows out</em>. Reading the three sections (CFO · CFI · CFF) together reveals the firm's life-stage.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {PROFILES.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-line bg-surface-3/40 p-3 hover:border-brand-500/60 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <SignBadge value={p.cfo} />
              <span className="text-[10px] uppercase text-ink-muted">CFO</span>
              <SignBadge value={p.cfi} />
              <span className="text-[10px] uppercase text-ink-muted">CFI</span>
              <SignBadge value={p.cff} />
              <span className="text-[10px] uppercase text-ink-muted">CFF</span>
            </div>
            <div className="font-semibold text-sm" style={{ color: p.accent }}>{p.title}</div>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">{p.desc}</p>
            <div className="text-[10px] text-ink-muted mt-2 italic">e.g. {p.example}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
