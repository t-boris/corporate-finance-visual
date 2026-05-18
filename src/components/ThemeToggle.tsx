import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/theme'

export function ThemeToggle() {
  const { theme, toggle } = useThemeStore()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      className="relative h-10 w-10 rounded-xl border border-line bg-surface-2/80 backdrop-blur
                 hover:border-brand-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 45 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Moon size={18} className="text-brand-300" /> : <Sun size={18} className="text-warn" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
