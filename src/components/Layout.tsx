import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, LayoutDashboard, ListChecks, Library, GraduationCap, Github, ChevronRight,
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { MODULES } from '@/data/modules'

const navLinks = [
  { to: '/',          label: 'Dashboard', icon: LayoutDashboard },
  { to: '/modules',   label: 'Modules',   icon: BookOpen },
  { to: '/glossary',  label: 'Glossary',  icon: Library },
  { to: '/quiz',      label: 'Quiz',      icon: ListChecks },
]

export function Layout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      {/* ───── Topbar ───── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-surface/80 border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 group">
            <span className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent
                             shadow-glow flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </span>
            <div className="leading-tight">
              <div className="font-display font-bold text-base tracking-tight">
                <span className="gradient-text">Corporate Finance</span>
              </div>
              <div className="text-[11px] text-ink-muted font-medium uppercase tracking-widest">
                Visual Learner · FIN 570
              </div>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
                   ${isActive ? 'text-brand-500' : 'text-ink-soft hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} />
                    <span>{label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 -bottom-[1px] h-[2px] bg-gradient-to-r from-brand-500 to-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn-ghost h-10 w-10 p-0 justify-center"
              aria-label="GitHub"
              title="GitHub repository"
            >
              <Github size={18} />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile nav strip */}
        <div className="md:hidden border-t border-line">
          <div className="mx-auto max-w-7xl px-2 flex items-center justify-between">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex-1 py-2 flex flex-col items-center gap-0.5 text-[11px] font-medium
                   ${isActive ? 'text-brand-500' : 'text-ink-muted'}`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* ───── Sidebar + content ───── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full flex-1 flex gap-6 py-6">
        {/* Sidebar shown only on large screens to keep dashboard wide on smaller widths */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-20">
            <div className="text-xs uppercase tracking-widest text-ink-muted px-2 mb-2">Course modules</div>
            <ul className="space-y-1">
              {MODULES.map((m) => (
                <li key={m.id}>
                  <NavLink
                    to={`/modules/${m.slug}`}
                    className={({ isActive }) =>
                      `group flex items-start gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors
                       ${isActive ? 'bg-surface-3 text-ink' : 'text-ink-soft hover:text-ink hover:bg-surface-3/60'}`
                    }
                  >
                    <span
                      className="mt-1 h-2 w-2 rounded-full shrink-0"
                      style={{ background: m.accent }}
                    />
                    <span className="flex-1">
                      <span className="block text-[11px] font-mono text-ink-muted">M{m.id}</span>
                      <span className="block leading-snug">{m.shortTitle}</span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 mt-1 text-ink-muted transition-opacity"
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer className="border-t border-line py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
          <div>UIUC iMBA · FIN 570 · Corporate Finance</div>
          <div>Built for visual learners · animations · interactive explorers</div>
        </div>
      </footer>
    </div>
  )
}
