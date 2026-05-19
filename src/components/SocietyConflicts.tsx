import { motion } from 'framer-motion'
import { Scale, ArrowLeftRight, Factory, Users2, Globe2, Coins } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Visual map of conflicts between shareholder-value maximization and society.
 * Each conflict displays a "shareholders win" vs "society loses" tension.
 */
type Conflict = {
  title: string
  icon: ReactNode
  forShareholders: string
  forSociety: string
  example: string
  accent: string
}

const CONFLICTS: Conflict[] = [
  {
    title: 'Harmful products',
    icon: <Factory size={14} />,
    forShareholders: 'Profits from products consumers value (tobacco, junk food)',
    forSociety: 'Health costs, public health burden',
    example: 'Tobacco industry',
    accent: '#ef4444',
  },
  {
    title: 'Pollution',
    icon: <Globe2 size={14} />,
    forShareholders: 'Cheap "dirty" production methods raise profits',
    forSociety: 'Environmental damage, climate impact',
    example: 'Heavy industry without scrubbers',
    accent: '#f59e0b',
  },
  {
    title: 'Outsourcing labor',
    icon: <Users2 size={14} />,
    forShareholders: 'Lower wages → higher margins',
    forSociety: 'Domestic job losses, community impact',
    example: 'Manufacturing offshoring',
    accent: '#06b6d4',
  },
  {
    title: 'Tax avoidance',
    icon: <Coins size={14} />,
    forShareholders: 'Pre-2017 Apple held $252B abroad to avoid 25-pt repatriation tax differential',
    forSociety: 'Reduced government revenue for infrastructure & public services',
    example: 'Apple · Ireland tax structure',
    accent: '#8b5cf6',
  },
]

export function SocietyConflicts() {
  return (
    <div className="card p-5">
      <header className="mb-3 flex items-center gap-2">
        <Scale className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visualization · Lesson 1-2</div>
          <h3 className="font-display text-lg font-semibold">Shareholder value vs. society — four conflicts</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {CONFLICTS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-line bg-surface-3/40 p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-md text-white"
                style={{ background: c.accent }}
              >
                {c.icon}
              </span>
              <span className="font-semibold">{c.title}</span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-xs">
              <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-2">
                <div className="text-[10px] uppercase tracking-widest text-emerald-400 mb-0.5">Shareholders ↑</div>
                <div className="text-ink-soft leading-snug">{c.forShareholders}</div>
              </div>
              <ArrowLeftRight size={16} className="text-ink-muted" />
              <div className="rounded-lg border border-red-500/40 bg-red-500/5 p-2">
                <div className="text-[10px] uppercase tracking-widest text-red-400 mb-0.5">Society ↓</div>
                <div className="text-ink-soft leading-snug">{c.forSociety}</div>
              </div>
            </div>
            <div className="text-[10px] text-ink-muted mt-2 italic">e.g. {c.example}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-3 mt-4 text-xs leading-relaxed">
        <strong>Government intervention.</strong> When private incentives diverge from social welfare, the government may
        regulate (pollution standards, antitrust, tax law). The <span className="font-mono">Tax Cuts and Jobs Act 2017</span>{' '}
        cut the federal corporate rate from 35% to 21% and introduced a flat 15.5% / 8% repatriation tax — triggering
        repatriation of ~$600B in foreign cash.
      </div>
    </div>
  )
}
