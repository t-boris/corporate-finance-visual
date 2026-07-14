import { useState } from 'react'
import { Scissors } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Module 8 · Lesson 8-3 — the debt haircut that cures underinvestment.
 * Scooter Inc.: firm value WITH the good project is $1.05M; the shareholders
 * inject $100k. Drag the loan's new face value F and find the win-win band
 * where BOTH the bank (recovers ≥ $900k) and equity (nets ≥ $0) prefer the
 * deal — namely $900k ≤ F ≤ $950k.
 */
const FIRM_WITH = 1050 // $k, firm value with the project
const INVEST = 100 // $k, shareholder injection
const NO_PROJECT_BANK = 900 // $k, bank recovery if project not done
const FLOOR = 900 // bank accepts if F ≥ 900
const CEIL = 950 // equity accepts if F ≤ 950

export function HaircutSlider() {
  const [face, setFace] = useState(925)

  const bankGets = Math.min(face, FIRM_WITH)
  const equityNet = FIRM_WITH - face - INVEST // residual minus injection
  const bankHappy = bankGets >= NO_PROJECT_BANK
  const equityHappy = equityNet >= 0
  const winWin = bankHappy && equityHappy

  // slider domain 800..1000
  const MIN = 800
  const MAX = 1000
  const posPct = ((face - MIN) / (MAX - MIN)) * 100
  const bandLeft = ((FLOOR - MIN) / (MAX - MIN)) * 100
  const bandWidth = ((CEIL - FLOOR) / (MAX - MIN)) * 100

  return (
    <div className="card p-5">
      <header className="mb-4 flex items-center gap-2">
        <Scissors className="text-brand-400" size={18} />
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Interactive · Lesson 8-3</div>
          <h3 className="font-display text-lg font-semibold">The haircut: find the win-win</h3>
        </div>
      </header>

      <p className="text-[13px] text-ink-soft leading-relaxed mb-4">
        The good project makes the firm worth <strong>$1.05M</strong>, and shareholders inject <strong>$100k</strong>.
        Slide the loan&apos;s new face value <span className="font-mono">F</span> and watch who agrees.
      </p>

      {/* slider with highlighted win-win band */}
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-ink-muted uppercase tracking-widest">New face value F</label>
        <span className="font-mono text-sm text-ink">${face}k</span>
      </div>
      <div className="relative">
        {/* win-win band */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-emerald-500/25 border border-emerald-500/40 pointer-events-none"
          style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }}
          aria-hidden
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={5}
          value={face}
          onChange={(e) => setFace(parseInt(e.target.value))}
          className="relative w-full accent-brand-500"
        />
      </div>
      <div className="flex justify-between text-[10px] text-ink-muted mt-0.5">
        <span>${MIN}k</span>
        <span className="text-emerald-300">win-win band ${FLOOR}k–${CEIL}k</span>
        <span>${MAX}k (no haircut)</span>
      </div>

      {/* live payoffs */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div
          className={[
            'rounded-xl border p-3',
            bankHappy ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5',
          ].join(' ')}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Bank recovers</div>
          <div className="font-mono text-lg text-ink">${bankGets}k</div>
          <div className={`text-[11px] mt-0.5 ${bankHappy ? 'text-emerald-300' : 'text-red-300'}`}>
            {bankHappy ? '≥ $900k → accepts' : '< $900k → refuses'}
          </div>
        </div>
        <div
          className={[
            'rounded-xl border p-3',
            equityHappy ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5',
          ].join(' ')}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-muted">Equity nets</div>
          <div className="font-mono text-lg text-ink">
            {equityNet >= 0 ? '+' : ''}
            ${equityNet}k
          </div>
          <div className={`text-[11px] mt-0.5 ${equityHappy ? 'text-emerald-300' : 'text-red-300'}`}>
            {equityHappy ? '≥ $0 → invests' : '< $0 → walks away'}
          </div>
        </div>
      </div>

      {/* verdict */}
      <motion.div
        key={winWin ? 'ww' : bankHappy ? 'bank' : 'equity'}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={[
          'mt-3 rounded-xl border p-3 text-sm',
          winWin
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
            : 'border-amber-500/50 bg-amber-500/10 text-amber-200',
        ].join(' ')}
      >
        {winWin ? (
          <>
            <strong>Win-win.</strong> Both sides beat their no-project outcome, so the project gets done — the debt
            overhang is renegotiated away. (At F = $925k: bank $925k, equity +$25k.)
          </>
        ) : bankHappy ? (
          <>
            The bank is happy but <strong>equity still loses</strong> — too little of the gain was shared. Cut F further.
          </>
        ) : (
          <>
            <strong>The bank refuses</strong> — F is below the $900k it would recover anyway. Raise F.
          </>
        )}
      </motion.div>
      <p className="mt-2 text-[12px] text-ink-muted italic">
        At F = $1,000k (no haircut) equity nets −$50k and the project dies — that is the underinvestment problem.
      </p>
    </div>
  )
}
