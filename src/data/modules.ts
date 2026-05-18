import type { ModuleMeta } from '@/lib/types'

// Программа курса UIUC iMBA · FIN 570 · Corporate Finance.
// Источник: official course outline в Info.md.
// Преподаватели: Heitor Almeida · Xiangyi Spencer · Stefan Zeume.
export const MODULES: ModuleMeta[] = [
  {
    id: 1,
    slug: 'objective-and-language',
    title: 'The Objective and Language of Corporate Finance',
    shortTitle: 'Objective & Language',
    tagline: 'Зачем существует финансовый менеджмент и на каком языке он говорит',
    description:
      'Цель корпоративных финансов, shareholder value, agency problems, базовые финансовые отчёты и язык денежных потоков.',
    status: 'ready',
    topics: [
      'Shareholder value maximization',
      'Agency problems & corporate governance',
      'Cash flow vs. accounting profit',
      'Balance Sheet / Income / Cash Flow',
      'Time value of money fundamentals',
    ],
    estimatedMinutes: 90,
    accent: '#6366f1', // indigo-500
    icon: 'Compass',
  },
  {
    id: 2,
    slug: 'financial-planning',
    title: 'Financial Planning',
    shortTitle: 'Financial Planning',
    tagline: 'От прогноза продаж до потребности во внешнем финансировании',
    description:
      'Pro-forma финансовые отчёты, sustainable growth, percentage-of-sales, EFN, операционные и финансовые leverages.',
    status: 'planned',
    topics: [
      'Pro-forma statements',
      'Sustainable growth rate',
      'External financing needed (EFN)',
      'Operating & financial leverage',
    ],
    estimatedMinutes: 75,
    accent: '#06b6d4', // cyan-500
    icon: 'LineChart',
  },
  {
    id: 3,
    slug: 'investment-decisions',
    title: 'Making Investment Decisions',
    shortTitle: 'Investment Decisions',
    tagline: 'NPV, IRR и логика принятия капитальных решений',
    description:
      'Discounted cash flows, NPV vs IRR, payback, profitability index, incremental cash flows, sensitivity & scenario analysis.',
    status: 'planned',
    topics: ['NPV / IRR / Payback', 'Incremental cash flows', 'Sensitivity & scenarios', 'Real options intro'],
    estimatedMinutes: 110,
    accent: '#10b981',
    icon: 'TrendingUp',
  },
  {
    id: 4,
    slug: 'ma-risk-performance',
    title: 'Mergers and Acquisitions, Risk, and Performance Evaluation',
    shortTitle: 'M&A · Risk · Performance',
    tagline: 'Слияния, риск-доходность и оценка эффективности',
    description:
      'M&A motives и synergies, CAPM, beta, диверсификация, performance metrics (ROE, ROIC, EVA), event studies.',
    status: 'planned',
    topics: ['M&A & synergies', 'CAPM & beta', 'Risk diversification', 'ROE / ROIC / EVA'],
    estimatedMinutes: 120,
    accent: '#f59e0b',
    icon: 'GitMerge',
  },
  {
    id: 5,
    slug: 'capital-structure',
    title: 'Raising Financing: The Capital Structure Decision',
    shortTitle: 'Capital Structure',
    tagline: 'Долг vs. equity, MM-теорема и оптимальная структура',
    description:
      'Modigliani–Miller, налоговый щит, costs of financial distress, trade-off & pecking order, signalling, payout effects.',
    status: 'planned',
    topics: ['MM theorem', 'Tax shield', 'Trade-off & pecking order', 'WACC sensitivity'],
    estimatedMinutes: 100,
    accent: '#8b5cf6',
    icon: 'Layers',
  },
  {
    id: 6,
    slug: 'debt-and-payout',
    title: 'Understanding Debt Financing and Payout Policy',
    shortTitle: 'Debt & Payout',
    tagline: 'Долг, ковенанты, дивиденды и обратный выкуп',
    description:
      'Bond pricing, yield, duration, credit ratings, dividends vs buybacks, payout signalling, налоговые соображения.',
    status: 'planned',
    topics: ['Bond pricing & yield', 'Duration & credit risk', 'Dividends vs. buybacks', 'Payout signalling'],
    estimatedMinutes: 95,
    accent: '#ef4444',
    icon: 'Banknote',
  },
  {
    id: 7,
    slug: 'risk-management',
    title: 'Risk Management',
    shortTitle: 'Risk Management',
    tagline: 'Хеджирование, деривативы и корпоративный риск',
    description:
      'Зачем компании хеджируют, форварды/фьючерсы/опционы/свопы, VaR, FX и interest rate риски.',
    status: 'planned',
    topics: ['Why hedge?', 'Forwards, futures, options, swaps', 'VaR basics', 'FX & rate hedging'],
    estimatedMinutes: 85,
    accent: '#0ea5e9',
    icon: 'Shield',
  },
  {
    id: 8,
    slug: 'finance-governance-society',
    title: 'Finance, Governance and Society',
    shortTitle: 'Governance & Society',
    tagline: 'Governance, ESG и роль финансов в обществе',
    description:
      'Корпоративное управление, board structure, executive compensation, ESG, stakeholder vs. shareholder теории.',
    status: 'planned',
    topics: ['Corporate governance', 'Executive comp', 'ESG & stakeholders', 'Финансы и общество'],
    estimatedMinutes: 70,
    accent: '#14b8a6',
    icon: 'Globe',
  },
]

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug)
export const moduleById = (id: number) => MODULES.find((m) => m.id === id)
