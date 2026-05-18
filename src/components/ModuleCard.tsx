import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { ModuleMeta, ProgressEntry } from '@/lib/types'
import { ProgressRing } from './ProgressRing'

interface Props {
  module: ModuleMeta
  progress?: ProgressEntry
  index?: number
}

export function ModuleCard({ module: m, progress, index = 0 }: Props) {
  const Icon = (LucideIcons as any)[m.icon] ?? LucideIcons.BookOpen
  const score = progress?.bestQuizScore ?? 0
  const visited = !!progress?.visitedAt

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      <Link
        to={`/modules/${m.slug}`}
        className="card card-hover block p-5 overflow-hidden relative"
      >
        {/* Декоративный градиент-блик в углу — раскрашен accent-ом модуля */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-30 blur-2xl
                     transition-opacity duration-300 group-hover:opacity-60"
          style={{ background: m.accent }}
        />

        <div className="flex items-start justify-between gap-3 relative">
          <div className="flex items-center gap-3">
            <span
              className="h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-soft"
              style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}cc)` }}
            >
              <Icon size={20} />
            </span>
            <div>
              <div className="text-[11px] font-mono text-ink-muted tracking-wider">MODULE {m.id}</div>
              <h3 className="font-display font-semibold text-base leading-tight">{m.shortTitle}</h3>
            </div>
          </div>
          <ProgressRing value={score} size={44} stroke={5} color={m.accent}>
            {visited ? `${Math.round(score * 100)}%` : ''}
          </ProgressRing>
        </div>

        <p className="text-sm text-ink-soft mt-3 leading-relaxed line-clamp-2">{m.tagline}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {m.estimatedMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 text-brand-500 font-medium">
            {m.status === 'ready' ? 'Explore' : 'Preview'}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        {m.status !== 'ready' && (
          <div className="absolute top-3 right-3">
            <span className="pill bg-surface-3 text-ink-muted border border-line">Coming soon</span>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
