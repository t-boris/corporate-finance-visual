import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { npv as npvOf, fmtUSD } from '@/lib/finance'

/**
 * The three ways IRR misleads — Lesson 3-6.
 *
 *  1. Sign flip      +$20M then −$22M → Excel says "10%", but it is a bad deal.
 *  2. Multiple IRR   −4, +25, −25 → the quadratic has TWO roots (25% and 400%).
 *  3. Scale          1¢→2¢ vs $100→$200 — both 100% IRR, wildly different NPV.
 *
 * Rule: never use IRR when a negative cash flow follows a positive one, and never
 * compare projects of different sizes by IRR. NPV (in dollars) is always safe.
 */

type Tab = 'sign' | 'multiple' | 'scale'

export function IRRPitfalls() {
  const [tab, setTab] = useState<Tab>('sign')

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <AlertTriangle className="text-amber-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Interactive · Lesson 3-6
          </div>
          <h3 className="font-display text-lg font-semibold">Three ways the IRR can fool you</h3>
        </div>
      </header>

      {/* tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {([
          ['sign', '1 · Sign flip'],
          ['multiple', '2 · Multiple IRR'],
          ['scale', '3 · Scale'],
        ] as [Tab, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              tab === id
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                : 'bg-surface-3/40 border-line text-ink-soft hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'sign' && <SignFlip />}
          {tab === 'multiple' && <MultipleIRR />}
          {tab === 'scale' && <Scale />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Flow({ items }: { items: { t: string; v: number }[] }) {
  const max = Math.max(...items.map((i) => Math.abs(i.v)))
  return (
    <div className="flex items-end gap-2 h-24 my-3">
      {items.map((it) => (
        <div key={it.t} className="flex-1 flex flex-col items-center justify-end h-full">
          <span className={`text-[10px] font-mono mb-1 ${it.v >= 0 ? 'text-emerald-300' : 'text-danger'}`}>
            {it.v >= 0 ? '+' : '−'}{Math.abs(it.v) < 1 ? `${Math.abs(it.v)}` : `$${Math.abs(it.v)}`}
          </span>
          <div className="flex-1 flex items-end w-full justify-center">
            <div
              className={`w-full max-w-[42px] rounded-t ${it.v >= 0 ? 'bg-emerald-500' : 'bg-danger'}`}
              style={{ height: `${(Math.abs(it.v) / max) * 100}%`, minHeight: 4 }}
            />
          </div>
          <span className="text-[9px] text-ink-muted mt-1">{it.t}</span>
        </div>
      ))}
    </div>
  )
}

function Warn({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-500/5 p-3 text-sm text-ink-soft">
      {children}
    </div>
  )
}

function SignFlip() {
  return (
    <div>
      <Flow items={[{ t: 'today', v: 20 }, { t: 'year 1', v: -22 }]} />
      <div className="text-center mb-3">
        <span className="pill bg-surface-3 border border-line text-ink-soft">Excel IRR = <span className="font-mono text-amber-300">10%</span></span>
      </div>
      <Warn>
        You receive <span className="font-mono">+$20M</span> today and pay <span className="font-mono">−$22M</span>{' '}
        next year — a positive flow <strong>before</strong> a negative one. Excel reports a tidy{' '}
        <span className="font-mono">10%</span>, but this is really <em>borrowing</em> at 10%: a bad
        deal, not a 10% return. <strong>Negative-after-positive → do not use IRR.</strong>
      </Warn>
    </div>
  )
}

function MultipleIRR() {
  return (
    <div>
      <Flow items={[{ t: 'today', v: -4 }, { t: 'year 1', v: 25 }, { t: 'year 2', v: -25 }]} />
      <div className="flex justify-center gap-2 mb-3">
        <span className="pill bg-surface-3 border border-line text-ink-soft">IRR = <span className="font-mono text-amber-300">25%</span></span>
        <span className="pill bg-surface-3 border border-line text-ink-soft">IRR = <span className="font-mono text-amber-300">400%</span></span>
      </div>
      <Warn>
        With the sign changing twice, the equation <span className="font-mono">−4 + 25/(1+r) − 25/(1+r)² = 0</span>{' '}
        has <strong>two roots</strong>: 25% and 400%. Which is &ldquo;the&rdquo; return? Neither is
        meaningful. A single IRR simply doesn&apos;t exist here — use NPV.
      </Warn>
    </div>
  )
}

function Scale() {
  const r = 0.1
  const npvA = npvOf([-0.01, 0.02], r) // $M
  const npvB = npvOf([-100, 200], r) // $M
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 my-3">
        <ScaleCard name="Project A" flow="1¢ → 2¢" irr="100%" npv={fmtUSD(npvA * 1e6, 0)} />
        <ScaleCard name="Project B" flow="$100 → $200" irr="100%" npv={fmtUSD(npvB * 1e6, 0)} big />
      </div>
      <Warn>
        Both projects double your money, so both have a <span className="font-mono">100%</span> IRR and
        the benchmark is 10% — take both. But which is <em>better</em>? Only NPV (in dollars) shows
        Project B creates <span className="font-mono">{fmtUSD(npvB * 1e6, 0)}</span> versus a mere{' '}
        <span className="font-mono">{fmtUSD(npvA * 1e6, 0)}</span>. <strong>IRR ignores scale.</strong>
      </Warn>
    </div>
  )
}

function ScaleCard({ name, flow, irr, npv, big }: { name: string; flow: string; irr: string; npv: string; big?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${big ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-line bg-surface-3/40'}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{name}</div>
      <div className="font-mono text-sm text-ink mt-1">{flow}</div>
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-ink-muted">IRR <span className="font-mono text-ink">{irr}</span></span>
        <span className="text-ink-muted">NPV <span className={`font-mono ${big ? 'text-emerald-300' : 'text-ink'}`}>{npv}</span></span>
      </div>
    </div>
  )
}
