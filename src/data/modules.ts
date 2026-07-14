import type { ModuleMeta } from '@/lib/types'

// Course outline · UIUC iMBA · FIN 570 · Corporate Finance.
// Source: official course outline. Instructors: Heitor Almeida · Xiangyi Spencer · Stefan Zeume.
export const MODULES: ModuleMeta[] = [
  {
    id: 1,
    slug: 'objective-and-language',
    title: 'The Objective and Language of Corporate Finance',
    shortTitle: 'Objective & Language',
    tagline: 'Why corporate finance exists and the language it speaks',
    description:
      'The objective of the firm, shareholder value, agency problems, financial statements, and the foundations of the time value of money.',
    status: 'ready',
    topics: [
      'Shareholder value maximization',
      'Agency problems & corporate governance',
      'Cash flow vs. accounting profit',
      'Balance Sheet / Income / Cash Flow',
      'Time value of money fundamentals',
    ],
    estimatedMinutes: 90,
    accent: '#6366f1',
    icon: 'Compass',
  },
  {
    id: 2,
    slug: 'financial-planning',
    title: 'Financial Planning',
    shortTitle: 'Financial Planning',
    tagline: 'Forecasting financing needs and managing liquidity',
    description:
      'Percentage-of-sales forecasting of the three statements, long-term financing and rollover risk, working capital and the cash conversion cycle, and managing liquidity risk with cash and credit lines.',
    status: 'ready',
    topics: [
      'Percentage-of-sales forecasting',
      'Working capital & cash conversion cycle',
      'Inventory & receivables financing',
      'Liquidity risk & credit lines',
    ],
    estimatedMinutes: 95,
    accent: '#06b6d4',
    icon: 'LineChart',
  },
  {
    id: 3,
    slug: 'investment-decisions',
    title: 'Making Investment Decisions',
    shortTitle: 'Investment Decisions',
    tagline: 'NPV, IRR, and the logic of capital budgeting',
    description:
      'Net present value and why it equals shareholder value, the IRR and its pitfalls, building free cash flows (the magic formula and depreciation/taxes), and real options applied to R&D.',
    status: 'ready',
    topics: ['NPV & shareholder value', 'IRR & its pitfalls', 'Free cash flow (magic formula)', 'Real options & R&D'],
    estimatedMinutes: 110,
    accent: '#10b981',
    icon: 'TrendingUp',
  },
  {
    id: 4,
    slug: 'ma-risk-performance',
    title: 'Mergers and Acquisitions, Risk, and Performance Evaluation',
    shortTitle: 'M&A · Risk · Performance',
    tagline: 'Combining firms, pricing risk, and measuring performance',
    description:
      'M&A motives and synergies, deal pricing and the HP–Compaq case, cash vs. stock deals, sensitivity analysis, the WACC (cost of debt, CAPM, beta), and performance evaluation with EVA.',
    status: 'ready',
    topics: ['M&A & synergies', 'Deal pricing & premiums', 'Sensitivity analysis', 'WACC, CAPM & beta', 'EVA & performance'],
    estimatedMinutes: 120,
    accent: '#f59e0b',
    icon: 'GitMerge',
  },
  {
    id: 5,
    slug: 'capital-structure',
    title: 'Raising Financing: The Capital Structure Decision',
    shortTitle: 'Capital Structure',
    tagline: 'Debt vs. equity, MM, and the optimal mix',
    description:
      'Debt vs. equity issuance and the financial statements, why both are zero-NPV, the two misconceptions (dilution & "cheap debt") and Modigliani–Miller, the pecking order, the interest tax shield (OPAT), costs of financial distress, and the trade-off theory of optimal leverage.',
    status: 'ready',
    topics: ['Debt vs. equity issuance', 'Modigliani–Miller', 'Pecking order', 'Tax shield & OPAT', 'Trade-off theory & L*'],
    estimatedMinutes: 100,
    accent: '#8b5cf6',
    icon: 'Layers',
  },
  {
    id: 6,
    slug: 'debt-and-payout',
    title: 'Understanding Debt Financing and Payout Policy',
    shortTitle: 'Debt & Payout',
    tagline: 'Credit risk, ratings, dividends, and buybacks',
    description:
      'Yield to maturity vs. the cost of debt, credit risk and ratings, the many types of debt, bank vs. market financing, and payout policy — dividends vs. repurchases, the dilution illusion, signaling, taxes, and the dividend puzzle.',
    status: 'ready',
    topics: [
      'YTM vs. cost of debt',
      'Credit risk & ratings',
      'Types of debt · bank vs. market',
      'Dividends vs. buybacks',
      'Signaling & the dividend puzzle',
    ],
    estimatedMinutes: 95,
    accent: '#ef4444',
    icon: 'Banknote',
  },
  {
    id: 7,
    slug: 'risk-management',
    title: 'Risk Management',
    shortTitle: 'Risk Management',
    tagline: 'Hedging vs speculation, derivatives, liquidity, operations',
    description:
      'Good and bad reasons to hedge, forwards and futures (margins, marking to market, "the search for zero"), interest-rate swaps and SOFR futures, liquidity as a substitute for hedging, operational hedging (Honda), and the Nintendo vs Rolls-Royce cases.',
    status: 'ready',
    topics: [
      'Hedging vs speculation',
      'Forwards & futures',
      'Swaps & interest-rate risk',
      'Liquidity as a hedge',
      'Operational hedging',
      'Nintendo vs Rolls-Royce',
    ],
    estimatedMinutes: 95,
    accent: '#0ea5e9',
    icon: 'Shield',
  },
  {
    id: 8,
    slug: 'finance-governance-society',
    title: 'Finance, Governance, and Society',
    shortTitle: 'Governance & Society',
    tagline: 'Where the NPV rule breaks down',
    description:
      'The limits of “just maximize NPV”: agency costs of debt (excessive risk taking and underinvestment), finance and society (corruption and externalities), and violations of the law of one price (arbitrage and injustice). Whose NPV is it?',
    status: 'ready',
    topics: [
      'Agency costs of debt',
      'Excessive risk taking',
      'Underinvestment & haircuts',
      'Corruption & externalities',
      'Law of one price & injustice',
    ],
    estimatedMinutes: 90,
    accent: '#14b8a6',
    icon: 'Globe',
  },
]

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug)
export const moduleById = (id: number) => MODULES.find((m) => m.id === id)
