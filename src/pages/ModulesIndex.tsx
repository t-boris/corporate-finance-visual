import { MODULES } from '@/data/modules'
import { ModuleCard } from '@/components/ModuleCard'
import { useProgress } from '@/store/progress'

export function ModulesIndex() {
  const progress = useProgress((s) => s.byModule)
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">All modules</h1>
        <p className="text-ink-muted">
          Course outline · Corporate Finance · FIN 570 · UIUC iMBA. Modules are filled in as the course progresses.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((m, i) => (
          <ModuleCard key={m.id} module={m} progress={progress[m.id]} index={i} />
        ))}
      </div>
    </div>
  )
}
