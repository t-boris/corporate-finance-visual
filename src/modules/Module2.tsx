import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { ForecastingModel } from '@/components/ForecastingModel'
import { FinancingDecision } from '@/components/FinancingDecision'
import { FactoringExplorer } from '@/components/FactoringExplorer'
import { WorkingCapitalCycle } from '@/components/WorkingCapitalCycle'
import { WorkingCapitalShock } from '@/components/WorkingCapitalShock'
import { LiquidityRiskCreditLine } from '@/components/LiquidityRiskCreditLine'

/**
 * Module 2 — Financial Planning.
 *
 * Same summary-first layout as Module 1: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with full lecture prose behind a toggle), a cheat-sheet,
 * collapsible academic papers, and a quiz CTA. Page copy is English; the
 * Russian study notes live in the KnowledgeDB markdown file.
 */
export function Module2Content() {
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
            Companies need investments to survive and grow — both <strong>long-term</strong> (capital
            expenditures, R&amp;D, acquisitions) and <strong>short-term</strong> (inventory and
            receivables). This module gives us the tools to <strong>forecast financing needs</strong>{' '}
            and to <strong>manage liquidity</strong>.
          </p>
          <p>
            The first half is <strong>long-term financial planning</strong>: we project a company&apos;s
            financial statements to see whether it can fund a major expansion with internal funds. The
            second half is <strong>short-term financial planning</strong> — working capital management,
            where the mismatch between paying for goods and collecting cash creates a liquidity need.
          </p>
          <KeyTakeaway>
            This module is about <strong>whether there is enough cash</strong>, and <strong>when</strong>{' '}
            — not about whether an investment is worthwhile. That valuation question (NPV/IRR) is
            Module 3.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-1" summary={SUMMARIES['2-1']} visuals={<ForecastingModel />}>
        <LessonBlock eyebrow="2.1 · The starting point" title="Long-term financial planning">
          <Definition term="Financial Forecasting">
            Estimating what a company&apos;s future financial statements will look like, in order to
            anticipate financing needs, value the firm, or assess the impact of new projects.
          </Definition>
          <p>Forecasting has three important uses:</p>
          <CompareTable
            headers={['Use', 'What it answers']}
            rows={[
              ['Financing needs', 'Will the company need cash in the future? (the focus here)'],
              ['Valuation', 'What are the future cash flows worth? (Module 3–4)'],
              ['Projects / M&A', 'How would a new project or acquisition change the statements?'],
            ]}
          />
        </LessonBlock>

        <LessonBlock eyebrow="2.1 · The case" title="PepsiCo finances an expansion">
          <p>
            We use <strong>real PepsiCo statements</strong>, starting from audited{' '}
            <strong>2021</strong> figures, and ask: can PepsiCo fund a large expansion plan with
            internal funds, or must it issue new debt or equity?
          </p>
          <CompareTable
            headers={['Assumption', 'Value']}
            rows={[
              ['Revenue growth', '+3.9% in 2022 and 2023 (analyst estimates, Capital IQ)'],
              ['CapEx', '$5B (2022), $8B (2023)'],
              ['Investment in NWC', '12% of the increase in revenue'],
              ['Interest rate / debt', '4% on $42.4B of debt'],
              ['Dividends / tax', 'constant payout ratio; constant tax rate'],
            ]}
          />
          <KeyTakeaway>
            The single most important forecast is <strong>revenue growth</strong> — almost everything
            else scales from it.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-2 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-2" summary={SUMMARIES['2-2']}>
        <LessonBlock eyebrow="2.2 · The model" title="Forecasting the income statement">
          <Definition term="Percentage-of-Sales Model">
            A forecasting method in which most items are held at a constant proportion of revenue, so
            they grow at the same rate as sales.
          </Definition>
          <Formula caption="Each scaling item grows with revenue">
            Itemₜ = (Item / Revenue)₍base₎ × Revenueₜ
          </Formula>
          <p>
            PepsiCo&apos;s revenue grows from <strong>$79.5B</strong> (2021) to <strong>$82.6B</strong>{' '}
            (2022). COGS keeps its share of sales (≈$37.0B → ≈$38.5B); SG&amp;A does the same. But two
            items break the rule:
          </p>
          <CompareTable
            headers={['Item', 'How to forecast', 'Why']}
            rows={[
              ['Other / non-operating', 'Set to 0', 'Treated as one-time, non-recurring'],
              ['Interest expense', '4% × $42.4B ≈ $1.7B', 'Depends on DEBT, not on revenue'],
              ['Tax', 'Constant rate', 'Modeling assumption'],
            ]}
          />
          <Pitfall>
            Never forecast <strong>interest</strong> as a percentage of sales. Interest depends on how
            much debt the firm carries, so it is the interest rate times the debt balance.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-3 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-3" summary={SUMMARIES['2-3']}>
        <LessonBlock eyebrow="2.3 · Operating, investing, financing" title="Forecasting the cash flow statement">
          <p>
            We rebuild the three sections from the forecast. The key insight: an increase in net
            working capital is an <strong>investment</strong> — a use of cash.
          </p>
          <CompareTable
            headers={['Section', 'Forecast', '2022 result']}
            rows={[
              ['CFO', 'Earnings + Depreciation (grows 3.9%) − ΔNWC (12% of ΔRevenue)', '≈ +$11.8B'],
              ['CFI', '− CapEx', '−$5B'],
              ['CFF', '− Dividends (constant payout); debt & equity issuance = 0', '≈ −$6.8B'],
            ]}
          />
          <Formula>Net change in cash = CFO + CFI + CFF</Formula>
          <KeyTakeaway>
            Net change in cash: <strong>−$50M (2022)</strong> and <strong>−$2.85B (2023)</strong>. Why
            zero issuance? That is exactly the question being tested — not an assumption.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-4 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-4" summary={SUMMARIES['2-4']}>
        <LessonBlock eyebrow="2.4 · The answer" title="Forecasting the balance sheet">
          <p>
            For the financing question, only one balance-sheet line matters:{' '}
            <strong>cash</strong>. And it needs no assumption — it is an accounting identity.
          </p>
          <Formula>Cashₜ = Cashₜ₋₁ + Net change in cashₜ</Formula>
          <p>
            Cash falls from <strong>~$6.0B</strong> (2021) to <strong>$5.95B</strong> (2022) to{' '}
            <strong>$3.09B</strong> (2023) — but stays <strong>positive</strong>. So PepsiCo{' '}
            <em>can</em> fund the expansion internally.
          </p>
          <Pitfall>
            It only <em>seems</em> fine. The <strong>cash ratio</strong> (Cash / Current Liabilities)
            falls from <strong>23% to 12%</strong>, and some cash is trapped abroad. A CFO may prefer
            to issue debt rather than drain the buffer.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-5 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-5" summary={SUMMARIES['2-5']} visuals={<FinancingDecision />}>
        <LessonBlock eyebrow="2.5 · If external funds are needed" title="Raising long-term financing">
          <p>
            If a firm does need external money, it faces the <strong>capital structure decision</strong>{' '}
            (stock, bond, or bank loan — detailed in Module 5). Two practical questions stand out.
          </p>
          <Definition term="Rollover / Refinancing Risk">
            The risk that a firm cannot refinance maturing obligations — or only on much worse terms —
            because market conditions have deteriorated.
          </Definition>
          <CaseStudy title="Avis vs. Budget — timing matters (Almeida & Weisbenner)">
            <p>
              In the 2007–2009 crisis, firms forced to issue debt at the peak (2008) fared worse.{' '}
              <strong>Budget</strong> had to refinance maturing debt in 2008; <strong>Avis</strong> was
              in a stronger position and ultimately <strong>acquired Budget</strong>. Bad timing can be
              fatal — so PepsiCo might issue <em>early</em>.
            </p>
          </CaseStudy>
          <KeyTakeaway>
            How much to borrow? More than the forecast strictly requires can be safer — provided the
            excess is <strong>held as cash</strong>. Holding cash is effectively{' '}
            <strong>precautionary borrowing</strong>.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-6 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-6" summary={SUMMARIES['2-6']} visuals={<FactoringExplorer />}>
        <LessonBlock eyebrow="2.6 · Short-term investments" title="Investments in working capital">
          <p>
            <strong>Receivables</strong> and <strong>inventory</strong> are short-term investments that
            tie up cash; <strong>payables</strong> are the mirror image — borrowing from suppliers,
            which frees cash.
          </p>
          <Definition term="Net Working Capital (NWC)">
            NWC = Receivables + Inventory − Payables. An increase ties up cash and is treated as an
            investment (a negative cash flow).
          </Definition>
          <Formula>NWC = Receivables + Inventory − Payables</Formula>
          <p>
            Receivables can be reduced with early-payment discounts (costly — they lower revenue) or by{' '}
            <strong>factoring</strong> — selling/borrowing against them for cash now.
          </p>
          <CaseStudy title="Factoring implies a real interest rate">
            <p>
              A $300M receivable sold for <strong>$280M</strong> today implies a rate of{' '}
              <strong>300/280 − 1 ≈ 7.14%</strong>. Selling a receivable is economically the same as
              borrowing against it.
            </p>
          </CaseStudy>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-7 ─────────────────────────────────────────────────────── */}
      <LessonSection id="2-7" summary={SUMMARIES['2-7']} visuals={<WorkingCapitalCycle />}>
        <LessonBlock eyebrow="2.7 · Measuring working capital" title="Working capital ratios & the cash conversion cycle">
          <Formula caption="Receivables — based on daily revenue">
            Collection Period = AR / (Revenue / 365)
          </Formula>
          <Formula caption="Inventory & payables — based on daily operating costs (COGS + SG&A)">
            Days in Inventory = Inventory / (Op. Costs / 365)
          </Formula>
          <p>
            Example: $100M of receivables on $2B revenue → $5.5M/day → <strong>18 days</strong> to
            collect. Putting the pieces together gives the cash conversion cycle:
          </p>
          <Formula>CCC = Collection Period + Days in Inventory − Payable Period</Formula>
          <Definition term="Cash Conversion Cycle (CCC)">
            How long it takes a firm to turn its working-capital investments back into cash. Payables
            shorten it because suppliers finance part of the cycle.
          </Definition>
          <p>
            <strong>Boeing 2021:</strong> 474 days of inventory, CCC ≈ <strong>484 days</strong>{' '}
            (~1.5 years). <strong>Airbus:</strong> ~6 months. <strong>Walmart 2021:</strong> just{' '}
            <strong>6 days</strong> (down from 12 in 2014). The CCC depends on the nature of the
            business.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-8 & 2-9 ───────────────────────────────────────────────── */}
      <LessonSection id="2-8" summary={SUMMARIES['2-8']} visuals={<WorkingCapitalShock />}>
        <LessonBlock eyebrow="2.8 · Inventory" title="Short-term planning — financing inventory">
          <p>
            A firm buys inventory 90 days before the sale: sales $75M/quarter, COGS = 92% = $69M. The
            inventory ties up cash, so it must be financed — with own cash, supplier financing, or a
            bank credit line. With a 50% haircut, the firm borrows $34.5M and funds $34.5M itself (like
            a mortgage loan-to-value).
          </p>
          <Pitfall>
            <strong>Sales shock:</strong> if Q1 sales come in at $60M, the firm generates only $25.5M
            but needs $34.5M for next quarter&apos;s inventory. Without a reserve it can buy only ~$51M
            of inventory → Q2 sales fall to ~$55.4M. The shock propagates.
          </Pitfall>
        </LessonBlock>

        <LessonBlock eyebrow="2.9 · Receivables" title="Short-term planning — financing receivables">
          <p>
            Same business, but the customer pays 90 days late. Receivables can usually be financed at a
            higher fraction (say 80%) than inventory. A <strong>financing shock</strong> — the
            financeable fraction dropping from 80% to 50% — forces the firm to fund more itself.
          </p>
          <KeyTakeaway>
            In the extreme (only $15M of internal cash), solving 0.92·S = 15 + 0.50·S gives sales of{' '}
            <strong>~$35.7M</strong>, down from $75M — <strong>purely</strong> a financing shock, with
            demand fully intact. The inability to fund working capital cuts sales irrespective of
            demand.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 2-10 ────────────────────────────────────────────────────── */}
      <LessonSection id="2-10" summary={SUMMARIES['2-10']} visuals={<LiquidityRiskCreditLine />}>
        <LessonBlock eyebrow="2.10 · Short-term liabilities" title="Liquidity risk & credit lines">
          <p>
            Back to <strong>Altice</strong> (Module 1): its liquidity ratios are very low. But a low
            ratio is not necessarily a problem — operating cash flow funds expenses, and maturing debt
            is usually <strong>refinanced</strong>.
          </p>
          <Definition term="Refinancing (Rollover)">
            Repaying a maturing liability by issuing a new, similar one, so there is no net cash
            outflow. Very common — which is why Altice can run with low liquidity ratios.
          </Definition>
          <Definition term="Liquidity Risk">
            The risk that creditors refuse to roll over financing, forcing a liquidity crisis — cut
            CapEx, falling stock price, possible financial distress.
          </Definition>
          <CaseStudy title="Altice's backstop — and the COVID dash for cash">
            <p>
              The remedy is a <strong>bank line of credit</strong>: limit and rate negotiated ahead of
              need, kept open for a commitment fee of <strong>0.1–0.3%/year</strong> (like an insurance
              premium). Altice carried an undrawn <strong>~$1.6B</strong> line at the end of 2021. In
              March 2020, firms drew lines en masse — the <strong>&ldquo;dash for cash&rdquo;</strong>{' '}
              (Acharya &amp; Steffen).
            </p>
          </CaseStudy>
        </LessonBlock>
      </LessonSection>

      {/* MODULE REVIEW ─────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review} />

      {/* CHEAT-SHEET ───────────────────────────────────────────────────── */}
      <section id="lesson-cheat" className="card p-5 scroll-mt-32">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Cheat-sheet</div>
          <h3 className="font-display text-lg font-semibold">Every Module 2 formula in one place</h3>
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
                20 questions for Module 2 · 4 easy · 12 medium · 4 hard.
              </p>
            </div>
          </div>
          <Link to="/quiz?module=2" className="btn-primary">
            <BookOpen size={16} /> Start Module 2 quiz <ArrowRight size={16} />
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
  { id: 'intro',  label: 'Overview' },
  { id: '2-1',    label: '2·1 Planning' },
  { id: '2-2',    label: '2·2 Income' },
  { id: '2-3',    label: '2·3 Cash flow' },
  { id: '2-4',    label: '2·4 Balance sheet' },
  { id: '2-5',    label: '2·5 Financing' },
  { id: '2-6',    label: '2·6 Working capital' },
  { id: '2-7',    label: '2·7 CCC' },
  { id: '2-8',    label: '2·8 ST planning' },
  { id: '2-10',   label: '2·10 Liquidity risk' },
  { id: 'review', label: 'Review' },
  { id: 'cheat',  label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 2 · Overview',
    title: 'Financial Planning',
    tldr: (
      <>
        Two horizons: <strong>long-term</strong> (can internal cash fund the expansion?) and{' '}
        <strong>short-term</strong> (working-capital liquidity). The tools: percentage-of-sales
        forecasting, the cash conversion cycle, and cash &amp; credit lines.
      </>
    ),
    keyPoints: [
      <>Forecast income statement → cash flow → balance sheet to find financing needs.</>,
      <>Working capital (inventory, receivables, payables) ties up — or frees — cash.</>,
      <>The cash conversion cycle measures how long cash is locked in the business.</>,
      <>Manage liquidity risk with cash reserves and pre-negotiated credit lines.</>,
      <>NOT covered: whether to invest (NPV/IRR) — that is Module 3.</>,
    ],
  },

  '2-1': {
    eyebrow: 'Lesson 2-1',
    title: 'Long-term financial planning',
    tldr: (
      <>
        Start from audited 2021 statements and project the future under explicit assumptions. The
        question: can PepsiCo fund a <strong>$5B / $8B</strong> expansion with internal funds?
      </>
    ),
    keyPoints: [
      <>Three uses of forecasting: financing needs, valuation, project/M&amp;A impact.</>,
      <><strong>Revenue growth</strong> (+3.9%) is the master driver of the whole model.</>,
      <>Assumptions: CapEx $5B/$8B, ΔNWC = 12% of ΔRevenue, 4% on $42.4B debt, constant payout/tax.</>,
      <>Central question: internal funds vs. issuing new debt/equity.</>,
    ],
    formulas: [{ label: 'Driver', expr: 'Revenueₜ = Revenueₜ₋₁ × (1 + g)' }],
  },

  '2-2': {
    eyebrow: 'Lesson 2-2',
    title: 'Forecasting the income statement',
    tldr: (
      <>
        The <strong>percentage-of-sales</strong> model holds items at a constant share of revenue.
        Exceptions: interest (depends on debt) and one-time items (set to zero).
      </>
    ),
    keyPoints: [
      <>COGS and SG&amp;A grow 3.9% with revenue ($37B → $38.5B COGS).</>,
      <>&ldquo;Other&rdquo; items are treated as one-time → 0.</>,
      <>Interest = 4% × $42.4B ≈ $1.7B — NOT a percentage of sales.</>,
      <>Tax rate held constant.</>,
    ],
    formulas: [{ label: '% of sales', expr: 'Itemₜ = (Item/Rev) × Revₜ' }],
  },

  '2-3': {
    eyebrow: 'Lesson 2-3',
    title: 'Forecasting the cash flow statement',
    tldr: (
      <>
        CFO = earnings + D&amp;A − ΔNWC; CFI = −CapEx; CFF = −dividends. New debt/equity issuance is set
        to <strong>zero</strong> — that is the question itself.
      </>
    ),
    keyPoints: [
      <>An increase in NWC (= 12% of ΔRevenue) is an investment → negative cash flow.</>,
      <>CFO 2022 ≈ +$11.8B; CFI = −$5B; CFF ≈ −$6.8B (dividends).</>,
      <>Net change in cash: −$50M (2022), −$2.85B (2023).</>,
    ],
    formulas: [{ label: 'Cash identity', expr: 'Δ Cash = CFO + CFI + CFF' }],
  },

  '2-4': {
    eyebrow: 'Lesson 2-4',
    title: 'Forecasting the balance sheet — the answer',
    tldr: (
      <>
        Only <strong>cash</strong> matters, and it is an identity. Cash falls $6.0B → $3.1B but stays
        positive → the plan is <strong>fundable internally</strong>.
      </>
    ),
    keyPoints: [
      <>Cashₜ = Cashₜ₋₁ + net change in cash — no assumption needed.</>,
      <>2022 cash $5.95B; 2023 cash $3.09B — both positive.</>,
      <>Caveat 1: the cash ratio slides from 23% to 12%.</>,
      <>Caveat 2: multinational cash can be trapped abroad — managers may issue anyway.</>,
    ],
    formulas: [{ label: 'Cash', expr: 'Cashₜ = Cashₜ₋₁ + ΔCashₜ' }],
  },

  '2-5': {
    eyebrow: 'Lesson 2-5',
    title: 'Raising long-term financing',
    tldr: (
      <>
        If external funds are needed: choose a source (capital structure), decide <strong>when</strong>{' '}
        (rollover risk), and <strong>how much</strong> (precautionary).
      </>
    ),
    keyPoints: [
      <>Source: stock, bond, or bank loan — weigh taxes, liquidity, leverage, market conditions.</>,
      <>Timing: waiting risks a closed/expensive market — Avis acquired Budget after 2008.</>,
      <>How much: borrow a precautionary buffer and hold the excess as cash.</>,
    ],
  },

  '2-6': {
    eyebrow: 'Lesson 2-6',
    title: 'Investments in working capital',
    tldr: (
      <>
        Receivables and inventory <strong>tie up</strong> cash; payables <strong>free</strong> it.{' '}
        NWC = AR + Inventory − Payables, and it is an investment in the business.
      </>
    ),
    keyPoints: [
      <>Receivables boost demand but delay cash; reduce via discounts or factoring.</>,
      <>Inventory is needed to run the business but must be paid for before the sale.</>,
      <>Payables are the mirror of receivables — borrowing from suppliers.</>,
      <>Factoring $300M for $280M implies ≈7.14% — selling ≈ borrowing.</>,
    ],
    formulas: [{ label: 'NWC', expr: 'Receivables + Inventory − Payables' }],
  },

  '2-7': {
    eyebrow: 'Lesson 2-7',
    title: 'Working capital ratios & the cash conversion cycle',
    tldr: (
      <>
        Collection period, days in inventory, and payable period combine into the{' '}
        <strong>cash conversion cycle</strong> — how long cash is locked in working capital.
      </>
    ),
    keyPoints: [
      <>Collection period = AR / daily revenue (e.g. 18 days).</>,
      <>Inventory & payable periods use daily operating costs (COGS + SG&amp;A).</>,
      <>CCC = Collection + Days Inventory − Payable Period.</>,
      <>Boeing ≈484 days · Airbus ≈6 months · Walmart ≈6 days — it&apos;s the business.</>,
    ],
    formulas: [
      { label: 'Collection', expr: 'AR / (Revenue/365)' },
      { label: 'CCC', expr: 'Collect + Inventory − Payable' },
    ],
  },

  '2-8': {
    eyebrow: 'Lessons 2-8 & 2-9',
    title: 'Short-term planning — inventory & receivables',
    tldr: (
      <>
        Financing inventory/receivables involves a haircut. A <strong>financing or sales shock</strong>{' '}
        can force sales down <strong>irrespective of demand</strong>.
      </>
    ),
    keyPoints: [
      <>Inventory: 50% haircut → borrow $34.5M, fund $34.5M of $69M COGS yourself.</>,
      <>Sales shock: Q1 $60M → can buy only ~$51M inventory → Q2 sales ~$55.4M.</>,
      <>Receivables financing shock (80%→50%): sales collapse from $75M to ~$35.7M.</>,
      <>Mitigate with a healthy cash ratio and multiple financing sources / a credit line.</>,
    ],
  },

  '2-10': {
    eyebrow: 'Lesson 2-10',
    title: 'Short-term liabilities & liquidity risk',
    tldr: (
      <>
        A low liquidity ratio is not always a problem — debt is usually <strong>refinanced</strong>.
        The danger is <strong>liquidity risk</strong>; the backstop is a <strong>credit line</strong>.
      </>
    ),
    keyPoints: [
      <>Operating cash flow + refinancing explain Altice&apos;s low liquidity ratios.</>,
      <>Refinancing = repay old, issue similar new → ~zero net outflow.</>,
      <>Liquidity risk: creditors refuse → cut CapEx → distress.</>,
      <>Credit line = liquidity insurance; Altice held ~$1.6B undrawn (commitment fee 0.1–0.3%).</>,
    ],
  },

  review: {
    eyebrow: 'Module 2 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        <strong>Plan the cash.</strong> Forecast statements (% of sales) to size financing needs;
        measure working capital with the cash conversion cycle; manage liquidity risk with cash and
        credit lines.
      </>
    ),
    keyPoints: [
      <>Revenue growth drives the percentage-of-sales forecast through to balance-sheet cash.</>,
      <>Working capital is an investment: ΔNWC is a (negative) cash flow — the bridge to FCF.</>,
      <>Inability to fund working capital cuts sales even when demand is healthy.</>,
      <>Timing of cash matters: rollover risk, precautionary cash, and credit lines.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Revenue driver',     formula: 'Revenueₜ = Revenueₜ₋₁ × (1 + g)',        hint: 'g from analyst estimates' },
  { name: 'Percentage of sales',formula: 'Itemₜ = (Item/Rev) × Revₜ',              hint: 'constant share of revenue' },
  { name: 'Interest expense',   formula: 'Interest = rate × Debt',                 hint: 'NOT a % of sales' },
  { name: 'Cash flow identity', formula: 'Δ Cash = CFO + CFI + CFF',               hint: 'net change in cash' },
  { name: 'Balance-sheet cash', formula: 'Cashₜ = Cashₜ₋₁ + ΔCashₜ',               hint: 'accounting identity' },
  { name: 'Cash ratio',         formula: 'Cash / Current Liabilities',             hint: 'PepsiCo 23% → 12%' },
  { name: 'Net working capital',formula: 'Receivables + Inventory − Payables',     hint: 'rise ties up cash' },
  { name: 'Collection period',  formula: 'AR / (Revenue / 365)',                   hint: 'days to collect' },
  { name: 'Days in inventory',  formula: 'Inventory / ((COGS+SG&A) / 365)',        hint: 'daily operating costs' },
  { name: 'Payable period',     formula: 'Payables / ((COGS+SG&A) / 365)',         hint: 'days to pay suppliers' },
  { name: 'Cash conversion cyc.',formula: 'Collection + Inventory − Payable',      hint: 'days cash is tied up' },
  { name: 'Factoring rate',     formula: 'Face / Advance − 1',                     hint: '300/280 − 1 ≈ 7.14%' },
  { name: 'Commitment fee',     formula: '(0.1–0.3%) × line size',                 hint: 'liquidity insurance premium' },
]

