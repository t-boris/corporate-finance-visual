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

  // ════════════════════════════════════════════════════════════
  // MODULE 2 · Financial Planning · 4 easy · 12 medium · 4 hard
  // ════════════════════════════════════════════════════════════

  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm2-e1',
    moduleId: 2,
    prompt: 'In the percentage-of-sales forecasting model, most income-statement items are assumed to:',
    choices: [
      'Stay constant in dollar terms',
      'Grow at the same rate as revenue (constant proportion of sales)',
      'Grow at the rate of inflation',
      'Equal the prior year plus a fixed dollar amount',
    ],
    answerIndex: 1,
    explanation:
      'The model holds items at a constant fraction of revenue, so they grow with sales. Key exceptions: interest expense (depends on debt) and one-time items (set to zero).',
    difficulty: 'easy',
    topic: 'Forecasting',
  },
  {
    id: 'm2-e2',
    moduleId: 2,
    prompt: 'Which expression defines Net Working Capital (NWC)?',
    choices: [
      'Cash + Receivables − Inventory',
      'Receivables + Inventory − Payables',
      'Current Assets − Cash',
      'Inventory + Payables − Receivables',
    ],
    answerIndex: 1,
    explanation:
      'NWC = Receivables + Inventory − Payables. An increase in NWC ties up cash and is treated as an investment (a negative cash flow).',
    difficulty: 'easy',
    topic: 'Working capital',
  },
  {
    id: 'm2-e3',
    moduleId: 2,
    prompt: 'The cash conversion cycle measures:',
    choices: [
      'How profitable a firm\'s products are',
      'How long it takes a firm to turn working-capital investments back into cash',
      'How much debt matures each year',
      'The firm\'s tax rate on operating income',
    ],
    answerIndex: 1,
    explanation:
      'CCC = Collection Period + Days in Inventory − Payable Period — the time from paying for inventory to collecting from customers, less supplier financing.',
    difficulty: 'easy',
    topic: 'Cash conversion cycle',
  },
  {
    id: 'm2-e4',
    moduleId: 2,
    prompt: 'Why is a bank line of credit described as "almost a substitute for cash"?',
    choices: [
      'Because the bank deposits cash into the firm every month',
      'Because its terms (limit and rate) are negotiated ahead of time, so the firm can draw on it when liquidity is needed',
      'Because it never charges any fees',
      'Because it converts inventory into cash automatically',
    ],
    answerIndex: 1,
    explanation:
      'The pre-negotiated limit and rate mean the bank has effectively pre-agreed to lend, so the line provides liquidity insurance — like cash on standby.',
    difficulty: 'easy',
    topic: 'Credit lines',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm2-m1',
    moduleId: 2,
    prompt:
      'PepsiCo\'s 2021 COGS was ≈$37.0B on revenue of ≈$79.5B. Using a percentage-of-sales model with 3.9% revenue growth, what is forecast 2022 COGS?',
    choices: ['≈ $35.6B', '≈ $37.0B', '≈ $38.5B', '≈ $41.1B'],
    answerIndex: 2,
    explanation:
      'COGS holds its proportion of sales, so it grows 3.9%: 37.0 × 1.039 ≈ $38.5B.',
    difficulty: 'medium',
    topic: 'Forecasting',
  },
  {
    id: 'm2-m2',
    moduleId: 2,
    prompt:
      'In the PepsiCo forecast, how should interest expense be projected, given $42.4B of debt at a 4% rate?',
    choices: [
      'As 3.9% of revenue, like the other items',
      'As the interest rate times the debt balance (≈4% × $42.4B), NOT a percentage of sales',
      'As zero, because it is a one-time item',
      'As a constant 12% of the change in revenue',
    ],
    answerIndex: 1,
    explanation:
      'Interest depends on how much DEBT the firm carries, not on revenue. 4% × $42.4B ≈ $1.7B per year — it must not be scaled with sales.',
    difficulty: 'medium',
    topic: 'Forecasting',
  },
  {
    id: 'm2-m3',
    moduleId: 2,
    prompt:
      'A company can factor a $300M receivable (due in one year) for $280M today. What is the implied annual interest rate?',
    choices: ['≈ 6.67%', '≈ 7.14%', '≈ 20.0%', '≈ 2.86%'],
    answerIndex: 1,
    explanation:
      'Implied rate = Face/Advance − 1 = 300/280 − 1 ≈ 7.14%. That is the rate at which $280M grows to $300M in a year — the cost of getting cash early.',
    difficulty: 'medium',
    topic: 'Factoring',
  },
  {
    id: 'm2-m4',
    moduleId: 2,
    prompt:
      'A firm has $100M of accounts receivable and $2B of annual revenue. What is its average collection period?',
    choices: ['≈ 5 days', '≈ 18 days', '≈ 37 days', '≈ 50 days'],
    answerIndex: 1,
    explanation:
      'Daily revenue = 2,000/365 ≈ $5.5M. Collection period = 100 / 5.5 ≈ 18 days.',
    difficulty: 'medium',
    topic: 'Working capital ratios',
  },
  {
    id: 'm2-m5',
    moduleId: 2,
    prompt:
      'A firm has a 30-day collection period, 70 days in inventory, and a 50-day payable period. What is its cash conversion cycle?',
    choices: ['150 days', '50 days', '90 days', '10 days'],
    answerIndex: 1,
    explanation:
      'CCC = 30 + 70 − 50 = 50 days. Payables shorten the cycle because the firm is effectively borrowing from suppliers.',
    difficulty: 'medium',
    topic: 'Cash conversion cycle',
  },
  {
    id: 'm2-m6',
    moduleId: 2,
    prompt:
      'PepsiCo ends 2021 with ≈$6.0B of cash. The 2022 forecast shows a net change in cash of −$50M. What is forecast year-end 2022 cash?',
    choices: ['≈ $5.95B', '≈ $6.05B', '≈ $3.1B', '≈ $50M'],
    answerIndex: 0,
    explanation:
      'Cash is an accounting identity: Cashₜ = Cashₜ₋₁ + net change = 6.0B − 0.05B ≈ $5.95B. (It then falls to ≈$3.1B by 2023.)',
    difficulty: 'medium',
    topic: 'Forecasting',
  },
  {
    id: 'm2-m7',
    moduleId: 2,
    prompt: 'In the cash flow statement, an increase in net working capital appears as:',
    choices: [
      'A positive cash flow (source of cash)',
      'A negative cash flow (an investment that uses cash)',
      'A financing inflow',
      'It does not affect cash flow',
    ],
    answerIndex: 1,
    explanation:
      'Working capital is an investment in the business. Increasing it (more inventory/receivables) ties up cash — a negative operating cash flow, like CapEx.',
    difficulty: 'medium',
    topic: 'Working capital',
  },
  {
    id: 'm2-m8',
    moduleId: 2,
    prompt:
      'Receivables can typically be financed at a higher fraction than inventory. If a firm finances 80% of a $75M receivable, how much cash does it raise immediately?',
    choices: ['$15M', '$37.5M', '$60M', '$75M'],
    answerIndex: 2,
    explanation:
      '80% × $75M = $60M raised now; the 20% haircut ($15M) must be funded by the firm until the receivable is collected.',
    difficulty: 'medium',
    topic: 'Working capital financing',
  },
  {
    id: 'm2-m9',
    moduleId: 2,
    prompt:
      'A firm keeps a $100M credit line open at a commitment fee of 0.25% per year. What does it pay annually just to keep the line available?',
    choices: ['$25M', '$2.5M', '$250,000', '$0 — commitment fees do not exist'],
    answerIndex: 2,
    explanation:
      'Commitment fee = 0.25% × $100M = $250,000/year. Fees are typically 0.1%–0.3% — like an insurance premium for liquidity.',
    difficulty: 'medium',
    topic: 'Credit lines',
  },
  {
    id: 'm2-m10',
    moduleId: 2,
    prompt:
      'A firm must buy $69M of inventory each quarter and a bank finances 50% (a 50% haircut). How is the purchase funded?',
    choices: [
      '$69M borrowed, $0 own cash',
      '$34.5M borrowed, $34.5M own cash',
      '$13.8M borrowed, $55.2M own cash',
      '$60M borrowed, $9M own cash',
    ],
    answerIndex: 1,
    explanation:
      'With a 50% haircut the firm borrows $34.5M and contributes $34.5M of its own cash — just like a mortgage loan-to-value.',
    difficulty: 'medium',
    topic: 'Working capital financing',
  },
  {
    id: 'm2-m11',
    moduleId: 2,
    prompt:
      'Why might a firm with very low liquidity ratios (like Altice) NOT actually face a liquidity problem?',
    choices: [
      'Low ratios always mean imminent bankruptcy',
      'It can generate cash from profits and refinance (roll over) maturing debt, and it holds an undrawn credit line',
      'Liquidity ratios are never relevant',
      'Because it has no current liabilities',
    ],
    answerIndex: 1,
    explanation:
      'Balance-sheet liquidity is only part of the picture: operating cash flow funds expenses, maturing debt is usually refinanced, and an undrawn credit line (Altice: ~$1.6B) backstops a crisis.',
    difficulty: 'medium',
    topic: 'Liquidity risk',
  },
  {
    id: 'm2-m12',
    moduleId: 2,
    prompt:
      'Boeing\'s cash conversion cycle is ≈484 days while Walmart\'s is ≈6 days. What best explains the gap?',
    choices: [
      'Walmart is much less profitable',
      'The nature of the business: Boeing holds huge inventory and waits long to be paid; Walmart sells fast and pays suppliers slowly',
      'Boeing has no payables',
      'Walmart factors all of its receivables',
    ],
    answerIndex: 1,
    explanation:
      'CCC depends on the business model. Aerospace requires enormous inventory and long sales/collection times; a retailer turns goods over in days and stretches payables, giving a tiny CCC.',
    difficulty: 'medium',
    topic: 'Cash conversion cycle',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm2-h1',
    moduleId: 2,
    prompt:
      'In the receivables example, a financing shock cuts the financeable fraction from 80% to 50%, and the firm has only $15M of internal cash. Sales fall from $75M to about $35.7M. What is the key lesson?',
    choices: [
      'Demand collapsed, so sales fell',
      'A pure financing shock — not a demand shock — can force sales down via a multiplier: less financing → less production → lower sales → even less financing',
      'The firm should immediately issue equity',
      'Factoring always eliminates this risk',
    ],
    answerIndex: 1,
    explanation:
      'Demand is intact ($75M of buyers exist). Because the firm cannot fund its COGS, it produces and sells less; lower sales shrink the financeable base further — a self-reinforcing spiral driven purely by financing.',
    difficulty: 'hard',
    topic: 'Working capital shock',
  },
  {
    id: 'm2-h2',
    moduleId: 2,
    prompt:
      'The forecast shows PepsiCo CAN fund the expansion internally — cash stays positive (~$3.1B by 2023). Why might management still raise external financing?',
    choices: [
      'Because the model proves cash will go negative',
      'The cash ratio falls sharply (≈23% → ≈12%), and some cash is trapped abroad, so managers may prefer to preserve their liquidity buffer',
      'Because internal funds are illegal to use for CapEx',
      'Because dividends must be cut to zero first',
    ],
    answerIndex: 1,
    explanation:
      'Having "enough" cash is not the whole story. Depleting reserves cuts the cash ratio from ~23% to ~12%, and multinational cash can be costly to repatriate — so a CFO may still issue debt to keep a liquidity cushion.',
    difficulty: 'hard',
    topic: 'Financial planning',
  },
  {
    id: 'm2-h3',
    moduleId: 2,
    prompt:
      'PepsiCo needs ~$2.9B in 2023. Drawing on Almeida & Weisbenner\'s crisis research (and the Avis/Budget episode), what is the prudent financing strategy?',
    choices: [
      'Always wait until the exact moment funds are needed to minimize interest',
      'Consider issuing earlier and borrowing somewhat MORE than needed for precaution, holding the excess as cash — because refinancing may be impossible in a future crisis',
      'Never borrow; only use internal cash',
      'Borrow exactly $2.9B and not a dollar more',
    ],
    answerIndex: 1,
    explanation:
      'Waiting exposes the firm to rollover risk (Budget was forced to refinance in 2008 and was later absorbed by Avis). Issuing early and borrowing a precautionary buffer — held as cash — insures against bad future market conditions.',
    difficulty: 'hard',
    topic: 'Financing timing',
  },
  {
    id: 'm2-h4',
    moduleId: 2,
    prompt:
      'In the inventory example (sales $75M/qtr, COGS $69M, 50% financing), Q1 sales come in at $60M. The firm generates only $25.5M but needs $34.5M for next quarter\'s inventory. With no external cash, what happens?',
    choices: [
      'Nothing — the shortfall is irrelevant',
      'It can only buy ~$51M of inventory, so Q2 sales fall to ~$55.4M even though demand is fine — the shock propagates',
      'Sales automatically recover to $75M',
      'The bank covers the entire shortfall for free',
    ],
    answerIndex: 1,
    explanation:
      'With $25.5M of own cash and 50% financing, it can fund only ~$51M of inventory (vs. $69M needed), so it cannot meet demand: Q2 sales drop to ~$55.4M. A temporary sales dip becomes a lasting cash crunch — mitigated by holding cash or a credit line.',
    difficulty: 'hard',
    topic: 'Working capital shock',
  },

  // ════════════════════════════════════════════════════════════
  // MODULE 3 · Making Investment Decisions · 4 easy · 12 medium · 4 hard
  // ════════════════════════════════════════════════════════════

  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm3-e1',
    moduleId: 3,
    prompt: 'What is the Net Present Value (NPV) of a project?',
    choices: [
      'This year\'s accounting profit from the project',
      'The sum of all incremental cash flows, today and in the future, discounted to the present',
      'The undiscounted sum of all future cash flows',
      'The project\'s payback period in years',
    ],
    answerIndex: 1,
    explanation:
      'NPV discounts every incremental ("new minus old") cash flow back to today and adds them up. Undiscounted sums and accounting profit ignore the time value of money.',
    difficulty: 'easy',
    topic: 'NPV',
  },
  {
    id: 'm3-e2',
    moduleId: 3,
    prompt: 'According to the NPV decision rule, a firm should:',
    choices: [
      'Accept all projects with positive NPV and reject all with negative NPV',
      'Accept the project with the highest IRR regardless of NPV',
      'Accept any project that increases this year\'s EPS',
      'Reject any project that requires upfront investment',
    ],
    answerIndex: 0,
    explanation:
      'Because NPV equals the change in shareholder wealth, accepting positive-NPV and rejecting negative-NPV projects is exactly equivalent to maximizing shareholder value.',
    difficulty: 'easy',
    topic: 'NPV decision rule',
  },
  {
    id: 'm3-e3',
    moduleId: 3,
    prompt: 'The Internal Rate of Return (IRR) is defined as:',
    choices: [
      'The discount rate that makes NPV equal to zero',
      'The average accounting return over the project life',
      'The firm\'s cost of equity',
      'The growth rate of the project\'s cash flows',
    ],
    answerIndex: 0,
    explanation:
      'IRR is the rate of return of an investment — mathematically, the discount rate at which the project\'s NPV is exactly zero.',
    difficulty: 'easy',
    topic: 'IRR',
  },
  {
    id: 'm3-e4',
    moduleId: 3,
    prompt: 'Which expression is the "magic formula" for a project\'s free cash flow?',
    choices: [
      'Revenue − Net Income',
      'Sales − Costs − Taxes − Investments',
      'EBITDA − Depreciation',
      'Cash In − Dividends',
    ],
    answerIndex: 1,
    explanation:
      'FCF = Sales − Costs − Taxes − Investments works under any tax code (only the tax line changes). Sales − Costs ≈ EBITDA; Investments include CapEx and working capital.',
    difficulty: 'easy',
    topic: 'Free cash flow',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm3-m1',
    moduleId: 3,
    prompt: 'What is the present value of $1,000,000 received in one year if the discount rate is 6%?',
    choices: ['$1,060,000', '$943,396', '$1,000,000', '$16,666,667'],
    answerIndex: 1,
    explanation:
      'PV = C / (1 + R)^T = 1,000,000 / 1.06 = $943,396. The $16,666,667 figure is the value of $1M received every year forever at 6%.',
    difficulty: 'medium',
    topic: 'Discounting',
  },
  {
    id: 'm3-m2',
    moduleId: 3,
    prompt: 'What is the present value of $1,000,000 received every year forever (a perpetuity) at a 6% discount rate?',
    choices: ['$6,000,000', '$16,666,667', '$943,396', '$1,000,000'],
    answerIndex: 1,
    explanation:
      'Perpetuity PV = C / R = 1,000,000 / 0.06 = $16,666,667 (growth = 0 in the growing-perpetuity formula).',
    difficulty: 'medium',
    topic: 'Perpetuity',
  },
  {
    id: 'm3-m3',
    moduleId: 3,
    prompt:
      'Speeding up receivables generates +$82M today but −$20M every year forever. At a 10% discount rate, what is the NPV?',
    choices: ['+$62M', '−$118M', '−$200M', '+$82M'],
    answerIndex: 1,
    explanation:
      'NPV = 82 + (−20 / 0.10) = 82 − 200 = −$118M. The lost future cash flows ($200M PV) far exceed the $82M collected today, so the firm keeps the old system.',
    difficulty: 'medium',
    topic: 'NPV calculation',
  },
  {
    id: 'm3-m4',
    moduleId: 3,
    prompt:
      'When computing NPV in Excel, why must the date-0 cash flow be added OUTSIDE the NPV() function?',
    choices: [
      'Excel cannot handle negative numbers inside NPV()',
      'Excel assumes the first cash flow in NPV() occurs one year out, so it would wrongly discount a date-0 flow',
      'The date-0 flow must be discounted twice',
      'It makes no difference where you put it',
    ],
    answerIndex: 1,
    explanation:
      'Excel\'s NPV() treats its first argument as occurring in one year. A date-0 flow happens today and must not be discounted, so use =CF0 + NPV(rate; CF1:CFn). (IRR(), by contrast, takes all flows including date 0.)',
    difficulty: 'medium',
    topic: 'NPV in Excel',
  },
  {
    id: 'm3-m5',
    moduleId: 3,
    prompt:
      'An investment costs $10,000 today and pays $500 next year, growing 4% forever. What is its IRR?',
    choices: ['5%', '9%', '4%', '13%'],
    answerIndex: 1,
    explanation:
      'Set NPV = 0: −10,000 + 500/(R − 0.04) = 0 → 500/(R − 0.04) = 10,000 → R − 0.04 = 0.05 → R = 9%.',
    difficulty: 'medium',
    topic: 'IRR calculation',
  },
  {
    id: 'm3-m6',
    moduleId: 3,
    prompt:
      'For the same project (−$10,000 then $500 growing 4% forever), what is the NPV at an 8% discount rate?',
    choices: ['−$1,667', '+$2,500', '$0', '+$12,500'],
    answerIndex: 1,
    explanation:
      'NPV = −10,000 + 500/(0.08 − 0.04) = −10,000 + 12,500 = +$2,500. Positive because the 8% benchmark is below the 9% IRR. (At 10% it would be −$1,667.)',
    difficulty: 'medium',
    topic: 'NPV vs IRR',
  },
  {
    id: 'm3-m7',
    moduleId: 3,
    prompt: 'Using IRR to make a decision, a project is desirable when:',
    choices: [
      'Its IRR is below the discount rate',
      'Its IRR exceeds the benchmark (discount rate)',
      'Its IRR is exactly zero',
      'Its IRR equals the inflation rate',
    ],
    answerIndex: 1,
    explanation:
      'Invest if IRR > discount rate. This is equivalent to NPV > 0 for conventional cash flows. A 9% IRR project is good only if the required return is below 9%.',
    difficulty: 'medium',
    topic: 'IRR decision rule',
  },
  {
    id: 'm3-m8',
    moduleId: 3,
    prompt: 'For a conventional project, the relationship between NPV and IRR is:',
    choices: [
      'NPV > 0 if and only if IRR > the discount rate',
      'NPV and IRR always give opposite recommendations',
      'NPV > 0 only if IRR = 0',
      'IRR > discount rate guarantees NPV < 0',
    ],
    answerIndex: 0,
    explanation:
      'On the NPV profile, NPV is positive exactly when the discount rate is below the IRR (where the curve crosses zero). The two rules agree — except for sign-flip or scale problems.',
    difficulty: 'medium',
    topic: 'NPV–IRR equivalence',
  },
  {
    id: 'm3-m9',
    moduleId: 3,
    prompt:
      'A machine is sold for $4,000 (salvage) at the end of its life. It is fully depreciated (cost basis 0) and the tax rate is 21%. What is the after-tax salvage value?',
    choices: ['$4,000', '$3,160', '$840', '$3,360'],
    answerIndex: 1,
    explanation:
      'With cost basis 0, the entire $4,000 is taxable: 4,000 × (1 − 0.21) = $3,160. This is the cash that enters the final-year free cash flow.',
    difficulty: 'medium',
    topic: 'After-tax salvage',
  },
  {
    id: 'm3-m10',
    moduleId: 3,
    prompt:
      'The machine project has NPV $15,880 / IRR 16.4% under pre-2018 accelerated depreciation and NPV $17,572 / IRR 18.8% under post-2018 full expensing. What does this show?',
    choices: [
      'Full expensing destroys value because depreciation disappears',
      'Letting firms deduct 100% of CapEx in year 0 brings tax shields forward, raising both NPV and IRR',
      'The two tax regimes always give identical NPV',
      'IRR fell after 2018 while NPV rose',
    ],
    answerIndex: 1,
    explanation:
      'Full expensing creates a negative tax (a tax shield) in year 0 instead of spreading depreciation over five years. Earlier tax savings raise both NPV ($15,880 → $17,572) and IRR (16.4% → 18.8%).',
    difficulty: 'medium',
    topic: 'Depreciation & taxes',
  },
  {
    id: 'm3-m11',
    moduleId: 3,
    prompt:
      'Project A turns 1¢ into 2¢; Project B turns $100 into $200. Both have a 100% IRR and the benchmark is 10%. Which is the better single investment?',
    choices: [
      'Project A — the IRRs are equal so size is irrelevant',
      'Project B — it has the same IRR but a far larger NPV (in dollars)',
      'They are exactly equivalent',
      'Neither — both have negative NPV',
    ],
    answerIndex: 1,
    explanation:
      'Both are positive-NPV (take both if you can), but IRR ignores scale. Only NPV, measured in dollars, captures that doubling $100 creates far more value than doubling a penny.',
    difficulty: 'medium',
    topic: 'IRR scale problem',
  },
  {
    id: 'm3-m12',
    moduleId: 3,
    prompt:
      'In the R&D case, if the drug succeeds the firm invests $1B and the present value of the resulting cash flows is $1,658M. What is the NPV conditional on success?',
    choices: ['$1,658M', '$658M', '$1,000M', '−$342M'],
    answerIndex: 1,
    explanation:
      'NPV | success = PV of cash flows − follow-on investment = 1,658 − 1,000 = $658M. This large upside is then weighted by the small 5% success probability and discounted for the lag.',
    difficulty: 'medium',
    topic: 'Real options / R&D',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm3-h1',
    moduleId: 3,
    prompt:
      'A project pays +$20M today and requires −$22M next year. Excel reports an IRR of 10%, yet the project is clearly bad. What is the lesson?',
    choices: [
      'Excel computed the IRR incorrectly',
      'When a negative cash flow follows a positive one, IRR is unreliable/misleading — use NPV instead',
      'A 10% IRR always means accept',
      'The project is actually excellent',
    ],
    answerIndex: 1,
    explanation:
      'A positive-then-negative pattern is like borrowing: the "10%" does not represent a real return. The rule: if a negative cash flow follows a positive one, do not use IRR — rely on NPV.',
    difficulty: 'hard',
    topic: 'IRR pitfalls',
  },
  {
    id: 'm3-h2',
    moduleId: 3,
    prompt:
      'R&D costs $30M today; success probability is 5%; on success (after a 3-year lag) the NPV is $658M; the discount rate is 6%. What is the NPV of the R&D, and the decision?',
    choices: [
      '+$628M — invest',
      '−$2.37M — do not invest, despite the $658M upside',
      '+$658M — invest',
      '−$30M — do not invest',
    ],
    answerIndex: 1,
    explanation:
      'NPV = −30 + 0.05 × 658 / 1.06³ = −30 + 27.63 = −$2.37M. The high failure risk and long lag outweigh a large conditional upside, so the project is rejected.',
    difficulty: 'hard',
    topic: 'R&D valuation',
  },
  {
    id: 'm3-h3',
    moduleId: 3,
    prompt:
      'After patent expiry the drug earns $20M/year forever starting in YEAR 11, at a 6% discount rate. How is this perpetuity valued back to today?',
    choices: [
      'Compute 20/0.06 = $333M and use it directly as the PV today',
      'Compute 20/0.06 = $333M (a value as of year 10), then discount it 10 more years to today',
      'Discount $20M by 11 years and stop',
      'Multiply $20M by 11 years',
    ],
    answerIndex: 1,
    explanation:
      'The growing-perpetuity formula gives a value one period BEFORE the first cash flow. A flow starting in year 11 yields 20/0.06 = $333M as of year 10, which must then be discounted 10 years to the present (≈$186M).',
    difficulty: 'hard',
    topic: 'Perpetuity timing',
  },
  {
    id: 'm3-h4',
    moduleId: 3,
    prompt:
      'In the R&D model, raising the success probability from 5% to 10% (with a larger $1.2B follow-on and a $15M generic perpetuity) flips the NPV from −$2.37M to about +$4.56M. What is the key takeaway?',
    choices: [
      'NPV is independent of the success probability',
      'R&D NPV is extremely sensitive to the probability and timing assumptions, so estimating them well is critical',
      'R&D should always be accepted',
      'The discount rate is the only thing that matters',
    ],
    answerIndex: 1,
    explanation:
      'A small change in the (hard-to-estimate) success probability and follow-on assumptions reverses the decision. Real-option/R&D valuations hinge on the quality of these probability estimates — "educated guesswork."',
    difficulty: 'hard',
    topic: 'Sensitivity analysis',
  },

  // ════════════════════ MODULE 4 ════════════════════
  // M&A, Risk, and Performance Evaluation · 4 easy · 12 medium · 4 hard
  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm4-e1',
    moduleId: 4,
    prompt: 'What is a "synergy" in an M&A deal?',
    choices: [
      'The cash the acquirer holds before the deal',
      'The extra value created because the two firms are worth more together than apart',
      'The fee paid to investment bankers',
      'The premium paid to the acquirer\'s own shareholders',
    ],
    answerIndex: 1,
    explanation:
      'Synergy is the "2 + 2 = 5" idea — the value added by combining the firms. It equals the total NPV of the merger.',
    difficulty: 'easy',
    topic: 'Synergy',
  },
  {
    id: 'm4-e2',
    moduleId: 4,
    prompt: 'Which is considered a BAD reason to engage in an M&A deal?',
    choices: [
      'Economies of scale',
      'Market power',
      'Acquiring a firm just because you have idle cash',
      'Eliminating an inefficient management team',
    ],
    answerIndex: 2,
    explanation:
      'Spending idle cash is a classic bad motive: Harford found cash-rich acquirers destroy value. Scale, market power, and eliminating inefficiency are rational motives.',
    difficulty: 'easy',
    topic: 'M&A motives',
  },
  {
    id: 'm4-e3',
    moduleId: 4,
    prompt: 'What does beta (β) measure?',
    choices: [
      'A company\'s book leverage',
      'The risk of a company — how its returns move with the market',
      'The dividend yield',
      'The yield to maturity on the firm\'s bonds',
    ],
    answerIndex: 1,
    explanation:
      'Beta captures how a stock\'s returns co-move with the market. High beta = high risk (β > 1 amplifies market moves).',
    difficulty: 'easy',
    topic: 'Beta',
  },
  {
    id: 'm4-e4',
    moduleId: 4,
    prompt: 'EVA (Economic Value Added) tells you whether a company or division…',
    choices: [
      'Has more cash than its competitors',
      'Earns more than its cost of capital in a given year',
      'Pays a dividend',
      'Has a positive book value of equity',
    ],
    answerIndex: 1,
    explanation:
      'EVA = OPAT − WACC × Operating Assets. Positive EVA means the business generated real economic profit above the required return on its invested capital.',
    difficulty: 'easy',
    topic: 'EVA',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm4-m1',
    moduleId: 4,
    prompt: 'Why is buying a firm in a different industry to "diversify risk" a bad reason for M&A?',
    choices: [
      'Diversification is illegal',
      'Shareholders can diversify on their own, more cheaply, via index funds',
      'It always triggers antitrust review',
      'It reduces the acquirer\'s cash',
    ],
    answerIndex: 1,
    explanation:
      'Managers should not diversify for shareholders, who already hold diversified portfolios. The modern trend is more focus and less conglomeration (e.g. GE breaking up).',
    difficulty: 'medium',
    topic: 'M&A motives',
  },
  {
    id: 'm4-m2',
    moduleId: 4,
    prompt: 'In the HP–Compaq case, annual cost savings were $2.5B and the profit impact of the $4.1B revenue loss was ~$0.5B. With a 26% tax rate, what is the after-tax annual synergy cash flow?',
    choices: ['$2.0B', '$1.48B', '$2.5B', '$0.5B'],
    answerIndex: 1,
    explanation:
      'Pre-tax synergy = 2.5 − 0.5 = $2.0B. After tax: 2.0 × (1 − 0.26) = $1.48B.',
    difficulty: 'medium',
    topic: 'Synergy valuation',
  },
  {
    id: 'm4-m3',
    moduleId: 4,
    prompt: 'The relationship between an acquirer\'s NPV, the synergy, and the premium is:',
    choices: [
      'NPV(acquirer) = Synergy + Premium',
      'NPV(acquirer) = Synergy − Premium',
      'NPV(acquirer) = Premium − Synergy',
      'NPV(acquirer) = Synergy × Premium',
    ],
    answerIndex: 1,
    explanation:
      'The target captures the premium (NPV(target) = Premium); the acquirer keeps what is left, Synergy − Premium. The deal is positive-NPV for the acquirer if Synergy > Premium.',
    difficulty: 'medium',
    topic: 'Deal pricing',
  },
  {
    id: 'm4-m4',
    moduleId: 4,
    prompt: 'What is the typical average premium paid for public targets in M&A?',
    choices: ['About 5%', 'About 30%', 'About 70%', 'About 100%'],
    answerIndex: 1,
    explanation:
      'The "magic number" is ~30%. Because of it, deals must generate large synergies just to be positive-NPV for the acquirer.',
    difficulty: 'medium',
    topic: 'Deal pricing',
  },
  {
    id: 'm4-m5',
    moduleId: 4,
    prompt: 'On average, how do the stock prices of TARGETS and ACQUIRERS react to a merger announcement?',
    choices: [
      'Both rise ~20%',
      'Targets rise ~20%; acquirers ≈ 0% on average',
      'Both fall sharply',
      'Targets ≈ 0%; acquirers rise ~20%',
    ],
    answerIndex: 1,
    explanation:
      'Research (unchanged over decades): targets earn a significant ~20% announcement return; acquirers are flat on average — they tend to transfer the synergy to the target via the premium.',
    difficulty: 'medium',
    topic: 'Market reaction',
  },
  {
    id: 'm4-m6',
    moduleId: 4,
    prompt: 'Why can the yield to maturity (YTM) on a firm\'s long-term bonds be used to approximate the required return on debt?',
    choices: [
      'Because bonds never default',
      'Because in market equilibrium a traded bond\'s NPV ≈ 0, so its expected return equals the required return',
      'Because YTM is set by the government',
      'Because the firm guarantees it',
    ],
    answerIndex: 1,
    explanation:
      'For a freely traded asset NPV ≈ 0; when NPV = 0, expected return = required return. So YTM ≈ required return on debt — valid only if the firm is far from bankruptcy.',
    difficulty: 'medium',
    topic: 'Required return on debt',
  },
  {
    id: 'm4-m7',
    moduleId: 4,
    prompt: 'Why must we use the CAPM (not a yield to maturity) to estimate the required return on EQUITY?',
    choices: [
      'Equity is risk-free',
      'Equity has no promised cash flows — it is a residual claim, so there is no YTM',
      'Equity always pays a fixed dividend',
      'The government sets the equity return',
    ],
    answerIndex: 1,
    explanation:
      'Shareholders receive whatever is left after debt is paid — there is no promised cash flow and thus no YTM. CAPM prices equity risk via beta and the market risk premium.',
    difficulty: 'medium',
    topic: 'CAPM',
  },
  {
    id: 'm4-m8',
    moduleId: 4,
    prompt: 'Using CAPM with a risk-free rate of 3% and a market risk premium of 5%, what is the required return on equity for a firm with β = 1.0?',
    choices: ['5%', '8%', '3%', '15%'],
    answerIndex: 1,
    explanation:
      'r_E = R_f + β(R_m − R_f) = 3% + 1.0 × 5% = 8% — also the expected market return when β = 1.',
    difficulty: 'medium',
    topic: 'CAPM',
  },
  {
    id: 'm4-m9',
    moduleId: 4,
    prompt: 'When computing leverage (D/V) for the WACC, which value of equity must you use?',
    choices: [
      'Book value of equity',
      'Market value of equity',
      'Par value of shares',
      'Retained earnings',
    ],
    answerIndex: 1,
    explanation:
      'Always market value. Book equity ignores future value, overstates leverage, understates WACC, and could let you accept negative-NPV projects.',
    difficulty: 'medium',
    topic: 'WACC',
  },
  {
    id: 'm4-m10',
    moduleId: 4,
    prompt: 'For EVA, why is OPAT (operating profit after taxes) used instead of Net Income?',
    choices: [
      'OPAT is always larger',
      'We measure the whole business, so we use a profit measure BEFORE interest payments',
      'Net Income is not reported',
      'OPAT excludes taxes entirely',
    ],
    answerIndex: 1,
    explanation:
      'To evaluate the whole company/division you use operating profit (before interest), then subtract taxes. Net Income is after interest and reflects financing, not operating performance.',
    difficulty: 'medium',
    topic: 'EVA',
  },
  {
    id: 'm4-m11',
    moduleId: 4,
    prompt: 'When computing "operating assets" for EVA, why is cash typically subtracted from total assets?',
    choices: [
      'Cash is not on the balance sheet',
      'Cash is usually invested in financial assets (deposits, T-bonds), not the business itself',
      'Cash is a liability',
      'Cash is taxed twice',
    ],
    answerIndex: 1,
    explanation:
      'Operating assets = book assets − cash, because cash usually sits in financial assets rather than the operating business. (Exception: some firms need operating cash, e.g. a supermarket.)',
    difficulty: 'medium',
    topic: 'Operating assets',
  },
  {
    id: 'm4-m12',
    moduleId: 4,
    prompt: 'In sensitivity analysis, the project NPV becomes negative under the worst-case sales scenario. What should you conclude?',
    choices: [
      'Reject the project immediately',
      'Nothing dramatic — the expected-value NPV is unchanged; almost any project is negative under some assumption',
      'The discount rate is wrong',
      'Sales forecasts are useless',
    ],
    answerIndex: 1,
    explanation:
      'NPV uses the expected value, which is unchanged. Value creation requires taking risk, so NPV will always be negative under some scenario. Sensitivity analysis is for validating forecasts and planning, not for rejecting on the worst case.',
    difficulty: 'medium',
    topic: 'Sensitivity analysis',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm4-h1',
    moduleId: 4,
    prompt: 'HP–Compaq: an after-tax synergy of $1.48B starts in 2004 and grows at 3%; the discount rate is 12%. Using the growing perpetuity, what is the synergy value as of 2001 (the announcement year)?',
    choices: [
      '$16.4B (no discounting)',
      '~$13.1B (perpetuity value, then discounted two years)',
      '$1.48B',
      '$2.0B',
    ],
    answerIndex: 1,
    explanation:
      '1.48 / (0.12 − 0.03) = $16.4B, valued as of 2003 (one year before the 2004 flow). Discount two years to 2001: 16.4 / 1.12² ≈ $13.1B.',
    difficulty: 'hard',
    topic: 'Synergy valuation',
  },
  {
    id: 'm4-h2',
    moduleId: 4,
    prompt: 'HP wants to offer $16 per Compaq share in a STOCK deal, using HP\'s pre-deal price of $23. What is the exchange ratio?',
    choices: [
      '1.44 HP shares per Compaq share',
      '0.69 HP shares per Compaq share',
      '0.63 HP shares per Compaq share',
      '16 HP shares per Compaq share',
    ],
    answerIndex: 1,
    explanation:
      'Exchange ratio = offer per share / acquirer price = 16 / 23 ≈ 0.69. (The actual deal used 0.6325, derived from a ~30% premium.)',
    difficulty: 'hard',
    topic: 'Means of payment',
  },
  {
    id: 'm4-h3',
    moduleId: 4,
    prompt: 'PepsiCo: r_E = 6%, r_D = 4%, tax = 21%, D = $40B, E = $240B. What is the WACC?',
    choices: ['6.0%', '5.6%', '4.7%', '4.0%'],
    answerIndex: 1,
    explanation:
      'V = 280, so E/V = 86%, D/V = 14%. WACC = 6%×0.86 + 4%×0.14×(1−0.21) = 5.16% + 0.44% ≈ 5.6%.',
    difficulty: 'hard',
    topic: 'WACC',
  },
  {
    id: 'm4-h4',
    moduleId: 4,
    prompt: 'For Altria\'s wine division (Ste Michelle), why is using Altria\'s company beta of 0.5 the WRONG choice, and what is used instead?',
    choices: [
      'It is correct — use 0.5',
      '0.5 is the tobacco beta (>95% of Altria); a wine beta (industry ≈0.82 or pure-play Constellation ≈1.07) is needed',
      'Wine has no beta, so assume zero',
      'Use the risk-free rate instead of beta',
    ],
    answerIndex: 1,
    explanation:
      'Altria\'s beta reflects tobacco, which dominates its value. The wine division needs its own beta — via an industry average (~0.82) or a pure-play (Constellation Brands ~1.07) — giving WACC ≈ 7.2% and EVA ≈ −$48M.',
    difficulty: 'hard',
    topic: 'Divisional cost of capital',
  },

  // ════════════ MODULE 5 · Capital Structure ════════════
  // 20 questions. Difficulty mix: 4 easy · 12 medium · 4 hard.
  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm5-e1',
    moduleId: 5,
    prompt: 'What is the central decision studied in Module 5?',
    choices: [
      'Which projects to accept (NPV ranking)',
      'Whether to raise new financing with debt or equity, and in what proportion',
      'How to value a merger synergy',
      'How to forecast next year\'s sales',
    ],
    answerIndex: 1,
    explanation:
      'Module 5 is about raising financing — the capital structure decision: debt vs. equity and the optimal mix.',
    difficulty: 'easy',
    topic: 'Overview',
  },
  {
    id: 'm5-e2',
    moduleId: 5,
    prompt: 'According to the pecking order, which source of financing do firms prefer FIRST?',
    choices: ['External equity', 'Long-term bonds', 'Internal funds (own cash flows)', 'Bank loans'],
    answerIndex: 2,
    explanation:
      'The pecking order is internal funds first, then debt, then external equity. Internal funds are the largest source in the data.',
    difficulty: 'easy',
    topic: 'Pecking order',
  },
  {
    id: 'm5-e3',
    moduleId: 5,
    prompt: '"Dilution is an illusion" means that issuing equity at a fair price…',
    choices: [
      'always raises the stock price',
      'does not change the stock price, because the cash received offsets the new shares',
      'reduces the stock price in proportion to the new shares',
      'has no effect on shares outstanding',
    ],
    answerIndex: 1,
    explanation:
      'Price = market value of equity / shares. Issuing at fair value raises both numerator (cash in) and denominator (new shares) proportionally, so the price is unchanged.',
    difficulty: 'easy',
    topic: 'Dilution',
  },
  {
    id: 'm5-e4',
    moduleId: 5,
    prompt: 'Which profitability measure does the course say RISES when a profitable firm issues debt?',
    choices: ['Net income', 'OPAT (operating profit after taxes)', 'Revenue', 'Earnings per share'],
    answerIndex: 1,
    explanation:
      'Net income falls (more interest), but OPAT rises because deductible interest lowers taxes. The course measures profitability with OPAT.',
    difficulty: 'easy',
    topic: 'Leverage & taxes',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm5-m1',
    moduleId: 5,
    prompt: 'PepsiCo issues $7B of debt at a 4% interest rate. What is the new annual interest expense it adds?',
    choices: ['$70M', '$280M', '$700M', '$28M'],
    answerIndex: 1,
    explanation: '$7,000M × 4% = $280M of additional interest per year.',
    difficulty: 'medium',
    topic: 'Mechanics of issuance',
  },
  {
    id: 'm5-m2',
    moduleId: 5,
    prompt: 'PepsiCo raises $7B of equity at a share price of $173. Approximately how many new shares are issued?',
    choices: ['4.05M', '40.46M', '404.6M', '1.21B'],
    answerIndex: 1,
    explanation: 'New shares = $7,000M / $173 ≈ 40.46M shares.',
    difficulty: 'medium',
    topic: 'Mechanics of issuance',
  },
  {
    id: 'm5-m3',
    moduleId: 5,
    prompt: 'Under fair pricing / efficient markets, what is the NPV of issuing debt and the NPV of issuing equity?',
    choices: [
      'Debt NPV > 0; equity NPV < 0',
      'Both are approximately zero',
      'Both are strongly positive',
      'Debt NPV = 0; equity NPV > 0',
    ],
    answerIndex: 1,
    explanation:
      'If securities are fairly priced, the cash raised exactly offsets the obligations (interest/principal) or the new shares, so both issuances have NPV ≈ 0.',
    difficulty: 'medium',
    topic: 'NPV of issuance',
  },
  {
    id: 'm5-m4',
    moduleId: 5,
    prompt: 'Consider EBIT = $4,259M and current taxes = $681.8M. Using the course definition OPAT = EBIT − taxes, what is current OPAT?',
    choices: ['$3,577.2M', '$4,259M', '$3,409.0M', '$2,727.2M'],
    answerIndex: 0,
    explanation: 'OPAT = 4,259 − 681.8 = $3,577.2M (FIN 570 uses taxes as reported, not re-grossed-up).',
    difficulty: 'medium',
    topic: 'OPAT',
  },
  {
    id: 'm5-m5',
    moduleId: 5,
    prompt: 'A firm with EBIT = $4,259M and EBT-based taxes issues $12B of debt at 4%, raising interest from $850M to $1,330M; new EBT = $2,929M taxed at 20% = $585.8M. What is the new OPAT (= EBIT − taxes)?',
    choices: ['$2,343.2M', '$3,577.2M', '$3,673.2M', '$2,583.1M'],
    answerIndex: 2,
    explanation: 'OPAT = 4,259 − 585.8 = $3,673.2M. OPAT rises after the debt issue because taxes fall.',
    difficulty: 'medium',
    topic: 'Leverage & taxes',
  },
  {
    id: 'm5-m6',
    moduleId: 5,
    prompt: 'In the same example (EBT = $2,929M taxed at 20%), what is the new NET INCOME after the $12B debt issue?',
    choices: ['$3,673.2M', '$2,343.2M', '$2,929.0M', '$3,577.2M'],
    answerIndex: 1,
    explanation: 'Net income = EBT − taxes = 2,929 − 585.8 = $2,343.2M. Net income falls even though OPAT rises.',
    difficulty: 'medium',
    topic: 'Net income vs OPAT',
  },
  {
    id: 'm5-m7',
    moduleId: 5,
    prompt: 'Why is the "debt is cheaper than equity, so issue debt to lower WACC" argument an illusion?',
    choices: [
      'Because debt is actually more expensive than equity',
      'Because raising leverage increases risk, so both the cost of debt and the cost of equity rise',
      'Because the tax rate is zero',
      'Because WACC ignores the cost of debt',
    ],
    answerIndex: 1,
    explanation:
      'As leverage rises, the firm gets riskier, so r_E and r_D both rise. The naïve calc holds them fixed; M&M shows the net effect on WACC is not a mechanical decline.',
    difficulty: 'medium',
    topic: 'M&M',
  },
  {
    id: 'm5-m8',
    moduleId: 5,
    prompt: 'The Modigliani–Miller (no-tax) proposition states that, under ideal conditions, the firm\'s WACC…',
    choices: [
      'falls steadily as leverage rises',
      'is independent of leverage (constant)',
      'rises steadily as leverage rises',
      'equals the cost of debt',
    ],
    answerIndex: 1,
    explanation:
      'M&M: with fairly priced securities and no frictions (incl. no interest tax deduction), WACC does not depend on leverage — r_E and r_D adjust to keep it constant.',
    difficulty: 'medium',
    topic: 'M&M',
  },
  {
    id: 'm5-m9',
    moduleId: 5,
    prompt: 'Eckbo & Masulis (1995): what is the average stock-price reaction to a BOND issue vs an EQUITY issue?',
    choices: [
      'Both ≈ 0%',
      'Bonds ≈ 0%; equity falls ≈ 1.5%–3%',
      'Bonds fall ≈ 3%; equity ≈ 0%',
      'Both rise ≈ 3%',
    ],
    answerIndex: 1,
    explanation:
      'Debt issuance has ≈ 0% reaction (consistent with M&M); equity issuance lowers the price by about 1.5%–3% on average — markets see it as bad news.',
    difficulty: 'medium',
    topic: 'Evidence from the field',
  },
  {
    id: 'm5-m10',
    moduleId: 5,
    prompt: 'What is the main BENEFIT and the main COST of debt in the trade-off model?',
    choices: [
      'Benefit: lower interest; Cost: dividends',
      'Benefit: interest tax shield; Cost: expected costs of financial distress',
      'Benefit: dilution; Cost: higher taxes',
      'Benefit: more shares; Cost: lower beta',
    ],
    answerIndex: 1,
    explanation:
      'Debt\'s benefit is the tax shield (deductible interest lowers taxes, raising OPAT/value); its cost is the rising expected cost of financial distress.',
    difficulty: 'medium',
    topic: 'Trade-off theory',
  },
  {
    id: 'm5-m11',
    moduleId: 5,
    prompt: 'Andrade & Kaplan (1998) estimate the costs of financial distress (for highly leveraged firms that became distressed) at roughly…',
    choices: ['1–2% of value', '10–25% of value', '50–60% of value', '0% — distress is costless'],
    answerIndex: 1,
    explanation: 'They find a value loss of about 10–25% relative to the year before distress — sizable, not trivial.',
    difficulty: 'medium',
    topic: 'Financial distress',
  },
  {
    id: 'm5-m12',
    moduleId: 5,
    prompt: 'For the median U.S. firm, what is the optimal leverage ratio L*, and what is the value gain from moving from zero to L* (Korteweg)?',
    choices: [
      'L* ≈ 30%; value gain ≈ 5%',
      'L* ≈ 70%; value gain ≈ 25%',
      'L* ≈ 10%; value gain ≈ 50%',
      'L* ≈ 0%; no value gain',
    ],
    answerIndex: 0,
    explanation:
      'Korteweg finds L* ≈ 30% (also the U.S. median) for the average firm, with a ≈ 5% value gain vs zero leverage.',
    difficulty: 'medium',
    topic: 'Trade-off theory',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm5-h1',
    moduleId: 5,
    prompt: 'An all-equity firm is worth 45 today; in a boom equity is 50, in a bust 30. Adding 15 of debt, what are the equity returns in boom and bust (equity value today = 30)?',
    choices: [
      '+11% / −33% (unchanged)',
      '+17% / −50%',
      '+50% / −17%',
      '+33% / −11%',
    ],
    answerIndex: 1,
    explanation:
      'With debt: boom equity = 35, bust = 15, today = 30. Returns = (35−30)/30 = +17% and (15−30)/30 = −50%. Leverage amplifies both swings → higher beta.',
    difficulty: 'hard',
    topic: 'Leverage & risk',
  },
  {
    id: 'm5-h2',
    moduleId: 5,
    prompt: 'Ruth\'s 2020 SEO: equity value $262.2M, 27.6M shares ($9.50 price). It issues 5.6M new shares at $7.75. What is the MECHANICAL new stock price?',
    choices: ['$9.50 (unchanged)', '$7.75', '≈ $9.2', '$7.50'],
    answerIndex: 2,
    explanation:
      'P_new = (262.2 + 5.6×7.75) / (27.6 + 5.6) = (262.2 + 43.4)/33.2 ≈ $9.2. Selling below market causes a small mechanical drop (real dilution). The price actually fell further to $7.50 (signaling).',
    difficulty: 'hard',
    topic: 'Real dilution / SEO',
  },
  {
    id: 'm5-h3',
    moduleId: 5,
    prompt: 'AMC 2021 "window of opportunity": fundamental value $15/share, 500M shares. It sells 11.55M shares at $50.85 ($587M raised). What happens to the FUNDAMENTAL stock price?',
    choices: [
      'Falls to about $12 (dilution)',
      'Rises to about $15.81 (NPV>0 for existing holders)',
      'Stays exactly $15',
      'Rises to $50.85',
    ],
    answerIndex: 1,
    explanation:
      'P_new = (500M×$15 + $587M)/(500M + 11.55M) = ($7.5B + $0.587B)/511.55M ≈ $15.81. Selling overvalued shares raises fundamental value; new shareholders overpay, existing holders gain.',
    difficulty: 'hard',
    topic: 'Window of opportunity',
  },
  {
    id: 'm5-h4',
    moduleId: 5,
    prompt: 'A young, unprofitable firm with volatile cash flows and few tangible assets is most likely to have an optimal leverage ratio that is…',
    choices: [
      'well above 30%, to capture tax shields',
      'near zero / well below 30%',
      'exactly 30%, like every firm',
      'irrelevant — leverage never affects value',
    ],
    answerIndex: 1,
    explanation:
      'No profits → no tax benefit of debt; high volatility and low tangibility → high distress risk. So L* is well below 30%, possibly zero. L* differs across firms.',
    difficulty: 'hard',
    topic: 'Determinants of L*',
  },
]

export const questionsByModule = (moduleId: number) =>
  QUESTIONS.filter((q) => q.moduleId === moduleId)
