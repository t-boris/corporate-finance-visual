import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Lesson text block — renders the actual lecture content (paragraphs, definitions,
 * formulas, callouts) in a consistent reading-friendly card. This is the primary
 * way module content is presented; visualizations are interleaved as illustrations.
 */
export function LessonBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title?: string
  children: ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="card p-6"
    >
      {(eyebrow || title) && (
        <header className="mb-4">
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-widest text-brand-300">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="font-display text-2xl font-semibold leading-tight">{title}</h2>
          )}
        </header>
      )}
      <div className="prose-content text-[15px] text-ink-soft leading-[1.7] space-y-3">
        {children}
      </div>
    </motion.section>
  )
}

/** A formal definition box — visually distinct from running prose. */
export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-brand-500/40 bg-brand-500/5 p-3 my-2">
      <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">
        Definition (EN)
      </div>
      <div className="text-ink">
        <span className="font-semibold">{term}</span> — <span className="text-ink-soft">{children}</span>
      </div>
    </div>
  )
}

/** Highlighted formula block. */
export function Formula({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="rounded-lg bg-surface-3 border border-line p-3 my-2 text-center">
      <div className="font-mono text-base text-ink">{children}</div>
      {caption && <div className="text-[11px] text-ink-muted mt-1">{caption}</div>}
    </div>
  )
}

/** Subtle callout for important takeaways or key insights. */
export function KeyTakeaway({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-l-emerald-500 bg-emerald-500/5 p-3 my-2">
      <div className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">
        Key takeaway
      </div>
      <div className="text-ink-soft">{children}</div>
    </div>
  )
}

/** Warning / pitfall callout. */
export function Pitfall({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-500/5 p-3 my-2">
      <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">
        ⚠ Watch out
      </div>
      <div className="text-ink-soft">{children}</div>
    </div>
  )
}

/** Case study callout. */
export function CaseStudy({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface-3/40 p-4 my-3">
      <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">
        Case study
      </div>
      <div className="font-semibold mb-2">{title}</div>
      <div className="text-ink-soft text-[14px] leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

/** Simple two-column comparison table. */
export function CompareTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-surface-3 border-b border-line">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line/50 hover:bg-surface-3/40">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-ink-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
