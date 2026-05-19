import type { QuizQuestion } from '@/lib/types'

// 20 questions for Module 1. Difficulty mix: 4 easy · 12 medium · 4 hard (20/60/20).
// Modules 2..8 will be populated as the course progresses.
export const QUESTIONS: QuizQuestion[] = [
  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm1-e1',
    moduleId: 1,
    prompt: 'What is the principal objective of corporate finance according to the course?',
    choices: [
      'Maximize this year\'s accounting profit (EPS)',
      'Maximize revenue',
      'Maximize the long-term stock price (shareholder value)',
      'Minimize taxes',
    ],
    answerIndex: 2,
    explanation:
      'The objective is maximizing the long-term value of the firm\'s equity. EPS and revenue ignore timing/risk; tax minimization alone can destroy value.',
    difficulty: 'easy',
    topic: 'Objective',
  },
  {
    id: 'm1-e2',
    moduleId: 1,
    prompt: 'Which statement BEST describes what the stock price represents?',
    choices: [
      'Last quarter\'s reported earnings',
      'The sum of all expected future cash flows, discounted to today',
      'The book value of equity per share',
      'The face value of debt issued',
    ],
    answerIndex: 1,
    explanation:
      'A stock price is the present value of all expected future cash flows. That is why maximizing the (current) stock price is NOT short-termism — it captures the future.',
    difficulty: 'easy',
    topic: 'Stock price',
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
      'Assets = Liabilities + Equity. Every asset must be financed by some combination of debt and equity.',
    difficulty: 'easy',
    topic: 'Financial statements',
  },
  {
    id: 'm1-e4',
    moduleId: 1,
    prompt: 'The Agency Problem describes a conflict of interest between:',
    choices: [
      'A firm and its competitors',
      'Shareholders (principals) and managers (agents)',
      'Customers and suppliers',
      'The IRS and the firm',
    ],
    answerIndex: 1,
    explanation:
      'Managers are agents of shareholders. They may pursue their own interests (perks, empire-building, shirking) instead of maximizing shareholder value.',
    difficulty: 'easy',
    topic: 'Agency',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm1-m1',
    moduleId: 1,
    prompt:
      'Altice has Current Assets of $790M and Current Liabilities of $2,745M. What is its current ratio?',
    choices: ['≈ 0.29', '≈ 1.33', '≈ 3.47', '≈ 0.97'],
    answerIndex: 0,
    explanation:
      'Current ratio = 790 / 2,745 ≈ 0.29. Altice has only 29¢ in current assets per $1 of current liabilities — a clear liquidity concern.',
    difficulty: 'medium',
    topic: 'Liquidity',
  },
  {
    id: 'm1-m2',
    moduleId: 1,
    prompt:
      'Boeing has Current Assets of $108.7B (of which $78.8B is inventory) and Current Liabilities of $82B. Why might the current ratio overstate Boeing\'s true liquidity?',
    choices: [
      'Because inventory cannot be sold at face value in distress (≈55¢/$1)',
      'Because Boeing has too much cash',
      'Because receivables sell at a premium',
      'Because current liabilities are non-cash',
    ],
    answerIndex: 0,
    explanation:
      'Boeing\'s inventory consists of specialized aircraft parts. Per Berger, Ofek & Swary (1996), distressed inventory recovers only ~55%. The quick ratio (which excludes inventory) is a more conservative measure.',
    difficulty: 'medium',
    topic: 'Liquidity',
  },
  {
    id: 'm1-m3',
    moduleId: 1,
    prompt: 'Which of the following is NOT a quick or cash ratio component?',
    choices: ['Cash', 'Marketable securities', 'Accounts receivable', 'Inventory'],
    answerIndex: 3,
    explanation:
      'The quick ratio excludes inventory because it is the least liquid of current assets. The cash ratio is even stricter — only cash and equivalents.',
    difficulty: 'medium',
    topic: 'Liquidity',
  },
  {
    id: 'm1-m4',
    moduleId: 1,
    prompt:
      'When computing LEVERAGE ratios, why must we use the MARKET value of equity, not the book value?',
    choices: [
      'Because market values are more conservative',
      'Because book equity can be negative or stale; it reflects only the past',
      'Because the SEC requires it',
      'Because book value includes future cash flows',
    ],
    answerIndex: 1,
    explanation:
      'Altice has more liabilities than book assets — book equity is negative. But the firm is operating with positive market cap. Market value of equity reflects future cash flows; book value does not.',
    difficulty: 'medium',
    topic: 'Leverage',
  },
  {
    id: 'm1-m5',
    moduleId: 1,
    prompt:
      'A company has total liabilities of $50B and a market cap of $50B. What is its leverage ratio (Liabilities / (Liabilities + Market Cap))?',
    choices: ['0.25', '0.50', '0.75', '1.00'],
    answerIndex: 1,
    explanation:
      'Leverage = 50 / (50 + 50) = 0.50 = 50%. This is significantly above the US average of 25–30% but still below the 1.0 threshold of effective bankruptcy.',
    difficulty: 'medium',
    topic: 'Leverage',
  },
  {
    id: 'm1-m6',
    moduleId: 1,
    prompt:
      'Operating Income is $2,541.8M and Income Tax expense is $295M. What is OPAT?',
    choices: ['$2,246.8M', '$2,836.8M', '$295M', '$2,541.8M'],
    answerIndex: 0,
    explanation:
      'OPAT = Operating Income − Income Tax = 2,541.8 − 295 = $2,246.8M. OPAT is computed BEFORE interest, so it measures business profitability independent of capital structure.',
    difficulty: 'medium',
    topic: 'OPAT',
  },
  {
    id: 'm1-m7',
    moduleId: 1,
    prompt: 'Why does the course prefer OPAT over Net Income to measure profitability?',
    choices: [
      'OPAT is always larger than Net Income',
      'OPAT excludes interest, so it measures BUSINESS profitability independent of financing; Net Income is also easier to manipulate',
      'Net Income is required by GAAP, OPAT is not',
      'OPAT is only used in Europe',
    ],
    answerIndex: 1,
    explanation:
      'Interest payments go to providers of capital — they\'re not a cost of running the business. Net Income sits at the bottom of the IS where one-time items distort the picture.',
    difficulty: 'medium',
    topic: 'Profitability',
  },
  {
    id: 'm1-m8',
    moduleId: 1,
    prompt:
      'A firm has Revenues = $10B, OPAT = $1B, Assets = $20B. Compute ROA and Asset Turnover.',
    choices: [
      'ROA = 10%, Asset Turnover = 0.5',
      'ROA = 5%, Asset Turnover = 0.5',
      'ROA = 10%, Asset Turnover = 2.0',
      'ROA = 5%, Asset Turnover = 2.0',
    ],
    answerIndex: 1,
    explanation:
      'ROA = OPAT/Assets = 1/20 = 5%. Asset Turnover = Revenues/Assets = 10/20 = 0.5. DuPont check: 5% = 10% (margin) × 0.5 (turnover). ✓',
    difficulty: 'medium',
    topic: 'Profitability',
  },
  {
    id: 'm1-m9',
    moduleId: 1,
    prompt:
      'In the profitability ratio ROA = OPAT / Assets, should we use BOOK or MARKET value of assets?',
    choices: [
      'Market — it reflects all future cash flows',
      'Book — we want to compare current profits to invested capital, not future value',
      'Whichever is higher',
      'Average of book and market',
    ],
    answerIndex: 1,
    explanation:
      'Using market value would mean dividing current profits by future cash flows, mechanically lowering ROA for high-growth firms. Book value reflects the capital actually invested.',
    difficulty: 'medium',
    topic: 'Profitability',
  },
  {
    id: 'm1-m10',
    moduleId: 1,
    prompt:
      'A company shows: CFO < 0, CFI < 0, CFF > 0. Which type of company is this most likely?',
    choices: [
      'A mature dividend-paying firm',
      'A growth-stage startup',
      'A firm shutting down operations',
      'A profitable company returning cash',
    ],
    answerIndex: 1,
    explanation:
      'Negative CFO (early-stage losses), negative CFI (investing in growth), positive CFF (raising capital from investors) is the textbook startup profile.',
    difficulty: 'medium',
    topic: 'Cash flow statement',
  },
  {
    id: 'm1-m11',
    moduleId: 1,
    prompt:
      'A company has CFO > 0, CFI > 0, CFF < 0. What does this typically indicate?',
    choices: [
      'Aggressive growth and investment',
      'A new startup',
      'A mature firm downsizing — selling assets and returning cash to investors',
      'Fraud',
    ],
    answerIndex: 2,
    explanation:
      'Positive CFI (selling assets), negative CFF (paying back investors) describes a contracting/divesting firm.',
    difficulty: 'medium',
    topic: 'Cash flow statement',
  },
  {
    id: 'm1-m12',
    moduleId: 1,
    prompt:
      'Cugene announced an acquisition that REDUCED EPS through 2019, yet the stock price rose from $115 to $135. Why?',
    choices: [
      'The market overreacted irrationally',
      'EPS measures present profits; the stock price reflects all expected future cash flows, including the deal\'s long-term upside',
      'The acquisition was undisclosed',
      'EPS rose despite the announcement',
    ],
    answerIndex: 1,
    explanation:
      'This is the key intuition: the stock price is forward-looking. A short-term hit to EPS can be overshadowed by larger future cash flows from the acquired business.',
    difficulty: 'medium',
    topic: 'Stock price',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm1-h1',
    moduleId: 1,
    prompt:
      'A firm has Total Liabilities $40B, Market Cap $10B, Book Value of Assets $30B. Compute Market-to-Book of assets.',
    choices: ['0.75', '1.67', '0.33', '1.33'],
    answerIndex: 1,
    explanation:
      'Market Value of Assets = Liabilities + Market Cap = 40 + 10 = $50B. M/B = MV Assets / BV Assets = 50 / 30 ≈ 1.67. A value above 1 suggests the market expects positive future cash flows.',
    difficulty: 'hard',
    topic: 'Valuation',
  },
  {
    id: 'm1-h2',
    moduleId: 1,
    prompt:
      'Altice has higher M/B ratio than DISH, yet Altice\'s stock has performed WORSE recently. Is this contradictory?',
    choices: [
      'Yes — high M/B should always mean better stock performance',
      'No — valuation ratios compare future to past; book value can be stale or manipulable, so M/B can stay high even after poor performance',
      'Yes — there must be a data error',
      'No — Altice\'s M/B is actually lower',
    ],
    answerIndex: 1,
    explanation:
      'M/B = future / past. Book value reflects past accounting events and can be massaged. The "future" numerator (market value) may have dropped, but if the "past" denominator dropped faster or was already low, M/B stays elevated.',
    difficulty: 'hard',
    topic: 'Valuation',
  },
  {
    id: 'm1-h3',
    moduleId: 1,
    prompt:
      'A CEO is paid mostly in stock options. The CEO undertakes a value-destroying acquisition that boosts short-term EPS via creative accounting. The stock briefly rises. Which mechanisms could correct this?',
    choices: [
      'Audit alone',
      'Audit, independent directors, activist investors, and the market for corporate control',
      'Government regulation only',
      'Nothing — the situation will self-correct',
    ],
    answerIndex: 1,
    explanation:
      'No single mechanism is sufficient. The full governance toolkit — independent board, audit, activists with skin in the game, and the threat of a hostile takeover — collectively disciplines management.',
    difficulty: 'hard',
    topic: 'Governance',
  },
  {
    id: 'm1-h4',
    moduleId: 1,
    prompt:
      'Apple held $252B abroad pre-2017, ≈90% of its cash. Why was this RATIONAL from a shareholder-value perspective, but problematic for society?',
    choices: [
      'It was actually irrational',
      'The 25% repatriation tax differential made bringing cash home destroy ~$250M per $1B; deferring repatriation maximized shareholder value but reduced US tax revenue — TCJA 2017 partly resolved this',
      'Apple held cash abroad to avoid SEC scrutiny',
      'Apple did not have $252B abroad',
    ],
    answerIndex: 1,
    explanation:
      'A classic shareholder–society conflict. The 35% US rate vs. ~10% Irish rate created a 25-point penalty for repatriation. Shareholders gained from deferral; the US Treasury lost. TCJA introduced a flat 15.5%/8% repatriation tax to break the impasse.',
    difficulty: 'hard',
    topic: 'Society conflict',
  },
]

export const questionsByModule = (moduleId: number) =>
  QUESTIONS.filter((q) => q.moduleId === moduleId)
