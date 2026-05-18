import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme'

/** Привязывает выбранную тему к DOM (<html class="dark|light">) и meta theme-color. */
export function useApplyTheme() {
  const theme = useThemeStore((s) => s.theme)
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1020' : '#f8fafc')
  }, [theme])
}
