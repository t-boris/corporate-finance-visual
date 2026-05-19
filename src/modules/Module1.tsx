import { Banknote, Compass, ScrollText, Users, BookOpen, ArrowRight, Sparkles, Globe, Activity, BarChart3, Coins, Telescope } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { AgencyDiagram } from '@/components/AgencyDiagram'
import { StockPriceComposition } from '@/components/StockPriceComposition'
import { SocietyConflicts } from '@/components/SocietyConflicts'
import { FinancialStatementsFlow } from '@/components/FinancialStatementsFlow'
import { LiquidityComparison } from '@/components/LiquidityComparison'
import { LeverageVisual } from '@/components/LeverageVisual'
import { ProfitabilityCascade } from '@/components/ProfitabilityCascade'
import { CashFlowQuadrants } from '@/components/CashFlowQuadrants'
import { ValuationRatiosViz } from '@/components/ValuationRatiosViz'

/**
 * Module 1 — The Objective and Language of Corporate Finance.
 *
 * Full lecture content from Almeida & Zeume's extended transcript.
 * Reading order: Intro → Lessons 1-1 through 1-7 → Module Review.
 * Each lesson presents the text first, then an interactive visualization that
 * illustrates the concept, so visual learners can study directly from this page.
 */
export function Module1Content() {
  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* INTRO                                                          */}
      {/* ============================================================ */}
      <LessonBlock eyebrow="Module 1 · Overview" title="The Objective and Language of Corporate Finance">
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
        <div className="text-[13px] text-ink-muted mt-2">
          <strong>Companies analyzed throughout the module:</strong> Altice USA (telecom), DISH
          Network (telecom — Altice's competitor), and Boeing (aerospace — different industry, for
          contrast).
        </div>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-1                                                     */}
      {/* ============================================================ */}
      <SectionHeader icon={<Compass size={16} />} eyebrow="Lesson 1-1" title="Why maximizing the stock price is a reasonable goal" />

      <LessonBlock eyebrow="1.1 · The objective" title="What does the firm maximize?">
        <p>
          Open any financial newspaper and you'll read: "corporations should maximize shareholder
          wealth." Shareholder wealth depends on the stock price, so the operative objective is
          <strong> maximize the stock price</strong>.
        </p>
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
        <p>
          The answer rests on a fundamental principle of finance:
        </p>
        <Definition term="The stock price equation">
          A stock price is the sum of all discounted future cash flows expected from the firm. Every
          expected investment, every future payoff, and every consequence of today's decisions is
          capitalized into today's price.
        </Definition>
        <Formula caption="The price you see today already encodes the entire future">
          P₀ = Σ CFₜ / (1 + r)ᵗ &nbsp; for t = 1, 2, …, ∞
        </Formula>
        <p>
          Maximizing the stock price is therefore equivalent to maximizing the expected
          discounted future cash flows. The chart below shows how this works in practice: each bar
          is the present value of one future year's cash flow. Their sum is today's stock price.
        </p>
      </LessonBlock>

      <StockPriceComposition />

      <LessonBlock eyebrow="1.3 · The required condition" title="Efficient Markets">
        <Definition term="Efficient Markets Hypothesis (EMH)">
          Market prices fully reflect all available information about the asset's future cash flows.
        </Definition>
        <p>
          For the stock price to be a reliable target, markets must be at least reasonably
          efficient — they must incorporate news quickly and price the future correctly. We do not
          assume markets are <em>perfectly</em> efficient. There are clear cases of misvaluation
          (trends, bubbles, "crazy investors"). But on the whole, prices respond rapidly to
          information, as the cases below illustrate.
        </p>
        <CaseStudy title="HP × Compaq, 2001 — markets react before deals close">
          <p>
            The merger was contested by HP's own shareholders. It took nearly <strong>one year</strong>{' '}
            for the deal to close because some shareholders campaigned against it.
          </p>
          <p>
            Yet HP's stock <strong>dropped immediately</strong> on announcement — long before
            anything actually happened, before any integration, before the vote. The market was
            forecasting the consequences and pricing them in.
          </p>
        </CaseStudy>
        <CaseStudy title="Cugene × Receptus, 14 July 2015 — short-term EPS hit, long-term gain">
          <p>
            Cugene announced a <strong>$7.2 billion</strong> acquisition of Receptus, a developer of
            autoimmune-disease drugs. Management openly stated the deal would <strong>reduce EPS
            through 2019</strong> — at least four years of negative impact on accounting profit.
          </p>
          <p>
            The market's verdict: Cugene's stock rose from <strong>$115 to $135</strong>. Why? The
            market valued the long-term cash flows of the new drug pipeline. A merger that hurt
            short-term EPS but improved long-term cash flows was correctly priced as a positive.
          </p>
        </CaseStudy>
        <KeyTakeaway>
          Both cases show prices respond to expected <em>future</em> cash flows, not to today's
          earnings. That's why stock-price maximization is not synonymous with short-termism — in
          fact, often it is the opposite.
        </KeyTakeaway>
      </LessonBlock>

      <LessonBlock eyebrow="1.4 · Why the alternatives are worse" title="EPS and Book Value are inferior objectives">
        <p>
          Two alternative objectives often come up: <strong>maximize EPS</strong> (popular in
          financial media) and <strong>maximize book value per share</strong> (occasionally cited by
          Warren Buffett). Both fail for the same fundamental reason: they ignore the future.
        </p>
        <Definition term="Earnings per Share (EPS)">
          Net Income / Shares Outstanding — a measure of current accounting profitability.
        </Definition>
        <Pitfall>
          <strong>Problems with EPS:</strong> (1) ignores the future — only captures current profit;
          (2) uses Net Income, which is easy to manipulate via one-time items; (3) the denominator
          (shares outstanding) is also manipulable via stock splits and buybacks; (4) ignores risk
          and the cost of capital.
        </Pitfall>
        <Definition term="Book Value of Equity">
          Shareholders' equity as reported on the balance sheet (Assets − Liabilities), at
          historical accounting values.
        </Definition>
        <Pitfall>
          <strong>Problems with book equity:</strong> it captures only past events. It does not
          include the present value of future cash flows. Intangibles (brand, human capital,
          R&D pipeline) are under-represented. It can even be <em>negative</em>, as we'll see with
          Altice.
        </Pitfall>
        <KeyTakeaway>
          The stock price is the "lesser evil" — the best available objective when markets are
          reasonably efficient and we are focused on shareholders. Real problems with the objective
          arise <em>not</em> from book-vs-market, but from conflicts with society and stakeholders.
        </KeyTakeaway>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-2                                                     */}
      {/* ============================================================ */}
      <SectionHeader icon={<Globe size={16} />} eyebrow="Lesson 1-2" title="Conflicts between shareholder value and society" />

      <LessonBlock eyebrow="2.1 · Socially responsible actions" title="When shareholder value and society are aligned">
        <p>
          Many corporate actions create value for shareholders <em>and</em> for society. Examples:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Investing in human capital.</strong> Companies pay to train employees. The skills
            those employees develop have value beyond the firm — workers carry them into the broader
            economy.
          </li>
          <li>
            <strong>Sustainability.</strong> Building products that are better for the environment,
            adopting cleaner technologies.
          </li>
          <li>
            <strong>Philanthropy.</strong> Donations and community investment.
          </li>
        </ul>
      </LessonBlock>

      <LessonBlock eyebrow="2.2 · Conflicts" title="When shareholder value diverges from social welfare">
        <p>
          Some products are profitable for shareholders but harmful to society. Tobacco and junk food
          have known health costs. Pollution is a classic example: companies have incentives to
          reduce costs by using cheap, "dirty" production methods. Outsourcing labor benefits the
          firm and the receiving country, but can hurt local labor markets.
        </p>
        <p>
          Even taxation creates a conflict. Minimizing taxes raises shareholder value but reduces
          government revenue available for infrastructure, education, and public services. The visual
          below maps the four canonical conflicts.
        </p>
      </LessonBlock>

      <SocietyConflicts />

      <LessonBlock eyebrow="2.3 · Case · Apple and repatriation tax" title="$252 billion abroad — and why it stayed there">
        <CaseStudy title="Apple's foreign cash hoard, pre-2017">
          <p>
            By 2018, US multinationals held huge amounts of cash abroad, especially in low-tax
            jurisdictions. <strong>Apple held $252 billion in cash abroad</strong> — close to{' '}
            <strong>90% of all its cash</strong> — much of it routed through Ireland.
          </p>
          <p>
            Why? The pre-2017 US corporate tax rate was <strong>35%</strong>; Ireland's was roughly{' '}
            <strong>10%</strong>. If Apple repatriated $1 billion of foreign earnings, it would owe
            an extra ~$250 million in US tax on top of the $100 million it already paid in Ireland.
          </p>
          <p>
            The result: cash stayed abroad. Many firms waited, hoping for a "repatriation tax
            holiday."
          </p>
        </CaseStudy>
        <p>
          The <strong>Tax Cuts and Jobs Act (TCJA) of 2017</strong> reduced the repatriation tax to a
          flat <strong>15.5%</strong> on cash and <strong>8%</strong> on non-cash foreign assets, and
          cut the federal corporate tax rate to a flat <strong>21%</strong>. Repatriation surged —
          estimates run into the hundreds of billions. The cash was used for buybacks, debt
          repayment, and investment. Overall government tax revenue, however, fell.
        </p>
        <KeyTakeaway>
          When shareholder-value maximization (via tax minimization) clashes with social welfare,
          <strong> the role of the government</strong> is to regulate. Pollution rules, antitrust
          law, labor protection, and tax law are all examples.
        </KeyTakeaway>
      </LessonBlock>

      <LessonBlock eyebrow="2.4 · Other stakeholders" title="Employees, suppliers, debt holders">
        <p>
          Does a high stock price benefit employees, suppliers, and debt holders? Often yes. A more
          valuable company can pay higher wages, offer better career prospects, and is more stable —
          which lowers the default risk for debt holders.
        </p>
        <p>
          But not always. <strong>M&amp;A activity</strong> often increases stock prices while making
          some jobs redundant ("synergies" frequently means employment cuts).
          <strong> Leveraged buyouts (LBOs)</strong> — acquisitions financed largely with new debt —
          can hurt existing bondholders: leverage rises sharply, the credit rating drops, and the
          value of pre-existing bonds falls.
        </p>
        <Definition term="Leveraged Buyout (LBO)">
          An acquisition financed primarily with debt. The new debt issuance can damage existing
          bondholders by increasing the firm's leverage and credit risk.
        </Definition>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-3                                                     */}
      {/* ============================================================ */}
      <SectionHeader icon={<Users size={16} />} eyebrow="Lesson 1-3" title="The agency problem and corporate governance" />

      <LessonBlock eyebrow="3.1 · The core issue" title="Managers don't always maximize shareholder value">
        <p>
          We want firms to maximize shareholder wealth (with efficient markets and no social
          conflicts). But there's another wrinkle: <strong>managers maximize their own wealth</strong>,
          not necessarily that of shareholders.
        </p>
        <Definition term="Agency Problem">
          A conflict of interest that arises when one party (the agent, e.g. the manager), employed
          by another (the principal, e.g. the shareholder), has incentives to put their own
          interests first.
        </Definition>
        <p>
          Managers are agents of the shareholders, but they may not behave the way shareholders
          want. Common manifestations:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Theft / self-dealing.</strong> Direct extraction of cash from the firm.
          </li>
          <li>
            <strong>Hiring the wrong people</strong> (nepotism). Hiring family or friends instead of
            the best candidate, including succession of CEO to a family member.
          </li>
          <li>
            <strong>Shirking — laziness.</strong> Not putting in the effort needed to drive the
            stock price. "Better to play golf."
          </li>
          <li>
            <strong>Perk consumption.</strong> Corporate jets, lavish offices, business-class travel
            that doesn't serve shareholders.
          </li>
          <li>
            <strong>Empire building.</strong> Value-destroying acquisitions undertaken so the manager
            runs a "bigger" company with higher pay and prestige.
          </li>
          <li>
            <strong>Excessive risk aversion.</strong> Avoiding profitable but risky projects out of
            fear of personal failure.
          </li>
        </ul>
      </LessonBlock>

      <AgencyDiagram />

      <LessonBlock eyebrow="3.2 · The first answer — pay them in stock" title="Equity-based executive compensation">
        <p>
          If a manager is paid only in cash, they have no direct interest in the share price. The
          obvious fix: pay them in stock and options. Top executives of public companies typically
          own significant stock and options in the firm.
        </p>
        <p>
          This has worked. Over recent decades, US stock markets have done very well, and executive
          compensation has risen with them. But this creates new problems — particularly inequality
          (median CEO pay has grown faster than median income), and the temptation to manipulate
          short-term metrics to lift the share price.
        </p>
        <Pitfall>
          Some economists argue high CEO pay simply reflects a competitive market for talent
          ("talent drives pay"). But there's an important wrinkle:
          <strong> shareholders don't directly set pay</strong>. The Board of Directors does.
        </Pitfall>
      </LessonBlock>

      <LessonBlock eyebrow="3.3 · Corporate Governance" title="Mechanisms that align managers with shareholders">
        <Definition term="Corporate Governance">
          The system of rules, practices, and processes by which a corporation is directed and
          controlled. It balances the interests of stakeholders and addresses the agency problem.
        </Definition>
        <p>The standard governance toolkit has four pillars:</p>
        <CompareTable
          headers={['Mechanism', 'How it works']}
          rows={[
            ['Independent Board', 'Directors with no personal or financial ties to the CEO can challenge bad decisions, set compensation honestly, and replace the CEO when needed.'],
            ['Stock-based compensation', 'CEO holds significant stock and options → cares about the share price directly.'],
            ['Activist investors', 'Investors with large stakes (5–10%+) push for strategic and governance changes. They may force board turnover or company-wide reform.'],
            ['Market for corporate control', 'If a CEO is running the firm badly, the firm can be acquired. The threat of a hostile takeover disciplines management.'],
          ]}
        />
        <p>
          Product-market competition also helps: inefficient firms lose market share, suffer poor
          stock performance, and eventually replace their management.
        </p>
        <KeyTakeaway>
          No single mechanism is sufficient. Effective governance combines independent directors,
          equity compensation, activist pressure, and the takeover threat.
        </KeyTakeaway>
      </LessonBlock>

      {/* ============================================================ */}
      {/* THE THREE STATEMENTS — Setup                                   */}
      {/* ============================================================ */}
      <SectionHeader icon={<ScrollText size={16} />} eyebrow="Lessons 1-4 to 1-6" title="The language of corporate finance — three statements" />

      <LessonBlock eyebrow="Why financial statements" title="Accounting is the language of corporate finance">
        <p>
          Up to now, we've discussed the objective. From here on, we discuss <strong>language</strong>{' '}
          — how we describe what's happening inside a company. The vocabulary comes from accounting,
          and there are three core statements:
        </p>
      </LessonBlock>

      <FinancialStatementsFlow />

      <LessonBlock>
        <p>
          For the rest of the module, we apply these ratios to three real companies:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Altice USA</strong> — a telecom firm with ~5 million broadband, video, telephony,
            and mobile customers in the US and Canada.
          </li>
          <li>
            <strong>DISH Network Operations</strong> — Altice's roughly-comparable competitor;
            ~10 million pay-TV and wireless customers in the US.
          </li>
          <li>
            <strong>Boeing</strong> — a major aerospace manufacturer and defense contractor.
            Different industry, included to highlight industry-driven differences (especially around
            inventory).
          </li>
        </ul>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-4 · Balance Sheet                                     */}
      {/* ============================================================ */}
      <SectionHeader icon={<BarChart3 size={16} />} eyebrow="Lesson 1-4" title="Balance Sheet — liquidity and leverage" />

      <LessonBlock eyebrow="4.1 · Reading a balance sheet">
        <p>
          The balance sheet is a snapshot: assets on one side, liabilities and equity on the other.
          Both assets and liabilities are split into <strong>current</strong> (short-term) and{' '}
          <strong>non-current</strong> (long-term).
        </p>
        <Formula caption="Always true — every dollar of asset is financed by debt or equity">
          Assets = Liabilities + Equity
        </Formula>
        <p>
          Looking only at the balance sheet, we can already learn a lot: company size (total
          assets), the financing mix (debt vs equity), and the maturity structure (current vs
          long-term liabilities).
        </p>
      </LessonBlock>

      <LessonBlock eyebrow="4.2 · Liquidity ratios" title="Can the firm meet its short-term obligations?">
        <Definition term="Liquidity">
          The ease with which an asset can be converted into cash without significant loss of value.
          Liquidity ratios measure whether the firm's current assets can cover its current
          liabilities <em>without</em> relying on future cash flow.
        </Definition>
        <p>Three ratios, in order of strictness:</p>
        <Formula caption="Includes all current assets — easy but loose">
          Current Ratio = Current Assets / Current Liabilities
        </Formula>
        <Formula caption="Excludes inventory — more conservative">
          Quick Ratio = (Cash + Receivables) / Current Liabilities
        </Formula>
        <Formula caption="Only cash — strictest measure">
          Cash Ratio = Cash / Current Liabilities
        </Formula>
        <p>
          <strong>Worked example — Altice:</strong> Current Assets = $790M, Current Liabilities =
          $2,745M, so Current Ratio = 790 / 2,745 ≈ <strong>0.30</strong>. Altice has only 30¢ of
          current assets per $1 of current liabilities.
        </p>
        <p>
          <strong>Worked example — Boeing:</strong> Current Assets = $108.7B (of which $78.8B is
          inventory!), Current Liabilities = $82B, so Current Ratio ≈ <strong>1.33</strong>. On the
          surface Boeing looks much more liquid than Altice. But Boeing's apparent liquidity is
          driven by inventory.
        </p>
        <Pitfall>
          Does inventory really measure liquidity? Boeing's inventory consists of aircraft engines,
          seats, and other highly specialized components. If they had to liquidate this inventory,
          they would disrupt the business and may not recover much per dollar.
        </Pitfall>
        <p>
          The corporate-finance literature has quantified this. <strong>Berger, Ofek &amp; Swary
          (1996)</strong> gathered data on how much money companies recovered when they sold their
          current assets to discontinue operations (companies that later went bankrupt). The
          findings:
        </p>
        <CompareTable
          headers={['Asset type', 'Recovery rate (¢ per $1)']}
          rows={[
            ['Cash', '100¢'],
            ['Receivables', '72¢'],
            ['Inventory', '55¢'],
          ]}
        />
        <KeyTakeaway>
          Inventory is only ~55% liquid. The <strong>quick ratio</strong> (which excludes inventory)
          is therefore a more reliable measure. Boeing's high current ratio overstates its real
          short-term liquidity.
        </KeyTakeaway>
      </LessonBlock>

      <LiquidityComparison />

      <LessonBlock eyebrow={'4.2 (cont.) · What\'s a "good" liquidity ratio?'}>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Current ratio ≥ 1</strong> — a reasonable minimum.</li>
          <li><strong>Quick ratio ≈ 1</strong> — desirable; you don't want it to fall too far below 1.</li>
          <li>
            <strong>Cash ratio</strong> — depends on the liquidity of receivables and other working-
            capital considerations. High is good for liquidity, but doesn't strictly need to be 1.
          </li>
        </ul>
        <p>
          <strong>How liquidity deteriorates.</strong> The cleanest way to reduce liquidity is to
          increase short-term debt to invest in long-term assets — the denominator (current
          liabilities) grows while the numerator (current assets) doesn't. Spending cash on CapEx
          also lowers liquidity.
        </p>
      </LessonBlock>

      {/* ─────────── Solvency / Leverage ─────────── */}
      <LessonBlock eyebrow="4.3 · Solvency / Leverage ratios" title="Can the firm meet long-term obligations?">
        <p>
          "Solvency ratios" and "leverage ratios" mean the same thing — how much debt the company
          uses to finance its assets. Three common forms:
        </p>
        <CompareTable
          headers={['#', 'Formula', 'Comment']}
          rows={[
            ['1', 'Debt / Assets', 'Common but flawed — ignores other liabilities (pensions, accounts payable). Understates leverage.'],
            ['2', 'Debt / (Debt + Equity)', 'Better — excludes other liabilities from BOTH numerator and denominator.'],
            ['3', 'Total Liabilities / Total Assets', 'Most informative — includes everything. RECOMMENDED.'],
          ]}
        />
        <Pitfall>
          The first ratio is widely used in textbooks. We use ratios <strong>#2 and #3</strong>,
          because pensions and accounts payable are real obligations and excluding them
          underestimates leverage.
        </Pitfall>
        <p>
          <strong>Critical point: market values, not book values.</strong> Look at Altice. Its total
          liabilities exceed its book assets — book equity is <em>negative</em>. By the book
          numbers, the company should be bankrupt. Yet Altice is operating, trading, and has a
          positive market capitalization.
        </p>
        <KeyTakeaway>
          Book equity captures only the past. Market value reflects future discounted cash flows.
          To know whether a firm is solvent, we use the <strong>market value of equity</strong>:
          stock price × shares outstanding.
        </KeyTakeaway>
        <Formula caption="The leverage ratio we use in this course">
          Leverage = Total Liabilities / (Total Liabilities + Market Cap)
        </Formula>
        <p>
          The denominator is the <strong>market value of assets</strong>. A firm with leverage
          above 1 is effectively bankrupt — a firm cannot truly have leverage greater than 1. The
          average US firm has a leverage ratio of <strong>25–30%</strong>.
        </p>
      </LessonBlock>

      <LeverageVisual />

      <LessonBlock eyebrow="4.3 (cont.) · Causes of rising leverage">
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Issuing debt to repurchase equity.</strong> Numerator (debt) up; denominator
            (mkt cap) down. Leverage rises.
          </li>
          <li>
            <strong>Issuing debt to invest.</strong> Numerator up. If the new project is highly
            profitable, the market value of equity rises and partly offsets the increase — but
            leverage usually still rises.
          </li>
          <li>
            <strong>Poor performance.</strong> Stock price falls → market value of equity falls →
            leverage rises <em>mechanically</em>, even with no new debt.
          </li>
        </ol>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-5 · Profitability                                     */}
      {/* ============================================================ */}
      <SectionHeader icon={<Activity size={16} />} eyebrow="Lesson 1-5" title="Income Statement — measuring profitability" />

      <LessonBlock eyebrow="5.1 · OPAT is the key metric">
        <p>
          To measure how profitable a firm is, we use three ratios. All three are built around{' '}
          <strong>OPAT</strong>, not Net Income.
        </p>
        <Definition term="OPAT — Operating Profit After Taxes">
          Operating Income − Income Tax Expense. OPAT measures the profitability of the BUSINESS
          before financing decisions. It sits near the TOP of the income statement, before interest.
        </Definition>
        <Formula>OPAT = Operating Income − Income Tax Expense</Formula>
        <p>
          <strong>Worked example — Altice 2021:</strong> Operating Income = $2,541.8M, Income Tax =
          $295M, so OPAT = $2,541.8 − $295 = <strong>$2,246.8M</strong>.
        </p>
        <Pitfall>
          <strong>Why not Net Income?</strong> Two reasons:
          <ol className="list-decimal pl-6 mt-1">
            <li>
              <strong>OPAT measures the BUSINESS; Net Income measures the SHAREHOLDERS.</strong>{' '}
              Interest payments are payments to providers of capital (banks, bondholders) — they
              are not a cost of running the business. To measure the firm as a whole, we
              shouldn't deduct interest.
            </li>
            <li>
              <strong>Net Income is easier to manipulate.</strong> One-time items, asset
              revaluations, and goodwill changes all hit the bottom of the income statement. OPAT
              is closer to the top, where there's less room to play.
            </li>
          </ol>
        </Pitfall>
      </LessonBlock>

      <LessonBlock eyebrow="5.2 · The three profitability ratios">
        <Formula caption="How efficiently the firm converts assets into revenue">
          Asset Turnover = Revenues / Assets
        </Formula>
        <Formula caption="Profitability per dollar of revenue">
          Net Profit Margin = OPAT / Revenues
        </Formula>
        <Formula caption="Profitability per dollar of assets">
          ROA = OPAT / Assets
        </Formula>
        <p>
          These are connected via the <strong>DuPont decomposition</strong>:
        </p>
        <Formula>ROA = (OPAT / Revenues) × (Revenues / Assets) = Net Profit Margin × Asset Turnover</Formula>
        <Pitfall>
          <strong>Use BOOK value of assets in the denominator</strong>, not market value. We want
          to compare current profits to invested capital, not to expected future value. Using market
          value would mechanically penalize high-growth firms (lots of future cash flows → low
          current profitability ratio).
        </Pitfall>
      </LessonBlock>

      <ProfitabilityCascade />

      <LessonBlock eyebrow="5.3 · Altice vs DISH" title="Same industry, very different profitability">
        <p>
          Applying the ratios to Altice and DISH (Dec 2021):
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Altice</strong> has the higher <strong>net profit margin</strong> and higher{' '}
            <strong>ROA</strong>. It earns more profit per dollar of revenue <em>and</em> per dollar
            of assets.
          </li>
          <li>
            <strong>DISH</strong> has higher <strong>asset turnover</strong> — it produces more
            revenue per dollar of assets — but costs are much higher, so the margin is lower.
          </li>
        </ul>
        <p>
          When we use <strong>EBITDA</strong> instead of OPAT, the gap widens further: ROA based on
          EBITDA is <strong>12% for Altice vs 7% for DISH</strong>.
        </p>
      </LessonBlock>

      <LessonBlock eyebrow="5.4 · Why we don't use EPS to compare firms">
        <p>
          EPS is widely reported but problematic for cross-firm profitability comparison:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Numerator is <strong>Net Income</strong> — already noted as easy to manipulate and
            distorted by financing structure.
          </li>
          <li>
            Denominator is <strong>shares outstanding</strong>, which is also easy to change. Stock
            splits alter the number of shares without changing fundamentals. Buybacks lower the
            denominator and mechanically raise EPS.
          </li>
        </ul>
        <KeyTakeaway>
          For profit comparisons across firms, use <strong>OPAT and OPAT-based ratios</strong>. In
          practice, EBITDA is also common — it's a better proxy for cash (D&amp;A are non-cash) but
          ignores the implicit cost of asset depreciation. Looking at both is good practice.
        </KeyTakeaway>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-6 · Cash Flow Statement                               */}
      {/* ============================================================ */}
      <SectionHeader icon={<Coins size={16} />} eyebrow="Lesson 1-6" title="Cash Flow Statement — how cash is generated and spent" />

      <LessonBlock eyebrow="6.1 · Structure">
        <p>
          The cash flow statement starts from Net Income (the bottom of the income statement) and
          adjusts it to get the actual cash flow. It has three sections:
        </p>
        <CompareTable
          headers={['Section', 'What it includes']}
          rows={[
            ['Operating activities (CFO)', 'Net Income + non-cash items (D&A) + changes in working capital.'],
            ['Investing activities (CFI)', 'CapEx, acquisitions, sale of property and intangibles.'],
            ['Financing activities (CFF)', 'Debt issuance/repayment, equity issuance/buybacks, dividends.'],
          ]}
        />
        <Formula>Net change in cash = CFO + CFI + CFF</Formula>
        <Pitfall>
          <strong>Sign convention.</strong> A <strong>positive</strong> number = cash flowing INTO
          the firm. A <strong>negative</strong> number = cash flowing OUT. For example, CapEx of
          −$1,185 means the company spent $1.185 billion on investment.
        </Pitfall>
      </LessonBlock>

      <LessonBlock eyebrow="6.2 · Reading the signs to classify a firm">
        <p>
          The signs of CFO, CFI, and CFF together reveal a firm's life-stage:
        </p>
        <CompareTable
          headers={['CFO', 'CFI', 'CFF', 'Profile']}
          rows={[
            ['−', '−', '+', 'Growth-stage startup — burning cash, investing, funded externally'],
            ['+', '−', '−', 'Mature, profitable — internal cash funds investment, returns the rest'],
            ['+', '+', '−', 'Mature, downsizing — selling assets, paying back investors'],
            ['+', '−', '+', 'Profitable but raising MORE capital — heavy CapEx / M&A (e.g. DISH)'],
          ]}
        />
      </LessonBlock>

      <CashFlowQuadrants />

      <LessonBlock eyebrow="6.3 · Worked example — DISH" title="What the cash flow statement revealed about DISH's strategy">
        <CaseStudy title="DISH 2020 — the $1.4B Boost Mobile deal">
          <p>
            Looking at DISH's CFS we see +CFO (the business produces cash), −CFI (significant
            investment), and +CFF (raising capital — heavily via debt, very little via equity, which
            is typical for US firms).
          </p>
          <p>
            Drilling into 2020: a <strong>$1.3 billion cash acquisition</strong> jumps out. What was
            it? Some research (10-K, news) shows DISH acquired <strong>Boost Mobile (Prepaid
            wireless) from Sprint</strong> for $1.4 billion. The deal was forced by the Department
            of Justice as a condition for approving the Sprint–T-Mobile merger (closed July 2020).
          </p>
          <p>
            And the line marked "Other" in the financing section? Another ~<strong>$20 billion on
            wireless spectrum licenses</strong>. DISH is in a major investment cycle to build a 5G
            broadband network covering large portions of the US population.
          </p>
        </CaseStudy>
        <KeyTakeaway>
          If we hadn't read the cash flow statement, we would have had no idea DISH was undergoing
          such a strategic transformation. The CFS often reveals strategy that's invisible elsewhere.
        </KeyTakeaway>
      </LessonBlock>

      <LessonBlock eyebrow="6.4 · One empirical fact">
        <p>
          US companies are very reluctant to issue new equity. We'll see why later in the course
          (Myers &amp; Majluf's "pecking-order theory" — asymmetric information makes equity
          issuance look like a signal that the stock is overvalued). For now, just notice it: when a
          US firm needs capital, debt is the default.
        </p>
      </LessonBlock>

      {/* ============================================================ */}
      {/* LESSON 1-7 · Valuation Ratios                                  */}
      {/* ============================================================ */}
      <SectionHeader icon={<Telescope size={16} />} eyebrow="Lesson 1-7" title="Valuation Ratios — future ÷ present" />

      <LessonBlock eyebrow="7.1 · What valuation ratios measure">
        <p>
          We've measured liquidity, leverage, profitability, and cash flow — these describe the
          firm's <strong>present</strong>. But markets value the <strong>future</strong>. Valuation
          ratios connect the two.
        </p>
        <Definition term="Valuation Ratios">
          Ratios that compare the current market value of a firm to a fundamental accounting
          variable. Both ratios we'll use have market value in the numerator; the denominator is
          either book value or current profits.
        </Definition>
        <KeyTakeaway>
          Valuation ratios measure <strong>FUTURE divided by PRESENT (or past)</strong>.
        </KeyTakeaway>
      </LessonBlock>

      <LessonBlock eyebrow="7.2 · Two valuation ratios">
        <Formula caption="Future market value relative to past accounting value">
          Market-to-Book = Market Value of Assets / Book Value of Assets
        </Formula>
        <p>
          The M/B ratio can also be computed on equity (Market Cap / Book Equity), but book equity
          can be <em>negative</em> (Altice!). We prefer the asset version.
        </p>
        <Formula caption="Future firm value relative to current operating profits">
          Value over OPAT = Market Value of Assets / OPAT
        </Formula>
        <p>
          There's also the well-known <strong>P/E ratio</strong> (Price / EPS = Market Cap / Net
          Income), but it uses Net Income (manipulable) and ignores debt. We prefer Value/OPAT
          because it covers the whole firm and uses a more robust profit measure.
        </p>
      </LessonBlock>

      <ValuationRatiosViz />

      <LessonBlock eyebrow="7.3 · Reading the ratios">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>High M/B or V/OPAT:</strong> the market expects strong future cash-flow growth
            relative to the firm's past.
          </li>
          <li>
            <strong>Low M/B or V/OPAT:</strong> the market is pessimistic about the firm's future,
            or sees significant risk.
          </li>
        </ul>
        <Pitfall>
          <strong>An apparent paradox.</strong> Altice had a higher M/B ratio than DISH, even though
          Altice's stock performed worse recently. How? M/B compares future (in the numerator) to
          past (in the denominator). The denominator (book value) reflects past accounting and can
          be stale or massaged. The market value can drop without the book value moving in step.
          The Value/OPAT ratio, by contrast, moves more closely with stock performance because
          OPAT is a current measure.
        </Pitfall>
      </LessonBlock>

      {/* ============================================================ */}
      {/* MODULE REVIEW                                                  */}
      {/* ============================================================ */}
      <SectionHeader icon={<Sparkles size={16} />} eyebrow="Module 1 · Review" title="What you should walk away with" />

      <LessonBlock>
        <p>
          This module covered the <strong>objective</strong> and the <strong>language</strong> of
          corporate finance.
        </p>
        <p>
          On the objective: maximizing the <strong>stock price</strong> is a reasonable goal — better
          than EPS or book value — because the stock price captures the entire future. The objective
          is imperfect: it can conflict with social responsibility and other stakeholders. Managers
          may not act in shareholders' interests (the agency problem); corporate governance
          mitigates this.
        </p>
        <p>
          On the language: the <strong>balance sheet</strong> gives us liquidity and solvency; the{' '}
          <strong>income statement</strong> gives us profitability via OPAT-based ratios; the{' '}
          <strong>cash flow statement</strong> reveals how the firm generates and uses cash, often
          exposing strategy; and <strong>valuation ratios</strong> compare future to past.
        </p>
      </LessonBlock>

      {/* ============================================================ */}
      {/* FORMULA CHEAT-SHEET                                            */}
      {/* ============================================================ */}
      <section className="card p-5">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Cheat-sheet</div>
          <h3 className="font-display text-lg font-semibold">Every Module 1 formula in one place</h3>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
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
          ].map((f) => (
            <div key={f.name} className="rounded-xl border border-line bg-surface-3/60 p-3">
              <div className="text-xs text-ink-muted uppercase tracking-wider">{f.name}</div>
              <div className="font-mono text-sm mt-1 text-ink break-words">{f.formula}</div>
              <div className="text-[11px] text-ink-muted mt-1">{f.hint}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* RELATED PAPERS                                                 */}
      {/* ============================================================ */}
      <section className="card p-5">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Academic foundations</div>
          <h3 className="font-display text-lg font-semibold">Papers behind Module 1 — read these to deepen exam answers</h3>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
          {PAPERS.map((p, i) => (
            <div key={i} className="rounded-xl border border-line bg-surface-3/40 p-3">
              <div className="text-brand-300 font-semibold">{p.cite}</div>
              <div className="font-medium mt-0.5">{p.title}</div>
              <div className="text-ink-soft mt-1 leading-relaxed">{p.idea}</div>
              <div className="text-[11px] text-ink-muted mt-2 italic">
                Connection to module: {p.connection}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* QUIZ CTA                                                       */}
      {/* ============================================================ */}
      <section className="card p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 bg-brand-500" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="text-brand-400" />
            <div>
              <h4 className="font-display text-lg font-semibold">Ready to test yourself?</h4>
              <p className="text-sm text-ink-muted">
                20 questions for Module 1 · 4 easy · 12 medium · 4 hard. Choose duration and go.
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

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────
function SectionHeader({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) {
  return (
    <header className="flex items-center gap-3 mt-2">
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-brand-500/10 border border-brand-500/40 text-brand-300">
        {icon}
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-brand-300">{eyebrow}</div>
        <h2 className="font-display text-xl font-semibold leading-tight">{title}</h2>
      </div>
    </header>
  )
}

const PAPERS = [
  {
    cite: 'Jensen & Meckling (1976)',
    title: 'Theory of the Firm: Managerial Behavior, Agency Costs, and Ownership Structure',
    idea: 'Formalized agency theory. The firm is a "nexus of contracts." Agency costs = monitoring + bonding + residual loss. The lower the manager\'s equity stake, the higher the agency costs.',
    connection: 'Foundation for Lesson 1-3 (Agency Problem and Governance).',
  },
  {
    cite: 'Modigliani & Miller (1958, 1963)',
    title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
    idea: 'In a frictionless world, capital structure is irrelevant to firm value (MM-I). With corporate taxes, debt creates a tax shield and there is an optimum (MM-II).',
    connection: 'Justifies why the stock price equals discounted future cash flows; basis for leverage analysis (Lessons 1-1, 1-4.3).',
  },
  {
    cite: 'Fama (1970)',
    title: 'Efficient Capital Markets: A Review of Theory and Empirical Work',
    idea: 'Formalized the three forms of EMH: weak, semi-strong, and strong. Establishes the conditions under which prices fully reflect information.',
    connection: 'The required condition for stock-price maximization in Lesson 1-1.',
  },
  {
    cite: 'Berger, Ofek & Swary (1996)',
    title: 'Investor Valuation of the Abandonment Option',
    idea: 'Studied recovery rates on assets sold by firms heading to bankruptcy. Cash → 100%, Receivables → 72%, Inventory → 55%.',
    connection: 'Directly motivates the use of the quick ratio over the current ratio in Lesson 1-4.2.',
  },
  {
    cite: 'Myers & Majluf (1984)',
    title: 'Corporate Financing and Investment Decisions When Firms Have Information Investors Do Not Have',
    idea: 'Pecking-order theory: under asymmetric information, firms prefer internal cash, then debt, then equity as a last resort. Issuing equity signals overvaluation.',
    connection: 'Explains why DISH (and US firms in general) financed via debt rather than equity in Lesson 1-6.',
  },
  {
    cite: 'Bebchuk & Fried (2003, 2004)',
    title: 'Pay without Performance: The Unfulfilled Promise of Executive Compensation',
    idea: 'CEO pay is often disconnected from performance. Boards are not independent enough. The "managerial power approach" predicts pay outcomes better than the "talent market" view.',
    connection: 'Academic critique of stock-based comp and motivation for stronger governance (Lesson 1-3).',
  },
  {
    cite: 'Easterbrook (1984)',
    title: 'Two Agency-Cost Explanations of Dividends',
    idea: 'Dividends discipline managers by forcing them to return to capital markets for new funding — and to face the external monitoring that comes with it.',
    connection: 'A complementary governance mechanism beyond those discussed in Lesson 1-3.',
  },
  {
    cite: 'TCJA (2017) — Policy paper',
    title: 'The Tax Cuts and Jobs Act',
    idea: 'Cut the US federal corporate tax rate from 35% to 21%. Introduced a flat 15.5%/8% repatriation tax. Triggered ~$600B+ in foreign-cash repatriation.',
    connection: 'Real-world example of government action when shareholder value diverges from social welfare (Lesson 1-2).',
  },
]

/** Placeholder for modules whose content hasn't been filled in yet. */
export function ModulePlaceholder({ moduleId }: { moduleId: number }) {
  return (
    <div className="card p-8 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-surface-3 mb-4">
        <Banknote className="text-ink-muted" />
      </div>
      <h3 className="font-display text-xl font-semibold">Module {moduleId} — coming soon</h3>
      <p className="text-ink-muted text-sm mt-2 max-w-md mx-auto">
        This module's content will be filled in as the course progresses. The scaffolding,
        navigation, and quiz engine are already in place — only the material itself needs to be added.
      </p>
    </div>
  )
}
