import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  title: string
  icon?: ReactNode
  accent?: string
  children: ReactNode
  index?: number
}

export function ConceptCard({ title, icon, accent = '#6366f1', children, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card p-5 relative overflow-hidden"
    >
      <span
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-center gap-2 mb-2">
        {icon && (
          <span
            className="h-7 w-7 rounded-lg flex items-center justify-center text-white shadow-soft"
            style={{ background: accent }}
          >
            {icon}
          </span>
        )}
        <h4 className="font-display font-semibold">{title}</h4>
      </div>
      <div className="text-sm text-ink-soft leading-relaxed space-y-2">{children}</div>
    </motion.div>
  )
}
