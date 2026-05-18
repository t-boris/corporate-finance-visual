import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, BookOpen, ListChecks, Library, Trophy, Zap } from 'lucide-react'
import { MODULES } from '@/data/modules'
import { GLOSSARY } from '@/data/glossary'
import { QUESTIONS } from '@/data/questions'
import { ModuleCard } from '@/components/ModuleCard'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useProgress } from '@/store/progress'
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip,
} from 'recharts'

export function Dashboard() {
  const progress = useProgress((s) => s.byModule)
  const attempts = useProgress((s) => s.attempts)
  const totalVisited = Object.keys(progress).length
  const totalTerms = GLOSSARY.length
  const totalQuestions = QUESTIONS.length
  const avgScore =
    attempts.length === 0 ? 0
      : attempts.reduce((acc, a) => {
          const ids = a.questionIds
          let ok = 0
          for (const qid of ids) {
            const q = QUESTIONS.find((x) => x.id === qid)
            if (q && a.answers[qid] === q.answerIndex) ok++
          }
          return acc + (ids.length ? ok / ids.length : 0)
        }, 0) / attempts.length

  const radarData = MODULES.map((m) => ({
    module: `M${m.id}`,
    score: Math.round(((progress[m.id]?.bestQuizScore ?? 0) * 100)),
  }))

  return (
    <div className="space-y-10">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden rounded-3xl border border-line p-8 md:p-12 card">
        <div className="hero-grid absolute inset-0 opacity-60" aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl"
        >
          <span className="pill-brand mb-4"><Sparkles size={12} /> UIUC iMBA · Summer 2026</span>
          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight">
            Learn <span className="gradient-text">Corporate Finance</span><br />the visual way.
          </h1>
          <p className="text-ink-soft mt-4 text-base md:text-lg max-w-2xl">
            All 8 modules of FIN 570, with interactive financial explorers, a searchable glossary,
            and configurable quizzes that explain every answer. Built for visual learners — charts,
            animations, and models you can play with.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/modules" className="btn-primary">
              <BookOpen size={16} /> Explore modules <ArrowRight size={16} />
            </Link>
            <Link to="/quiz" className="btn-outline">
              <ListChecks size={16} /> Take a quiz
            </Link>
            <Link to="/glossary" className="btn-ghost">
              <Library size={16} /> Glossary
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ───── Stats grid ───── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen size={18} />} label="Modules" value={MODULES.length} accent="#6366f1" />
        <StatCard icon={<Library size={18} />} label="Glossary terms" value={totalTerms} accent="#06b6d4" />
        <StatCard icon={<ListChecks size={18} />} label="Quiz bank" value={totalQuestions} accent="#10b981" />
        <StatCard
          icon={<Trophy size={18} />}
          label="Avg quiz score"
          value={Math.round(avgScore * 100)}
          suffix="%"
          accent="#f59e0b"
        />
      </section>

      {/* ───── Module grid ───── */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl font-semibold">Course modules</h2>
            <p className="text-ink-muted text-sm">Click a module to dive into the material.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-ink-muted">
            <Zap size={14} className="text-brand-400" />
            {totalVisited} of {MODULES.length} opened
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m, i) => (
            <ModuleCard key={m.id} module={m} progress={progress[m.id]} index={i} />
          ))}
        </div>
      </section>

      {/* ───── Radar — progress silhouette ───── */}
      <section className="card p-6">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h3 className="font-display text-xl font-semibold">Mastery silhouette</h3>
            <p className="text-ink-muted text-sm">Best quiz score by module.</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer>
            <RadarChart data={radarData} outerRadius="80%">
              <PolarGrid stroke="rgb(var(--line))" />
              <PolarAngleAxis dataKey="module" stroke="rgb(var(--ink-muted))" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                stroke="rgb(var(--ink-muted))"
                tick={{ fontSize: 10 }}
              />
              <Radar
                dataKey="score"
                stroke="rgb(var(--brand-500))"
                fill="rgb(var(--brand-500))"
                fillOpacity={0.35}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgb(var(--surface-2))',
                  border: '1px solid rgb(var(--line))',
                  borderRadius: 12,
                  color: 'rgb(var(--ink))',
                }}
                formatter={(v: any) => [`${v}%`, 'Score']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  suffix = '',
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: number
  suffix?: string
  accent: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 relative overflow-hidden"
    >
      <div
        className="absolute inset-x-0 -top-px h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-center gap-2 text-ink-muted text-xs uppercase tracking-wider">
        <span className="h-7 w-7 rounded-lg bg-surface-3 flex items-center justify-center" style={{ color: accent }}>
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-semibold">
        <AnimatedNumber value={value} />{suffix}
      </div>
    </motion.div>
  )
}
