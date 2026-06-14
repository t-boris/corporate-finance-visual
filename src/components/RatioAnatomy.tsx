import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Droplets,
  Scale,
  TrendingUp,
  Telescope,
} from 'lucide-react'
import { AnimatedNumber } from './AnimatedNumber'

/**
 * RatioAnatomy — step-by-step animated derivation of every ratio in Module 1.
 *
 * For each family (Liquidity / Leverage / Profitability / Valuation) the user can
 * pick an individual ratio (Current / Quick / Cash, Book vs Market, NPM / Turnover
 * / ROA, M/B vs V/OPAT) and watch a 5-stage animation:
 *
 *   0 · idle           — source statement visible, formula skeleton visible
 *   1 · numerator      — relevant cells in the source glow and value flows into
 *                        the top of the formula
 *   2 · denominator    — denominator cells glow and value flows into the bottom
 *   3 · division       — fraction bar lights, "=" appears, result counts up
 *   4 · interpretation — "this means…" line slides in
 *
 * Auto-play moves through stages every ~1.4 s. The user can pause, step back/
 * forward, replay, or click a tab to inspect a different ratio. A small
 * comparison strip at the bottom shows the same ratio for the contrast firms
 * (DISH, Boeing) so the user keeps cross-firm intuition.
 */

// ────────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────────

type RatioFamilyId = 'liquidity' | 'leverage' | 'profitability' | 'valuation'

type SourceItem = {
  id: string
  label: string
  value: number
  group?: string       // visual sub-section inside the source panel
  note?: string        // small footnote shown under the label
}

type SourcePanel = {
  title: string
  subtitle: string
  unit: string         // "$M", "$B", etc.
  groups: { id: string; label: string; tone: 'asset' | 'liability' | 'equity' | 'income' | 'expense' | 'neutral' }[]
  items: SourceItem[]
}

type RatioDef = {
  id: string
  name: string
  formula: string                                   // human-readable formula
  numerator: { label: string; itemIds: string[]; color: string }
  denominator: { label: string; itemIds: string[]; color: string }
  resultFormat: (v: number) => string               // how to render the result
  verdict: (v: number) => { tone: 'good' | 'warn' | 'bad' | 'info'; label: string }
  interpretation: (v: number) => string             // dynamic, uses v
  principle: string                                 // why it matters in one sentence
}

type Comparison = {
  legend: string
  rows: { company: string; tone: string; values: Record<string /* ratioId */, number>; note: string }[]
}

type FamilyConfig = {
  id: RatioFamilyId
  icon: React.ReactNode
  eyebrow: string
  title: string
  intro: string
  source: SourcePanel
  ratios: RatioDef[]
  comparison: Comparison
}

// ────────────────────────────────────────────────────────────────────────────────
// Data — Altice 2021 as the primary case, DISH / Boeing as contrast
// ────────────────────────────────────────────────────────────────────────────────

/** Stylized Altice 2021 balance sheet · current section (in $M, illustrative). */
const ALTICE_CURRENT = {
  items: [
    { id: 'cash',      label: 'Cash & equivalents', value: 192, group: 'ca' },
    { id: 'ar',        label: 'Receivables',         value: 384, group: 'ca' },
    { id: 'inv',       label: 'Inventory',           value:  80, group: 'ca' },
    { id: 'otherCA',   label: 'Other current assets',value: 134, group: 'ca' },
    { id: 'ap',        label: 'Accounts payable',    value: 800, group: 'cl' },
    { id: 'accrued',   label: 'Accrued expenses',    value: 945, group: 'cl' },
    { id: 'stDebt',    label: 'Short-term debt',     value: 600, group: 'cl' },
    { id: 'otherCL',   label: 'Other current liab.', value: 400, group: 'cl' },
  ] as SourceItem[],
}

/** Stylized full-firm Altice numbers ($B, illustrative, matched to lecture ratios). */
const ALTICE_FULL = {
  totalLiab:   35.0,   // $B
  bookAssets:  33.0,   // $B → book equity = -2.0
  marketCap:   12.0,   // $B (today)
  marketAssets: 47.0,  // = totalLiab + marketCap
  // Income-statement ($M)
  revenue:     10092,
  opEx:         6300,
  da:           1250,
  ebit:         2542,
  tax:           295,
  opat:         2247,
  // Valuation ($B)
  mvAssets:    43.6,   // → M/B = 1.32, V/OPAT ≈ 18.5
  bvAssets:    33.0,
  opatB:        2.36,
}

