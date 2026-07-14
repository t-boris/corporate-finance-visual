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

  // ───── Module 5 · Raising Financing: The Capital Structure Decision ─────
  {
    term: 'Capital Structure',
    moduleId: 5,
    definition:
      'The mix of debt and equity a firm uses to finance its assets. The central decision of Module 5: should the firm raise new financing by issuing debt or equity, and what is the optimal proportion?',
    related: ['Leverage', 'Debt Financing', 'Equity Financing', 'Trade-off Theory'],
    tags: ['capital-structure'],
  },
  {
    term: 'Debt Financing',
    moduleId: 5,
    definition:
      'Raising cash now (bank loan or public bond) in exchange for fixed interest payments and repayment of principal. Adds interest expense to the income statement and a net-borrowing inflow to the cash flow statement.',
    formula: 'New interest = Debt × interest rate (e.g. $7B × 4% = $280M)',
    related: ['Equity Financing', 'Interest Tax Shield', 'Yield to Maturity'],
    tags: ['capital-structure'],
  },
  {
    term: 'Equity Financing',
    moduleId: 5,
    definition:
      'Raising cash by selling new shares; buyers become co-owners and no fixed payment is promised. Does not change the income statement; increases shares outstanding and adds a stock-issuance inflow to financing cash flows.',
    formula: 'New shares = Amount raised / Share price (e.g. $7B / $173 ≈ 40.46M)',
    related: ['Debt Financing', 'Dilution', 'Seasoned Equity Offering (SEO)'],
    tags: ['capital-structure'],
  },
  {
    term: 'Leverage',
    moduleId: 5,
    definition:
      'The degree to which a firm is financed by debt, measured as D/V (debt over firm value, using the MARKET value of equity). U.S. median leverage ≈ 30%.',
    formula: 'L = D / V, with V = D + market value of equity',
    related: ['Capital Structure', 'Optimal Leverage (L*)', 'Leverage Amplifies Risk'],
    tags: ['capital-structure'],
  },
  {
    term: 'NPV of Issuance',
    moduleId: 5,
    definition:
      'The net present value of issuing a security. Under efficient markets / fair pricing, both debt and equity issuance have NPV ≈ 0: the cash received exactly offsets the present value of the obligations (interest/principal) or the new shares.',
    formula: 'NPV_debt = +Proceeds − PV(interest + principal) = 0 (if fairly priced)',
    related: ['Efficient Markets', 'Debt Financing', 'Equity Financing'],
    tags: ['capital-structure'],
  },
  {
    term: 'Incremental Cash Flow (financing)',
    moduleId: 5,
    definition:
      'Only cash flows that change with a decision matter. The NPV of the underlying investment is the SAME whether funded by debt or equity, so it is non-incremental to the debt-vs-equity choice and can be ignored.',
    related: ['NPV of Issuance', 'Debt Financing', 'Equity Financing'],
    tags: ['capital-structure'],
  },
  {
    term: 'Dilution',
    moduleId: 5,
    definition:
      'The claim that issuing equity lowers the stock price because shares outstanding rise. "Dilution is an illusion": the firm also receives cash, so market value of equity rises proportionally and the price is unchanged — IF shares are sold at the fair price.',
    formula: 'P = Market value of equity / Shares (numerator and denominator both rise)',
    related: ['Real Dilution', 'Equity Financing', 'Efficient Markets'],
    tags: ['capital-structure'],
  },
  {
    term: 'Real Dilution',
    moduleId: 5,
    definition:
      'Genuine value transfer that occurs when new shares are sold BELOW the market price. Existing holders lose because the cash raised does not fully offset the new shares. Example: Ruth\'s 2020 SEO priced at $7.75 vs a $9.50 market price → mechanical price drop to $9.2.',
    formula: 'P_new = (old equity value + cash raised) / (old + new shares)',
    related: ['Dilution', 'Seasoned Equity Offering (SEO)', 'Signaling'],
    tags: ['capital-structure'],
  },
  {
    term: 'Cost-of-Capital Illusion',
    moduleId: 5,
    definition:
      'The mistaken argument that because after-tax debt (3.2%) is cheaper than equity (6%), issuing debt mechanically lowers WACC. Wrong because raising leverage raises BOTH the required return on debt and on equity (risk rises).',
    formula: 'Naïve: WACC 5.6% → 4.9% at L=40% (holding r_E, r_D fixed) — incorrect',
    related: ['Modigliani–Miller (M&M)', 'WACC', 'Leverage Amplifies Risk'],
    tags: ['capital-structure'],
  },
  {
    term: 'Leverage Amplifies Risk',
    moduleId: 5,
    definition:
      'Debt magnifies the percentage swings in equity value: with debt, gains in a boom and losses in a bust are both larger. Greater fluctuation = more systematic risk, so beta and the required return on equity rise with leverage.',
    formula: 'All-equity: +11% / −33%; with debt: +17% / −50%',
    related: ['Beta', 'Modigliani–Miller (M&M)', 'Cost-of-Capital Illusion'],
    tags: ['capital-structure'],
  },
  {
    term: 'Modigliani–Miller (M&M)',
    moduleId: 5,
    definition:
      'Nobel-winning result (1958): under ideal conditions the firm\'s cost of capital (WACC) is INDEPENDENT of leverage. As leverage rises, r_E and r_D rise just enough to keep WACC constant. Conditions: securities fairly priced (NPV=0) and no frictions such as the interest tax deduction.',
    formula: 'WACC constant (e.g. 5.6%) regardless of L (no-tax M&M)',
    related: ['WACC', 'Cost-of-Capital Illusion', 'Interest Tax Shield'],
    tags: ['capital-structure'],
  },
  {
    term: 'Yield to Maturity',
    moduleId: 5,
    definition:
      "A bond's internal rate of return if held to maturity; also the expected return on the bond and the correct discount rate for valuing the debt issuance (4% in the PepsiCo example).",
    related: ['Debt Financing', 'NPV of Issuance'],
    tags: ['capital-structure'],
  },
  {
    term: 'Pecking Order',
    moduleId: 5,
    definition:
      'The order in which firms prefer to finance investment: internal funds first, then debt, and external equity last. Internal funds are the largest source in the data; aggregate net equity issuance is negative almost every year (firms repurchase more than they issue).',
    related: ['Equity Financing', 'Debt Financing', 'Seasoned Equity Offering (SEO)'],
    tags: ['capital-structure'],
  },
  {
    term: 'Equity Issuance Price Reaction',
    moduleId: 5,
    definition:
      'Stylized fact (Eckbo & Masulis 1995): announcing a bond issue moves the stock price ≈ 0%, but announcing an equity issue lowers it on average by 1.5%–3%. Markets read equity issuance as bad news, so firms are reluctant to issue equity.',
    related: ['Pecking Order', 'Signaling', 'Seasoned Equity Offering (SEO)'],
    tags: ['capital-structure'],
  },
  {
    term: 'OPAT',
    moduleId: 5,
    definition:
      'Operating Profit After Taxes — profit to all capital providers (before interest). In FIN 570 it is EBIT minus taxes AS REPORTED (on the post-interest tax base), NOT re-grossed-up. OPAT RISES with leverage because interest is tax-deductible and taxes fall.',
    formula: 'OPAT = EBIT − Taxes (as reported)',
    related: ['Interest Tax Shield', 'Net Income vs OPAT', 'Leverage'],
    tags: ['capital-structure'],
  },
  {
    term: 'Interest Tax Shield',
    moduleId: 5,
    definition:
      'The tax saving from deductible interest. Issuing debt lowers taxable income, so the firm pays fewer taxes — effectively "taking money from the government." This is the main benefit of debt and the upward-sloping part of the trade-off model.',
    formula: 'Tax saving ≈ T × Interest (e.g. 21% × $280M)',
    related: ['OPAT', 'Trade-off Theory', 'Modigliani–Miller (M&M)'],
    tags: ['capital-structure'],
  },
  {
    term: 'Net Income vs OPAT',
    moduleId: 5,
    definition:
      'After a debt issue, net income (profit to shareholders, after interest) FALLS because interest rises, but OPAT (profit to all capital, before interest) RISES because taxes fall. The course measures profitability with OPAT.',
    related: ['OPAT', 'Interest Tax Shield'],
    tags: ['capital-structure'],
  },
  {
    term: 'Financial Distress',
    moduleId: 5,
    definition:
      'A high-leverage situation where the firm struggles to cover interest/debt obligations from operating income and is forced into costly actions. Usually triggered by poor performance, not by voluntarily over-borrowing. Far more common than outright bankruptcy.',
    related: ['Costs of Financial Distress', 'Bankruptcy', 'Leverage'],
    tags: ['capital-structure'],
  },
  {
    term: 'Costs of Financial Distress',
    moduleId: 5,
    definition:
      'The value loss when high leverage forces costly refinancing (at high rates), distressed equity issuance (large price drops), or cuts to dividends/positive-NPV investments. Estimated at 10–25% of firm value (Andrade & Kaplan 1998). This is the main cost of debt.',
    related: ['Financial Distress', 'Trade-off Theory', 'Bankruptcy'],
    tags: ['capital-structure'],
  },
  {
    term: 'Bankruptcy',
    moduleId: 5,
    definition:
      'The extreme form of distress: the firm cannot repay its liabilities and goes to court to liquidate or reorganize. Distress (and its costs) arise well before outright bankruptcy.',
    related: ['Financial Distress', 'Costs of Financial Distress'],
    tags: ['capital-structure'],
  },
  {
    term: 'Trade-off Theory',
    moduleId: 5,
    definition:
      'Optimal leverage balances the tax benefit of debt (raises value) against the expected costs of financial distress (lowers value). The value-maximizing leverage is L*. It also minimizes the WACC.',
    formula: 'V_L = V_U + PV(tax shield) − PV(distress costs)',
    related: ['Optimal Leverage (L*)', 'Interest Tax Shield', 'Costs of Financial Distress'],
    tags: ['capital-structure'],
  },
  {
    term: 'Optimal Leverage (L*)',
    moduleId: 5,
    definition:
      'The leverage ratio that maximizes firm value (and minimizes WACC). For the median U.S. firm L* ≈ 30%; moving from zero to optimal leverage adds ≈ 5% of value (Korteweg). Unprofitable firms can have L* near zero.',
    formula: 'L* ≈ 30% for the median firm; value gain ≈ 5%',
    related: ['Trade-off Theory', 'Leverage', 'Determinants of Optimal Leverage'],
    tags: ['capital-structure'],
  },
  {
    term: 'Determinants of Optimal Leverage',
    moduleId: 5,
    definition:
      'Firm characteristics that shift L*: higher cash-flow volatility → less debt; more collateral/tangibility → more debt; larger size → more debt; higher profitability → more debt; higher market-to-book/growth → less debt. Credit ratings summarize these.',
    related: ['Optimal Leverage (L*)', 'Trade-off Theory', 'Collateral'],
    tags: ['capital-structure'],
  },
  {
    term: 'Collateral',
    moduleId: 5,
    definition:
      'Tangible assets (land, real estate, equipment) that can be sold if the firm fails. More collateral lowers credit and distress risk, raising optimal leverage.',
    related: ['Determinants of Optimal Leverage', 'Costs of Financial Distress'],
    tags: ['capital-structure'],
  },
  {
    term: 'Seasoned Equity Offering (SEO)',
    moduleId: 5,
    definition:
      'A sale of new shares by an already-public company. An underwriter (e.g. Jefferies for Ruth\'s) gives a firm commitment to buy at a fixed, discounted price, then places shares in the market. Two motives: necessity (Ruth\'s 2020) and opportunity (AMC 2021).',
    related: ['Equity Financing', 'Real Dilution', 'Window of Opportunity', 'Underwriter'],
    tags: ['capital-structure'],
  },
  {
    term: 'Underwriter',
    moduleId: 5,
    definition:
      'The investment bank that buys an SEO under a "firm commitment" at a fixed price and resells shares to investors. It prices shares at a discount because it expects the price to drop once the market learns of the issuance.',
    related: ['Seasoned Equity Offering (SEO)', 'Real Dilution'],
    tags: ['capital-structure'],
  },
  {
    term: 'Window of Opportunity',
    moduleId: 5,
    definition:
      'Issuing equity to exploit overvaluation (price above fundamental value), e.g. AMC in 2021 selling shares at $50.85 when fundamental value was ~$15. The fundamental price rises (NPV>0 for existing holders); new shareholders overpay.',
    formula: 'AMC P_new = ($7.5B + $587M)/(500M + 11.55M) ≈ $15.81',
    related: ['Seasoned Equity Offering (SEO)', 'Signaling', 'Efficient Markets'],
    tags: ['capital-structure'],
  },
  {
    term: 'Signaling',
    moduleId: 5,
    definition:
      'Because managers know more than investors, the act of issuing equity conveys information. Issuing tends to signal that managers think the stock is (fairly or over) valued, so the market lowers the price on announcement.',
    related: ['Equity Issuance Price Reaction', 'Real Dilution', 'Pecking Order'],
    tags: ['capital-structure'],
  },
  {
    term: 'Leveraged Buyout (LBO)',
    moduleId: 5,
    definition:
      'Acquisition financed largely with debt. High post-deal leverage raises distress risk — illustrated by Red Lobster (bought by a PE fund in 2014), a cautionary example for the costs of financial distress.',
    related: ['Leverage', 'Costs of Financial Distress', 'Financial Distress'],
    tags: ['capital-structure'],
  },

  // ───── Module 6 · Understanding Debt Financing and Payout Policy ─────
  {
    term: 'Yield to Maturity (YTM)',
    moduleId: 6,
    definition:
      'The promised return on a bond IF the issuer does not default. Observable from the bond price. It is NOT the expected return — for risky issuers the YTM overstates what investors actually expect to earn.',
    formula: 'YTM = promised return (paid only if no default)',
    related: ['Cost of Debt (r_D)', 'Credit Risk', 'Probability of Default'],
    tags: ['debt', 'bonds'],
  },
  {
    term: 'Cost of Debt (r_D)',
    moduleId: 6,
    definition:
      'The EXPECTED return on a company\'s debt — the figure used in the WACC. Computed from the YTM by adjusting for the probability of default and the recovery rate. Always ≤ YTM; the gap is large when credit risk is high.',
    formula: 'r_D = (1 − p)·YTM + p·(recovery − 1)',
    related: ['Yield to Maturity (YTM)', 'Probability of Default', 'Recovery Rate', 'WACC'],
    tags: ['debt', 'bonds'],
  },
  {
    term: 'Credit Risk',
    moduleId: 6,
    definition:
      'The risk a lender takes that the borrower defaults. Driven by the probability of default and the recovery rate. The main force behind credit markets and the spread of corporate yields over Treasuries.',
    related: ['Probability of Default', 'Recovery Rate', 'Credit Rating'],
    tags: ['debt', 'risk'],
  },
  {
    term: 'Probability of Default',
    moduleId: 6,
    definition:
      'The chance an issuer fails to meet a debt obligation. Reported historically by rating (e.g., BBB ≈ 5.3% over 10 years) or estimated firm-specifically (Kraft-Heinz ≈ 0.4%/year, April 2022). Driven by leverage, profitability, size, cash-flow risk.',
    related: ['Credit Risk', 'Recovery Rate', 'Credit Rating'],
    tags: ['debt', 'risk'],
  },
  {
    term: 'Recovery Rate',
    moduleId: 6,
    definition:
      'The fraction of a debt\'s face value a lender recovers in default. Historically ~40% for senior unsecured bonds and above 80% for secured bank debt. The return upon default equals (recovery − 1), e.g. 40% recovery → −60%.',
    formula: 'Return if default = recovery − 1',
    related: ['Probability of Default', 'Secured Debt', 'Unsecured Debt'],
    tags: ['debt', 'risk'],
  },
  {
    term: 'Credit Rating',
    moduleId: 6,
    definition:
      'An agency opinion (S&P, Moody\'s, Fitch) on an issuer\'s ability and willingness to meet obligations in full and on time — a summary measure of credit risk. Depends not only on leverage but also profitability, size, and cash-flow risk.',
    related: ['Credit Risk', 'Investment Grade', 'Junk (Speculative) Grade', 'Interest Coverage Ratio'],
    tags: ['debt', 'ratings'],
  },
  {
    term: 'Investment Grade',
    moduleId: 6,
    definition:
      'Ratings of BBB− (S&P) or higher — the quality tier most institutional investors require. Insurance companies, important bond buyers, are typically barred from holding bonds rated below BBB−.',
    related: ['Credit Rating', 'Junk (Speculative) Grade', 'Rating Downgrade'],
    tags: ['debt', 'ratings'],
  },
  {
    term: 'Junk (Speculative) Grade',
    moduleId: 6,
    definition:
      'Ratings of BB+ (S&P) or lower. Crossing from BBB− to BB+ is a downgrade out of investment grade, which can restrict access to commercial paper, credit lines, and certain institutional buyers.',
    related: ['Investment Grade', 'Rating Downgrade', 'Credit Rating'],
    tags: ['debt', 'ratings'],
  },
  {
    term: 'Rating Downgrade',
    moduleId: 6,
    definition:
      'A lowering of an issuer\'s credit rating. Especially costly when it crosses into junk: loss of commercial-paper access, higher interest rates, rating triggers in covenants, tighter bank-capital treatment. Why firms target ratings, not just an optimal leverage ratio.',
    related: ['Investment Grade', 'Junk (Speculative) Grade', 'Commercial Paper'],
    tags: ['debt', 'ratings'],
  },
  {
    term: 'Interest Coverage Ratio',
    moduleId: 6,
    definition:
      'EBIT divided by interest expense — how many times operating income covers interest. Higher coverage supports a higher credit rating; a coverage near 2 can push a firm below BBB.',
    formula: 'Interest Coverage = EBIT / Interest expense',
    related: ['Credit Rating', 'Leverage'],
    tags: ['debt', 'ratings'],
  },
  {
    term: 'Spread Method',
    moduleId: 6,
    definition:
      'Estimating the cost of debt as the risk-free rate plus a credit spread (typically 1–2%, wider for lower ratings). Used when there is no 30-year bond or no traded debt; the 10-year spread can be applied to the 30-year Treasury to match maturity.',
    formula: 'r_D ≈ risk-free rate + spread (1–2%)',
    related: ['Cost of Debt (r_D)', 'Yield to Maturity (YTM)'],
    tags: ['debt', 'bonds'],
  },
  {
    term: 'Commercial Paper',
    moduleId: 6,
    definition:
      'Short-term debt (typically 20–270 days) sold directly to the market with no bank, available only to high-rated firms (e.g., Walmart, 8% of its debt). U.S. non-financial commercial paper outstanding ≈ $300B (mid-2025).',
    related: ['Credit Rating', 'Bond', 'Revolving Credit'],
    tags: ['debt', 'types'],
  },
  {
    term: 'Revolving Credit',
    moduleId: 6,
    definition:
      'A bank loan created when a firm draws down a credit line. The undrawn line itself (e.g., Walmart\'s $9.4B) is held as liquidity insurance against refinancing trouble, despite a maintenance fee.',
    related: ['Term Loan', 'Commercial Paper', 'Liquidity Risk'],
    tags: ['debt', 'types'],
  },
  {
    term: 'Term Loan',
    moduleId: 6,
    definition:
      'A standard bank loan that does NOT originate from a credit-line drawdown (e.g., a mortgage). Can be short or long term. The main debt source for small firms like Pricemark; absent at Walmart.',
    related: ['Revolving Credit', 'Bank vs. Market Financing', 'Secured Debt'],
    tags: ['debt', 'types'],
  },
  {
    term: 'Bond',
    moduleId: 6,
    definition:
      'Debt issued directly to the market (no bank lender), held by investors, pension and mutual funds. Usually unsecured — backed by the firm\'s entire cash flows, not a specific asset. Requires a credit rating (62% of Walmart\'s debt).',
    related: ['Commercial Paper', 'Lease', 'Unsecured Debt', 'Credit Rating'],
    tags: ['debt', 'types'],
  },
  {
    term: 'Lease',
    moduleId: 6,
    definition:
      'A contract that creates a future liability tied to a specific asset. A finance (capital) lease transfers ownership at the end and was always treated as debt; an operating lease is pure rental and has been reported as debt only since the 2018 accounting change.',
    related: ['Secured Debt', 'Bond'],
    tags: ['debt', 'types'],
  },
  {
    term: 'Secured Debt',
    moduleId: 6,
    definition:
      'Debt collateralized by a specific asset (real estate, machinery, or carved-out cash flows). The lender has priority over that asset in default, raising recovery rates. Bank debt is typically secured; leases are secured by the leased asset.',
    related: ['Unsecured Debt', 'Recovery Rate', 'Covenant'],
    tags: ['debt', 'contracts'],
  },
  {
    term: 'Unsecured Debt',
    moduleId: 6,
    definition:
      'Debt with no specific collateral, honored out of the firm\'s overall cash flows. Bonds and commercial paper are almost always unsecured, which lowers recovery (~40% for senior unsecured bonds) versus secured bank debt (>80%).',
    related: ['Secured Debt', 'Recovery Rate', 'Seniority'],
    tags: ['debt', 'contracts'],
  },
  {
    term: 'Seniority',
    moduleId: 6,
    definition:
      'Priority of a claim in bankruptcy. Senior debt is paid before junior debt and equity. Together with collateral and covenants, seniority is a contract feature as important as the interest rate for pricing debt.',
    related: ['Secured Debt', 'Unsecured Debt', 'Covenant'],
    tags: ['debt', 'contracts'],
  },
  {
    term: 'Covenant',
    moduleId: 6,
    definition:
      'A condition a borrower must maintain to keep a loan in good standing (e.g., EBITDA above a threshold). Common in bank loans, rare/general in bonds. Gives the bank control and raises recovery rates.',
    related: ['Technical Default', 'Secured Debt', 'Bank vs. Market Financing'],
    tags: ['debt', 'contracts'],
  },
  {
    term: 'Technical Default',
    moduleId: 6,
    definition:
      'A default triggered by a covenant violation rather than an inability to pay. Banks set the threshold above interest due, so control transfers to the bank BEFORE actual insolvency — letting it renegotiate or call the loan, increasing recovery.',
    related: ['Covenant', 'Recovery Rate'],
    tags: ['debt', 'contracts'],
  },
  {
    term: 'Bank vs. Market Financing',
    moduleId: 6,
    definition:
      'The choice between bank loans (secured, covenant-heavy, lower rate, more lender control) and bonds (unsecured, arm\'s-length, higher rate, less control). Banks suit small, young, risky firms (Pricemark); bonds suit large, mature firms (Walmart).',
    related: ['Term Loan', 'Bond', 'Covenant', 'Unrated Company'],
    tags: ['debt', 'choice'],
  },
  {
    term: 'Unrated Company',
    moduleId: 6,
    definition:
      'A firm with no official credit rating because it has not issued bonds. S&P still produces a pseudo-rating for all public firms (Pricemark ≈ BB−), useful for gauging credit risk but insufficient to issue a bond.',
    related: ['Credit Rating', 'Bank vs. Market Financing'],
    tags: ['debt', 'ratings'],
  },
  {
    term: 'Payout Policy',
    moduleId: 6,
    definition:
      'How a firm returns cash to equity investors — via dividends and share repurchases. The mirror image of raising capital. Payments to debt investors are not "policy" because they are contractually required.',
    related: ['Dividend', 'Share Repurchase (Buyback)', 'Dividend Puzzle'],
    tags: ['payout'],
  },
  {
    term: 'Dividend',
    moduleId: 6,
    definition:
      'A cash distribution to all shareholders. Under MM it is zero-NPV ("moving cash from one pocket to another"), but data show prices rise on increases (+1.32%) and initiations (+3.4%) and fall sharply on omissions (−7%). Taxed at up to ~20%; cannot be cut without a price penalty.',
    related: ['Share Repurchase (Buyback)', 'Dividend Signaling', 'Dividend Puzzle'],
    tags: ['payout'],
  },
  {
    term: 'Share Repurchase (Buyback)',
    moduleId: 6,
    definition:
      'A firm buying back its own shares — the mirror image of an equity issue. At market price the NPV is zero (cash spent offsets fewer shares). On average prices rise ~1.54% on announcement. More tax-efficient and more flexible than dividends.',
    formula: 'P_new = (Equity value − Cash spent) / (Shares − Repurchased)',
    related: ['Dividend', 'Dilution is an Illusion', 'EPS Management', 'SEC Rule 10b-18'],
    tags: ['payout'],
  },
  {
    term: 'Dilution is an Illusion',
    moduleId: 6,
    definition:
      'A buyback reduces share count but also spends cash; at the market price these exactly offset, so the stock price is unchanged (NPV = 0). The mirror of the equity-issuance dilution illusion. Prices rise after buybacks for other reasons (signaling), not arithmetic.',
    related: ['Share Repurchase (Buyback)', 'EPS Management'],
    tags: ['payout'],
  },
  {
    term: 'Dividend Signaling',
    moduleId: 6,
    definition:
      'Raising a dividend (or buying back stock) signals management confidence in future cash flows, since both spend cash. Repurchases additionally signal undervaluation (the firm thinks its stock is cheap); dividends signal stability via the expectation of continuation.',
    related: ['Dividend', 'Share Repurchase (Buyback)', 'Cash Management'],
    tags: ['payout', 'signaling'],
  },
  {
    term: 'Cash Management',
    moduleId: 6,
    definition:
      'A motive for payout: distributing cash prevents it from piling up on the balance sheet, where it tends to fund value-destroying acquisitions and sloppy spending. Evidence: each dollar of excess cash destroys ~$0.07 of shareholder value (free-cash-flow problem).',
    formula: '≈ $0.07 value destroyed per $1 of excess cash',
    related: ['Dividend', 'Share Repurchase (Buyback)', 'Free Cash Flow'],
    tags: ['payout', 'agency'],
  },
  {
    term: 'EPS Management',
    moduleId: 6,
    definition:
      'Using buybacks to lift earnings per share by cutting share count — a repurchase-only effect (dividends don\'t change EPS). ~37% of repurchases come from firms about to just miss the analyst EPS forecast, more so when CEO pay is tied to EPS (an agency concern).',
    formula: 'EPS = (Net income − foregone interest) / (Shares − Repurchased)',
    related: ['Share Repurchase (Buyback)', 'Dividend', 'Dividend Puzzle'],
    tags: ['payout', 'agency'],
  },
  {
    term: 'Dividend Puzzle',
    moduleId: 6,
    definition:
      'Repurchases beat dividends on taxes, flexibility, and EPS, yet firms still pay large dividends. Possible explanations: behavioral preference for "real" cash, dividends signaling stability, and CFO fear of being blamed for buying back at a high price.',
    related: ['Dividend', 'Share Repurchase (Buyback)', 'SEC Rule 10b-18'],
    tags: ['payout'],
  },
  {
    term: 'SEC Rule 10b-18',
    moduleId: 6,
    definition:
      'The 1982 "safe harbor" that lets firms repurchase shares without insider-trading liability if they follow set conditions. Before 1982 buyback litigation risk was high; afterward repurchases took off and overtook dividends as the main payout method.',
    related: ['Share Repurchase (Buyback)', 'Dividend Puzzle'],
    tags: ['payout', 'regulation'],
  },
  {
    term: 'Dividend Initiation / Omission',
    moduleId: 6,
    definition:
      'A firm paying a dividend for the first time (initiation, ~+3.4% price reaction) or stopping its dividend (omission, ~−7%). The asymmetric reactions show investors strongly dislike dividend cuts. Meta initiated its first dividend in 2024.',
    related: ['Dividend', 'Dividend Signaling', 'Dividend Puzzle'],
    tags: ['payout', 'signaling'],
  },

  // ───── Module 7 · Risk Management ─────
  {
    term: 'Hedging',
    moduleId: 7,
    definition:
      'Reducing or reallocating risks using financial instruments (forwards, futures, options, swaps) or other mechanisms (liquidity, operational hedging). Hedging is "the search for zero": the financial position offsets the operational exposure so the net effect of the risk factor is ~0 — it is NOT about making trading profits.',
    related: ['Speculation', 'Operational Exposure', 'Derivative'],
    tags: ['risk management'],
  },
  {
    term: 'Speculation',
    moduleId: 7,
    definition:
      'Using derivatives (or balance-sheet positions) to profit from a view about future prices — the opposite of hedging. Test: does the financial position offset the firm\'s operational exposure? If it adds exposure in the same direction (e.g., Nintendo holding USD cash while operationally long dollars), it is speculation. Prices are unpredictable — a CFO with a price view "should move to Wall Street."',
    related: ['Hedging', 'Operational Exposure'],
    tags: ['risk management'],
  },
  {
    term: 'Derivative',
    moduleId: 7,
    definition:
      'A security whose value derives from an underlying asset or rate. Corporate risk-management derivatives include forwards, futures, options, and swaps — available for tradable risks such as currencies, commodities (oil, steel), and interest rates.',
    related: ['Forward Contract', 'Futures Contract', 'Interest Rate Swap'],
    tags: ['instruments'],
  },
  {
    term: 'Good Reasons to Hedge',
    moduleId: 7,
    definition:
      'Three valid motives: (1) choosing which risks to take (keep Indian-market exposure, drop rupee exposure); (2) eliminating risks outside the company\'s control (oil prices for an airline — also cleans up executive-compensation signals); (3) reducing the risk of financial distress (distress destroys value, so a levered firm gains from hedging).',
    related: ['Bad Reasons to Hedge', 'Financial Distress and Hedging'],
    tags: ['risk management'],
  },
  {
    term: 'Bad Reasons to Hedge',
    moduleId: 7,
    definition:
      'Two invalid motives: (1) reducing profit volatility per se — shareholders can diversify on their own (same logic as diversifying M&A), and no risk = no return; (2) generating trading profits from a market view — that is speculation, not hedging.',
    related: ['Good Reasons to Hedge', 'Speculation'],
    tags: ['risk management'],
  },
  {
    term: 'Financial Distress and Hedging',
    moduleId: 7,
    definition:
      'For an unlevered firm, hedging (e.g., an airline hedging oil) barely affects value — volatility per se doesn\'t matter to diversified shareholders. For a highly levered firm, an adverse move (oil price up) can trigger financial distress, raising the cost of capital and destroying value — so hedging that risk creates value.',
    related: ['Good Reasons to Hedge', 'Hedging'],
    tags: ['risk management', 'capital structure'],
  },
  {
    term: 'Forward Contract',
    moduleId: 7,
    definition:
      'An obligation to exchange an asset (real or financial) at a future date at a pre-specified price. No cash changes hands when the contract is written ("a piece of paper"); the counterparties settle at maturity. Carries settlement risk, so forwards are used mainly by the financial sector and very high-rated firms.',
    formula: 'Payment = Notional × Forward rate (locked in)',
    related: ['Futures Contract', 'Settlement Risk', 'Forward Rate'],
    tags: ['instruments'],
  },
  {
    term: 'Forward Rate',
    moduleId: 7,
    definition:
      'The market-determined rate at which a forward/futures contract exchanges currencies (or other assets) at maturity. August 2025 example: spot $1.328/£, December-2025 forward $1.329/£ — the firm can lock in 1.329, not the spot rate. £200M × 1.329 = $265.8M irrespective of the future spot.',
    formula: '£200M × $1.329/£ = $265.8M',
    related: ['Forward Contract', 'Currency Risk'],
    tags: ['instruments', 'fx'],
  },
  {
    term: 'Settlement Risk',
    moduleId: 7,
    definition:
      'The risk that one party defaults on a (forward) contract at settlement. Forwards cost nothing upfront, so they only work between reliable parties. Futures exchanges solve this with standardization, margin accounts, and by interposing the exchange as the counterparty.',
    related: ['Forward Contract', 'Futures Contract', 'Margin Account'],
    tags: ['risk management'],
  },
  {
    term: 'Futures Contract',
    moduleId: 7,
    definition:
      'A standardized derivative that trades on an exchange (e.g., the CME). The exchange requires margin accounts from buyers and sellers and assumes settlement risk — there is no direct counterparty. Contracts have minimum sizes (e.g., £62,500), so hedging £1M short takes 16 contracts.',
    formula: '£1,000,000 / £62,500 = 16 contracts',
    related: ['Forward Contract', 'Margin Account', 'Marking to Market'],
    tags: ['instruments'],
  },
  {
    term: 'Margin Account',
    moduleId: 7,
    definition:
      'The cash deposit (escrow, interest-bearing) a futures exchange requires from both buyers and sellers so it can absorb defaults. Daily losses are deducted from margin: after the short-£1M position lost $71,000, a $100,000 margin fell to $29,000 (plus accrued interest) — likely triggering a margin call.',
    related: ['Futures Contract', 'Marking to Market', 'Settlement Risk'],
    tags: ['instruments'],
  },
  {
    term: 'Marking to Market',
    moduleId: 7,
    definition:
      'Daily revaluation of a futures position at current futures prices, with gains/losses settled through the margin account. Example: short £1M at 1.329; futures rate moves to 1.4 → loss = (1.4 − 1.329) × 1,000,000 = $71,000, deducted from margin. Same mechanism drove Rolls-Royce\'s reported £4.4B revaluation loss (accounting mark-to-market of open hedges, no cash impact).',
    formula: 'P&L = (F_t − F_0) × Notional × direction',
    related: ['Margin Account', 'Futures Contract', 'Rolls-Royce Case'],
    tags: ['instruments'],
  },
  {
    term: 'The Search for Zero',
    moduleId: 7,
    definition:
      'The essence of hedging: the derivative\'s loss (gain) is offset by an equal operational gain (loss), netting to zero. Losing $71,000 on short-£ futures while the £1M receivable gained $71,000 means the CFO made NO mistake — exchange-rate risk was eliminated. Hedging targets zero, not trading profits.',
    formula: 'Derivative P&L + Operational P&L = 0',
    related: ['Hedging', 'Operational Exposure', 'Speculation'],
    tags: ['risk management'],
  },
  {
    term: 'Operational Exposure',
    moduleId: 7,
    definition:
      'How a change in a risk factor (exchange rate, interest rate, commodity price) affects the firm\'s profits through its operations. The general hedging rule: determine the operational exposure, then take a financial position that moves profits in the OPPOSITE direction. Receiving pounds → short pounds; dollar revenues with yen/sterling costs → short dollars.',
    related: ['Hedging', 'The Search for Zero', 'Natural Hedge'],
    tags: ['risk management'],
  },
  {
    term: 'Long / Short Position',
    moduleId: 7,
    definition:
      'Long = committed to RECEIVE the asset/currency (gains when it appreciates); short = committed to PAY/deliver it (gains when it depreciates). A US firm paying £200M is naturally short pounds → hedges by going long pounds forward; a firm receiving £1M is long pounds → hedges by shorting pound futures.',
    related: ['Forward Contract', 'Futures Contract', 'Operational Exposure'],
    tags: ['instruments'],
  },
  {
    term: 'Currency Risk',
    moduleId: 7,
    definition:
      'Exposure of profits to exchange-rate movements. A US importer paying £200M fears pound appreciation ($1.328 → $1.5 turns a $265.8M cost into $300M unhedged); an exporter receiving foreign currency fears its depreciation. Hedge with forwards/futures, balance-sheet positions, or operational hedging.',
    related: ['Forward Rate', 'Operational Hedging', 'Liquidity as a Substitute for Hedging'],
    tags: ['fx'],
  },
  {
    term: 'Interest Rate Risk',
    moduleId: 7,
    definition:
      'Two corporate sources: (1) floating-rate debt — bank loans priced at SOFR + spread reprice when the base rate moves (SOFR 4.3% + 2% = 6.3%; SOFR to 4.6% → 6.6%, a liquidity shock for a small firm); (2) planned future issuance — rates may rise before a firm issues (e.g., $100M of commercial paper in 3 months at today\'s 4.5%).',
    related: ['SOFR', 'Interest Rate Swap', 'Interest Rate Futures'],
    tags: ['rates'],
  },
  {
    term: 'Floating Rate Debt',
    moduleId: 7,
    definition:
      'Debt whose interest rate = base rate + fixed spread, repricing as the base rate (SOFR) moves. Bank debt — the funding source for smaller, riskier firms without bond-market access — is almost always floating rate. Hedge the base-rate risk with an interest rate swap.',
    formula: 'Rate = SOFR + spread (e.g., 4.3% + 2% = 6.3%)',
    related: ['SOFR', 'Interest Rate Swap', 'Interest Rate Risk'],
    tags: ['rates', 'debt'],
  },
  {
    term: 'SOFR',
    moduleId: 7,
    definition:
      'Secured Overnight Financing Rate — the interbank overnight rate that serves as the current risk-free benchmark for US loan pricing (SOFR + spread), replacing LIBOR after its self-reporting scandals. August 2025 in the course example: 4.3%. SOFR futures (3-month) trade on exchanges and are the hedging vehicle for base-rate risk.',
    related: ['Floating Rate Debt', 'Interest Rate Futures', 'Imperfect Hedging'],
    tags: ['rates'],
  },
  {
    term: 'Interest Rate Swap',
    moduleId: 7,
    definition:
      'A contract committing the firm to pay a fixed rate in exchange for receiving a floating rate (or vice versa). A borrower at SOFR + 2% enters "short fixed (pay 4.3%), long floating (receive SOFR)": the floating legs cancel and the all-in rate is fixed at 6.3% regardless of SOFR. Works both ways — if SOFR falls, the firm pays above market (that is the counterparty\'s upside).',
    formula: 'Floating loan + (pay fixed, receive floating) = fixed-rate loan',
    related: ['Floating Rate Debt', 'SOFR', 'Hedging'],
    tags: ['instruments', 'rates'],
  },
  {
    term: 'Interest Rate Futures',
    moduleId: 7,
    definition:
      'Exchange-traded futures on rates (e.g., 3-month SOFR futures) used to lock in rates on planned future issuance. Debt prices move INVERSELY to rates, so a firm fearing higher rates SELLS (shorts) the futures: if rates rise and prices fall, the short profits, compensating the higher borrowing cost.',
    related: ['SOFR', 'Interest Rate Risk', 'Imperfect Hedging'],
    tags: ['instruments', 'rates'],
  },
  {
    term: 'Imperfect Hedging',
    moduleId: 7,
    definition:
      'When the available derivative covers only part of the exposure. SOFR futures hedge the base rate but NOT the firm-specific spread — no futures exist on one corporation\'s commercial paper. If SOFR is flat but the CP spread jumps 0.2% → 0.5% (as in the 2008 CP crisis), the futures hedge pays nothing. Remedies: liquidity (issue early and hold cash) or operational hedging.',
    related: ['Interest Rate Futures', 'Liquidity as a Substitute for Hedging', 'Operational Hedging'],
    tags: ['risk management', 'rates'],
  },
  {
    term: 'Liquidity as a Substitute for Hedging',
    moduleId: 7,
    definition:
      'Using the balance sheet instead of derivatives: issue the commercial paper TODAY at 4.5% and hold the cash in a safe asset until needed (eliminates base-rate AND spread risk); buy pounds today and hold cash in pounds for a future £ payment; or borrow in pounds and convert to dollars against a future £ receivable. Requires actually holding the cash — spend it and the hedge fails.',
    related: ['Costs of Liquidity', 'Imperfect Hedging', 'Currency Risk'],
    tags: ['risk management', 'liquidity'],
  },
  {
    term: 'Costs of Liquidity',
    moduleId: 7,
    definition:
      'Why balance-sheet hedging isn\'t free: (1) safe assets (Treasuries, deposits) earn a low return; (2) interest income is taxable; (3) the temptation to spend the precautionary cash; (4) for foreign-currency positions, possible credit risk on foreign bonds. If a liquid derivative exists, it is usually the safer and cheaper tool.',
    related: ['Liquidity as a Substitute for Hedging'],
    tags: ['liquidity'],
  },
  {
    term: 'Operational Hedging',
    moduleId: 7,
    definition:
      'Changing operations so costs and revenues are denominated in the same currency — e.g., Honda moving car production to the US, where ~50% of its sales are. Creates a natural hedge that can eliminate the need for derivatives or balance-sheet hedges entirely.',
    related: ['Natural Hedge', 'Honda Case', 'Currency Risk'],
    tags: ['risk management', 'fx'],
  },
  {
    term: 'Natural Hedge',
    moduleId: 7,
    definition:
      'When costs and revenues move together with the risk factor — same-currency denomination means exchange-rate moves hit both sides equally and profitability is insulated. Honda\'s US production against US sales is the canonical example.',
    related: ['Operational Hedging', 'Honda Case'],
    tags: ['risk management', 'fx'],
  },
  {
    term: 'Honda Case',
    moduleId: 7,
    definition:
      'Japanese carmaker, ~50% of car sales in the US; yen costs + dollar revenues → fears dollar depreciation. Could short USD futures (position size unclear — depends on future sales) or borrow in dollars and invest in yen. In practice: 20-F states no hedging derivatives for FY2023–25 and there is no significant foreign-currency debt — Honda relies on production moved to the US (natural hedge).',
    related: ['Operational Hedging', 'Natural Hedge'],
    tags: ['case', 'fx'],
  },
  {
    term: 'Nintendo Case',
    moduleId: 7,
    definition:
      'In 2010 Nintendo held $7.4B of cash in foreign currencies (~70% of its cash; $3.4B in USD, €2.7B) while earning 80%+ of revenue abroad with yen costs. A 15-year-high yen produced ¥62.1B appraisal losses and Nintendo\'s first interim net loss in 7 years (¥2.01B). Verdict: SPECULATION — operations are long dollars, so holding USD cash adds same-direction exposure (the "wrong direction"); the correct hedge is to SHORT dollars (borrow USD, forwards/futures, or move costs into dollars).',
    related: ['Speculation', 'Operational Exposure', 'Rolls-Royce Case'],
    tags: ['case', 'fx'],
  },
  {
    term: 'Rolls-Royce Case',
    moduleId: 7,
    definition:
      'Feb 2017: RR reported a £4.6B pre-tax loss, driven by a £4.4B mark-to-market revaluation of currency hedges after sterling fell post-Brexit. Engines and long-term service contracts are priced in dollars while costs are mostly sterling → operations long USD → RR shorts $5–6B/year of net dollar inflows (hedgebook $38B ≈ 2.5× sales, covering multi-year contracts). Verdict: HEDGING — correct direction, backed by signed future dollar income, no cash impact while hedges stay open ("searching for zero").',
    related: ['Hedging', 'Marking to Market', 'Nintendo Case'],
    tags: ['case', 'fx'],
  },
  {
    term: 'Hedge Ratio',
    moduleId: 7,
    definition:
      'The share of expected output/exposure covered by hedges. US oil producers: 51.7% hedged entering 2020, but only 21% of 2025 output and 4% of 2026 — cutting hedges because "prices went up" is a price view, i.e., speculation. Producers (long oil) should short; consumers like airlines (short oil) should go long.',
    related: ['Speculation', 'Southwest Airlines Case', 'Operational Exposure'],
    tags: ['risk management', 'commodities'],
  },
  {
    term: 'Southwest Airlines Case',
    moduleId: 7,
    definition:
      'Ran a fuel-hedging program from the 2000s but stopped hedging fuel in 2025 — CEO Bob Jordan: "With the exception of a couple of positive years, it\'s not been beneficial… for the past 10 to 15 years." That judges a hedge by trading P&L, not risk elimination. Unhedged consequences of an oil spike: financial-distress risk, wrecked compensation signals, and uncertain ability to pass higher prices through to fares.',
    related: ['Hedge Ratio', 'Good Reasons to Hedge', 'The Search for Zero'],
    tags: ['case', 'commodities'],
  },
  {
    term: 'Weapons of Mass Destruction (Buffett on Derivatives)',
    moduleId: 7,
    definition:
      'Warren Buffett\'s famous warning that derivatives are "financial weapons of mass destruction" — aimed at firms using derivatives to chase trading profits (speculation) rather than to eliminate risks. The course\'s rule: protect the business, don\'t play the market.',
    related: ['Speculation', 'Hedging'],
    tags: ['risk management'],
  },

  // ───── Module 8 · Finance, Governance, and Society ─────
  {
    term: 'NPV Rule (Course Summary)',
    moduleId: 8,
    definition:
      'The one equation the whole course reduces to: discount future cash flows, subtract the initial investment, and invest if the result is positive. Module 8 studies the three situations where this rule breaks down.',
    formula: 'NPV = −I + PV(FCF); invest if NPV > 0',
    related: ['Agency Cost of Debt', 'Finance and Society', 'Law of One Price'],
    tags: ['overview'],
  },
  {
    term: 'Agency Cost of Debt',
    moduleId: 8,
    definition:
      'The distortion of investment incentives caused by debt: because equity is a residual claim with limited liability, shareholders may want to accept negative-NPV projects (excessive risk taking) or reject positive-NPV projects (underinvestment) — the opposite of maximizing NPV.',
    related: ['Excessive Risk Taking', 'Underinvestment', 'Debt Overhang', 'Covenants'],
    tags: ['agency', 'debt'],
  },
  {
    term: 'Absolute Priority (Seniority of Debt)',
    moduleId: 8,
    definition:
      'In bankruptcy, debtholders are senior — repaid in full before equity gets anything. Shareholders are the residual claimant, receiving only what is left after the debt is satisfied.',
    related: ['Residual Claimant', 'Limited Liability', 'Agency Cost of Debt'],
    tags: ['bankruptcy'],
  },
  {
    term: 'Residual Claimant',
    moduleId: 8,
    definition:
      'The party paid last — equity holders. They receive assets minus debt if positive, and nothing if the firm is worth less than its debt. This residual position is what makes equity behave like a call option on the firm’s assets.',
    related: ['Absolute Priority (Seniority of Debt)', 'Limited Liability', 'Value of Equity (Option View)'],
    tags: ['bankruptcy'],
  },
  {
    term: 'Limited Liability',
    moduleId: 8,
    definition:
      'Shareholders cannot lose more than they invested; equity value is floored at zero. This asymmetry (keep all the upside, hand the downside below the debt to creditors) is the root of both agency costs of debt.',
    formula: 'Value of Equity = max(Assets − Debt, 0)',
    related: ['Residual Claimant', 'Excessive Risk Taking', 'Value of Equity (Option View)'],
    tags: ['bankruptcy', 'agency'],
  },
  {
    term: 'Value of Equity (Option View)',
    moduleId: 8,
    definition:
      'Because of limited liability, equity is worth max(Assets − Debt, 0). Examples: XX Corp (A=$3M, D=$1M → E=$2M); YY Corp (A=$1M, D=$1M → E=$0); ZZ Corp (A=$0.5M, D=$1M → E=$0, bank recovers only $0.5M).',
    formula: 'E = max(A − D, 0)',
    related: ['Limited Liability', 'Absolute Priority (Seniority of Debt)'],
    tags: ['bankruptcy', 'valuation'],
  },
  {
    term: 'Excessive Risk Taking',
    moduleId: 8,
    definition:
      'Also “gambling for resurrection.” A distressed firm’s shareholders take a risky negative-NPV project because they capture the upside while creditors bear the downside. Scooter Inc.: a fair-coin project (assets → $1.3M or $0.3M) cuts firm value $900k→$800k and costs debtholders $250k, yet gives equity +$150k — so they take it.',
    related: ['Agency Cost of Debt', 'Limited Liability', 'FedEx / Gambling for Resurrection', 'Covenants'],
    tags: ['agency', 'debt'],
  },
  {
    term: 'FedEx / Gambling for Resurrection',
    moduleId: 8,
    definition:
      'Anecdote: FedEx’s founder took the firm’s last ~$5,000 to Las Vegas and won ~$32,000, saving the company. With the firm otherwise lost, a negative-NPV gamble becomes rational for someone with nothing left to lose — the intuition behind excessive risk taking.',
    related: ['Excessive Risk Taking'],
    tags: ['case', 'agency'],
  },
  {
    term: 'Debt Overhang',
    moduleId: 8,
    definition:
      'A heavy existing debt load that distorts new investment decisions. It drives excessive risk taking (accept bad risky projects) and underinvestment (reject good projects whose gains accrue to creditors).',
    related: ['Underinvestment', 'Excessive Risk Taking', 'Haircut (Debt Reduction)'],
    tags: ['agency', 'debt'],
  },
  {
    term: 'Underinvestment',
    moduleId: 8,
    definition:
      'Shareholders reject a positive-NPV project because the benefits go to creditors while they fund the cost. Scooter Inc.: a riskless project (invest $100k → $150k, NPV +$50k) is refused because debtholders gain $100k while equity nets −$50k.',
    related: ['Debt Overhang', 'Project Finance', 'Haircut (Debt Reduction)'],
    tags: ['agency', 'debt'],
  },
  {
    term: 'Project Finance',
    moduleId: 8,
    definition:
      'A cure for underinvestment: shareholders set up a separate company (outside the reach of the old debt) to fund the good project, so they capture its NPV instead of handing it to existing creditors.',
    related: ['Underinvestment', 'Debt Overhang'],
    tags: ['agency', 'fix'],
  },
  {
    term: 'Haircut (Debt Reduction)',
    moduleId: 8,
    definition:
      'A cure for underinvestment: the bank voluntarily lowers the loan’s face value to unlock a good project. Scooter Inc.: cutting the $1M loan to $925k gives debtholders $925k (> $900k) and equity +$25k — a win-win. The win-win band here is a face value of $900k–$950k.',
    related: ['Underinvestment', 'Debt Overhang', 'Project Finance'],
    tags: ['agency', 'fix'],
  },
  {
    term: 'Covenants',
    moduleId: 8,
    definition:
      'Contractual restrictions in a loan agreement (e.g., caps on risky investments) that limit shareholders’ ability to expropriate creditors — the standard fix for excessive risk taking, alongside monitoring.',
    related: ['Excessive Risk Taking', 'Monitoring', 'Agency Cost of Debt'],
    tags: ['fix', 'debt'],
  },
  {
    term: 'Monitoring',
    moduleId: 8,
    definition:
      'Ongoing oversight of management’s actions by creditors (banks) to prevent value-destroying, creditor-expropriating decisions — a complement to covenants against excessive risk taking.',
    related: ['Covenants', 'Excessive Risk Taking'],
    tags: ['fix', 'debt'],
  },
  {
    term: 'Finance and Society',
    moduleId: 8,
    definition:
      'The idea that maximizing the firm’s NPV can impose costs on non-shareholders (externalities): unhealthy products, pollution, outsourcing, tax avoidance, and corruption. The firm’s NPV need not equal society’s NPV.',
    related: ['Externality', 'NPV_firm vs NPV_society', 'Bribery (Corruption)'],
    tags: ['society'],
  },
  {
    term: 'Externality',
    moduleId: 8,
    definition:
      'A cost (or benefit) of a corporate decision borne by parties outside the firm and not captured in the firm’s own NPV — e.g., pollution or a corruption payment’s social cost. The wedge between private and social NPV.',
    related: ['Finance and Society', 'NPV_firm vs NPV_society'],
    tags: ['society'],
  },
  {
    term: 'Sand in the Wheels',
    moduleId: 8,
    definition:
      'The view — supported by most evidence — that corruption slows the economy: bribes act like sand that gums up the machinery. Wealthier countries tend to be less corrupt; the World Bank estimates corruption costs $2.6 trillion/year (~5% of global GDP).',
    related: ['Greasing the Wheels', 'Bribery (Corruption)'],
    tags: ['society', 'corruption'],
  },
  {
    term: 'Greasing the Wheels',
    moduleId: 8,
    definition:
      'The competing (mostly unsupported) view that side payments help the economy by getting things done where institutions are weak. There is limited evidence corruption can help only where taxes are very high; overall the evidence favors “sand in the wheels.”',
    related: ['Sand in the Wheels', 'Bribery (Corruption)'],
    tags: ['society', 'corruption'],
  },
  {
    term: 'Bribery (Corruption)',
    moduleId: 8,
    definition:
      'Paying an official to win business. Treated in the course as an NPV decision: a $10,000 contract with a 20% win chance from a $1,000 bribe has NPV −$1,000 + 0.2×$10,000 = +$1,000 → bribe (absent regulation). It carries an externality: the social cost is not in the firm’s NPV.',
    formula: 'NPV_bribe = −bribe + p(win)×contract − p(detect)×fine',
    related: ['Anti-Bribery Regulation', 'Sand in the Wheels', 'NPV_firm vs NPV_society'],
    tags: ['society', 'corruption'],
  },
  {
    term: 'Anti-Bribery Regulation',
    moduleId: 8,
    definition:
      'Laws (e.g., UK Bribery Act, US FCPA) that add an expected penalty to the bribery decision. With a $100,000 fine and 2% detection, NPV_bribe = −1,000 + 0.2×10,000 − 0.02×100,000 = −$1,000 → don’t bribe. From the firm’s private view this destroys value (+$1,000 → $0); society gains.',
    formula: 'add term: − p(detect) × fine',
    related: ['Bribery (Corruption)', 'Zeume (2017)', 'NPV_firm vs NPV_society'],
    tags: ['society', 'corruption', 'regulation'],
  },
  {
    term: 'Zeume (2017)',
    moduleId: 8,
    definition:
      '“Bribes and Firm Value” — an event study around the UK Bribery Act. Stock returns turned negative for oil & gas and aero/defense firms and for UK firms operating in perceivably corrupt countries, but positive for their non-UK competitors (a unilateral-regulation side effect). UK firms then saw slower sales growth and fewer M&As in those markets. (The Act itself was enacted in 2010 / in force 2011; 2017 is the paper’s year.)',
    related: ['Anti-Bribery Regulation', 'Bribery (Corruption)'],
    tags: ['society', 'corruption', 'research'],
  },
  {
    term: 'NPV_firm vs NPV_society',
    moduleId: 8,
    definition:
      'The central lesson of the finance-and-society thread: the NPV a firm maximizes is not the same as society’s NPV. “Whose NPV is it?” — the two diverge whenever decisions have externalities (corruption, pollution, safety).',
    related: ['Externality', 'Finance and Society', 'Whose NPV Is It?'],
    tags: ['society'],
  },
  {
    term: 'Law of One Price',
    moduleId: 8,
    definition:
      'The same good or asset trading in two markets at the same time must have the same price. Applied to projects: same investment, cash flows and risk ⇒ same NPV. Violations imply either an arbitrage or a bias.',
    related: ['Arbitrage', 'Limits to Arbitrage', 'Law of One Price and Injustice'],
    tags: ['pricing'],
  },
  {
    term: 'Arbitrage',
    moduleId: 8,
    definition:
      'Buying and selling the same good in two markets simultaneously to pocket a price difference with no risk. Gold at $2,000 in New York vs $1,900 in London: buy London, sell New York, earn $100 (“buy low, sell high”).',
    related: ['Law of One Price', 'Limits to Arbitrage'],
    tags: ['pricing'],
  },
  {
    term: 'Limits to Arbitrage',
    moduleId: 8,
    definition:
      'Why obvious arbitrages persist and don’t make everyone rich: transaction costs, price risk (the price moves before you complete the trade), competition (traders converge the prices), and scalability limits (supply and demand move against you).',
    related: ['Arbitrage', 'Law of One Price'],
    tags: ['pricing'],
  },
  {
    term: 'Law of One Price and Injustice',
    moduleId: 8,
    definition:
      'When identical “goods” trade at different prices and arbitrage cannot explain it, the gap can reveal bias. The law of one price becomes a tool for measuring discrimination in financial and labor markets.',
    related: ['HBCU Bond Discrimination', 'Auto Loan Disparities', 'Gender Wage Gap'],
    tags: ['society', 'pricing'],
  },
  {
    term: 'HBCU Bond Discrimination',
    moduleId: 8,
    definition:
      'Dougal, Gao, Mayew & Parsons (2019): comparable schools should pay the same to issue comparable bonds, but Historically Black Colleges and Universities pay underwriting fees ~20% higher (and get slightly lower bond prices). The authors control extensively and cannot rule out race.',
    related: ['Law of One Price and Injustice', 'Auto Loan Disparities'],
    tags: ['society', 'research'],
  },
  {
    term: 'Auto Loan Disparities',
    moduleId: 8,
    definition:
      'Butler, Mayer & Weston (2020): among borrowers with the same credit score, Black and Hispanic borrowers are approved at a 1.5% lower rate, pay ~70 basis points/year more interest, yet default less — inconsistent with the law of one price if risk is truly equal.',
    related: ['Law of One Price and Injustice', 'HBCU Bond Discrimination'],
    tags: ['society', 'research'],
  },
  {
    term: 'Gender Wage Gap',
    moduleId: 8,
    definition:
      'Blau & Kahn (2017, JEL): from 1990–2010, within the same occupations women earned ~8.4% less than men — another law-of-one-price violation used to uncover bias. A McKinsey report notes Covid disproportionately hurt women’s employment.',
    related: ['Law of One Price and Injustice'],
    tags: ['society', 'research'],
  },
  {
    term: 'Rogue Trader (Kerviel)',
    moduleId: 8,
    definition:
      'Jérôme Kerviel lost ~$5B (≈€4.9B) at Société Générale trading on his own payoff: huge bonus if the risky bets won, limited personal loss if they failed — with investors’ money at stake. Illustrates NPV_decision-maker ≠ NPV_shareholders (an agency/governance conflict).',
    related: ['Whose NPV Is It?', 'Agency Cost of Debt'],
    tags: ['case', 'governance'],
  },
  {
    term: 'Exxon Valdez (One-Hull vs Two-Hull)',
    moduleId: 8,
    definition:
      'The 1989 oil spill illustrates NPV_company ≠ NPV_society: a single-hull tanker is cheaper and carries more oil (higher firm NPV), while a double-hull is safer (higher social NPV). Cost-minimizing can overlook large external costs. (The U.S. OPA 1990 later mandated double hulls.)',
    related: ['Whose NPV Is It?', 'Externality', 'NPV_firm vs NPV_society'],
    tags: ['case', 'society'],
  },
  {
    term: 'Whose NPV Is It?',
    moduleId: 8,
    definition:
      'The module’s closing question. The NPV being maximized may belong to shareholders, a self-interested decision-maker (Kerviel), the company (Exxon Valdez), or society — and these need not coincide. Some value (e.g., the Gies family’s philanthropy) does not translate into dollars at all.',
    related: ['NPV_firm vs NPV_society', 'Rogue Trader (Kerviel)', 'Exxon Valdez (One-Hull vs Two-Hull)'],
    tags: ['overview', 'society'],
  },
]

export const allModuleIds = Array.from(new Set(GLOSSARY.map((g) => g.moduleId))).sort()
