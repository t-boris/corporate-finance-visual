import type { GlossaryTerm } from '@/lib/types'

// The glossary grows module-by-module. Currently populated for Module 1.
// Additional modules will be added as the course progresses.
export const GLOSSARY: GlossaryTerm[] = [
  // ───── Module 1 · The Objective and Language of Corporate Finance ─────
  {
    term: 'Shareholder value maximization',
    moduleId: 1,
    definition:
      'The principal objective of corporate finance: maximize the long-term market value of the firm\'s equity. Not to be confused with maximizing earnings — earnings ignore timing, risk and reinvestment.',
    related: ['NPV', 'Cash flow', 'Agency problem'],
    tags: ['objective'],
  },
  {
    term: 'Agency problem',
    moduleId: 1,
    definition:
      'A conflict of interest between managers (agents) and shareholders (principals). Arises when managers pursue their own interests — bonuses, empire building, low-risk choices — instead of shareholder value.',
    related: ['Corporate governance', 'Executive compensation'],
    tags: ['governance'],
  },
  {
    term: 'Corporate governance',
    moduleId: 1,
    definition:
      'The set of mechanisms (independent board, audit, shareholder voting, equity-linked compensation) that mitigate the agency problem and align managers with shareholders.',
    related: ['Agency problem', 'Board of directors'],
    tags: ['governance'],
  },
  {
    term: 'Cash flow',
    moduleId: 1,
    definition:
      'The actual movement of cash into or out of the firm. Financial decisions are based on cash flows, not accounting earnings, because cash flows cannot be reshaped by accounting choices.',
    related: ['Accounting profit', 'Free cash flow'],
    tags: ['fundamentals'],
  },
  {
    term: 'Accounting profit',
    moduleId: 1,
    definition:
      'Earnings under accounting rules (revenue − expenses). Includes non-cash items (depreciation, accruals) and depends on accounting estimates, so it is not used directly for valuation.',
    related: ['Cash flow', 'Depreciation'],
    tags: ['accounting'],
  },
  {
    term: 'Free cash flow (FCF)',
    moduleId: 1,
    definition:
      'The cash available to all providers of capital after operating expenses, taxes, CapEx and working-capital investment. FCF = EBIT(1−T) + D&A − ΔNWC − CapEx.',
    formula: 'FCF = EBIT·(1−T) + D&A − ΔNWC − CapEx',
    related: ['Cash flow', 'WACC', 'Enterprise value'],
    tags: ['valuation'],
  },
  {
    term: 'Time value of money (TVM)',
    moduleId: 1,
    definition:
      'A dollar today is worth more than a dollar tomorrow. Reasons: the opportunity to invest, inflation, risk, and a preference for current consumption.',
    related: ['Present value', 'Future value', 'Discount rate'],
    tags: ['fundamentals'],
  },
  {
    term: 'Present value (PV)',
    moduleId: 1,
    definition:
      'The value today of a future cash flow discounted at rate r over n periods. PV = FV / (1+r)^n.',
    formula: 'PV = FV / (1 + r)^n',
    related: ['Future value', 'Discount rate', 'TVM'],
    tags: ['fundamentals'],
  },
  {
    term: 'Future value (FV)',
    moduleId: 1,
    definition:
      'The value of a present amount PV after n periods compounded at rate r. FV = PV·(1+r)^n.',
    formula: 'FV = PV · (1 + r)^n',
    related: ['Present value', 'Compounding'],
    tags: ['fundamentals'],
  },
  {
    term: 'Discount rate',
    moduleId: 1,
    definition:
      'The rate used to bring future cash flows back to today. Reflects the opportunity cost of capital and project risk; in corporate valuation it is most often the WACC.',
    related: ['WACC', 'Opportunity cost of capital', 'PV'],
    tags: ['fundamentals'],
  },
  {
    term: 'Compounding',
    moduleId: 1,
    definition:
      'Earning interest on previously earned interest. With m compounding periods per year at nominal rate r, the effective annual rate is EAR = (1 + r/m)^m − 1.',
    formula: 'EAR = (1 + r/m)^m − 1',
    related: ['APR', 'EAR'],
    tags: ['fundamentals'],
  },
  {
    term: 'Annuity',
    moduleId: 1,
    definition:
      'A series of equal payments C at regular intervals for n periods. PV of an ordinary annuity = C · [1 − (1+r)^−n] / r.',
    formula: 'PV = C · [1 − (1+r)^−n] / r',
    related: ['Perpetuity', 'TVM'],
    tags: ['fundamentals'],
  },
  {
    term: 'Perpetuity',
    moduleId: 1,
    definition:
      'An infinite stream of equal payments C. PV = C / r. A growing perpetuity (Gordon model): PV = C / (r − g), valid for r > g.',
    formula: 'PV = C / r  |  PV_g = C / (r − g)',
    related: ['Annuity', 'Gordon growth model'],
    tags: ['fundamentals'],
  },
  {
    term: 'Opportunity cost of capital',
    moduleId: 1,
    definition:
      'The return an investor could earn on an alternative investment of equivalent risk. This is the minimum required return for a project.',
    related: ['Discount rate', 'WACC', 'CAPM'],
    tags: ['fundamentals'],
  },
  {
    term: 'Stakeholder',
    moduleId: 1,
    definition:
      'Any party with an interest in the firm: employees, customers, suppliers, creditors, government, society. The stakeholder view is contrasted with the shareholder view of the firm.',
    related: ['Shareholder value maximization', 'ESG'],
    tags: ['governance'],
  },
  {
    term: 'Limited liability',
    moduleId: 1,
    definition:
      'The principle that a shareholder\'s loss is limited to the amount invested. Limited liability makes broad public ownership of equity possible.',
    related: ['Corporation', 'Equity'],
    tags: ['structure'],
  },
  {
    term: 'Balance sheet',
    moduleId: 1,
    definition:
      'A snapshot of the firm\'s assets, liabilities and equity at a point in time. Identity: Assets = Liabilities + Equity.',
    related: ['Income statement', 'Cash flow statement'],
    tags: ['statements'],
  },
  {
    term: 'Income statement',
    moduleId: 1,
    definition:
      'A flow report over a period: Revenue − COGS − OpEx − Interest − Taxes = Net Income. Contains both cash and non-cash items.',
    related: ['Balance sheet', 'EBIT', 'Net income'],
    tags: ['statements'],
  },
  {
    term: 'Cash flow statement',
    moduleId: 1,
    definition:
      'A reconciliation of Net Income into actual cash flow. Three sections: operating, investing, and financing activities.',
    related: ['Free cash flow', 'Net income'],
    tags: ['statements'],
  },
  {
    term: 'EBIT',
    moduleId: 1,
    definition:
      'Earnings Before Interest and Taxes — operating income before financing costs and taxes. A close proxy for operating cash flow before CapEx and working capital.',
    related: ['EBITDA', 'Operating income'],
    tags: ['metrics'],
  },
]

export const allModuleIds = Array.from(new Set(GLOSSARY.map((g) => g.moduleId))).sort()
