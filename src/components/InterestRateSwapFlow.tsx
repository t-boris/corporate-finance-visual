import { useState } from 'react'
import { motion } from 'framer-motion'
import { Repeat } from 'lucide-react'

/**
 * Lesson 7-4 — interest rate swap turning a floating loan into fixed.
 *
 * Lecture example: bank loan at SOFR + 2% (SOFR = 4.3% → paying 6.3%).
 * Swap: pay fixed 4.3%, receive floating SOFR ("short fixed, long floating").
 * The floating legs cancel → all-in rate fixed at 6.3% whatever SOFR does.
 */
const SPREAD = 2.0
const FIXED = 4.3

export function InterestRateSwapFlow() {
  const [sofr, setSofr] = useState(4.6)

  const loanRate = sofr + SPREAD
  const swapNet = sofr - FIXED // receive SOFR − pay fixed
  const allIn = loanRate - swapNet // = FIXED + SPREAD

  const W = 620
  const H = 240

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Repeat className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 7-4</div>
          <h3 className="font-display text-lg font-semibold">Interest rate swap: floating → fixed</h3>
        </div>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <marker id="swap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(var(--ink-muted))" />
          </marker>
          <marker id="swap-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(239 68 68)" />
          </marker>
          <marker id="swap-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(16 185 129)" />
          </marker>
        </defs>

        {/* Bank box */}
        <rect x={20} y={86} width={130} height={64} rx={12} fill="rgb(var(--surface-3))" stroke="rgb(var(--line))" />
        <text x={85} y={112} textAnchor="middle" className="fill-[rgb(var(--ink))] text-[13px] font-semibold">Bank</text>
        <text x={85} y={130} textAnchor="middle" className="fill-[rgb(var(--ink-muted))] text-[10px]">floating-rate loan</text>

        {/* Company box */}
        <rect x={245} y={86} width={130} height={64} rx={12} fill="rgb(var(--brand-500) / 0.12)" stroke="rgb(var(--brand-500))" />
        <text x={310} y={112} textAnchor="middle" className="fill-[rgb(var(--brand-300))] text-[13px] font-semibold">Company</text>
        <text x={310} y={130} textAnchor="middle" className="fill-[rgb(var(--ink-muted))] text-[10px]">small · no bond access</text>

        {/* Swap counterparty box */}
        <rect x={470} y={86} width={130} height={64} rx={12} fill="rgb(var(--surface-3))" stroke="rgb(var(--line))" />
        <text x={535} y={112} textAnchor="middle" className="fill-[rgb(var(--ink))] text-[13px] font-semibold">Swap dealer</text>
        <text x={535} y={130} textAnchor="middle" className="fill-[rgb(var(--ink-muted))] text-[10px]">counterparty</text>

        {/* Company → Bank: SOFR + 2% */}
        <line x1={245} y1={118} x2={155} y2={118} stroke="rgb(239 68 68)" strokeWidth={2} markerEnd="url(#swap-arrow-red)" />
        <text x={200} y={106} textAnchor="middle" className="fill-red-400 text-[11px] font-mono">
          SOFR + 2% = {loanRate.toFixed(1)}%
        </text>

        {/* Company → Dealer: fixed 4.3% (pay fixed = short fixed) */}
        <line x1={375} y1={100} x2={465} y2={100} stroke="rgb(239 68 68)" strokeWidth={2} markerEnd="url(#swap-arrow-red)" />
        <text x={420} y={90} textAnchor="middle" className="fill-red-400 text-[11px] font-mono">
          fixed 4.3%
        </text>

        {/* Dealer → Company: floating SOFR (receive floating = long floating) */}
        <line x1={465} y1={136} x2={375} y2={136} stroke="rgb(16 185 129)" strokeWidth={2} markerEnd="url(#swap-arrow-green)" />
        <motion.text
          key={sofr}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          x={420}
          y={156}
          textAnchor="middle"
          className="fill-emerald-400 text-[11px] font-mono"
        >
          SOFR = {sofr.toFixed(1)}%
        </motion.text>

        {/* labels under boxes */}
        <text x={310} y={186} textAnchor="middle" className="fill-[rgb(var(--ink-muted))] text-[10px]">
          swap position: short fixed · long floating
        </text>
        <motion.text
          x={310}
          y={210}
          textAnchor="middle"
          className="fill-[rgb(var(--brand-300))] text-[13px] font-mono font-semibold"
        >
          all-in rate = {loanRate.toFixed(1)}% − ({sofr.toFixed(1)}% − 4.3%) = {allIn.toFixed(1)}% fixed
        </motion.text>
      </svg>

      {/* SOFR slider */}
      <div className="rounded-lg border border-line bg-surface-3/50 px-3 py-2 mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-ink-muted">SOFR (base rate)</span>
          <span className="font-mono text-xs text-brand-300">{sofr.toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min={3.0}
          max={6.0}
          step={0.1}
          value={sofr}
          onChange={(e) => setSofr(parseFloat(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
          <span>3.0%</span>
          <span>contract signed at 4.3%</span>
          <span>6.0%</span>
        </div>
      </div>

      {/* readout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <div className="rounded-lg border border-line bg-surface-3/60 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Loan payment</div>
          <div className="font-mono text-lg mt-0.5 text-red-400">−{loanRate.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-line bg-surface-3/60 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Swap net (recv − pay)</div>
          <div className={`font-mono text-lg mt-0.5 ${swapNet >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {swapNet >= 0 ? '+' : '−'}{Math.abs(swapNet).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg border border-brand-500/40 bg-brand-500/5 p-3 text-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">All-in rate</div>
          <div className="font-mono text-lg mt-0.5 text-brand-300">{allIn.toFixed(1)}% fixed</div>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">
        The received SOFR leg cancels the loan&apos;s floating base rate, leaving{' '}
        <span className="font-mono text-brand-300">4.3% + 2% = 6.3%</span> whatever SOFR does. Hedging cuts both ways:
        if SOFR falls to 3%, the firm still pays 6.3% while the market pays 5% — that upside-for-the-counterparty is why
        the dealer signed the contract.
      </p>
    </div>
  )
}