// ── helpers
const sum = (items: SourceItem[], ids: string[]) =>
  items.filter((i) => ids.includes(i.id)).reduce((s, i) => s + i.value, 0)

// ── Family 1 · Liquidity ────────────────────────────────────────────────────────
const liquidity: FamilyConfig = {
  id: 'liquidity',
  icon: <Droplets size={16} />,
  eyebrow: 'Lesson 1-4.2',
  title: 'Liquidity ratios · anatomy',
  intro:
    'Three lenses, one balance sheet. We pick which current assets count in the numerator; the denominator stays the same. Watch each ratio assemble itself.',
  source: {
    title: 'Altice 2021 · current section',
    subtitle: 'Balance sheet — current assets and liabilities ($M, illustrative)',
    unit: '$M',
    groups: [
      { id: 'ca', label: 'Current Assets', tone: 'asset' },
      { id: 'cl', label: 'Current Liabilities', tone: 'liability' },
    ],
    items: ALTICE_CURRENT.items,
  },
  ratios: [
    {
      id: 'current',
      name: 'Current ratio',
      formula: 'Current Assets ÷ Current Liabilities',
      numerator: { label: 'All current assets', itemIds: ['cash', 'ar', 'inv', 'otherCA'], color: '#6366f1' },
      denominator: { label: 'All current liabilities', itemIds: ['ap', 'accrued', 'stDebt', 'otherCL'], color: '#ef4444' },
      resultFormat: (v) => v.toFixed(2),
      verdict: (v) => (v >= 1 ? { tone: 'good', label: 'Above 1 — covered' } : { tone: 'bad', label: 'Below 1 — under-covered' }),
      interpretation: (v) =>
        `Altice has ${(v * 100).toFixed(0)}¢ of current assets per $1 of current obligations. The lecture rounds this to 0.30.`,
      principle:
        'The current ratio is the loosest liquidity test: it counts EVERY current asset, including inventory that may be hard to liquidate without losses.',
    },
    {
      id: 'quick',
      name: 'Quick ratio',
      formula: '(Cash + Receivables) ÷ Current Liabilities',
      numerator: { label: 'Cash + receivables only', itemIds: ['cash', 'ar'], color: '#6366f1' },
      denominator: { label: 'All current liabilities', itemIds: ['ap', 'accrued', 'stDebt', 'otherCL'], color: '#ef4444' },
      resultFormat: (v) => v.toFixed(2),
      verdict: (v) => (v >= 1 ? { tone: 'good', label: 'Close to 1 — healthy' } : { tone: 'bad', label: 'Far below 1 — fragile' }),
      interpretation: (v) =>
        `Drop inventory & "other current assets" and only ${(v * 100).toFixed(0)}¢ remains per $1 of obligations.`,
      principle:
        'Berger, Ofek & Swary (1996): inventory recovers only ~55¢ on the dollar in distress sales. The quick ratio honors that by excluding inventory.',
    },
    {
      id: 'cash',
      name: 'Cash ratio',
      formula: 'Cash ÷ Current Liabilities',
      numerator: { label: 'Cash only', itemIds: ['cash'], color: '#6366f1' },
      denominator: { label: 'All current liabilities', itemIds: ['ap', 'accrued', 'stDebt', 'otherCL'], color: '#ef4444' },
      resultFormat: (v) => v.toFixed(2),
      verdict: (v) => (v >= 0.3 ? { tone: 'info', label: 'Acceptable buffer' } : { tone: 'bad', label: 'Thin cash buffer' }),
      interpretation: (v) =>
        `Only ${(v * 100).toFixed(0)}¢ of literal cash per $1 of obligations. Everything else must be collected or sold first.`,
      principle:
        'The strictest test: pretend AR cannot be collected and inventory cannot be sold. This is what survives a sudden shock.',
    },
  ],
  comparison: {
    legend: 'Same three ratios across firms',
    rows: [
      { company: 'Altice',  tone: '#ef4444', values: { current: 0.30, quick: 0.21, cash: 0.07 }, note: 'Telecom — very low liquidity across the board' },
      { company: 'DISH',    tone: '#10b981', values: { current: 1.50, quick: 0.97, cash: 0.55 }, note: 'Same industry — far healthier' },
      { company: 'Boeing',  tone: '#f59e0b', values: { current: 1.33, quick: 0.36, cash: 0.18 }, note: 'Current looks fine — until quick reveals it is $78.8B of inventory' },
    ],
  },
}

