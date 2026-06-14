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

  // ───── Module 2 · Financial Planning ─────
  {
    term: 'Financial Forecasting',
    moduleId: 2,
    definition:
      'Estimating what a company\'s future financial statements will look like. Three main uses: (1) anticipate financing needs, (2) value the firm (forecast future cash flows), (3) assess the impact of new projects or acquisitions.',
    related: ['Percentage-of-Sales Model', 'Pro-Forma Statements', 'External Financing'],
    tags: ['forecasting'],
  },
  {
    term: 'Pro-Forma Statements',
    moduleId: 2,
    definition:
      'Forecasted (projected) financial statements — income statement, cash flow statement, and balance sheet — built from a set of explicit assumptions about the future, starting from the most recent audited year.',
    related: ['Financial Forecasting', 'Percentage-of-Sales Model'],
    tags: ['forecasting'],
  },
  {
    term: 'Percentage-of-Sales Model',
    moduleId: 2,
    definition:
      'A forecasting method in which most income-statement and balance-sheet items are held at a constant proportion of revenue, so they grow at the same rate as sales. Exceptions: interest expense (depends on debt) and one-time items (set to zero).',
    formula: 'Itemₜ = (Item / Revenue)₍base₎ × Revenueₜ',
    related: ['Financial Forecasting', 'Revenue Growth Rate', 'Pro-Forma Statements'],
    tags: ['forecasting'],
  },
  {
    term: 'Revenue Growth Rate',
    moduleId: 2,
    definition:
      'The forecasted year-over-year growth in sales — the single most important input to a percentage-of-sales model, since nearly everything else scales from it. In the PepsiCo case, +3.9% for 2022 and 2023 (analyst estimates from Capital IQ).',
    related: ['Percentage-of-Sales Model'],
    tags: ['forecasting'],
  },
  {
    term: 'Internal Funds',
    moduleId: 2,
    definition:
      'Cash generated by the business itself (operating cash flow and existing cash reserves), as opposed to money raised externally by issuing debt or equity. The central PepsiCo question: can the expansion be funded with internal funds alone?',
    related: ['External Financing', 'Precautionary Cash'],
    tags: ['financing'],
  },
  {
    term: 'External Financing',
    moduleId: 2,
    definition:
      'Funds raised from outside the firm by issuing new debt (bonds, bank loans) or new equity (stock). Needed when internal funds and cash reserves cannot cover planned investment.',
    related: ['Internal Funds', 'Capital Structure Decision', 'Bank Line of Credit'],
    tags: ['financing'],
  },
  {
    term: 'Capital Expenditure (CapEx)',
    moduleId: 2,
    definition:
      'Spending on long-term productive assets (property, plant, equipment). A negative cash flow under investing activities. In the PepsiCo expansion plan: $5B in 2022 and $8B in 2023.',
    formula: 'Δ Net PP&E = CapEx − Depreciation',
    related: ['Financial Forecasting', 'Cash Flow Statement'],
    tags: ['investment'],
  },
  {
    term: 'Working Capital',
    moduleId: 2,
    definition:
      'A firm\'s short-term operating investments and obligations: inventory and receivables (assets) financed in part by payables (liabilities). Managing it well is a key determinant of cash generation and liquidity.',
    related: ['Net Working Capital', 'Inventory', 'Accounts Receivable', 'Accounts Payable'],
    tags: ['working-capital'],
  },
  {
    term: 'Net Working Capital (NWC)',
    moduleId: 2,
    definition:
      'The operating measure of capital tied up in the business. An increase in NWC (more inventory/receivables, or fewer payables) ties up cash and is treated as an investment — a negative cash flow.',
    formula: 'NWC = Receivables + Inventory − Payables',
    related: ['Working Capital', 'Investment in Net Working Capital'],
    tags: ['working-capital'],
  },
  {
    term: 'Investment in Net Working Capital',
    moduleId: 2,
    definition:
      'The cash absorbed by an increase in NWC during a period. Like CapEx, it is a use of cash (negative cash flow from operations). In the PepsiCo model, assumed to equal 12% of the increase in revenue.',
    formula: 'ΔNWC investment ≈ 12% × ΔRevenue (PepsiCo assumption)',
    related: ['Net Working Capital', 'Cash Flow Statement'],
    tags: ['working-capital'],
  },
  {
    term: 'Accounts Receivable (AR)',
    moduleId: 2,
    definition:
      'Money owed to a firm by customers who were given time to pay. Offering credit can boost demand, but receivables tie up cash. Can be reduced via early-payment discounts or factoring.',
    related: ['Factoring', 'Average Collection Period', 'Trade Credit'],
    tags: ['working-capital'],
  },
  {
    term: 'Accounts Payable (AP)',
    moduleId: 2,
    definition:
      'Money a firm owes its suppliers for goods received but not yet paid for. The mirror image of receivables: increasing payables means borrowing from suppliers, which frees up cash. Trade-off: suppliers may raise prices.',
    related: ['Trade Credit', 'Average Payable Period', 'Net Working Capital'],
    tags: ['working-capital'],
  },
  {
    term: 'Inventory',
    moduleId: 2,
    definition:
      'Raw materials, work-in-progress, and finished goods a firm holds to run its business. Required to make sales, but ties up cash because goods must be paid for before the sale generates cash.',
    related: ['Average Days in Inventory', 'Supplier Financing', 'Cash Conversion Cycle'],
    tags: ['working-capital'],
  },
  {
    term: 'Trade Credit',
    moduleId: 2,
    definition:
      'Credit extended between firms in the ordinary course of business — a customer pays later (creating receivables for the seller) or a firm pays its supplier later (creating payables). A common, flexible source of short-term financing.',
    related: ['Accounts Receivable', 'Accounts Payable', 'Supplier Financing'],
    tags: ['working-capital'],
  },
  {
    term: 'Supplier Financing',
    moduleId: 2,
    definition:
      'Using accounts payable to finance inventory — the supplier lets the firm pay later, effectively funding the inventory purchase. Alongside bank credit lines, one of the main ways firms finance working capital.',
    related: ['Accounts Payable', 'Bank Line of Credit', 'Inventory'],
    tags: ['working-capital'],
  },
  {
    term: 'Factoring',
    moduleId: 2,
    definition:
      'Selling, or borrowing against, accounts receivable to obtain cash immediately at a discount to face value. The discount implies an interest rate. Example: $300M receivable sold for $280M today implies ≈7.14%.',
    formula: 'implied rate = Face / Advance − 1  (e.g. 300/280 − 1 ≈ 7.14%)',
    related: ['Accounts Receivable', 'Haircut'],
    tags: ['working-capital'],
  },
  {
    term: 'Haircut (Loan-to-Value)',
    moduleId: 2,
    definition:
      'The fraction of an asset\'s value the borrower must fund themselves; the lender finances only the rest. Like a mortgage down payment. Receivables can usually be financed at a higher fraction (e.g. 80%) than inventory (e.g. 50%).',
    related: ['Factoring', 'Supplier Financing', 'Inventory'],
    tags: ['working-capital'],
  },
  {
    term: 'Average Collection Period',
    moduleId: 2,
    definition:
      'How many days, on average, it takes a firm to collect its receivables. Computed from daily revenue. Example: $100M AR with $2B annual revenue → $5.5M/day → ≈18 days.',
    formula: 'Collection Period = Accounts Receivable / (Revenue / 365)',
    related: ['Accounts Receivable', 'Cash Conversion Cycle'],
    tags: ['ratios'],
  },
  {
    term: 'Average Days in Inventory',
    moduleId: 2,
    definition:
      'How many days of inventory a firm carries on its balance sheet. Based on daily operating costs (COGS + SG&A). Boeing carried 278 days in 2017, rising to 474 days in 2021.',
    formula: 'Days in Inventory = Inventory / ((COGS + SG&A) / 365)',
    related: ['Inventory', 'Operating Costs', 'Cash Conversion Cycle'],
    tags: ['ratios'],
  },
  {
    term: 'Average Payable Period',
    moduleId: 2,
    definition:
      'How many days of payables a firm carries — how long, on average, it takes to pay its suppliers. Based on daily operating costs. A longer payable period shortens the cash conversion cycle.',
    formula: 'Payable Period = Payables / ((COGS + SG&A) / 365)',
    related: ['Accounts Payable', 'Operating Costs', 'Cash Conversion Cycle'],
    tags: ['ratios'],
  },
  {
    term: 'Operating Costs',
    moduleId: 2,
    definition:
      'In working-capital ratios, the sum of cost of goods sold and selling, general & administrative expense — the denominator (as a daily figure) for the inventory and payable-period ratios.',
    formula: 'Operating Costs = COGS + SG&A',
    related: ['Average Days in Inventory', 'Average Payable Period'],
    tags: ['ratios'],
  },
  {
    term: 'Cash Conversion Cycle (CCC)',
    moduleId: 2,
    definition:
      'How long it takes a firm to turn its working-capital investments back into cash: from paying for inventory to collecting from customers, less the time suppliers finance it. Boeing ≈484 days (2021); Airbus ≈6 months; Walmart ≈6 days. Depends on the nature of the business.',
    formula: 'CCC = Collection Period + Days in Inventory − Payable Period',
    related: ['Average Collection Period', 'Average Days in Inventory', 'Average Payable Period'],
    tags: ['ratios'],
  },
  {
    term: 'Liquidity Crisis',
    moduleId: 2,
    definition:
      'A situation where a firm cannot fund its working-capital or maturing obligations because cash and financing run short. It can force a firm to cut production and sales even when demand is present, propagating the shock over time.',
    related: ['Liquidity Risk', 'Cash Ratio', 'Bank Line of Credit'],
    tags: ['liquidity'],
  },
  {
    term: 'Liquidity Risk',
    moduleId: 2,
    definition:
      'The risk that creditors refuse to extend or roll over financing, forcing a firm into a liquidity crisis. Managed with cash reserves and pre-negotiated bank credit lines.',
    related: ['Rollover Risk', 'Bank Line of Credit', 'Liquidity Crisis'],
    tags: ['liquidity'],
  },
  {
    term: 'Refinancing (Rollover)',
    moduleId: 2,
    definition:
      'Repaying a maturing liability by issuing a new, similar one, so there is no net cash outflow. Very common — it explains how a firm like Altice can operate with low liquidity ratios and little excess cash flow.',
    related: ['Rollover Risk', 'Liquidity Risk'],
    tags: ['liquidity'],
  },
  {
    term: 'Rollover Risk',
    moduleId: 2,
    definition:
      'The risk that a firm cannot refinance maturing debt — or only on much worse terms — because market conditions have deteriorated. Central to the timing of new financing (issue now vs. wait).',
    related: ['Refinancing (Rollover)', 'Liquidity Risk'],
    tags: ['liquidity'],
  },
  {
    term: 'Bank Line of Credit',
    moduleId: 2,
    definition:
      'A pre-negotiated borrowing agreement — limit and interest rate fixed ahead of time — that a firm can draw on when needed. Treated almost as a substitute for cash. The rate is set as a spread over a base rate; the firm pays a commitment fee to keep it open.',
    related: ['Commitment Fee', 'Liquidity Risk', 'Precautionary Cash'],
    tags: ['liquidity'],
  },
  {
    term: 'Commitment Fee',
    moduleId: 2,
    definition:
      'The annual fee a firm pays to keep a credit line open, regardless of whether it draws on it — like an insurance premium. Typically 0.1%–0.3% per year (e.g. $100K–$300K on a $100M line).',
    formula: 'Commitment Fee = (0.1%–0.3%) × line size',
    related: ['Bank Line of Credit'],
    tags: ['liquidity'],
  },
  {
    term: 'Precautionary Cash',
    moduleId: 2,
    definition:
      'Cash held as a buffer against future cash-flow or liquidity shocks. Holding cash is, in effect, equivalent to precautionary borrowing — both provide financial security against an uncertain future.',
    related: ['Precautionary Borrowing', 'Bank Line of Credit', 'Internal Funds'],
    tags: ['liquidity'],
  },
  {
    term: 'Precautionary Borrowing',
    moduleId: 2,
    definition:
      'Borrowing more than the forecast strictly requires, because the forecast may be wrong, then holding the excess as cash. Makes sense for firms exposed to future liquidity shocks.',
    related: ['Precautionary Cash', 'Rollover Risk'],
    tags: ['liquidity'],
  },
  {
    term: 'Dash for Cash',
    moduleId: 2,
    definition:
      'The mass drawdown of bank credit lines by firms seeking to hoard cash during a crisis — documented by Acharya & Steffen (2020) for March 2020 (COVID-19), most acutely among firms near the investment-grade boundary ("fallen angels").',
    related: ['Bank Line of Credit', 'Liquidity Risk'],
    tags: ['liquidity', 'research'],
  },
  {
    term: 'Capital Structure Decision',
    moduleId: 2,
    definition:
      'The choice of how to finance the firm — which mix of debt and equity, and which securities to issue (stock, bond, or bank loan). Raised briefly here when a firm needs external funds; analyzed in depth in Module 5.',
    related: ['External Financing', 'Bank Line of Credit'],
    tags: ['financing'],
  },

  // ───── Module 3 · Making Investment Decisions ─────
  {
    term: 'Net Present Value (NPV)',
    moduleId: 3,
    definition:
      'The sum of all incremental cash flows of a project — today and in the future — discounted back to the present at the required return. The central tool of capital budgeting: maximizing NPV is equivalent to maximizing shareholder value.',
    formula: 'NPV = Σ CFₜ / (1 + R)^t   (t = 0 … ∞)',
    related: ['Incremental Cash Flow', 'Discount Rate', 'NPV Decision Rule', 'Internal Rate of Return (IRR)'],
    tags: ['npv'],
  },
  {
    term: 'Incremental Cash Flow',
    moduleId: 3,
    definition:
      'The cash flow that is a direct consequence of taking a decision, computed as "new minus old" — the difference relative to not taking the project. The only cash flows that belong in an NPV calculation.',
    formula: 'Incremental CF = CF(with project) − CF(without project)',
    related: ['Net Present Value (NPV)', 'Free Cash Flow (Magic Formula)'],
    tags: ['npv'],
  },
  {
    term: 'Discounting',
    moduleId: 3,
    definition:
      'Converting a future cash flow into its value today by dividing by (1 + R) raised to the number of periods. The first of the two formulas all NPV calculations are built from.',
    formula: 'PV = C / (1 + R)^T',
    related: ['Present Value (PV)', 'Discount Rate', 'Perpetuity'],
    tags: ['npv'],
  },
  {
    term: 'Present Value (PV)',
    moduleId: 3,
    definition:
      'The value today of one or more future cash flows. Example: $1,000,000 received in one year at a 6% discount rate is worth $943,396 today.',
    formula: 'PV = C / (1 + R)^T',
    related: ['Discounting', 'Net Present Value (NPV)'],
    tags: ['npv'],
  },
  {
    term: 'Discount Rate (Benchmark / Required Return)',
    moduleId: 3,
    definition:
      'The rate of return required to invest in a project of given risk — the benchmark against which a project\'s IRR is compared. Depends on risk and on returns available elsewhere (e.g. Treasury bonds). How to estimate it comes later in the course (CAPM, WACC).',
    related: ['Internal Rate of Return (IRR)', 'IRR Decision Rule', 'Net Present Value (NPV)'],
    tags: ['npv'],
  },
  {
    term: 'Perpetuity',
    moduleId: 3,
    definition:
      'A constant cash flow C received every period forever. Its present value is simply C divided by the discount rate. Example: $1M/year forever at 6% is worth $16,666,667 today.',
    formula: 'PV = C / R',
    related: ['Growing Perpetuity', 'Time Horizon (Infinity)'],
    tags: ['npv'],
  },
  {
    term: 'Growing Perpetuity',
    moduleId: 3,
    definition:
      'A cash flow that starts at C next period and grows at a constant rate G forever. The second of the two formulas all NPV calculations are built from. Requires R > G. The perpetuity value sits one period BEFORE the first cash flow.',
    formula: 'PV = C / (R − G)',
    related: ['Perpetuity', 'Discounting', 'Real Option'],
    tags: ['npv'],
  },
  {
    term: 'Time Horizon (Infinity)',
    moduleId: 3,
    definition:
      'In most real-world valuation problems the correct horizon is infinity — there is no natural moment to stop, because even a sale price depends on future cash flows. Distant cash flows contribute almost nothing once discounted, so the perpetuity formula already captures this.',
    related: ['Perpetuity', 'Net Present Value (NPV)'],
    tags: ['npv'],
  },
  {
    term: 'NPV Decision Rule',
    moduleId: 3,
    definition:
      'Accept every project with positive NPV and reject every project with negative NPV. Because NPV equals the change in shareholder wealth, this rule is exactly equivalent to maximizing shareholder value.',
    formula: 'Accept if NPV > 0 · Reject if NPV < 0',
    related: ['Net Present Value (NPV)', 'NPV–Shareholder Value Equivalence'],
    tags: ['npv'],
  },
  {
    term: 'NPV–Shareholder Value Equivalence',
    moduleId: 3,
    definition:
      'A stock price is the PV of future cash flows; an NPV is the PV of incremental cash flows — so taking a project changes shareholder wealth by exactly its NPV. A −$118M NPV project destroys $118M of shareholder wealth. Can break down under asymmetric information, market inefficiency, or high leverage.',
    related: ['NPV Decision Rule', 'Net Present Value (NPV)'],
    tags: ['npv', 'theory'],
  },
  {
    term: 'Internal Rate of Return (IRR)',
    moduleId: 3,
    definition:
      'The rate of return of an investment, defined mathematically as the discount rate that makes NPV equal to zero. For a $10,000 investment paying $11,000 in a year, IRR = 10%. Found by solving NPV = 0; Excel\'s IRR() includes ALL cash flows (date 0 included).',
    formula: '0 = Σ CFₜ / (1 + IRR)^t',
    related: ['IRR Decision Rule', 'NPV Profile', 'Net Present Value (NPV)'],
    tags: ['irr'],
  },
  {
    term: 'IRR Decision Rule',
    moduleId: 3,
    definition:
      'A project is desirable if its IRR exceeds the benchmark (discount rate). Equivalent to the NPV rule: NPV > 0 if and only if IRR > discount rate — provided cash flows are conventional.',
    formula: 'Invest if IRR > Discount Rate',
    related: ['Internal Rate of Return (IRR)', 'Discount Rate (Benchmark / Required Return)'],
    tags: ['irr'],
  },
  {
    term: 'NPV Profile',
    moduleId: 3,
    definition:
      'The curve of a project\'s NPV plotted against the discount rate. It slopes downward for a conventional project and crosses zero exactly at the IRR. Left of the IRR (lower discount rate) NPV is positive; right of it NPV is negative.',
    related: ['Internal Rate of Return (IRR)', 'IRR Decision Rule'],
    tags: ['irr'],
  },
  {
    term: 'Non-conventional Cash Flows (Sign Flip)',
    moduleId: 3,
    definition:
      'A cash-flow pattern with a negative flow AFTER a positive one (e.g. +$20M today, −$22M next year). IRR becomes unreliable or misleading here — Excel may report "10%" or "400%" for projects that are clearly bad. Rule: if you see negative-after-positive, do NOT use IRR.',
    related: ['Multiple IRR Problem', 'Internal Rate of Return (IRR)'],
    tags: ['irr', 'pitfall'],
  },
  {
    term: 'Multiple IRR Problem',
    moduleId: 3,
    definition:
      'When cash flows change sign more than once, the NPV = 0 equation can have several roots, so IRR is not well defined. Example: cash flows −4, +25, −25 yield an IRR of 400% that does not reflect the true return.',
    related: ['Non-conventional Cash Flows (Sign Flip)', 'Internal Rate of Return (IRR)'],
    tags: ['irr', 'pitfall'],
  },
  {
    term: 'IRR Scale Problem',
    moduleId: 3,
    definition:
      'IRR is a percentage and ignores project size. A 1¢→2¢ project and a $100→$200 project both have a 100% IRR, but the second creates far more value. Use NPV (in dollars) to compare projects of different magnitudes.',
    related: ['Internal Rate of Return (IRR)', 'Net Present Value (NPV)'],
    tags: ['irr', 'pitfall'],
  },
  {
    term: 'Free Cash Flow (Magic Formula)',
    moduleId: 3,
    definition:
      'The incremental cash flow used to value a project. The "magic formula" works under any tax code — only the tax line changes. Sales − Costs ≈ EBITDA; Investments include both CapEx and changes in working capital.',
    formula: 'FCF = Sales − Costs − Taxes − Investments',
    related: ['Incremental Cash Flow', 'Depreciation Tax Shield', 'Working Capital Investment'],
    tags: ['fcf'],
  },
  {
    term: 'Depreciation Tax Shield',
    moduleId: 3,
    definition:
      'The tax saving created when depreciation (or expensed CapEx) reduces taxable income. Capital expenditure creates tax breaks, so taxes are not simply 21% of operating profit — the depreciation schedule matters.',
    formula: 'Tax shield = Depreciation × Tax rate',
    related: ['Accelerated Depreciation', 'Full Expensing (Post-2018)', 'Free Cash Flow (Magic Formula)'],
    tags: ['fcf', 'tax'],
  },
  {
    term: 'Accelerated Depreciation',
    moduleId: 3,
    definition:
      'Depreciating an asset for tax purposes faster than its economic life (e.g. fully over 5 years instead of 10), bringing tax shields forward. Pre-2018 US practice. Lowers taxable income early and raises it later. In the machine case: NPV $15,880, IRR 16.4%.',
    related: ['Depreciation Tax Shield', 'Full Expensing (Post-2018)'],
    tags: ['fcf', 'tax'],
  },
  {
    term: 'Full Expensing (Post-2018)',
    moduleId: 3,
    definition:
      'Since 2018, US firms can deduct 100% of qualifying CapEx in year 0 — capital expenditure became effectively tax-deductible immediately. Generates a negative tax (a tax refund/offset) in year 0, raising NPV and IRR vs. the pre-2018 rules: NPV $17,572, IRR 18.8% in the machine case.',
    related: ['Accelerated Depreciation', 'Depreciation Tax Shield', 'Tax Loss Carry-Forward'],
    tags: ['fcf', 'tax'],
  },
  {
    term: 'After-Tax Salvage Value',
    moduleId: 3,
    definition:
      'The cash from selling an asset at the end of its life, net of tax on the gain over its cost basis. If the asset is fully depreciated (cost basis 0), the entire salvage is taxed: $4,000 × (1 − 0.21) = $3,160.',
    formula: 'After-tax salvage = Salvage − (Salvage − Cost basis) × Tax rate',
    related: ['Cost Basis', 'Free Cash Flow (Magic Formula)'],
    tags: ['fcf', 'tax'],
  },
  {
    term: 'Cost Basis',
    moduleId: 3,
    definition:
      'The remaining undepreciated value of an asset for tax purposes. The taxable gain on sale is salvage price minus cost basis. A fully depreciated asset has zero cost basis, so its whole salvage value is taxable.',
    related: ['After-Tax Salvage Value', 'Accelerated Depreciation'],
    tags: ['fcf', 'tax'],
  },
  {
    term: 'Tax Loss Carry-Forward',
    moduleId: 3,
    definition:
      'When a firm is not currently profitable, a tax deduction (e.g. from full expensing) cannot offset current profits and must be carried into future years. The "hard case" that makes negative taxes from CapEx complicated — call the accountant.',
    related: ['Full Expensing (Post-2018)', 'Depreciation Tax Shield'],
    tags: ['fcf', 'tax'],
  },
  {
    term: 'Working Capital Investment',
    moduleId: 3,
    definition:
      'An increase in inventory or receivables required by a project is an investment (a cash outflow), even though it is not tax-deductible when made. At project end the working capital is "recaptured" (sold off), returning the cash. Lowers NPV slightly while tied up.',
    related: ['Free Cash Flow (Magic Formula)', 'Net Working Capital (NWC)'],
    tags: ['fcf', 'working-capital'],
  },
  {
    term: 'Real Option',
    moduleId: 3,
    definition:
      'The right — but not the obligation — to take a future action (expand, defer, abandon, or invest further) created by a current investment. Standard NPV assumes an all-or-nothing, irreversible decision and so misses this flexibility. R&D is the leading example.',
    related: ['Decision Tree', 'Option to Expand / Defer / Abandon', 'Research & Development (R&D)'],
    tags: ['real-options'],
  },
  {
    term: 'Decision Tree',
    moduleId: 3,
    definition:
      'A branching map of future outcomes (e.g. success vs. failure) with associated probabilities, investments, and cash flows. Used to value real options by computing a probability-weighted, discounted NPV across branches.',
    related: ['Real Option', 'Probability of Success', 'Research & Development (R&D)'],
    tags: ['real-options'],
  },
  {
    term: 'Research & Development (R&D)',
    moduleId: 3,
    definition:
      'Investment whose very purpose is to create an OPTION to invest in the future. Valued with a decision tree: spend on R&D now; on success, make a large follow-on investment and earn future profits; on failure, walk away. In the diabetes-drug case NPV = −$2.37M despite a $658M upside, so it is rejected.',
    related: ['Real Option', 'Decision Tree', 'Probability of Success'],
    tags: ['real-options'],
  },
  {
    term: 'Probability of Success',
    moduleId: 3,
    definition:
      'The (often low) chance that an R&D project clears its phases and reaches market — estimated by "educated guesswork" from past cases. Drugs progress ~70% (Phase 1→2), ~33% (Phase 2→3), with overall success near 5%. NPV is extremely sensitive to this number.',
    related: ['Research & Development (R&D)', 'Decision Tree'],
    tags: ['real-options'],
  },
  {
    term: 'Option to Expand / Defer / Abandon',
    moduleId: 3,
    definition:
      'The three classic real options: expand a project if it succeeds, defer it until uncertainty resolves, or abandon it to cut losses. Each adds value that a static, all-or-nothing NPV ignores.',
    related: ['Real Option', 'Decision Tree'],
    tags: ['real-options'],
  },

  // ───── Module 4 · M&A, Risk, and Performance Evaluation ─────
  {
    term: 'Synergy',
    moduleId: 4,
    definition:
      'The value created by a merger — the idea that two firms are worth more together than apart ("2 + 2 = 5"). Equals the total NPV of the merger. The same logic applies to spin-offs and asset sales: value comes only from adding something.',
    formula: 'Synergy = NPV of the merger = Value(combined) − Value(A) − Value(B)',
    related: ['Mergers & Acquisitions (M&A)', 'Deal Premium', 'Net Present Value (NPV)'],
    tags: ['m&a'],
  },
  {
    term: 'Mergers & Acquisitions (M&A)',
    moduleId: 4,
    definition:
      'Transactions that combine, split, or transfer ownership of firms — mergers, acquisitions, spin-offs, asset sales, private-equity deals. A second way (besides building projects) for firms to create shareholder value, justified only by synergies.',
    related: ['Synergy', 'Spin-off', 'Deal Premium'],
    tags: ['m&a'],
  },
  {
    term: 'Economies of Scale',
    moduleId: 4,
    definition:
      'A good (rational) motive for M&A: combining firms lowers unit costs through greater buying power with suppliers and improved production processes, raising profits — especially when the target is large.',
    related: ['Synergy', 'Market Power', 'Vertical Integration'],
    tags: ['m&a'],
  },
  {
    term: 'Market Power',
    moduleId: 4,
    definition:
      'A motive for M&A: merging competitors in the same industry can charge higher prices. Controversial — governments can block anti-competitive mergers through M&A regulation when they harm consumers.',
    related: ['Economies of Scale', 'Synergy'],
    tags: ['m&a'],
  },
  {
    term: 'Vertical Integration',
    moduleId: 4,
    definition:
      'A motive for M&A: buying a major supplier (or customer) to make the production process more efficient by producing in-house. The reverse — spinning off an internal supplier — can also create value.',
    related: ['Synergy', 'Spin-off'],
    tags: ['m&a'],
  },
  {
    term: 'Spin-off',
    moduleId: 4,
    definition:
      'Splitting a company into separate parts when the parts are worth more than the whole. Example: Kraft (2011) split into Mondelez (Global Snacks) and the new Kraft (North American grocery). No merger, but the same value-creation logic.',
    related: ['Mergers & Acquisitions (M&A)', 'Synergy', 'Risk Diversification (bad reason)'],
    tags: ['m&a'],
  },
  {
    term: 'Cash-rich Acquirer Problem',
    moduleId: 4,
    definition:
      'A bad reason for M&A: acquiring a firm just because you hold idle cash. Harford\'s study (1977–1993) found cash-rich firms acquire more often and destroy ~7 cents of value per dollar of excess cash. Don\'t spend cash just because you have it — pay it out instead.',
    related: ['Excess Cash', 'Free Cash Flow (Magic Formula)', 'Synergy'],
    tags: ['m&a'],
  },
  {
    term: 'Risk Diversification (bad reason)',
    moduleId: 4,
    definition:
      'A bad reason for M&A: buying a firm in a different industry to "reduce risk" for shareholders. Pointless — shareholders diversify on their own via index funds. The modern trend is increased focus and less conglomeration (e.g. GE breaking itself up).',
    related: ['Cash-rich Acquirer Problem', 'Spin-off'],
    tags: ['m&a'],
  },
  {
    term: 'Deal Premium',
    moduleId: 4,
    definition:
      'The amount by which the offer price exceeds the target\'s pre-deal value. Historically averages ~30% for public targets. The target\'s NPV equals the premium; the acquirer\'s NPV equals synergy minus premium.',
    formula: 'NPV(target) = Premium ; NPV(acquirer) = Synergy − Premium',
    related: ['Synergy', 'Mergers & Acquisitions (M&A)'],
    tags: ['m&a'],
  },
  {
    term: 'Means of Payment',
    moduleId: 4,
    definition:
      'How an acquirer pays for a deal: cash (buy out target shares with cash) or stock (issue new acquirer shares to target shareholders, who become owners of the merged firm). Stock deals are more complex and involve an exchange ratio.',
    related: ['Exchange Ratio', 'Deal Premium'],
    tags: ['m&a'],
  },
  {
    term: 'Exchange Ratio',
    moduleId: 4,
    definition:
      'In a stock deal, the number of acquirer shares each target shareholder receives. Can be less than one. HP–Compaq: offer $16/share ÷ HP price $23 ≈ 0.69 (the actual deal used 0.6325).',
    formula: 'Exchange ratio = Offer per target share / Acquirer share price',
    related: ['Means of Payment', 'Deal Premium'],
    tags: ['m&a'],
  },
  {
    term: 'Announcement Return',
    moduleId: 4,
    definition:
      'The immediate stock-price reaction when a deal is announced. M&A provides a clean event date, letting us measure how the market reacts to corporate decisions. Research: targets earn ~+20% on average; acquirers ≈ 0% (acquirers tend to overpay).',
    related: ['Deal Premium', 'Counterfactual'],
    tags: ['m&a'],
  },
  {
    term: 'Counterfactual',
    moduleId: 4,
    definition:
      'What would have happened otherwise — e.g. how HP would have performed without buying Compaq. Fundamentally unobservable, which is why measuring whether a merger "worked" long-term is so difficult.',
    related: ['Announcement Return'],
    tags: ['m&a'],
  },
  {
    term: 'Sensitivity Analysis',
    moduleId: 4,
    definition:
      'Calculating how sensitive the NPV is to changes in key parameters (sales, costs, discount rate). The baseline always uses the expected (average) value, never the worst case. Useful for validating forecasts and finding break-even points — not for rejecting a project just because some scenario is negative.',
    related: ['Expected Value', 'Break-even Sales', 'Net Present Value (NPV)'],
    tags: ['risk'],
  },
  {
    term: 'Expected Value',
    moduleId: 4,
    definition:
      'The probability-weighted average outcome — the "best guess" used in any valuation. In the machine example, sales of 1/2/3/4/5M units (equally likely) average to 3M, so NPV uses 3M, not the worst case.',
    related: ['Sensitivity Analysis'],
    tags: ['risk'],
  },
  {
    term: 'Break-even Sales',
    moduleId: 4,
    definition:
      'The minimum value of a key parameter for which NPV = 0. In the machine example, ~1,965,000 units. Found by trial-and-error in a spreadsheet; useful for planning questions to the marketing department.',
    related: ['Sensitivity Analysis', 'Net Present Value (NPV)'],
    tags: ['risk'],
  },
  {
    term: 'Required Return on Debt',
    moduleId: 4,
    definition:
      'The return debtholders demand, approximated by the long-term yield to maturity (YTM) on the firm\'s bonds — valid only if the firm is far from bankruptcy. PepsiCo 2060 bonds yielded ~4%.',
    related: ['Yield to Maturity', 'WACC (Weighted Average Cost of Capital)', 'Zero-NPV Condition'],
    tags: ['wacc'],
  },
  {
    term: 'Yield to Maturity',
    moduleId: 4,
    definition:
      'The expected return (IRR) on a bond held to maturity, assuming no default. Equals the required return on debt because, in market equilibrium, a bond\'s NPV is zero.',
    formula: 'YTM = IRR of the bond (NPV = 0)',
    related: ['Required Return on Debt', 'Zero-NPV Condition'],
    tags: ['wacc'],
  },
  {
    term: 'Zero-NPV Condition',
    moduleId: 4,
    definition:
      'A market-equilibrium argument: for a freely traded financial asset, NPV ≈ 0 (positive NPV would attract buyers, raising the price until NPV is zero). Therefore realized/expected returns can be used to estimate required returns.',
    related: ['Yield to Maturity', 'Market Risk Premium'],
    tags: ['wacc'],
  },
  {
    term: 'CAPM (Capital Asset Pricing Model)',
    moduleId: 4,
    definition:
      'The model for the required return on equity. Equity has no promised cash flow (residual claim), so YTM cannot be used; CAPM prices equity risk via beta and the market risk premium.',
    formula: 'r_E = R_f + β × (R_m − R_f)',
    related: ['Beta', 'Market Risk Premium', 'Risk-free Rate'],
    tags: ['wacc'],
  },
  {
    term: 'Risk-free Rate',
    moduleId: 4,
    definition:
      'The yield on a government bond, assumed default-free (the government can tax to repay). Use the longest available maturity and the current yield. May 2022: 30-year US T-bond ≈ 2.99% → 3%.',
    related: ['CAPM (Capital Asset Pricing Model)', 'Market Risk Premium'],
    tags: ['wacc'],
  },
  {
    term: 'Market Risk Premium',
    moduleId: 4,
    definition:
      'The extra return investors demand for holding the stock market instead of government bonds. Estimated from history (1928–2021): stocks ≈ 10%, T-bonds 4.84% → premium ≈ 5.1% ≈ 5%.',
    formula: 'MRP = R_m − R_f ≈ 10% − 4.84% ≈ 5%',
    related: ['CAPM (Capital Asset Pricing Model)', 'Risk-free Rate', 'Expected Market Return'],
    tags: ['wacc'],
  },
  {
    term: 'Expected Market Return',
    moduleId: 4,
    definition:
      'The zero-NPV return on the stock market: current risk-free rate plus the market risk premium. May 2022: 3% + 5% = 8%. Always use the current T-bond yield, not the historical one.',
    formula: 'R_m = current R_f + MRP = 3% + 5% = 8%',
    related: ['Market Risk Premium', 'Risk-free Rate'],
    tags: ['wacc'],
  },
  {
    term: 'Beta',
    moduleId: 4,
    definition:
      'A measure of a company\'s risk — how its stock returns move with the market. High beta = high risk. If the market falls 10% and the stock falls 15%, β > 1 (amplified); if it falls 3%, β < 1. PepsiCo ≈ 0.7; Altria (tobacco) ≈ 0.5; Constellation Brands (wine) ≈ 1.07.',
    formula: 'β > 1: riskier than market ; β < 1: less risky',
    related: ['CAPM (Capital Asset Pricing Model)', 'Industry Beta', 'Pure-play Approach'],
    tags: ['wacc'],
  },
  {
    term: 'WACC (Weighted Average Cost of Capital)',
    moduleId: 4,
    definition:
      'The firm\'s discount rate — a weighted average of the required returns on debt and equity, using MARKET-value weights, with the debt cost shielded by taxes. The hurdle rate for projects with risk similar to the firm. PepsiCo 2022 ≈ 5.6%.',
    formula: 'WACC = r_E·(E/V) + r_D·(D/V)·(1 − T_c)',
    related: ['CAPM (Capital Asset Pricing Model)', 'Leverage (market value)', 'Required Return on Debt'],
    tags: ['wacc'],
  },
  {
    term: 'Leverage (market value)',
    moduleId: 4,
    definition:
      'Debt-to-value ratio D/V used in WACC, computed with the MARKET value of equity — not book. Book equity ignores future value and overstates leverage, which would understate the WACC and risk capital into negative-NPV projects. PepsiCo: D=40, E=240, V=280 → D/V = 14%.',
    formula: 'D/V (market) — PepsiCo: 40/280 = 14%',
    related: ['WACC (Weighted Average Cost of Capital)', 'Book vs Market Value'],
    tags: ['wacc'],
  },
  {
    term: 'EVA (Economic Value Added)',
    moduleId: 4,
    definition:
      'Whether a company, division, or project earns more than its cost of capital in a given year. Equals after-tax operating profit minus a capital charge. Positive EVA = real economic profit. PepsiCo 2021 ≈ +$4.1B; Altria\'s wine division 2021 ≈ −$48M.',
    formula: 'EVA = OPAT − WACC × Operating Assets',
    related: ['OPAT', 'Operating Assets', 'WACC (Weighted Average Cost of Capital)'],
    tags: ['performance'],
  },
  {
    term: 'OPAT',
    moduleId: 4,
    definition:
      'Operating Profit After Taxes — operating income minus taxes, a profit measure BEFORE interest (unlike Net Income). Used in EVA because we measure the whole business, not just equity. (FIN 570 treats reported taxes as applying directly to operating income.)',
    formula: 'OPAT = Operating Income − Taxes',
    related: ['EVA (Economic Value Added)', 'Operating Assets'],
    tags: ['performance'],
  },
  {
    term: 'Operating Assets',
    moduleId: 4,
    definition:
      'The capital actually invested in the business: book value of assets minus cash and short-term investments. Book (not market) values, because we measure capital invested now; cash is excluded because it is typically invested in financial assets, not the business.',
    formula: 'Operating Assets = Book Assets − Cash',
    related: ['EVA (Economic Value Added)', 'OPAT'],
    tags: ['performance'],
  },
  {
    term: 'Industry Beta',
    moduleId: 4,
    definition:
      'A divisional beta estimated by averaging betas across many firms in a related industry. For Altria\'s wine division, the alcoholic-beverage beta (21 firms) ≈ 0.82 — far from the tobacco beta of 0.5.',
    related: ['Beta', 'Pure-play Approach', 'Divisional Cost of Capital'],
    tags: ['performance'],
  },
  {
    term: 'Pure-play Approach',
    moduleId: 4,
    definition:
      'Estimating a division\'s beta from a single publicly traded company whose main business matches the division. For Altria\'s wine division, Constellation Brands (mostly wine) gives β ≈ 1.07, implying r_E ≈ 8.35% and WACC ≈ 7.2%.',
    related: ['Industry Beta', 'Beta', 'Divisional Cost of Capital'],
    tags: ['performance'],
  },
  {
    term: 'Divisional Cost of Capital',
    moduleId: 4,
    definition:
      'The discount rate specific to a division\'s risk, which may differ from the company-wide WACC. Using the parent\'s (tobacco) beta of 0.5 instead of the wine beta of 1.07 would understate risk and overstate EVA — distorting performance evaluation and manager pay.',
    related: ['Industry Beta', 'Pure-play Approach', 'EVA (Economic Value Added)'],
    tags: ['performance'],
  },
]

export const allModuleIds = Array.from(new Set(GLOSSARY.map((g) => g.moduleId))).sort()
