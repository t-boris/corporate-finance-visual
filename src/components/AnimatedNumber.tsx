import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
  durationMs?: number
  format?: (v: number) => string
  className?: string
}

/** Tween-анимация числа requestAnimationFrame'ом — без зависимостей. */
export function AnimatedNumber({ value, durationMs = 800, format = (v) => v.toFixed(0), className }: Props) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    fromRef.current = display
    startRef.current = null
    let raf = 0
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t
      const p = Math.min(1, (t - startRef.current) / durationMs)
      // easeOutCubic
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(fromRef.current + (value - fromRef.current) * e)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs])

  return <span className={className}>{format(display)}</span>
}