// ── Family 2 · Leverage ────────────────────────────────────────────────────────
const leverage: FamilyConfig = {
  id: 'leverage',
  icon: <Scale size={16} />,
  eyebrow: 'Lesson 1-4.3',
  title: 'Leverage · book vs market',
  intro:
    'The numerator (total liabilities) is the same. What changes is the denominator — and that single choice flips Altice from "apparently bankrupt" to merely "highly levered but solvent". Side-by-side derivation.',
  source: {
    title: 'Altice consolidated · $B',
    subtitle: 'Total liabilities, book assets, and market cap',
    unit: '$B',
    groups: [
      { id: 'liab',   label: 'Liabilities', tone: 'liability' },
      { id: 'bookEq', label: 'Book side',   tone: 'equity' },
      { id: 'mkt',    label: 'Market side', tone: 'equity' },
    ],
    items: [
      { id: 'L',       label: 'Total liabilities',          value: ALTICE_FULL.totalLiab,   group: 'liab' },
      { id: 'BVA',     label: 'Book value of assets',       value: ALTICE_FULL.bookAssets,  group: 'bookEq', note: 'Past — historical accounting cost' },
      { id: 'BEQ',     label: 'Book equity (BVA − L)',      value: ALTICE_FULL.bookAssets - ALTICE_FULL.totalLiab, group: 'bookEq', note: 'NEGATIVE — accounting bankruptcy' },
      { id: 'MCAP',    label: 'Market cap (price × shares)',value: ALTICE_FULL.marketCap,   group: 'mkt',    note: 'Today — discounted future cash flows' },
      { id: 'MVA',     label: 'Market value of assets',     value: ALTICE_FULL.marketAssets,group: 'mkt',    note: '= L + Market cap' },
    ],
  },
  ratios: [
    {
      id: 'book',
      name: 'Book leverage (the wrong way)',
      formula: 'Total Liabilities ÷ Book Value of Assets',
      numerator:   { label: 'Liabilities', itemIds: ['L'],   color: '#ef4444' },
      denominator: { label: 'Book assets', itemIds: ['BVA'], color: '#64748b' },
      resultFormat: (v) => v.toFixed(2) + '×',
      verdict: (v) => (v > 1 ? { tone: 'bad', label: 'Mathematically > 1 — book equity is negative' } : { tone: 'warn', label: 'Below 1 but stale' }),
      interpretation: (v) =>
        `Reading the book numbers, Altice owes $${v.toFixed(2)} for every $1 of book assets. By that arithmetic the firm should already be liquidated — but it isn't.`,
      principle:
        'Book equity is a past-tense number. It excludes future cash flows. Negative book equity does not mean insolvency on its own.',
    },
    {
      id: 'market',
      name: 'Market leverage (the right way)',
      formula: 'Total Liabilities ÷ (Total Liabilities + Market Cap)',
      numerator:   { label: 'Liabilities',           itemIds: ['L'],   color: '#ef4444' },
      denominator: { label: 'Market value of assets',itemIds: ['MVA'], color: '#10b981' },
      resultFormat: (v) => (v * 100).toFixed(0) + '%',
      verdict: (v) => (v >= 0.5 ? { tone: 'warn', label: 'High but < 1 — solvent' } : { tone: 'good', label: 'Normal range' }),
      interpretation: (v) =>
        `Using the market value of assets (L + market cap), leverage is ${(v * 100).toFixed(0)}%. High — but strictly below 1, so the firm is solvent.`,
      principle:
        'Market value already prices the future. Leverage above 1 in market terms is the real bankruptcy condition; book leverage can be a misleading false alarm.',
    },
  ],
  comparison: {
    legend: 'Same firm, two denominators — and three peers',
    rows: [
      { company: 'Altice',  tone: '#ef4444', values: { book: 1.06, market: 0.74 }, note: 'Book says "dead", market says "alive but highly levered"' },
      { company: 'US avg',  tone: '#94a3b8', values: { book: 0.50, market: 0.28 }, note: 'Average US firm sits at 25–30% market leverage' },
      { company: 'Boeing',  tone: '#f59e0b', values: { book: 1.10, market: 0.60 }, note: 'Also negative book equity post-737-MAX — market still solvent' },
    ],
  },
}

