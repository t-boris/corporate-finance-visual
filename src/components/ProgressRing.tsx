interface Props {
  /** 0..1 */
  value: number
  size?: number
  stroke?: number
  /** colour for filled arc */
  color?: string
  /** colour for track */
  trackColor?: string
  children?: React.ReactNode
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  color = 'rgb(var(--brand-500))',
  trackColor = 'rgb(var(--line))',
  children,
}: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(1, value))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold">
        {children}
      </div>
    </div>
  )
}
