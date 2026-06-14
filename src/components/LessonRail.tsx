import { useEffect, useState } from 'react'

/**
 * Sticky horizontal navigator that anchors below the main page header.
 *
 * - Buttons scroll to `#lesson-<id>` (LessonSection assigns these ids).
 * - An IntersectionObserver biased toward the top third of the viewport
 *   highlights whichever section the user is currently reading.
 * - Horizontal scroll allows the rail to fit on narrow screens.
 */
export function LessonRail({
  lessons,
}: {
  lessons: { id: string; label: string }[]
}) {
  const [active, setActive] = useState(lessons[0]?.id ?? '')

  useEffect(() => {
    if (typeof window === 'undefined' || lessons.length === 0) return
    const observers: IntersectionObserver[] = []
    const opts: IntersectionObserverInit = {
      // Trigger when the section enters the upper third of the viewport.
      rootMargin: '-25% 0px -60% 0px',
      threshold: 0,
    }

    lessons.forEach(({ id }) => {
      const el = document.getElementById(`lesson-${id}`)
      if (!el) return
      const obs = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(id)
            break
          }
        }
      }, opts)
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [lessons])

  const handleClick = (id: string) => {
    const el = document.getElementById(`lesson-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (lessons.length === 0) return null

  return (
    <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 mb-2">
      <div className="backdrop-blur-xl bg-surface/80 border-b border-line px-4 sm:px-6 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {lessons.map(({ id, label }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={[
                  'px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide whitespace-nowrap',
                  'border transition-colors shrink-0',
                  isActive
                    ? 'bg-brand-500/15 border-brand-500/60 text-brand-200'
                    : 'bg-surface-3/40 border-line text-ink-soft hover:text-ink hover:border-brand-500/40',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