// ── Family 3 · Profitability ──────────────────────────────────────────────────
const profitability: FamilyConfig = {
  id: 'profitability',
  icon: <TrendingUp size={16} />,
  eyebrow: 'Lesson 1-5',
  title: 'Profitability · NPM, Turnover, ROA',
  intro:
    'Three ratios with a deep connection: ROA = Net Profit Margin × Asset Turnover (DuPont). Watch each one assemble, then see them multiply back together.',
  source: {
    title: 'Altice 2021 · income statement + assets',
    subtitle: 'Top-down view: Revenue → OPAT, and book assets for the denominator',
    unit: '$M',
    groups: [
      { id: 'is', label: 'Income statement', tone: 'income' },
      { id: 'bs', label: 'Balance sheet', tone: 'asset' },
    ],
    items: [
      { id: 'rev',    label: 'Revenue',                value:  ALTICE_FULL.revenue, group: 'is' },
      { id: 'opex',   label: 'Operating expenses',     value: -ALTICE_FULL.opEx,    group: 'is' },
      { id: 'da',     label: 'D&A',                    value: -ALTICE_FULL.da,      group: 'is' },
      { id: 'ebit',   label: 'EBIT (operating income)',value:  ALTICE_FULL.ebit,    group: 'is' },
      { id: 'tax',    label: 'Income tax',             value: -ALTICE_FULL.tax,     group: 'is' },
      { id: 'opat',   label: 'OPAT (EBIT − tax)',      value:  ALTICE_FULL.opat,    group: 'is', note: 'Profit of the BUSINESS, before interest' },
      { id: 'assets', label: 'Book assets',            value:  ALTICE_FULL.bookAssets * 1000, group: 'bs', note: 'BOOK, not market — we compare profits to invested capital' },
    ],
  },
  ratios: [
    {
      id: 'npm',
      name: 'Net Profit Margin',
      formula: 'OPAT ÷ Revenue',
      numerator:   { label: 'OPAT',     itemIds: ['opat'], color: '#8b5cf6' },
      denominator: { label: 'Revenue',  itemIds: ['rev'],  color: '#6366f1' },
      resultFormat: (v) => (v * 100).toFixed(1) + '%',
      verdict: (v) => (v >= 0.15 ? { tone: 'good', label: 'Strong margin' } : { tone: 'warn', label: 'Thin margin' }),
      interpretation: (v) =>
        `For every $1 of revenue, ${(v * 100).toFixed(1)}¢ ends up as operating profit after tax.`,
      principle:
        'Margin = how much of each sales dollar survives the cost stack. Altice converts ~22¢ — telecoms typically have fat margins.',
    },
    {
      id: 'turn',
      name: 'Asset Turnover',
      formula: 'Revenue ÷ Book Assets',
      numerator:   { label: 'Revenue',      itemIds: ['rev'],    color: '#6366f1' },
      denominator: { label: 'Book assets',  itemIds: ['assets'], color: '#64748b' },
      resultFormat: (v) => v.toFixed(2) + '×',
      verdict: (v) => (v >= 1 ? { tone: 'good', label: 'High asset utilization' } : { tone: 'warn', label: 'Asset-heavy business' }),
      interpretation: (v) =>
        `Each $1 of assets generates $${v.toFixed(2)} of revenue per year — telecom infrastructure is capital-heavy, so turnover is low.`,
      principle:
        'Turnover = how hard the asset base is working. Walmart turns at ~2.5×; a telecom or utility around 0.3×.',
    },
    {
      id: 'roa',
      name: 'ROA (OPAT)',
      formula: 'OPAT ÷ Book Assets',
      numerator:   { label: 'OPAT',         itemIds: ['opat'],   color: '#8b5cf6' },
      denominator: { label: 'Book assets',  itemIds: ['assets'], color: '#64748b' },
      resultFormat: (v) => (v * 100).toFixed(1) + '%',
      verdict: (v) => (v >= 0.06 ? { tone: 'good', label: 'Healthy return' } : { tone: 'warn', label: 'Subpar return' }),
      interpretation: (v) =>
        `Each $1 of invested capital throws off ${(v * 100).toFixed(1)}¢ of operating profit. This is what DuPont decomposes.`,
      principle:
        'ROA = NPM × Turnover. The same return can come from either fat margins (Altice) or fast turnover (a retailer).',
    },
  ],
  comparison: {
    legend: 'Altice vs DISH — same industry, very different profile',
    rows: [
      { company: 'Altice',  tone: '#10b981', values: { npm: 0.223, turn: 0.30, roa: 0.068 }, note: 'Fat margin (22%), low turnover (0.3×)' },
      { company: 'DISH',    tone: '#3b82f6', values: { npm: 0.090, turn: 0.55, roa: 0.050 }, note: 'Thinner margin, higher turnover, lower ROA' },
      { company: 'DuPont',  tone: '#a78bfa', values: { npm: 0,     turn: 0,    roa: 0     }, note: 'ROA(Altice) = 22.3% × 0.30 = 6.8% ✓' },
    ],
  },
}

