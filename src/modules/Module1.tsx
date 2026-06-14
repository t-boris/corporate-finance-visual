import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Banknote, BookOpen, ArrowRight, Sparkles, ChevronDown,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { AgencyDiagram } from '@/components/AgencyDiagram'
import { StockPriceComposition } from '@/components/StockPriceComposition'
import { SocietyConflicts } from '@/components/SocietyConflicts'
import { FinancialStatementsFlow } from '@/components/FinancialStatementsFlow'
import { LiquidityComparison } from '@/components/LiquidityComparison'
import { LeverageVisual } from '@/components/LeverageVisual'
import { ProfitabilityCascade } from '@/components/ProfitabilityCascade'
import { CashFlowQuadrants } from '@/components/CashFlowQuadrants'
import { ValuationRatiosViz } from '@/components/ValuationRatiosViz'
import { RatioAnatomy } from '@/components/RatioAnatomy'

/**
 * Module 1 — The Objective and Language of Corporate Finance.
 *
 * Summary-first layout:
 *  - Sticky LessonRail at the top jumps between lessons.
 *  - Each LessonSection shows a TL;DR + key points + formulas + visualizations
 *    by default. The full lecture prose is hidden behind a single toggle.
 *  - Cheat-sheet + module review stay always visible. Academic papers collapse.
 */
