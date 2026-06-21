import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import { ArrowLeft, Clock, ListChecks, Library } from 'lucide-react'
import { moduleBySlug } from '@/data/modules'
import { Module1Content, ModulePlaceholder } from '@/modules/Module1'
import { Module2Content } from '@/modules/Module2'
import { Module3Content } from '@/modules/Module3'
import { Module4Content } from '@/modules/Module4'
import { Module5Content } from '@/modules/Module5'
import { useProgress } from '@/store/progress'

export function ModulePage() {
  const { slug = '' } = useParams()
  const mod = moduleBySlug(slug)
  const markVisited = useProgress((s) => s.markVisited)

  useEffect(() => {
    if (mod) markVisited(mod.id)
  }, [mod, markVisited])

  if (!mod) {
    return (
      <div className="card p-8 text-center">
        <h3 className="font-display text-xl font-semibold">Module not found</h3>
        <Link to="/modules" className="btn-outline mt-4 inline-flex"><ArrowLeft size={14} /> Back to modules</Link>
      </div>
    )
  }

  const Icon = (LucideIcons as any)[mod.icon] ?? LucideIcons.BookOpen

  return (
    <div className="space-y-6">
      {/* ───── Hero header ───── */}
      <section
        className="relative card overflow-hidden p-6 md:p-8"
        style={{
          background:
            `linear-gradient(135deg, rgb(var(--surface-2)) 60%, ${mod.accent}22 100%)`,
        }}
      >
        <div className="hero-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Link to="/modules" className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink mb-3">
              <ArrowLeft size={12} /> All modules
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-glow"
                style={{ background: `linear-gradient(135deg, ${mod.accent}, ${mod.accent}cc)` }}
              >
                <Icon size={22} />
              </span>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">Module {mod.id}</div>
                <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight">{mod.title}</h1>
              </div>
            </div>
            <p className="text-ink-soft max-w-2xl">{mod.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mod.topics.map((t) => (
                <span key={t} className="pill bg-surface-3 border border-line text-ink-soft">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[180px]">
            <div className="rounded-xl border border-line bg-surface-2/60 backdrop-blur px-3 py-2 flex items-center gap-2 text-sm">
              <Clock size={14} className="text-ink-muted" />
              <span>{mod.estimatedMinutes} min · self-study</span>
            </div>
            <Link to={`/quiz?module=${mod.id}`} className="btn-primary">
              <ListChecks size={14} /> Quiz me
            </Link>
            <Link to={`/glossary?module=${mod.id}`} className="btn-outline">
              <Library size={14} /> Module glossary
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Body ───── */}
      {mod.id === 1 ? (
        <Module1Content />
      ) : mod.id === 2 ? (
        <Module2Content />
      ) : mod.id === 3 ? (
        <Module3Content />
      ) : mod.id === 4 ? (
        <Module4Content />
      ) : mod.id === 5 ? (
        <Module5Content />
      ) : (
        <ModulePlaceholder moduleId={mod.id} />
      )}
    </div>
  )
}