// ── Family 4 · Valuation ──────────────────────────────────────────────────────
const valuation: FamilyConfig = {
  id: 'valuation',
  icon: <Telescope size={16} />,
  eyebrow: 'Lesson 1-7',
  title: 'Valuation · future ÷ past',
  intro:
    'Both valuation ratios put MARKET value (the future) over an accounting fundamental (the present or the past). The choice of denominator decides what story the ratio tells.',
  source: {
    title: 'Altice · valuation inputs',
    subtitle: 'Market and book figures, plus current OPAT',
    unit: '$B',
    groups: [
      { id: 'fut', label: 'Future (market)', tone: 'equity' },
      { id: 'pas', label: 'Past / present',   tone: 'asset' },
    ],
    items: [
      { id: 'mva', label: 'Market value of assets', value: ALTICE_FULL.mvAssets, group: 'fut', note: 'PV of all future cash flows + liabilities' },
      { id: 'bva', label: 'Book value of assets',   value: ALTICE_FULL.bvAssets, group: 'pas', note: 'Historical accounting cost' },
      { id: 'op',  label: 'OPAT (annual)',          value: ALTICE_FULL.opatB,    group: 'pas', note: 'Current operating profit after tax' },
    ],
  },
  ratios: [
    {
      id: 'mb',
      name: 'Market-to-Book of Assets',
      formula: 'MV(Assets) ÷ BV(Assets)',
      numerator:   { label: 'Market value', itemIds: ['mva'], color: '#10b981' },
      denominator: { label: 'Book value',   itemIds: ['bva'], color: '#64748b' },
      resultFormat: (v) => v.toFixed(2) + '×',
      verdict: (v) => (v > 1 ? { tone: 'good', label: 'Market sees growth above book' } : { tone: 'warn', label: 'Below book — pessimistic' }),
      interpretation: (v) =>
        `The market values Altice's assets at ${v.toFixed(2)}× their book carrying value — modest growth premium.`,
      principle:
        'M/B compares the future (numerator) to a possibly stale, possibly massaged past (denominator). It can drift far from current performance.',
    },
    {
      id: 'vopat',
      name: 'Value over OPAT',
      formula: 'MV(Assets) ÷ OPAT',
      numerator:   { label: 'Market value', itemIds: ['mva'], color: '#10b981' },
      denominator: { label: 'OPAT',         itemIds: ['op'],  color: '#8b5cf6' },
      resultFormat: (v) => v.toFixed(1) + '×',
      verdict: (v) => (v <= 20 ? { tone: 'info', label: 'Normal range' } : { tone: 'warn', label: 'Rich — high expectations' }),
      interpretation: (v) =>
        `It would take ${v.toFixed(1)} years of current OPAT to "pay back" the firm's market value — assuming no growth.`,
      principle:
        'V/OPAT uses a current cash-like profit measure, so it tracks stock performance more closely than M/B. Preferred when book values are stale.',
    },
  ],
  comparison: {
    legend: 'The paradox — same firms, opposite messages',
    rows: [
      { company: 'Altice', tone: '#ef4444', values: { mb: 1.32, vopat: 18.5 }, note: 'Stock ↓ but M/B high (book is stale)' },
      { company: 'DISH',   tone: '#10b981', values: { mb: 0.95, vopat:  9.8 }, note: 'Lower M/B but cheaper on V/OPAT' },
    ],
  },
}

const FAMILIES: Record<RatioFamilyId, FamilyConfig> = {
  liquidity,
  leverage,
  profitability,
  valuation,
}

// ────────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────────

const MAX_STAGE = 4
// Time spent on each stage before auto-advancing to the next one.
const AUTO_DELAYS: Record<number, number> = { 0: 700, 1: 1200, 2: 1200, 3: 1200 }