export function Module1Content() {
  return (
    <div className="space-y-4">
      <LessonRail lessons={RAIL_LESSONS} />

      {/* INTRO ─────────────────────────────────────────────────────────── */}
      <LessonSection
        id="intro"
        summary={SUMMARIES.intro}
        toggleLabel={{ open: 'Show full intro', close: 'Hide full intro' }}
      >
        <LessonBlock>
          <p>
            In this module we discuss <strong>why maximizing the current stock price is a reasonable
            objective for the corporation</strong>. The current stock price may appear to be a short-term
            measure, but under certain conditions it captures all future consequences of current
            decisions. We discuss those conditions and consider alternatives such as earnings-per-share
            and book value per share.
          </p>
          <p>
            The stock-price goal is not perfect. It creates potential conflicts between shareholder
            wealth maximization and society as a whole. We cover corporate social responsibility,
            conflicts with stakeholders such as employees, and conflicts with the government. Finally,
            we introduce the <strong>agency problem</strong> and how <strong>corporate governance</strong> can
            mitigate it.
          </p>
          <p>
            Then we shift to <strong>financial-statement analysis</strong>. We use the balance sheet to
            measure how liquid a company is and how to properly measure leverage using accounting and
            market data. We use the income statement to measure profitability, and the cash flow
            statement to understand how a company is generating and spending cash. Finally, we compute
            and interpret valuation ratios. All analysis uses data from real-world companies.
          </p>
          <KeyTakeaway>
            The objective is <strong>shareholder value</strong>. The language is{' '}
            <strong>accounting</strong>. The instruments are <strong>financial ratios</strong> built
            from balance sheet, income statement, and cash flow statement.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-1 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-1"
        summary={SUMMARIES['1-1']}
        visuals={<StockPriceComposition />}
      >
        <LessonBlock eyebrow="1.1 · The objective" title="What does the firm maximize?">
          <Definition term="Shareholder Wealth Maximization">
            The principle that the financial objective of a corporation is to maximize the current
            market value of its common stock.
          </Definition>
          <p>
            A natural worry follows: the stock price is a <em>current</em> number. Doesn't focusing on
            it create short-termism? Aren't managers chasing a quarterly print at the expense of the
            long run?
          </p>
        </LessonBlock>

        <LessonBlock eyebrow={'1.2 · The "short-termism" objection'} title="Why the stock price actually captures the future">
          <Definition term="The stock price equation">
            A stock price is the sum of all discounted future cash flows expected from the firm. Every
            expected investment, every future payoff, and every consequence of today's decisions is
            capitalized into today's price.
          </Definition>
          <Formula caption="The price you see today already encodes the entire future">
            P₀ = Σ CFₜ / (1 + r)ᵗ &nbsp; for t = 1, 2, …, ∞
          </Formula>
        </LessonBlock>

        <LessonBlock eyebrow="1.3 · The required condition" title="Efficient Markets">
          <Definition term="Efficient Markets Hypothesis (EMH)">
            Market prices fully reflect all available information about the asset's future cash flows.
          </Definition>
          <CaseStudy title="HP × Compaq, 2001 — markets react before deals close">
            <p>
              The merger was contested by HP's own shareholders. It took nearly <strong>one year</strong>{' '}
              for the deal to close because some shareholders campaigned against it. Yet HP's stock{' '}
              <strong>dropped immediately</strong> on announcement.
            </p>
          </CaseStudy>
          <CaseStudy title="Cugene × Receptus, 14 July 2015 — short-term EPS hit, long-term gain">
            <p>
              Cugene's $7.2B acquisition would <strong>reduce EPS through 2019</strong>. The market
              still moved the stock from <strong>$115 to $135</strong> — pricing in the long-term
              cash flows of the new drug pipeline.
            </p>
          </CaseStudy>
        </LessonBlock>

        <LessonBlock eyebrow="1.4 · Why the alternatives are worse" title="EPS and Book Value are inferior objectives">
          <Pitfall>
            <strong>Problems with EPS:</strong> ignores the future, uses manipulable Net Income,
            denominator (shares outstanding) is also manipulable via splits/buybacks, ignores risk.
          </Pitfall>
          <Pitfall>
            <strong>Problems with book equity:</strong> captures only past events; excludes intangibles
            and the present value of future cash flows; can even be negative (Altice).
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-2 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-2"
        summary={SUMMARIES['1-2']}
        visuals={<SocietyConflicts />}
      >
        <LessonBlock eyebrow="2.1 · Socially responsible actions" title="Aligned with society">
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Investing in human capital</strong> — training spills value beyond the firm.</li>
            <li><strong>Sustainability</strong> — cleaner technology, better products.</li>
            <li><strong>Philanthropy</strong> — donations and community investment.</li>
          </ul>
        </LessonBlock>

        <LessonBlock eyebrow="2.2 · Conflicts" title="Diverging from social welfare">
          <p>
            Tobacco, junk food, pollution, outsourcing, tax minimization — all profitable for
            shareholders but with social costs.
          </p>
        </LessonBlock>

        <LessonBlock eyebrow="2.3 · Case · Apple and repatriation tax" title="$252B abroad — and why">
          <CaseStudy title="Apple's foreign cash hoard, pre-2017">
            <p>
              <strong>~90% of Apple's cash</strong> ($252B) sat abroad, much of it through Ireland.
              The pre-2017 US corporate rate was <strong>35%</strong>; Ireland's roughly{' '}
              <strong>10%</strong>. Repatriation would cost an extra ~$250M per $1B.
            </p>
          </CaseStudy>
          <p>
            <strong>TCJA 2017</strong>: corporate rate to <strong>21%</strong>, repatriation tax to
            <strong> 15.5%</strong> (cash) / <strong>8%</strong> (non-cash). Repatriation surged;
            government revenue fell.
          </p>
        </LessonBlock>

        <LessonBlock eyebrow="2.4 · Other stakeholders" title="Employees, suppliers, debt holders">
          <Definition term="Leveraged Buyout (LBO)">
            An acquisition financed primarily with debt. The new debt issuance can damage existing
            bondholders by increasing the firm's leverage and credit risk.
          </Definition>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-3 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-3"
        summary={SUMMARIES['1-3']}
        visuals={<AgencyDiagram />}
      >
        <LessonBlock eyebrow="3.1 · The core issue" title="Managers don't always maximize shareholder value">
          <Definition term="Agency Problem">
            A conflict of interest that arises when one party (the agent, e.g. the manager), employed
            by another (the principal, e.g. the shareholder), has incentives to put their own
            interests first.
          </Definition>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Theft / self-dealing</strong> — direct extraction.</li>
            <li><strong>Nepotism</strong> — hiring family or friends, including CEO succession.</li>
            <li><strong>Shirking</strong> — "better to play golf."</li>
            <li><strong>Perk consumption</strong> — corporate jets, lavish offices.</li>
            <li><strong>Empire building</strong> — value-destroying acquisitions for size/prestige.</li>
            <li><strong>Excessive risk aversion</strong> — skipping profitable but risky projects.</li>
          </ul>
        </LessonBlock>

        <LessonBlock eyebrow="3.2 · The first answer — pay them in stock">
          <p>
            Top executives receive significant stock and options, so they care about the share price.
            US markets did well; CEO pay rose with them — but so did inequality and the temptation to
            manipulate short-term metrics.
          </p>
        </LessonBlock>

        <LessonBlock eyebrow="3.3 · Corporate Governance">
          <Definition term="Corporate Governance">
            The system of rules, practices, and processes by which a corporation is directed and
            controlled.
          </Definition>
          <CompareTable
            headers={['Mechanism', 'How it works']}
            rows={[
              ['Independent Board', 'Directors with no personal or financial ties to the CEO can challenge bad decisions and set compensation honestly.'],
              ['Stock-based compensation', 'CEO holds significant stock and options → cares about the share price directly.'],
              ['Activist investors', 'Large stakes (5–10%+) push for strategic and governance changes.'],
              ['Market for corporate control', 'Hostile-takeover threat disciplines management.'],
            ]}
          />
        </LessonBlock>
      </LessonSection>

      {/* THREE STATEMENTS SETUP ───────────────────────────────────────── */}
      <LessonSection
        id="statements"
        summary={SUMMARIES.statements}
        visuals={<FinancialStatementsFlow />}
      >
        <LessonBlock>
          <p>
            For the rest of the module, we apply these ratios to three real companies:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Altice USA</strong> — telecom, ~5M broadband/video/telephony/mobile customers.</li>
            <li><strong>DISH Network Operations</strong> — Altice's competitor, ~10M pay-TV and wireless customers.</li>
            <li><strong>Boeing</strong> — aerospace; included to highlight industry-driven differences (inventory).</li>
          </ul>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-4 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-4"
        summary={SUMMARIES['1-4']}
        visuals={
          <>
            <RatioAnatomy family="liquidity" />
            <LiquidityComparison />
            <RatioAnatomy family="leverage" />
            <LeverageVisual />
          </>
        }
      >
        <LessonBlock eyebrow="4.1 · Reading a balance sheet">
          <Formula caption="Always true">Assets = Liabilities + Equity</Formula>
          <p>
            Both assets and liabilities are split into <strong>current</strong> (short-term) and{' '}
            <strong>non-current</strong> (long-term).
          </p>
        </LessonBlock>

        <LessonBlock eyebrow="4.2 · Liquidity ratios">
          <Definition term="Liquidity">
            The ease with which an asset can be converted into cash without significant loss of value.
          </Definition>
          <Formula>Current Ratio = CA / CL</Formula>
          <Formula>Quick Ratio = (Cash + AR) / CL</Formula>
          <Formula>Cash Ratio = Cash / CL</Formula>
          <p>
            <strong>Altice:</strong> CA = $790M, CL = $2,745M → Current = <strong>0.30</strong>.{' '}
            <strong>Boeing:</strong> CA = $108.7B (of which $78.8B is inventory!), CL = $82B →
            Current = <strong>1.33</strong>. Inventory drives the difference.
          </p>
          <Pitfall>
            <strong>Berger, Ofek & Swary (1996):</strong> recovery rates in distress sales — Cash 100¢,
            Receivables 72¢, Inventory 55¢. The quick ratio (which excludes inventory) is more
            reliable.
          </Pitfall>
        </LessonBlock>

        <LessonBlock eyebrow="4.3 · Solvency / Leverage ratios">
          <CompareTable
            headers={['#', 'Formula', 'Comment']}
            rows={[
              ['1', 'Debt / Assets', 'Common but flawed — ignores other liabilities (pensions, AP). Understates leverage.'],
              ['2', 'Debt / (Debt + Equity)', 'Better — excludes other liabilities from BOTH num. and denom.'],
              ['3', 'Total Liabilities / Total Assets', 'Most informative — includes everything. RECOMMENDED.'],
            ]}
          />
          <KeyTakeaway>
            Book equity captures only the past. Market value reflects future discounted cash flows.
            Use the <strong>market value of equity</strong> in the denominator.
          </KeyTakeaway>
          <Formula caption="The leverage ratio we use in this course">
            Leverage = Total Liabilities / (Total Liabilities + Market Cap)
          </Formula>
          <p>The average US firm has a leverage ratio of <strong>25–30%</strong>.</p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-5 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-5"
        summary={SUMMARIES['1-5']}
        visuals={
          <>
            <RatioAnatomy family="profitability" />
            <ProfitabilityCascade />
          </>
        }
      >
        <LessonBlock eyebrow="5.1 · OPAT is the key metric">
          <Definition term="OPAT — Operating Profit After Taxes">
            Operating Income − Income Tax Expense. Measures the profitability of the BUSINESS before
            financing decisions.
          </Definition>
          <Formula>OPAT = Operating Income − Income Tax Expense</Formula>
          <p>
            <strong>Altice 2021:</strong> Operating Income $2,541.8M − Tax $295M = OPAT{' '}
            <strong>$2,246.8M</strong>.
          </p>
          <Pitfall>
            <strong>Not Net Income</strong> because (1) interest is a payment to capital providers,
            not a business cost; (2) Net Income at the bottom of the statement is easier to manipulate
            with one-time items.
          </Pitfall>
        </LessonBlock>

        <LessonBlock eyebrow="5.2 · The three profitability ratios">
          <Formula>Asset Turnover = Revenues / Assets</Formula>
          <Formula>Net Profit Margin = OPAT / Revenues</Formula>
          <Formula>ROA = OPAT / Assets</Formula>
          <Formula caption="DuPont decomposition">
            ROA = (OPAT / Revenues) × (Revenues / Assets) = NPM × Asset Turnover
          </Formula>
          <Pitfall>
            <strong>Use BOOK value of assets</strong>, not market value. We compare profits to invested
            capital, not to expected future value.
          </Pitfall>
        </LessonBlock>

        <LessonBlock eyebrow="5.3 · Altice vs DISH" title="Same industry, very different profile">
          <p>
            <strong>Altice</strong> has higher net profit margin and ROA. <strong>DISH</strong> has
            higher asset turnover but costs are much higher. When using EBITDA, ROA is{' '}
            <strong>12% (Altice) vs 7% (DISH)</strong>.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-6 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-6"
        summary={SUMMARIES['1-6']}
        visuals={<CashFlowQuadrants />}
      >
        <LessonBlock eyebrow="6.1 · Structure">
          <CompareTable
            headers={['Section', 'What it includes']}
            rows={[
              ['Operating (CFO)', 'Net Income + non-cash items (D&A) + changes in working capital.'],
              ['Investing (CFI)', 'CapEx, acquisitions, sale of property and intangibles.'],
              ['Financing (CFF)', 'Debt issuance/repayment, equity issuance/buybacks, dividends.'],
            ]}
          />
          <Formula>Net change in cash = CFO + CFI + CFF</Formula>
          <Pitfall>
            <strong>Sign convention:</strong> positive = cash INTO the firm, negative = OUT. CapEx of
            −$1,185 means $1.185B spent on investment.
          </Pitfall>
        </LessonBlock>

        <LessonBlock eyebrow="6.2 · Reading the signs">
          <CompareTable
            headers={['CFO', 'CFI', 'CFF', 'Profile']}
            rows={[
              ['−', '−', '+', 'Growth-stage startup'],
              ['+', '−', '−', 'Mature, profitable'],
              ['+', '+', '−', 'Mature, downsizing'],
              ['+', '−', '+', 'Profitable but raising MORE capital (e.g. DISH)'],
            ]}
          />
        </LessonBlock>

        <LessonBlock eyebrow="6.3 · DISH 2020" title="What CFS revealed">
          <CaseStudy title="DISH 2020 — the $1.4B Boost Mobile deal">
            <p>
              CFS shows +CFO, −CFI (big investment), +CFF (heavy debt). Drilling in: a{' '}
              <strong>$1.3B cash acquisition</strong> turns out to be <strong>Boost Mobile</strong>{' '}
              (forced by the DOJ as a condition for the Sprint–T-Mobile merger).
            </p>
            <p>
              The "Other" line in financing: <strong>~$20B on wireless spectrum licenses</strong> —
              DISH building a 5G broadband network.
            </p>
          </CaseStudy>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 1-7 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="1-7"
        summary={SUMMARIES['1-7']}
        visuals={
          <>
            <RatioAnatomy family="valuation" />
            <ValuationRatiosViz />
          </>
        }
      >
        <LessonBlock eyebrow="7.1 · What valuation ratios measure">
          <Definition term="Valuation Ratios">
            Ratios that compare the current market value of a firm to a fundamental accounting
            variable.
          </Definition>
          <KeyTakeaway>
            Valuation ratios measure <strong>FUTURE divided by PRESENT (or past)</strong>.
          </KeyTakeaway>
        </LessonBlock>

        <LessonBlock eyebrow="7.2 · Two valuation ratios">
          <Formula>Market-to-Book = MV(Assets) / BV(Assets)</Formula>
          <Formula>Value over OPAT = MV(Assets) / OPAT</Formula>
          <p>
            P/E is widely cited but uses Net Income (manipulable) and ignores debt. We prefer V/OPAT.
          </p>
        </LessonBlock>

        <LessonBlock eyebrow="7.3 · Reading the ratios">
          <Pitfall>
            <strong>Apparent paradox.</strong> Altice has a higher M/B than DISH, even though Altice's
            stock did worse. M/B compares future (numerator) to past (denominator) — the denominator
            can drift. V/OPAT, by contrast, moves more closely with stock performance.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* MODULE REVIEW ─────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review} />

      {/* CHEAT-SHEET ───────────────────────────────────────────────────── */}
      <section id="lesson-cheat" className="card p-5 scroll-mt-32">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Cheat-sheet</div>
          <h3 className="font-display text-lg font-semibold">Every Module 1 formula in one place</h3>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FORMULA_CHEATSHEET.map((f) => (
            <div key={f.name} className="rounded-xl border border-line bg-surface-3/60 p-3">
              <div className="text-xs text-ink-muted uppercase tracking-wider">{f.name}</div>
              <div className="font-mono text-sm mt-1 text-ink break-words">{f.formula}</div>
              <div className="text-[11px] text-ink-muted mt-1">{f.hint}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PAPERS — collapsed by default ─────────────────────────────────── */}
      <PapersSection />

      {/* QUIZ CTA ──────────────────────────────────────────────────────── */}
      <section className="card p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 bg-brand-500" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="text-brand-400" />
            <div>
              <h4 className="font-display text-lg font-semibold">Ready to test yourself?</h4>
              <p className="text-sm text-ink-muted">
                20 questions for Module 1 · 4 easy · 12 medium · 4 hard.
              </p>
            </div>
          </div>
          <Link to="/quiz?module=1" className="btn-primary">
            <BookOpen size={16} /> Start Module 1 quiz <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Rail items
// ───────────────────────────────────────────────────────────────────────────
const RAIL_LESSONS: { id: string; label: string }[] = [
  { id: 'intro',      label: 'Overview' },
  { id: '1-1',        label: '1·1 Stock price' },
  { id: '1-2',        label: '1·2 Society' },
  { id: '1-3',        label: '1·3 Agency' },
  { id: 'statements', label: '3 Statements' },
  { id: '1-4',        label: '1·4 Balance sheet' },
  { id: '1-5',        label: '1·5 Profitability' },
  { id: '1-6',        label: '1·6 Cash flow' },
  { id: '1-7',        label: '1·7 Valuation' },
  { id: 'review',     label: 'Review' },
  { id: 'cheat',      label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 1 · Overview',
    title: 'The Objective and Language of Corporate Finance',
    tldr: (
      <>
        Two questions: <strong>WHAT should a firm maximize</strong>, and{' '}
        <strong>HOW do we measure what's happening inside it</strong>. Answer:
        maximize the stock price, and read the language of three financial statements.
      </>
    ),
    keyPoints: [
      <>The stock price already encodes the future — maximizing it is not short-termism.</>,
      <>The objective creates conflicts: with society, with stakeholders, with managers (agency problem).</>,
      <>Balance sheet → liquidity & leverage. Income statement → profitability. Cash flow → strategy.</>,
      <>Companies analyzed: <strong>Altice USA</strong>, <strong>DISH Network</strong>, <strong>Boeing</strong>.</>,
    ],
  },

  '1-1': {
    eyebrow: 'Lesson 1-1',
    title: 'Why maximizing the stock price is a reasonable goal',
    tldr: (
      <>
        Stock price = present value of every future cash flow. Maximizing it is
        equivalent to maximizing the entire future — <strong>provided markets
        are efficient enough</strong>.
      </>
    ),
    keyPoints: [
      <>Required condition: <strong>efficient markets</strong> (prices reflect available information).</>,
      <>Cases — HP×Compaq and Cugene×Receptus — show markets price the FUTURE, not today's earnings.</>,
      <>EPS and book value are inferior: both ignore future cash flows.</>,
    ],
    formulas: [{ label: 'Stock price', expr: 'P₀ = Σ CFₜ / (1+r)ᵗ' }],
  },

  '1-2': {
    eyebrow: 'Lesson 1-2',
    title: 'Conflicts between shareholder value and society',
    tldr: (
      <>
        Some value-creating actions help society (training, sustainability);
        others hurt it (pollution, tax minimization). <strong>Government
        regulation handles the gap.</strong>
      </>
    ),
    keyPoints: [
      <>Aligned: human capital, sustainability, philanthropy.</>,
      <>In conflict: pollution, harmful products, outsourcing, tax minimization.</>,
      <>Case — Apple held $252B abroad pre-2017. TCJA cut repatriation tax to 15.5%.</>,
      <>Stakeholders (employees, suppliers, bondholders) can lose from M&A and LBOs.</>,
    ],
  },

  '1-3': {
    eyebrow: 'Lesson 1-3',
    title: 'The agency problem and corporate governance',
    tldr: (
      <>
        Managers are agents — they may extract value via shirking, perks, or
        empire-building. <strong>Governance aligns them</strong>: stock pay,
        independent boards, activists, takeover threat.
      </>
    ),
    keyPoints: [
      <>Manifestations: theft, nepotism, shirking, perks, empire-building, excessive risk aversion.</>,
      <>Fix #1: stock-based compensation — skin in the game.</>,
      <>Fix #2: independent board, activists, market for corporate control.</>,
      <>No single mechanism is sufficient; effective governance combines them all.</>,
    ],
  },

  statements: {
    eyebrow: 'Lessons 1-4 to 1-6',
    title: 'The language of corporate finance — three statements',
    tldr: (
      <>
        From here on, we describe what's happening inside a firm using
        accounting. <strong>Balance sheet</strong> · <strong>income
        statement</strong> · <strong>cash flow statement</strong> — and the
        ratios built from them.
      </>
    ),
    keyPoints: [
      <>Balance sheet — snapshot of assets, liabilities, equity at a point in time.</>,
      <>Income statement — performance over a period; Revenue → OPAT → Net Income.</>,
      <>Cash flow statement — actual cash movement; often reveals strategy.</>,
    ],
  },

  '1-4': {
    eyebrow: 'Lesson 1-4',
    title: 'Balance Sheet — liquidity and leverage',
    tldr: (
      <>
        Two questions: can the firm pay its short-term bills (
        <strong>liquidity</strong>)? Is it reasonably geared (
        <strong>leverage</strong>)? Always use <strong>MARKET value of
        equity</strong> for leverage.
      </>
    ),
    keyPoints: [
      <>Quick ratio &gt; Current ratio in usefulness — inventory recovers only ~55¢ in distress.</>,
      <>Leverage = L / (L + MarketCap) — use market cap, not book equity.</>,
      <>Altice has <strong>negative book equity</strong> but is solvent (market cap is positive).</>,
      <>Average US firm: 25–30% leverage. Above ~50% is high; above ~75% alarming.</>,
    ],
    formulas: [
      { label: 'Current ratio', expr: 'CA / CL' },
      { label: 'Quick ratio',   expr: '(Cash + AR) / CL' },
      { label: 'Leverage',      expr: 'L / (L + MarketCap)' },
    ],
  },

  '1-5': {
    eyebrow: 'Lesson 1-5',
    title: 'Income Statement — measuring profitability',
    tldr: (
      <>
        Use <strong>OPAT</strong> (Operating Income − Tax) — it measures the
        BUSINESS, not the financing. Three ratios decompose via DuPont:{' '}
        <strong>ROA = NPM × Asset Turnover</strong>.
      </>
    ),
    keyPoints: [
      <>OPAT &gt; Net Income — sits above interest, less manipulable.</>,
      <>Use BOOK assets in the denominator (compare profits to invested capital, not future value).</>,
      <>DuPont: same ROA can come from fat margins (Altice) or fast turnover (Walmart).</>,
      <>EPS is bad for cross-firm comparison — both numerator and denominator are manipulable.</>,
    ],
    formulas: [
      { label: 'OPAT',   expr: 'Operating Income − Tax' },
      { label: 'ROA',    expr: 'OPAT / Book Assets' },
      { label: 'DuPont', expr: 'ROA = NPM × Asset Turnover' },
    ],
  },

  '1-6': {
    eyebrow: 'Lesson 1-6',
    title: 'Cash Flow Statement — how cash is generated and spent',
    tldr: (
      <>
        Δ Cash = CFO + CFI + CFF. The signs together reveal life-stage
        (startup vs mature vs raising). Often the only place strategy
        becomes visible.
      </>
    ),
    keyPoints: [
      <>CFO = operating cash; CFI = investing (CapEx, M&A); CFF = financing (debt, equity, dividends).</>,
      <>Patterns: (+,−,−) mature; (−,−,+) startup; (+,−,+) mature but raising more.</>,
      <>Case — DISH 2020 CFS revealed $1.4B Boost Mobile + ~$20B on spectrum (5G strategy).</>,
      <>US firms prefer debt over equity (Myers–Majluf pecking order).</>,
    ],
    formulas: [{ label: 'Cash identity', expr: 'Δ Cash = CFO + CFI + CFF' }],
  },

  '1-7': {
    eyebrow: 'Lesson 1-7',
    title: 'Valuation Ratios — future ÷ present',
    tldr: (
      <>
        Both ratios put <strong>market value</strong> (future) over an{' '}
        <strong>accounting fundamental</strong> (past). The denominator decides
        what story the ratio tells.
      </>
    ),
    keyPoints: [
      <>M/B uses a past-tense, possibly stale book denominator.</>,
      <>V/OPAT uses a current operating measure — preferred; tracks stock performance.</>,
      <>Paradox: Altice's M/B &gt; DISH's, but Altice's stock did worse — book is stale.</>,
      <>P/E (Market Cap / Net Income) uses manipulable NI and ignores debt — inferior.</>,
    ],
    formulas: [
      { label: 'Market-to-Book', expr: 'MV(Assets) / BV(Assets)' },
      { label: 'V/OPAT',         expr: 'MV(Assets) / OPAT' },
    ],
  },

  review: {
    eyebrow: 'Module 1 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        <strong>Objective:</strong> maximize the stock price (it captures the
        future). <strong>Language:</strong> balance sheet → liquidity & leverage;
        income statement → profitability; cash flow → strategy; valuation ratios →
        future ÷ past.
      </>
    ),
    keyPoints: [
      <>The objective is imperfect: it conflicts with social welfare and other stakeholders.</>,
      <>The agency problem is a separate failure mode — mitigated by governance.</>,
      <>OPAT, MARKET leverage, and V/OPAT are the canonical course choices over EPS, book leverage, P/E.</>,
      <>The cash flow statement often reveals strategy invisible elsewhere.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Stock price',           formula: 'P₀ = Σ CFₜ / (1+r)ᵗ',                  hint: 'PV of all future cash flows' },
  { name: 'FCF',                   formula: 'FCF = EBIT(1−T) + D&A − ΔNWC − CapEx', hint: 'Cash to all capital providers' },
  { name: 'Balance sheet identity',formula: 'Assets = Liabilities + Equity',         hint: 'Always true' },
  { name: 'Current ratio',         formula: 'CA / CL',                               hint: 'Ideally ≥ 1' },
  { name: 'Quick ratio',           formula: '(Cash + AR) / CL',                      hint: 'Excludes inventory' },
  { name: 'Cash ratio',            formula: 'Cash / CL',                             hint: 'Strictest' },
  { name: 'Leverage (preferred)',  formula: 'L / (L + MarketCap)',                   hint: 'Use MARKET equity' },
  { name: 'OPAT',                  formula: 'Operating Income − Income Tax',         hint: 'Before interest' },
  { name: 'ROA',                   formula: 'OPAT / Book Assets',                    hint: 'BOOK in denominator' },
  { name: 'Net Profit Margin',     formula: 'OPAT / Revenues',                       hint: 'Margin per $ of sales' },
  { name: 'Asset Turnover',        formula: 'Revenues / Assets',                     hint: 'Efficiency' },
  { name: 'DuPont',                formula: 'ROA = NPM × Asset Turnover',            hint: 'Decomposition' },
  { name: 'Market-to-Book',        formula: 'MV(Assets) / BV(Assets)',               hint: 'Future ÷ past' },
  { name: 'Value-to-OPAT',         formula: 'MV(Assets) / OPAT',                     hint: 'Preferred valuation ratio' },
  { name: 'P/E ratio',             formula: 'Market Cap / Net Income',               hint: 'Common; uses NI — flawed' },
  { name: 'CFS identity',          formula: 'Δ Cash = CFO + CFI + CFF',              hint: 'Reconciles NI to cash' },
]

const PAPERS = [
  {
    cite: 'Jensen & Meckling (1976)',
    title: 'Theory of the Firm: Managerial Behavior, Agency Costs, and Ownership Structure',
    idea: 'Formalized agency theory. The firm is a "nexus of contracts." Agency costs = monitoring + bonding + residual loss.',
    connection: 'Foundation for Lesson 1-3 (Agency Problem and Governance).',
  },
  {
    cite: 'Modigliani & Miller (1958, 1963)',
    title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
    idea: 'In a frictionless world, capital structure is irrelevant to firm value (MM-I). With corporate taxes, debt creates a tax shield (MM-II).',
    connection: 'Justifies why the stock price equals discounted future cash flows; basis for leverage analysis (Lessons 1-1, 1-4.3).',
  },
  {
    cite: 'Fama (1970)',
    title: 'Efficient Capital Markets: A Review of Theory and Empirical Work',
    idea: 'Formalized three forms of EMH: weak, semi-strong, strong.',
    connection: 'The required condition for stock-price maximization in Lesson 1-1.',
  },
  {
    cite: 'Berger, Ofek & Swary (1996)',
    title: 'Investor Valuation of the Abandonment Option',
    idea: 'Recovery rates on assets sold by firms heading to bankruptcy. Cash → 100%, Receivables → 72%, Inventory → 55%.',
    connection: 'Motivates the use of the quick ratio over the current ratio in Lesson 1-4.2.',
  },
  {
    cite: 'Myers & Majluf (1984)',
    title: 'Corporate Financing and Investment Decisions When Firms Have Information Investors Do Not Have',
    idea: 'Pecking order: internal cash → debt → equity. Issuing equity signals overvaluation.',
    connection: 'Explains why DISH (and US firms in general) finance via debt in Lesson 1-6.',
  },
  {
    cite: 'Bebchuk & Fried (2003, 2004)',
    title: 'Pay without Performance',
    idea: 'CEO pay is often disconnected from performance. The "managerial power approach" predicts pay outcomes better than the "talent market" view.',
    connection: 'Academic critique of stock-based comp and motivation for stronger governance (Lesson 1-3).',
  },
  {
    cite: 'Easterbrook (1984)',
    title: 'Two Agency-Cost Explanations of Dividends',
    idea: 'Dividends discipline managers by forcing them back to capital markets for new funding.',
    connection: 'A complementary governance mechanism beyond those discussed in Lesson 1-3.',
  },
  {
    cite: 'TCJA (2017)',
    title: 'The Tax Cuts and Jobs Act',
    idea: 'Cut the US federal corporate tax rate from 35% to 21%. Repatriation tax 15.5%/8%. Triggered ~$600B+ repatriation.',
    connection: 'Real-world example of government action when shareholder value diverges from social welfare (Lesson 1-2).',
  },
]

function PapersSection() {
  const [open, setOpen] = useState(false)
  return (
    <section className="card p-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 text-left"
      >
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Academic foundations</div>
          <h3 className="font-display text-lg font-semibold">8 papers behind Module 1</h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-muted"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="papers-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm mt-4">
              {PAPERS.map((p, i) => (
                <div key={i} className="rounded-xl border border-line bg-surface-3/40 p-3">
                  <div className="text-brand-300 font-semibold">{p.cite}</div>
                  <div className="font-medium mt-0.5">{p.title}</div>
                  <div className="text-ink-soft mt-1 leading-relaxed">{p.idea}</div>
                  <div className="text-[11px] text-ink-muted mt-2 italic">Connection: {p.connection}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/** Placeholder for modules whose content hasn't been filled in yet. */
export function ModulePlaceholder({ moduleId }: { moduleId: number }) {
  return (
    <div className="card p-8 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-surface-3 mb-4">
        <Banknote className="text-ink-muted" />
      </div>
      <h3 className="font-display text-xl font-semibold">Module {moduleId} — coming soon</h3>
      <p className="text-ink-muted text-sm mt-2 max-w-md mx-auto">
        This module's content will be filled in as the course progresses.
      </p>
    </div>
  )
}
