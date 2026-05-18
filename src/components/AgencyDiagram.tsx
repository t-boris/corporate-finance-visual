import { motion } from 'framer-motion'

/** Простая SVG-схема principal-agent с лёгкой анимацией. Помогает запомнить структуру. */
export function AgencyDiagram() {
  return (
    <div className="card p-5">
      <header className="mb-3">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted">Visual</div>
        <h3 className="font-display text-lg font-semibold">Principal–Agent relationship</h3>
      </header>
      <svg viewBox="0 0 600 220" className="w-full h-auto">
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgb(var(--brand-500))" />
            <stop offset="100%" stopColor="rgb(var(--accent))" />
          </linearGradient>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(var(--brand-400))" />
          </marker>
        </defs>

        {/* Shareholders */}
        <g>
          <rect x="20" y="80" rx="14" width="160" height="60" fill="rgb(var(--surface-3))" stroke="rgb(var(--line))" />
          <text x="100" y="105" textAnchor="middle" className="fill-current" style={{ fill: 'rgb(var(--ink))' }} fontWeight={600}>
            Shareholders
          </text>
          <text x="100" y="124" textAnchor="middle" style={{ fill: 'rgb(var(--ink-muted))' }} fontSize={11}>
            Principals · собственники
          </text>
        </g>

        {/* Board */}
        <g>
          <rect x="220" y="20" rx="14" width="160" height="50" fill="rgb(var(--surface-3))" stroke="rgb(var(--line))" />
          <text x="300" y="42" textAnchor="middle" fontWeight={600} style={{ fill: 'rgb(var(--ink))' }}>Board of Directors</text>
          <text x="300" y="58" textAnchor="middle" fontSize={11} style={{ fill: 'rgb(var(--ink-muted))' }}>избирается акционерами</text>
        </g>

        {/* Managers */}
        <g>
          <rect x="220" y="150" rx="14" width="160" height="50" fill="rgb(var(--surface-3))" stroke="rgb(var(--line))" />
          <text x="300" y="172" textAnchor="middle" fontWeight={600} style={{ fill: 'rgb(var(--ink))' }}>Managers (CEO/CFO)</text>
          <text x="300" y="188" textAnchor="middle" fontSize={11} style={{ fill: 'rgb(var(--ink-muted))' }}>Agents · принимают решения</text>
        </g>

        {/* Firm */}
        <g>
          <rect x="420" y="80" rx="14" width="160" height="60" fill="url(#ag)" />
          <text x="500" y="105" textAnchor="middle" fontWeight={700} fill="white">Corporation</text>
          <text x="500" y="124" textAnchor="middle" fontSize={11} fill="white" opacity={0.85}>actions → cash flows</text>
        </g>

        {/* Arrows */}
        <motion.path
          d="M180 100 C 200 60, 220 50, 220 45"
          stroke="rgb(var(--brand-400))" strokeWidth={2} fill="none" markerEnd="url(#arr)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
        />
        <motion.path
          d="M380 45 C 400 50, 420 60, 420 100"
          stroke="rgb(var(--brand-400))" strokeWidth={2} fill="none" markerEnd="url(#arr)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.path
          d="M180 130 C 200 165, 220 175, 220 175"
          stroke="rgb(var(--brand-400))" strokeWidth={2} fill="none" markerEnd="url(#arr)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.path
          d="M380 175 C 400 175, 420 165, 420 130"
          stroke="rgb(var(--brand-400))" strokeWidth={2} fill="none" markerEnd="url(#arr)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Labels on arrows */}
        <text x="200" y="65" fontSize={10} style={{ fill: 'rgb(var(--ink-muted))' }}>elect</text>
        <text x="395" y="65" fontSize={10} style={{ fill: 'rgb(var(--ink-muted))' }}>oversee</text>
        <text x="200" y="160" fontSize={10} style={{ fill: 'rgb(var(--ink-muted))' }}>hire</text>
        <text x="385" y="160" fontSize={10} style={{ fill: 'rgb(var(--ink-muted))' }}>run</text>
      </svg>
      <p className="text-xs text-ink-muted mt-2">
        Agency problem появляется, когда стимулы Agents (managers) расходятся со стимулами Principals (shareholders).
        Governance — это арсенал инструментов, который выравнивает эти стимулы.
      </p>
    </div>
  )
}
