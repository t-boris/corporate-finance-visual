import type { GlossaryTerm } from '@/lib/types'

// The glossary grows module-by-module. Currently populated for Module 1.
// Additional modules will be added as the course progresses.
export const GLOSSARY: GlossaryTerm[] = [
  // ───── Module 1 · The Objective and Language of Corporate Finance ─────
  {
    term: 'Shareholder Value Maximization',
    moduleId: 1,
    definition:
      'The principal objective of corporate finance: maximize the long-term market value of the firm\'s equity. Not the same as maximizing earnings — earnings ignore timing, risk and reinvestment.',
    related: ['Stock Price', 'Cash Flow', 'Agency Problem'],
    tags: ['objective'],
  },
  {
    term: 'Stock Price',
    moduleId: 1,
    definition:
      'The current market price per share. Theoretically equal to the sum of all expected future cash flows to shareholders, discounted at the required return. Under efficient markets, the stock price captures all known consequences of present and expected future decisions.',
    related: ['Shareholder Value Maximization', 'Efficient Markets', 'Present Value'],
    tags: ['valuation'],
  },
  {
    term: 'Efficient Markets Hypothesis (EMH)',
    moduleId: 1,
    definition:
      'The hypothesis that market prices fully reflect all available information about the asset\'s future cash flows. A necessary condition for the stock price to be a reliable summary of firm value.',
    related: ['Stock Price', 'Information Asymmetry'],
    tags: ['theory'],
  },
  {
    term: 'Earnings per Share (EPS)',
    moduleId: 1,
    definition:
      'Net Income divided by Shares Outstanding. A popular but flawed measure of profitability: ignores risk, timing and cost of capital, and can be manipulated through stock splits, repurchases, and accounting choices.',
    formula: 'EPS = Net Income / Shares Outstanding',
    related: ['Net Income', 'P/E Ratio'],
    tags: ['metrics'],
  },
  {
    term: 'Book Value of Equity',
    moduleId: 1,
    definition:
      'Shareholders\' equity as reported on the balance sheet (Assets − Liabilities, at historical accounting values). Reflects only past events — cannot capture future cash flows. May be negative for distressed or highly-levered firms (e.g. Altice).',
    related: ['Market Value of Equity', 'Balance Sheet'],
    tags: ['accounting'],
  },
  {
    term: 'Market Value of Equity (Market Cap)',
    moduleId: 1,
    definition:
      'Stock Price × Shares Outstanding. Reflects all future cash flows discounted to today; used for leverage and valuation ratios.',
    formula: 'Market Cap = Price × Shares Outstanding',
    related: ['Stock Price', 'Book Value of Equity'],
    tags: ['valuation'],
  },
  {
    term: 'Agency Problem',
    moduleId: 1,
    definition:
      'A conflict of interest between managers (agents) and shareholders (principals). Arises when managers pursue their own interests — perks, empire-building, risk-aversion, shirking — instead of maximizing shareholder value.',
    related: ['Corporate Governance', 'Executive Compensation', 'Empire Building'],
    tags: ['governance'],
  },
  {
    term: 'Empire Building',
    moduleId: 1,
    definition:
      'An agency problem where managers grow the firm through value-destroying acquisitions to expand their own power, compensation, or prestige.',
    related: ['Agency Problem', 'M&A'],
    tags: ['governance'],
  },
  {
    term: 'Corporate Governance',
    moduleId: 1,
    definition:
      'The set of mechanisms (independent board, audit, shareholder voting, equity-linked compensation, market for corporate control) that mitigate the agency problem and align managers with shareholders.',
    related: ['Agency Problem', 'Board of Directors', 'Activist Investors'],
    tags: ['governance'],
  },
  {
    term: 'Board of Directors',
    moduleId: 1,
    definition:
      'A body elected by shareholders that oversees the CEO, sets executive pay, and approves major decisions. Independent directors (without personal/financial ties to the CEO) are a key governance safeguard.',
    related: ['Corporate Governance', 'Executive Compensation'],
    tags: ['governance'],
  },
  {
    term: 'Activist Investors',
    moduleId: 1,
    definition:
      'Investors holding large equity stakes (often 5–10%+) who actively push for changes in strategy, governance, or board composition to unlock shareholder value.',
    related: ['Corporate Governance', 'Proxy Fight'],
    tags: ['governance'],
  },
  {
    term: 'Market for Corporate Control',
    moduleId: 1,
    definition:
      'The market in which underperforming companies become takeover targets. The credible threat of a hostile acquisition disciplines incumbent management.',
    related: ['M&A', 'Corporate Governance', 'LBO'],
    tags: ['governance'],
  },
  {
    term: 'Leveraged Buyout (LBO)',
    moduleId: 1,
    definition:
      'An acquisition financed primarily with debt. LBOs can harm existing bondholders by sharply increasing leverage and lowering credit quality.',
    related: ['M&A', 'Leverage'],
    tags: ['corporate-actions'],
  },
  {
    term: 'Cash Flow',
    moduleId: 1,
    definition:
      'Actual movement of cash into or out of the firm. Financial decisions are based on cash flows, not accounting earnings, because cash flows cannot be reshaped by accounting choices.',
    related: ['Accounting Profit', 'Free Cash Flow'],
    tags: ['fundamentals'],
  },
  {
    term: 'Accounting Profit',
    moduleId: 1,
    definition:
      'Earnings under accounting rules (revenue − expenses). Includes non-cash items (depreciation, accruals) and depends on accounting estimates, so it is not used directly for valuation.',
    related: ['Cash Flow', 'Depreciation'],
    tags: ['accounting'],
  },
  {
    term: 'Free Cash Flow (FCF)',
    moduleId: 1,
    definition:
      'Cash available to all providers of capital after operating expenses, taxes, CapEx and working-capital investment.',
    formula: 'FCF = EBIT·(1−T) + D&A − ΔNWC − CapEx',
    related: ['Cash Flow', 'WACC', 'OPAT'],
    tags: ['valuation'],
  },
  {
    term: 'Balance Sheet',
    moduleId: 1,
    definition:
      'A snapshot of the firm\'s assets, liabilities, and equity at a single point in time. Identity: Assets = Liabilities + Equity.',
    formula: 'Assets = Liabilities + Equity',
    related: ['Income Statement', 'Cash Flow Statement'],
    tags: ['statements'],
  },
  {
    term: 'Income Statement',
    moduleId: 1,
    definition:
      'A flow report over a period: Revenue − COGS − OpEx − Interest − Taxes = Net Income. Contains both cash and non-cash items.',
    related: ['Balance Sheet', 'OPAT', 'Net Income'],
    tags: ['statements'],
  },
  {
    term: 'Cash Flow Statement',
    moduleId: 1,
    definition:
      'A reconciliation of Net Income into actual cash flow with three sections: operating, investing, and financing activities. Convention: positive = cash in, negative = cash out.',
    related: ['Free Cash Flow', 'Net Income'],
    tags: ['statements'],
  },
  {
    term: 'Operating Activities (CFO)',
    moduleId: 1,
    definition:
      'Cash generated from core business operations: starts with Net Income, adds back non-cash items (D&A) and changes in working capital.',
    related: ['Cash Flow Statement', 'Working Capital'],
    tags: ['statements'],
  },
  {
    term: 'Investing Activities (CFI)',
    moduleId: 1,
    definition:
      'Cash spent on or generated from long-term assets: CapEx, acquisitions, sale of property/intangibles.',
    related: ['Cash Flow Statement', 'CapEx'],
    tags: ['statements'],
  },
  {
    term: 'Financing Activities (CFF)',
    moduleId: 1,
    definition:
      'Cash flows with providers of capital: debt issuance/repayment, equity issuance/buybacks, dividends.',
    related: ['Cash Flow Statement', 'Dividends', 'Buybacks'],
    tags: ['statements'],
  },
  {
    term: 'Working Capital',
    moduleId: 1,
    definition:
      'Current Assets − Current Liabilities. Changes in working capital are a non-cash component of net income and are adjusted in the cash flow statement.',
    formula: 'NWC = Current Assets − Current Liabilities',
    related: ['Current Assets', 'Cash Flow Statement'],
    tags: ['statements'],
  },
  {
    term: 'Liquidity',
    moduleId: 1,
    definition:
      'The ease with which an asset can be converted into cash without significant loss of value. Measures the firm\'s ability to meet short-term obligations.',
    related: ['Current Ratio', 'Quick Ratio', 'Cash Ratio'],
    tags: ['ratios'],
  },
  {
    term: 'Current Ratio',
    moduleId: 1,
    definition:
      'Most basic liquidity ratio. Should ideally be ≥ 1 (the firm has more short-term assets than short-term liabilities).',
    formula: 'Current Ratio = Current Assets / Current Liabilities',
    related: ['Liquidity', 'Quick Ratio'],
    tags: ['ratios'],
  },
  {
    term: 'Quick Ratio (Acid Test)',
    moduleId: 1,
    definition:
      'A more conservative liquidity ratio. Excludes inventory because inventory may sell at a steep discount (≈55¢/$1 in distress sales per Berger, Ofek & Swary, 1996).',
    formula: 'Quick Ratio = (Cash + Receivables) / Current Liabilities',
    related: ['Liquidity', 'Current Ratio', 'Inventory'],
    tags: ['ratios'],
  },
  {
    term: 'Cash Ratio',
    moduleId: 1,
    definition:
      'The strictest liquidity ratio. Uses only cash and equivalents — ignores both inventory and receivables.',
    formula: 'Cash Ratio = Cash / Current Liabilities',
    related: ['Liquidity', 'Quick Ratio'],
    tags: ['ratios'],
  },
  {
    term: 'Solvency',
    moduleId: 1,
    definition:
      'The firm\'s ability to meet long-term obligations. A firm is solvent when the market value of its assets exceeds its total liabilities.',
    related: ['Leverage', 'Liquidity'],
    tags: ['ratios'],
  },
  {
    term: 'Leverage',
    moduleId: 1,
    definition:
      'The extent to which a firm uses debt to finance its assets. Computed using MARKET values, not book values, because book equity can be negative for distressed firms.',
    related: ['Solvency', 'Debt-to-Assets'],
    tags: ['ratios'],
  },
  {
    term: 'Leverage Ratio (preferred)',
    moduleId: 1,
    definition:
      'Most informative leverage measure. Uses Market Value of Assets (= Total Liabilities + Market Cap) in the denominator. Cannot exceed 1 — a firm with leverage > 1 is effectively bankrupt. US average: 25–30%.',
    formula: 'Leverage = Total Liabilities / (Total Liabilities + Market Cap)',
    related: ['Leverage', 'Market Value of Equity'],
    tags: ['ratios'],
  },
  {
    term: 'OPAT (Operating Profit After Taxes)',
    moduleId: 1,
    definition:
      'The key profitability measure used in this course. Computed BEFORE interest, so it measures business profitability independent of the financing decision. Less manipulable than net income because it sits near the top of the income statement.',
    formula: 'OPAT = Operating Income − Income Tax Expense',
    related: ['EBIT', 'EBITDA', 'Net Income'],
    tags: ['profitability'],
  },
  {
    term: 'EBIT',
    moduleId: 1,
    definition:
      'Earnings Before Interest and Taxes — operating income before financing costs and taxes. Approximately equivalent to Operating Income.',
    related: ['EBITDA', 'OPAT'],
    tags: ['profitability'],
  },
  {
    term: 'EBITDA',
    moduleId: 1,
    definition:
      'Earnings Before Interest, Taxes, Depreciation and Amortization. A proxy for cash profitability — useful because D&A are non-cash, but ignores the implicit cost of asset depreciation.',
    formula: 'EBITDA = EBIT + Depreciation + Amortization',
    related: ['EBIT', 'OPAT'],
    tags: ['profitability'],
  },
  {
    term: 'Net Income',
    moduleId: 1,
    definition:
      'Bottom line of the income statement: Revenue − all costs including interest and taxes. Reflects profitability for SHAREHOLDERS (post-interest). Avoided in this course because it is easy to manipulate via one-time items.',
    related: ['OPAT', 'EBIT', 'EPS'],
    tags: ['profitability'],
  },
  {
    term: 'Return on Assets (ROA)',
    moduleId: 1,
    definition:
      'Measures how efficiently the firm generates business profits from its assets. Uses BOOK value of assets (not market) because we want to relate current profits to invested capital, not future value.',
    formula: 'ROA = OPAT / Total Assets (book)',
    related: ['Asset Turnover', 'Net Profit Margin'],
    tags: ['profitability'],
  },
  {
    term: 'Net Profit Margin',
    moduleId: 1,
    definition:
      'Profitability per dollar of revenue. Uses OPAT to measure business margin independent of financing.',
    formula: 'NPM = OPAT / Revenues',
    related: ['ROA', 'Asset Turnover'],
    tags: ['profitability'],
  },
  {
    term: 'Asset Turnover',
    moduleId: 1,
    definition:
      'Measures how efficiently the firm converts assets into revenue.',
    formula: 'Asset Turnover = Revenues / Total Assets',
    related: ['ROA', 'Net Profit Margin'],
    tags: ['profitability'],
  },
  {
    term: 'DuPont Decomposition',
    moduleId: 1,
    definition:
      'Decomposes ROA into Net Profit Margin × Asset Turnover, isolating margin efficiency from asset efficiency.',
    formula: 'ROA = (OPAT / Revenues) × (Revenues / Assets)',
    related: ['ROA', 'Net Profit Margin', 'Asset Turnover'],
    tags: ['profitability'],
  },
  {
    term: 'Valuation Ratios',
    moduleId: 1,
    definition:
      'Ratios that compare the current market value of a firm to a fundamental accounting variable. Interpretation: they measure the FUTURE divided by the PRESENT (or past).',
    related: ['Market-to-Book', 'P/E Ratio'],
    tags: ['valuation'],
  },
  {
    term: 'Market-to-Book Ratio (M/B)',
    moduleId: 1,
    definition:
      'Market value relative to book value. Preferred form uses ASSETS (not equity) because book equity can be negative.',
    formula: 'M/B = Market Value of Assets / Book Value of Assets',
    related: ['Valuation Ratios', 'Book Value'],
    tags: ['valuation'],
  },
  {
    term: 'P/E Ratio (Price-to-Earnings)',
    moduleId: 1,
    definition:
      'Widely used valuation ratio but problematic — uses Net Income (manipulable) and ignores debt. Course prefers Value/OPAT.',
    formula: 'P/E = Price per Share / EPS = Market Cap / Net Income',
    related: ['Valuation Ratios', 'EPS', 'Net Income'],
    tags: ['valuation'],
  },
  {
    term: 'Value-to-OPAT Ratio',
    moduleId: 1,
    definition:
      'Preferred valuation ratio in the course. Uses market value of the WHOLE firm and OPAT — both robust to capital structure and manipulation.',
    formula: 'Value/OPAT = Market Value of Assets / OPAT',
    related: ['OPAT', 'Valuation Ratios'],
    tags: ['valuation'],
  },
  {
    term: 'Stakeholder',
    moduleId: 1,
    definition:
      'Any party with an interest in the firm: employees, customers, suppliers, creditors, government, society. The stakeholder view contrasts with the shareholder view of the firm.',
    related: ['Shareholder Value Maximization', 'ESG'],
    tags: ['governance'],
  },
  {
    term: 'Repatriation Tax',
    moduleId: 1,
    definition:
      'Tax owed by US multinationals on foreign earnings brought back to the US. Pre-2017, the high differential (35% US vs ~10% Ireland) led US firms to keep cash abroad (e.g. Apple held $252B abroad). TCJA 2017 introduced flat 15.5%/8% rates.',
    related: ['TCJA', 'Tax Havens'],
    tags: ['policy'],
  },
  {
    term: 'Tax Cuts and Jobs Act (TCJA) 2017',
    moduleId: 1,
    definition:
      'US federal tax legislation that cut the corporate tax rate from 35% to 21% and introduced flat repatriation rates (15.5% on cash, 8% on non-cash). Triggered repatriation of ~$600B+ in foreign cash, used for buybacks, debt repayment, and investment.',
    related: ['Repatriation Tax'],
    tags: ['policy'],
  },
  {
    term: 'Limited Liability',
    moduleId: 1,
    definition:
      'The principle that a shareholder\'s loss is capped at the amount invested. Makes broad public ownership of equity possible.',
    related: ['Corporation', 'Equity'],
    tags: ['structure'],
  },
]

export const allModuleIds = Array.from(new Set(GLOSSARY.map((g) => g.moduleId))).sort()
