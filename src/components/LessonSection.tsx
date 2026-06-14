import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * One lesson rendered as:
 *
 *   ┌─ summary card (ALWAYS visible) ───────────────────────────────┐
 *   │  eyebrow                                                       │
 *   │  Title                                                         │
 *   │  TL;DR sentence(s)                                             │
 *   │  • key point 1                                                 │
 *   │  • key point 2                                                 │
 *   │  [ formula chips, if any ]                                     │
 *   │  [▾ Show full lesson text]   ← toggle (if body provided)       │
 *   └────────────────────────────────────────────────────────────────┘
 *   [ visualizations — ALWAYS visible ]
 *   [ collapsible full prose body, default closed ]
 */
export type LessonSummary = {
  eyebrow: string
  title: string
  tldr: ReactNode
  keyPoints?: ReactNode[]
  formulas?: { label: string; expr: string }[]
}

export function LessonSection({
  id,
  summary,
  visuals,
  children,
  defaultExpanded = false,
  toggleLabel,
}: {
  id: string
  summary: LessonSummary
  visuals?: ReactNode
  children?: ReactNode
  defaultExpanded?: boolean
  toggleLabel?: { open: string; close: string }
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const labels = toggleLabel ?? { open: 'Show full lesson text', close: 'Hide full lesson text' }

  return (
    <section id={`lesson-${id}`} className="scroll-mt-32 space-y-4">
      {/* Summary card — always visible */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.3 }}
        className="card p-5"
      >
        <div className="text-[11px] uppercase tracking-widest text-brand-300 mb-1">
          {summary.eyebrow}
        </div>
        <h2 className="font-display text-xl font-semibold leading-tight mb-2">{summary.title}</h2>
        <div className="text-sm text-ink-soft leading-relaxed">{summary.tldr}</div>

        {summary.keyPoints && summary.keyPoints.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {summary.keyPoints.map((kp, i) => (
              <li key={i} className="text-sm text-ink-soft flex gap-2 leading-snug">
                <span className="text-brand-400 mt-1 shrink-0">•</span>
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        )}

        {summary.formulas && summary.formulas.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {summary.formulas.map((f) => (
              <div key={f.label} className="rounded-lg border border-line bg-surface-3/50 px-2.5 py-1.5">
                <div className="text-[10px] uppercase tracking-widest text-ink-muted">{f.label}</div>
                <div className="font-mono text-xs text-ink mt-0.5 break-words">{f.expr}</div>
              </div>
            ))}
          </div>
        )}

        {children && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-brand-300 transition-colors group"
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              <ChevronDown size={14} />
            </motion.span>
            {expanded ? labels.close : labels.open}
          </button>
        )}
      </motion.div>

      {/* Visualizations — always visible */}
      {visuals && <div className="space-y-4">{visuals}</div>}

      {/* Full prose — collapsible */}
      <AnimatePresence initial={false}>
        {expanded && children && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