export function RatioAnatomy({ family }: { family: RatioFamilyId }) {
  const fam = FAMILIES[family]
  const [ratioId, setRatioId] = useState(fam.ratios[0].id)
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(true)

  const ratio = useMemo(() => fam.ratios.find((r) => r.id === ratioId)!, [fam, ratioId])

  // Compute values from the source items.
  const numeratorVal = useMemo(
    () => sum(fam.source.items, ratio.numerator.itemIds),
    [fam.source.items, ratio.numerator.itemIds],
  )
  const denominatorVal = useMemo(
    () => sum(fam.source.items, ratio.denominator.itemIds),
    [fam.source.items, ratio.denominator.itemIds],
  )
  const resultVal = denominatorVal !== 0 ? numeratorVal / denominatorVal : 0

  const selectRatio = (id: string) => {
    // Reset stage in the same update as the ratio change so we don't briefly
    // render the new ratio with old "completed" highlights.
    setRatioId(id)
    setStage(0)
    setPlaying(true)
  }

  // Auto-advance.
  useEffect(() => {
    if (!playing) return
    if (stage >= MAX_STAGE) return
    const t = window.setTimeout(() => setStage((s) => s + 1), AUTO_DELAYS[stage] ?? 1200)
    return () => window.clearTimeout(t)
  }, [stage, playing])

  const handleReplay = () => {
    setStage(0)
    setPlaying(true)
  }
  const handleStep = (dir: 1 | -1) => {
    setPlaying(false)
    setStage((s) => Math.max(0, Math.min(MAX_STAGE, s + dir)))
  }
  const togglePlay = () => {
    if (stage >= MAX_STAGE) {
      handleReplay()
    } else {
      setPlaying((p) => !p)
    }
  }

  return (
    <div className="card p-5">
      {/* Header */}
      <header className="mb-3 flex items-start gap-3">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-brand-500/10 border border-brand-500/40 text-brand-300 mt-0.5">
          {fam.icon}
        </span>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Anatomy · {fam.eyebrow}
          </div>
          <h3 className="font-display text-lg font-semibold leading-tight">{fam.title}</h3>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">{fam.intro}</p>
        </div>
      </header>

      {/* Tabs — pick a ratio inside the family */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {fam.ratios.map((r) => {
          const active = r.id === ratioId
          return (
            <button
              key={r.id}
              onClick={() => selectRatio(r.id)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                active
                  ? 'bg-brand-500/15 border-brand-500/60 text-brand-200'
                  : 'bg-surface-3/40 border-line text-ink-soft hover:text-ink hover:border-line',
              ].join(' ')}
            >
              {r.name}
            </button>
          )
        })}
      </div>

      {/* Two-column stage: source on the left, formula theater on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4">
        <SourcePanelView source={fam.source} ratio={ratio} stage={stage} />
        <FormulaTheater
          ratio={ratio}
          numeratorVal={numeratorVal}
          denominatorVal={denominatorVal}
          resultVal={resultVal}
          stage={stage}
          unit={fam.source.unit}
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <ControlButton onClick={() => handleStep(-1)} disabled={stage === 0} title="Previous step">
            <ChevronLeft size={14} />
          </ControlButton>
          <ControlButton onClick={togglePlay} primary title={playing && stage < MAX_STAGE ? 'Pause' : 'Play'}>
            {playing && stage < MAX_STAGE ? <Pause size={14} /> : <Play size={14} />}
          </ControlButton>
          <ControlButton onClick={() => handleStep(1)} disabled={stage === MAX_STAGE} title="Next step">
            <ChevronRight size={14} />
          </ControlButton>
          <ControlButton onClick={handleReplay} title="Replay">
            <RotateCcw size={14} />
          </ControlButton>
        </div>

        <StageIndicator stage={stage} />
      </div>

      {/* Why-it-matters principle (always visible, anchors the meaning) */}
      <div className="mt-4 rounded-xl border border-line bg-surface-3/40 p-3">
        <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">
          Why it matters · principle
        </div>
        <p className="text-sm text-ink-soft leading-relaxed">{ratio.principle}</p>
      </div>

      {/* Comparison strip */}
      <ComparisonStrip
        comparison={fam.comparison}
        ratioId={ratio.id}
        format={ratio.resultFormat}
      />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Source panel — the balance sheet / income statement with cell highlights
// ────────────────────────────────────────────────────────────────────────────────

function SourcePanelView({
  source,
  ratio,
  stage,
}: {
  source: SourcePanel
  ratio: RatioDef
  stage: number
}) {
  const numHighlighted = stage >= 1
  const denHighlighted = stage >= 2

  return (
    <div className="rounded-xl border border-line bg-surface-3/40 p-3">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">{source.title}</div>
      <div className="text-[11px] text-ink-muted/80 mt-0.5 mb-3">{source.subtitle}</div>

      <div className="space-y-3">
        {source.groups.map((group) => (
          <div key={group.id}>
            <div
              className="text-[10px] uppercase tracking-widest mb-1.5"
              style={{ color: groupAccent(group.tone) }}
            >
              {group.label}
            </div>
            <div className="space-y-1">
              {source.items
                .filter((i) => i.group === group.id)
                .map((item) => {
                  const inNum = ratio.numerator.itemIds.includes(item.id)
                  const inDen = ratio.denominator.itemIds.includes(item.id)
                  const lit = (inNum && numHighlighted) || (inDen && denHighlighted)
                  const litColor = inNum ? ratio.numerator.color : ratio.denominator.color

                  return (
                    <motion.div
                      key={item.id}
                      animate={{
                        backgroundColor: lit ? hexAlpha(litColor, 0.16) : 'rgba(0,0,0,0)',
                        borderColor: lit ? hexAlpha(litColor, 0.6) : 'rgb(var(--line))',
                      }}
                      transition={{ duration: 0.35 }}
                      className="flex items-baseline justify-between rounded-md border border-line px-2 py-1.5"
                      style={{ borderWidth: 1 }}
                    >
                      <div className="text-xs">
                        <span className={lit ? 'text-ink font-medium' : 'text-ink-soft'}>{item.label}</span>
                        {item.note && (
                          <span className="block text-[10px] text-ink-muted/80 mt-0.5">{item.note}</span>
                        )}
                      </div>
                      <span
                        className={`font-mono text-xs whitespace-nowrap ${lit ? '' : 'text-ink-muted'}`}
                        style={lit ? { color: litColor } : undefined}
                      >
                        {formatSourceValue(item.value, source.unit)}
                      </span>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Formula theater — numerator slot, division bar, denominator slot, = result
// ────────────────────────────────────────────────────────────────────────────────

function FormulaTheater({
  ratio,
  numeratorVal,
  denominatorVal,
  resultVal,
  stage,
  unit,
}: {
  ratio: RatioDef
  numeratorVal: number
  denominatorVal: number
  resultVal: number
  stage: number
  unit: string
}) {
  const showNum = stage >= 1
  const showDen = stage >= 2
  const showBar = stage >= 2
  const showResult = stage >= 3
  const showInterp = stage >= 4

  // Count-up: when the result first appears, tween from 0 to resultVal.
  const [countTarget, setCountTarget] = useState(0)
  useEffect(() => {
    if (showResult) {
      // schedule on next frame so AnimatedNumber mounts at 0 first, then tweens.
      const id = requestAnimationFrame(() => setCountTarget(resultVal))
      return () => cancelAnimationFrame(id)
    }
    setCountTarget(0)
  }, [showResult, resultVal])

  const verdict = ratio.verdict(resultVal)
  const verdictTone = verdictColor(verdict.tone)

  return (
    <div className="rounded-xl border border-line bg-surface-3/40 p-4 flex flex-col">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted">Formula</div>
      <div className="font-mono text-xs text-ink-soft mb-3">{ratio.formula}</div>

      {/* Fraction */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2 min-h-[180px] py-2">
        {/* Numerator */}
        <FormulaSlot
          label={ratio.numerator.label}
          color={ratio.numerator.color}
          show={showNum}
          value={numeratorVal}
          unit={unit}
        />

        {/* Bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: showBar ? 1 : 0, opacity: showBar ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="h-[2px] w-[78%] bg-ink-muted/80 origin-center rounded-full"
        />

        {/* Denominator */}
        <FormulaSlot
          label={ratio.denominator.label}
          color={ratio.denominator.color}
          show={showDen}
          value={denominatorVal}
          unit={unit}
        />

        {/* Result row */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2 mt-3"
            >
              <span className="text-ink-muted text-lg">=</span>
              <span className="font-mono text-3xl font-semibold text-brand-200">
                <AnimatedNumber
                  value={countTarget}
                  durationMs={900}
                  format={ratio.resultFormat}
                />
              </span>
              <span
                className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ml-1"
                style={{
                  color: verdictTone.fg,
                  borderColor: verdictTone.border,
                  backgroundColor: verdictTone.bg,
                }}
              >
                {verdict.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interpretation */}
      <AnimatePresence>
        {showInterp && (
          <motion.div
            key="interp"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-3 rounded-lg border-l-2 border-l-brand-500/70 bg-brand-500/5 px-3 py-2"
          >
            <div className="text-[10px] uppercase tracking-widest text-brand-300 mb-0.5">
              Read it back
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">{ratio.interpretation(resultVal)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FormulaSlot({
  label,
  color,
  show,
  value,
  unit,
}: {
  label: string
  color: string
  show: boolean
  value: number
  unit: string
}) {
  return (
    <div className="w-[78%]">
      <AnimatePresence mode="wait">
        {show ? (
          <motion.div
            key="filled"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border px-3 py-2 flex items-baseline justify-between"
            style={{
              borderColor: hexAlpha(color, 0.6),
              backgroundColor: hexAlpha(color, 0.10),
            }}
          >
            <span className="text-[11px] uppercase tracking-widest" style={{ color }}>
              {label}
            </span>
            <span className="font-mono text-lg font-semibold" style={{ color }}>
              {formatSourceValue(value, unit)}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-dashed border-line/70 px-3 py-2 flex items-baseline justify-between"
          >
            <span className="text-[11px] uppercase tracking-widest text-ink-muted/80">{label}</span>
            <span className="font-mono text-ink-muted/60 text-xs">…</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Comparison strip
// ────────────────────────────────────────────────────────────────────────────────

function ComparisonStrip({
  comparison,
  ratioId,
  format,
}: {
  comparison: Comparison
  ratioId: string
  format: (v: number) => string
}) {
  // Determine bar scale across the rows we'll show.
  const rows = comparison.rows.filter((r) => r.values[ratioId] !== undefined)
  const maxAbs = Math.max(
    0.001,
    ...rows.map((r) => Math.abs(r.values[ratioId])),
  )

  return (
    <div className="mt-4 rounded-xl border border-line bg-surface-3/30 p-3">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-2">
        Compare · {comparison.legend}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {rows.map((row) => {
          const val = row.values[ratioId]
          const pct = (Math.abs(val) / maxAbs) * 100
          return (
            <div key={row.company} className="rounded-lg border border-line bg-surface-3/40 p-2">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: row.tone }}>{row.company}</span>
                <span className="font-mono text-sm">{val === 0 ? '—' : format(val)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6 }}
                  style={{ backgroundColor: row.tone }}
                  className="h-full rounded-full"
                />
              </div>
              <p className="text-[10px] text-ink-muted mt-1.5 leading-snug">{row.note}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Small helpers
// ────────────────────────────────────────────────────────────────────────────────

function ControlButton({
  children,
  onClick,
  disabled,
  primary,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  primary?: boolean
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[
        'inline-flex items-center justify-center h-7 w-7 rounded-md border transition-colors',
        primary
          ? 'bg-brand-500/15 border-brand-500/60 text-brand-200 hover:bg-brand-500/25'
          : 'bg-surface-3/60 border-line text-ink-soft hover:text-ink hover:border-brand-500/60',
        'disabled:opacity-30 disabled:cursor-not-allowed',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function StageIndicator({ stage }: { stage: number }) {
  const labels = ['Idle', 'Numerator', 'Denominator', 'Divide', 'Meaning']
  return (
    <div className="flex items-center gap-1.5">
      {labels.map((label, i) => {
        const reached = i <= stage
        return (
          <div key={i} className="flex items-center gap-1">
            <motion.div
              animate={{
                backgroundColor: reached ? 'rgb(var(--brand-400))' : 'rgb(var(--line))',
                scale: i === stage ? 1.15 : 1,
              }}
              className="h-1.5 w-1.5 rounded-full"
            />
            <span
              className={`text-[10px] uppercase tracking-widest ${
                i === stage ? 'text-brand-300' : reached ? 'text-ink-soft' : 'text-ink-muted/60'
              }`}
            >
              {label}
            </span>
            {i < labels.length - 1 && <span className="text-ink-muted/40 mx-0.5">›</span>}
          </div>
        )
      })}
    </div>
  )
}

function formatSourceValue(value: number, unit: string): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '−' : ''
  if (unit === '$M') {
    return `${sign}$${abs.toLocaleString(undefined, { maximumFractionDigits: 0 })}M`
  }
  if (unit === '$B') {
    return `${sign}$${abs.toFixed(abs >= 10 ? 1 : 2)}B`
  }
  return `${sign}${abs}`
}

function groupAccent(tone: SourcePanel['groups'][number]['tone']): string {
  switch (tone) {
    case 'asset':     return 'rgb(99,102,241)'   // indigo
    case 'liability': return 'rgb(239,68,68)'    // red
    case 'equity':    return 'rgb(16,185,129)'   // emerald
    case 'income':    return 'rgb(139,92,246)'   // violet
    case 'expense':   return 'rgb(148,163,184)'  // slate
    default:          return 'rgb(148,163,184)'
  }
}

function verdictColor(tone: 'good' | 'warn' | 'bad' | 'info') {
  switch (tone) {
    case 'good': return { fg: '#10b981', bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.40)' }
    case 'warn': return { fg: '#f59e0b', bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.40)' }
    case 'bad':  return { fg: '#ef4444', bg: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.40)'  }
    case 'info': return { fg: '#60a5fa', bg: 'rgba(96,165,250,0.10)',  border: 'rgba(96,165,250,0.40)' }
  }
}

/** Apply an alpha channel to a hex color. */
function hexAlpha(hex: string, alpha: number): string {
  const m = hex.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
