import type { QuizQuestion } from '@/lib/types'

// 20 questions for Module 1. Difficulty mix: 4 easy · 12 medium · 4 hard (20/60/20).
// Modules 2..8 will be populated as the course progresses.
export const QUESTIONS: QuizQuestion[] = [
  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm1-e1',
    moduleId: 1,
    prompt: 'What is the principal objective of corporate finance according to the standard textbook view?',
    choices: [
      'Maximize this year\'s accounting profit',
      'Maximize revenue',
      'Maximize shareholder value (the long-term market value of the stock)',
      'Minimize taxes',
    ],
    answerIndex: 2,
    explanation:
      'The objective is maximizing the long-term value of the firm\'s equity. Profit and revenue ignore timing, risk and reinvestment; minimizing taxes alone can destroy value.',
    difficulty: 'easy',
    topic: 'Objective',
  },
  {
    id: 'm1-e2',
    moduleId: 1,
    prompt: 'Which statement captures the Time Value of Money principle?',
    choices: [
      'Money in the future is always worth more',
      'A dollar today is worth more than a dollar tomorrow',
      'Inflation always exceeds the real rate',
      'The longer the horizon, the larger the present value',
    ],
    answerIndex: 1,
    explanation:
      'TVM: today\'s dollar is worth more because it can be invested, inflation erodes future dollars, future cash flows are riskier, and people prefer current consumption.',
    difficulty: 'easy',
    topic: 'TVM',
  },
  {
    id: 'm1-e3',
    moduleId: 1,
    prompt: 'Which equation expresses the balance sheet identity?',
    choices: [
      'Revenue − Expenses = Profit',
      'Assets = Liabilities + Equity',
      'Cash In − Cash Out = Net Cash Flow',
      'EBIT − Taxes = Net Income',
    ],
    answerIndex: 1,
    explanation:
      'The balance sheet identity: Assets = Liabilities + Equity. Every asset must be financed by some combination of debt and equity.',
    difficulty: 'easy',
    topic: 'Financial statements',
  },
  {
    id: 'm1-e4',
    moduleId: 1,
    prompt: 'What does limited liability mean for a corporation\'s shareholders?',
    choices: [
      'Managers cannot be held responsible for their decisions',
      'A shareholder can lose at most the amount invested',
      'Creditors cannot demand repayment',
      'The corporation pays limited taxes',
    ],
    answerIndex: 1,
    explanation:
      'Limited liability caps the shareholder\'s loss at the amount invested, which makes broad public ownership of equity feasible.',
    difficulty: 'easy',
    topic: 'Structure',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm1-m1',
    moduleId: 1,
    prompt: 'What is the present value of $1,000 received in 3 years at an 8% annual discount rate?',
    choices: ['≈ $793.83', '≈ $926.00', '≈ $1,259.71', '≈ $740.74'],
    answerIndex: 0,
    explanation: 'PV = 1000 / (1.08)^3 = 1000 / 1.259712 ≈ $793.83.',
    difficulty: 'medium',
    topic: 'PV/FV',
  },
  {
    id: 'm1-m2',
    moduleId: 1,
    prompt: 'PV of a 5-period ordinary annuity of $200 at r = 6%:',
    choices: ['≈ $842.47', '≈ $1,000.00', '≈ $1,127.10', '≈ $945.83'],
    answerIndex: 0,
    explanation:
      'PV = 200 · (1 − 1.06^−5) / 0.06 = 200 · 4.21236 ≈ $842.47.',
    difficulty: 'medium',
    topic: 'Annuity',
  },
  {
    id: 'm1-m3',
    moduleId: 1,
    prompt: 'What is the present value of a perpetuity paying $100 per year at a discount rate of 5%?',
    choices: ['$2,000', '$500', '$2,500', 'Infinite'],
    answerIndex: 0,
    explanation: 'PV of a perpetuity = C / r = 100 / 0.05 = $2,000.',
    difficulty: 'medium',
    topic: 'Perpetuity',
  },
  {
    id: 'm1-m4',
    moduleId: 1,
    prompt:
      'A growing perpetuity pays $100 next year and grows at g = 3% forever. The discount rate is r = 8%. What is its present value?',
    choices: ['$1,250', '$2,000', '$3,333.33', '$2,500'],
    answerIndex: 1,
    explanation: 'PV = C₁ / (r − g) = 100 / (0.08 − 0.03) = 100 / 0.05 = $2,000.',
    difficulty: 'medium',
    topic: 'Growing perpetuity',
  },
  {
    id: 'm1-m5',
    moduleId: 1,
    prompt: 'Why do financial economists prefer cash flow over accounting profit?',
    choices: [
      'Profit is always smaller than cash flow',
      'Cash flow is independent of accounting policy and reflects real money',
      'Profit ignores investment',
      'Cash flow is always positive',
    ],
    answerIndex: 1,
    explanation:
      'Accounting profit depends on accounting choices (depreciation, accruals) and contains non-cash items. Valuation decisions are made on actual cash flows.',
    difficulty: 'medium',
    topic: 'Cash vs profit',
  },
  {
    id: 'm1-m6',
    moduleId: 1,
    prompt: 'Which of the following is a classic example of an agency problem?',
    choices: [
      'The board asks the CFO to disclose financial statements',
      'Managers build an empire via value-destroying acquisitions',
      'Shareholders vote on dividends',
      'An auditor finds an error in the cash flow statement',
    ],
    answerIndex: 1,
    explanation:
      'Empire building through value-destroying M&A is a textbook agency problem: managers increase their power/compensation at the expense of shareholder value.',
    difficulty: 'medium',
    topic: 'Agency',
  },
  {
    id: 'm1-m7',
    moduleId: 1,
    prompt: 'Which mechanism does NOT directly reduce the agency problem?',
    choices: [
      'Stock-based compensation for the CEO',
      'An independent board of directors',
      'A high corporate tax rate',
      'The threat of a hostile takeover',
    ],
    answerIndex: 2,
    explanation:
      'Tax rates do not align managers with shareholders. The other three are standard governance mechanisms that address the agency problem.',
    difficulty: 'medium',
    topic: 'Governance',
  },
  {
    id: 'm1-m8',
    moduleId: 1,
    prompt: 'An APR of 12% compounded monthly corresponds to what effective annual rate (EAR)?',
    choices: ['12.00%', '12.36%', '12.55%', '12.68%'],
    answerIndex: 3,
    explanation: 'EAR = (1 + 0.12/12)^12 − 1 = 1.01^12 − 1 ≈ 12.68%.',
    difficulty: 'medium',
    topic: 'Compounding',
  },
  {
    id: 'm1-m9',
    moduleId: 1,
    prompt: 'Future value of $1,000 after 10 years at 7% per year (annual compounding):',
    choices: ['≈ $1,700', '≈ $1,967', '≈ $2,008', '≈ $1,400'],
    answerIndex: 1,
    explanation: 'FV = 1000 · 1.07^10 = 1000 · 1.96715 ≈ $1,967.',
    difficulty: 'medium',
    topic: 'PV/FV',
  },
  {
    id: 'm1-m10',
    moduleId: 1,
    prompt: 'Which item is reported in the operating section of the cash flow statement?',
    choices: [
      'Purchase of equipment',
      'Payment of dividends',
      'An increase in accounts receivable',
      'Issuance of new shares',
    ],
    answerIndex: 2,
    explanation:
      'Changes in working capital (including A/R) belong in operating activities. Equity issuance is financing; CapEx is investing.',
    difficulty: 'medium',
    topic: 'Cash flow statement',
  },
  {
    id: 'm1-m11',
    moduleId: 1,
    prompt: 'Free Cash Flow to the firm equals:',
    choices: [
      'Net Income + Depreciation',
      'EBIT·(1−T) + D&A − ΔNWC − CapEx',
      'Revenue − COGS − OpEx',
      'EBITDA − Taxes',
    ],
    answerIndex: 1,
    explanation:
      'FCF (to the firm) = EBIT·(1−T) + D&A − ΔNWC − CapEx — the cash available to all providers of capital.',
    difficulty: 'medium',
    topic: 'FCF',
  },
  {
    id: 'm1-m12',
    moduleId: 1,
    prompt: 'If the discount rate increases, what happens to the present value of future cash flows?',
    choices: [
      'PV increases because expected return is higher',
      'PV decreases because cash flows are discounted more heavily',
      'PV is unchanged',
      'It depends on the sign of the cash flow',
    ],
    answerIndex: 1,
    explanation:
      'A higher r raises the denominator in PV = CF / (1+r)^t, so PV falls. This is the core inverse relationship of TVM.',
    difficulty: 'medium',
    topic: 'TVM',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm1-h1',
    moduleId: 1,
    prompt:
      'You will receive $50,000 per year forever, starting in year 5. The discount rate is 10%. What is the present value today?',
    choices: ['$500,000', '$341,506', '$310,460', '$455,000'],
    answerIndex: 1,
    explanation:
      'Perpetuity value at t = 4 is 50,000 / 0.10 = $500,000. Discount 4 periods: 500,000 / 1.10^4 ≈ $341,506.',
    difficulty: 'hard',
    topic: 'Deferred perpetuity',
  },
  {
    id: 'm1-h2',
    moduleId: 1,
    prompt:
      'A project costs $1,000 today and pays $600 in year 1 and $600 in year 2. What is the IRR (rate at which NPV = 0)?',
    choices: ['≈ 13.07%', '≈ 20.00%', '≈ 10.00%', '≈ 6.59%'],
    answerIndex: 0,
    explanation:
      '−1000 + 600/(1+r) + 600/(1+r)² = 0. Numerical solution gives r ≈ 13.07% (solvable via the annuity formula or bisection).',
    difficulty: 'hard',
    topic: 'IRR',
  },
  {
    id: 'm1-h3',
    moduleId: 1,
    prompt:
      'A discrete annual rate of 8% is equivalent to what continuously compounded rate?',
    choices: ['ln(1.08) ≈ 7.696%', '1.08 − 1 = 8%', 'e^0.08 − 1 ≈ 8.33%', '8% / e ≈ 2.94%'],
    answerIndex: 0,
    explanation:
      'With continuous compounding, FV = e^(rt). Setting (1.08) = e^r gives r = ln(1.08) ≈ 0.07696 ≈ 7.696%.',
    difficulty: 'hard',
    topic: 'Compounding',
  },
  {
    id: 'm1-h4',
    moduleId: 1,
    prompt:
      'A company aims to "maximize EPS". Why is EPS a poor proxy for maximizing shareholder value?',
    choices: [
      'EPS is easy for auditors to verify',
      'EPS ignores risk, timing, and the cost of capital used to grow earnings',
      'EPS is always smaller than Net Income',
      'EPS does not influence the share price',
    ],
    answerIndex: 1,
    explanation:
      'EPS can be inflated by buybacks or value-destroying acquisitions without regard to risk or cost of capital. Stock value is the PV of future free cash flows discounted at the required return — none of which EPS captures.',
    difficulty: 'hard',
    topic: 'Objective',
  },
]

export const questionsByModule = (moduleId: number) =>
  QUESTIONS.filter((q) => q.moduleId === moduleId)