const PAPERS = [
  {
    cite: 'Almeida, Campello, Laranjeira & Weisbenner (2011)',
    title: 'Corporate Debt Maturity and the Real Effects of the 2007 Credit Crisis',
    idea: 'Firms with more long-term debt maturing early in the crisis cut investment sharply — the real cost of rollover risk.',
    connection: 'Empirical basis for the Avis/Budget timing lesson (Lesson 2-5).',
  },
  {
    cite: 'Acharya & Steffen (2020)',
    title: 'The Risk of Being a Fallen Angel and the Corporate Dash for Cash in the Midst of COVID',
    idea: 'In March 2020 firms drew down credit lines en masse to hoard cash, most acutely near the investment-grade boundary.',
    connection: 'Direct illustration of credit lines as a cash substitute (Lesson 2-10).',
  },
  {
    cite: 'Sufi (2009)',
    title: 'Bank Lines of Credit in Corporate Finance: An Empirical Analysis',
    idea: 'Credit lines are a primary liquidity source, but access depends on cash-flow covenants; weak firms rely more on cash.',
    connection: 'Explains the liquidity-risk / credit-line link (Lesson 2-10).',
  },
  {
    cite: 'Almeida, Campello & Weisbenner (2004)',
    title: 'The Cash Flow Sensitivity of Cash',
    idea: 'Financially constrained firms save a portion of cash flow as cash; unconstrained firms do not.',
    connection: 'Theory behind precautionary cash (Lesson 2-5).',
  },
  {
    cite: 'Holmström & Tirole (1998)',
    title: 'Private and Public Supply of Liquidity',
    idea: 'Firms facing future liquidity shocks secure liquidity in advance — the rationale for credit lines and reserves.',
    connection: 'Framework for managing liquidity risk (Lessons 2-5, 2-10).',
  },
  {
    cite: 'Kim, Mauer & Sherman (1998)',
    title: 'The Determinants of Corporate Liquidity: Theory and Evidence',
    idea: 'Optimal liquidity trades off external-financing costs against the low return on liquid assets.',
    connection: 'Underpins working-capital and CCC management (Lessons 2-6, 2-7).',
  },
  {
    cite: 'Petersen & Rajan (1997)',
    title: 'Trade Credit: Theories and Evidence',
    idea: 'Firms use trade credit (receivables/payables) as financing, especially when bank access is limited.',
    connection: 'Explains supplier financing of inventory (Lesson 2-6).',
  },
  {
    cite: 'Fazzari, Hubbard & Petersen (1988)',
    title: 'Financing Constraints and Corporate Investment',
    idea: 'For constrained firms, real investment depends on internal cash flow.',
    connection: 'Supports the idea that being unable to fund inventory cuts output (Lesson 2-8).',
  },
  {
    cite: 'Opler, Pinkowitz, Stulz & Williamson (1999)',
    title: 'The Determinants and Implications of Corporate Cash Holdings',
    idea: 'Firms with volatile cash flow and strong growth options hold more cash.',
    connection: 'Empirical basis for cash buffers and PepsiCo holding a reserve (Lessons 2-4, 2-5).',
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
          <h3 className="font-display text-lg font-semibold">9 papers behind Module 2</h3>
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
