import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookMarked } from 'lucide-react'
import { GLOSSARY } from '@/data/glossary'
import { MODULES, moduleById } from '@/data/modules'

export function GlossaryPage() {
  const [params, setParams] = useSearchParams()
  const initialModule = Number(params.get('module') || '0')
  const [query, setQuery] = useState('')
  const [selectedModule, setSelectedModule] = useState<number>(initialModule || 0)

  // Sync url ↔ state when the module filter changes.
  useEffect(() => {
    if (selectedModule) params.set('module', String(selectedModule))
    else params.delete('module')
    setParams(params, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModule])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter((g) => {
      if (selectedModule && g.moduleId !== selectedModule) return false
      if (!q) return true
      return (
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q) ||
        g.related?.some((r) => r.toLowerCase().includes(q)) ||
        g.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [query, selectedModule])

  const countsByModule = useMemo(() => {
    const map = new Map<number, number>()
    for (const g of GLOSSARY) map.set(g.moduleId, (map.get(g.moduleId) ?? 0) + 1)
    return map
  }, [])

  return (
    <div className="space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Glossary</h1>
          <p className="text-ink-muted">
            Every term in the course in one place. Search by name, definition, or related concept.
          </p>
        </div>
        <div className="text-sm text-ink-muted">
          {filtered.length} / {GLOSSARY.length} term{GLOSSARY.length === 1 ? '' : 's'}
        </div>
      </header>

      {/* ───── Search bar ───── */}
      <div className="card p-3 flex items-center gap-2">
        <Search size={16} className="text-ink-muted ml-1" />
        <input
          autoFocus
          type="search"
          placeholder="Search terms, definitions, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="btn-ghost h-8 w-8 p-0 justify-center" aria-label="clear">
            <X size={14} />
          </button>
        )}
      </div>

      {/* ───── Module filter pills ───── */}
      <div className="flex flex-wrap gap-2">
        <FilterPill
          active={selectedModule === 0}
          onClick={() => setSelectedModule(0)}
          color="#6366f1"
          label={`All · ${GLOSSARY.length}`}
        />
        {MODULES.map((m) => {
          const count = countsByModule.get(m.id) ?? 0
          if (count === 0) return null
          return (
            <FilterPill
              key={m.id}
              active={selectedModule === m.id}
              onClick={() => setSelectedModule(m.id)}
              color={m.accent}
              label={`M${m.id} · ${count}`}
              title={m.shortTitle}
            />
          )
        })}
      </div>

      {/* ───── Cards ───── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((g, i) => {
            const mod = moduleById(g.moduleId)
            return (
              <motion.div
                key={g.term}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: Math.min(i, 12) * 0.02 }}
                className="card p-4 hover:shadow-glow transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BookMarked size={14} className="text-brand-400" />
                    <h3 className="font-display font-semibold">{g.term}</h3>
                  </div>
                  {mod && (
                    <span
                      className="pill"
                      style={{ background: `${mod.accent}1f`, color: mod.accent, border: `1px solid ${mod.accent}55` }}
                    >
                      M{mod.id}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">{g.definition}</p>
                {g.formula && (
                  <div className="mt-2 font-mono text-xs bg-surface-3 border border-line rounded-lg px-2 py-1.5 inline-block">
                    {g.formula}
                  </div>
                )}
                {g.related && g.related.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {g.related.map((r) => (
                      <span key={r} className="pill bg-surface-3 border border-line text-ink-muted text-[10px]">
                        ↪ {r}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <div className="text-3xl mb-2">🔎</div>
          <h3 className="font-display font-semibold">No matches</h3>
          <p className="text-ink-muted text-sm">Try a different query or clear the module filter.</p>
        </div>
      )}
    </div>
  )
}

function FilterPill({
  active, onClick, color, label, title,
}: {
  active: boolean
  onClick: () => void
  color: string
  label: string
  title?: string
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
      style={
        active
          ? { background: color, color: 'white', borderColor: color }
          : { background: 'rgb(var(--surface-3))', borderColor: 'rgb(var(--line))', color: 'rgb(var(--ink-soft))' }
      }
    >
      {label}
    </button>
  )
}
