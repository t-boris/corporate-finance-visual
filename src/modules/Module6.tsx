import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { CreditRiskTree } from '@/components/CreditRiskTree'
import { CreditRatingLadder } from '@/components/CreditRatingLadder'
import { RatingVsLeverage } from '@/components/RatingVsLeverage'
import { DebtTypesMatrix } from '@/components/DebtTypesMatrix'
import { PayoutDilution } from '@/components/PayoutDilution'
import { PayoutScorecard } from '@/components/PayoutScorecard'

/**
 * Module 6 — Understanding Debt Financing and Payout Policy.
 * (Coursera "Corporate Finance II · Module 2", Almeida & Zeume.)
 *
 * Same summary-first layout as Modules 1–5: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with the full lecture prose behind a toggle), real-world
 * cases, a cheat-sheet, collapsible academic papers, and a quiz CTA. Page copy
 * is English; the Russian study notes live in the KnowledgeDB markdown file.
 */
export function Module6Content() {
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
            This module has two mirror-image halves. First, <strong>debt financing</strong> in detail: since firms dislike
            issuing equity, debt is the key external source — so we dig into what determines the{' '}
            <strong>yield to maturity</strong>, how it differs from the <strong>cost of debt</strong>,{' '}
            <strong>credit risk</strong> and <strong>credit ratings</strong>, the many types of debt, and the choice
            between <strong>bank and market</strong> financing.
          </p>
          <p>
            Second, the mirror image of raising cash: <strong>payout policy</strong> — how much cash to return to equity
            investors, when, and in what form (<strong>dividends</strong> vs. <strong>share repurchases</strong>). We
            debunk the dilution illusion, find the real reasons payout affects value (signaling, cash management), and
            settle the dividend-vs-buyback choice — ending on the <strong>dividend puzzle</strong>.
          </p>
          <KeyTakeaway>
            The single most useful idea: a <strong>credit rating</strong> is a summary measure of credit risk that
            sharpens the trade-off model, and on the payout side, both dividends and buybacks are MM zero-NPV — until
            signaling, taxes, and cash discipline break the tie.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="6-1" summary={SUMMARIES['6-1']} visuals={<CreditRiskTree />}>
        <LessonBlock eyebrow="6.1 · Bonds & credit risk" title="Yield to maturity is not the cost of debt">
          <p>
            April 2022: a 10-year US Treasury yielded <strong>2.4%</strong>, while a 10-year Kraft-Heinz bond yielded{' '}
            <strong>4.2%</strong>. The gap compensates investors for <strong>default risk</strong> — the US government is
            treated as risk-free, companies are not.
          </p>
          <Definition term="Yield to maturity (YTM)">
            The <em>promised</em> return on a bond, earned only if the issuer does not default. It is observable from the
            bond price but is <strong>not</strong> the expected return.
          </Definition>
          <p>
            Historical S&amp;P data give a 10-year cumulative default probability of <strong>5.3%</strong> for BBB (Kraft-Heinz
            is BBB−); its firm-specific annual default probability was about <strong>0.4%</strong>. If a bond defaults,
            bondholders still recover something:
          </p>
          <Definition term="Recovery rate">
            The fraction of face value recovered in default — historically ~<strong>40%</strong> for senior unsecured
            bonds. The return upon default is <strong>recovery − 1</strong> (40% recovery → −60%).
          </Definition>
          <Formula caption="Expected return on debt = the cost of debt used in the WACC">
            r_D = (1 − p)·YTM + p·(recovery − 1)
          </Formula>
          <p>
            <strong>Kraft-Heinz:</strong> r_D = 0.996×4.2% + 0.004×(−60%) = <strong>3.9%</strong>. For a riskier name,{' '}
            <strong>Tenet Healthcare</strong> (B+, YTM 6.0%, p 2.9%), r_D = <strong>4.1%</strong> — far below its YTM.
          </p>
          <CompareTable
            headers={['Company', 'Rating', 'YTM', 'Default p', 'Cost of debt r_D']}
            rows={[
              ['Kraft-Heinz', 'BBB−', '4.2%', '0.4%', '3.9%'],
              ['Tenet Healthcare', 'B+', '6.0%', '2.9%', '4.1%'],
            ]}
          />
          <KeyTakeaway>
            After adjusting for default, differences in the cost of debt are far smaller than differences in YTM. Rule of
            thumb: adjust whenever the rating is <strong>below A</strong>; otherwise r_D ≈ YTM.
          </KeyTakeaway>
          <p>
            When only a 10-year bond exists, use the <strong>spread method</strong>: Kraft-Heinz&apos;s 10-year spread over
            Treasuries was 3.9% − 2.4% = <strong>1.5%</strong>; applied to the 30-year Treasury (2.5%) it gives a 30-year
            cost of debt of <strong>4.0%</strong>. With no traded debt at all, add a 1–2% spread to the risk-free rate
            (wider for lower ratings).
          </p>
          <Pitfall>
            Plugging the YTM straight into the WACC for a junk issuer overstates the cost of capital. The WACC needs the
            <strong> expected</strong> return r_D, not the promised YTM.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-2 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="6-2"
        summary={SUMMARIES['6-2']}
        visuals={<div className="space-y-4"><CreditRatingLadder /><RatingVsLeverage /></div>}
      >
        <LessonBlock eyebrow="6.2 · Credit ratings" title="A summary measure of credit risk">
          <Definition term="Credit rating">
            An agency opinion (S&amp;P, Moody&apos;s, Fitch) on an issuer&apos;s ability and willingness to meet its
            obligations in full and on time — a <strong>summary measure of credit risk</strong>. On the S&amp;P scale, AAA
            is highest and D means default.
          </Definition>
          <p>
            The pivotal break is between <strong>BBB−</strong> (last investment grade) and <strong>BB+</strong> (first
            junk). Ratings depend on more than leverage: regressions show higher <strong>profitability (ROA)</strong>,{' '}
            <strong>size</strong>, and lower <strong>leverage</strong> and <strong>cash-flow risk</strong> all raise the
            rating. The median US public firm (30% leverage) is about <strong>BBB</strong>.
          </p>
          <p>
            How a manager uses it — two firms at nearly the same leverage, opposite conclusions:
          </p>
          <CompareTable
            headers={['Firm', 'Leverage', 'Rating', 'Read']}
            rows={[
              ['PepsiCo', '15%', 'A+', 'Underlevered — can add debt without losing value'],
              ['Twitter', '17%', 'BB+ (junk)', 'Overlevered — growth firm, profits in the future'],
            ]}
          />
          <KeyTakeaway>
            The rating reveals the firm-specific optimum that raw leverage hides. PepsiCo&apos;s A+ at 15% says it sits
            <em> left</em> of its optimum; Twitter&apos;s junk rating at 17% says it sits <em>past</em> a much lower
            optimum.
          </KeyTakeaway>
          <p>
            Why do firms like PepsiCo stay underlevered on purpose? To protect a high rating, because a{' '}
            <strong>downgrade</strong> is costly: it can cut off the <strong>commercial-paper</strong> market, raise bank
            credit-line costs, trip <strong>rating triggers</strong> in covenants, and — crucially — insurers (big bond
            buyers) cannot hold bonds below BBB−. So managers target a <strong>rating</strong>, not just a leverage ratio.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-3 ─────────────────────────────────────────────────────── */}
      <LessonSection id="6-3" summary={SUMMARIES['6-3']}>
        <LessonBlock eyebrow="6.3 · Types of debt" title="Debt has many faces (Walmart)">
          <p>
            Real firms mix several debt instruments. Walmart is the example:
          </p>
          <CompareTable
            headers={['Instrument', 'What it is', 'Maturity / security']}
            rows={[
              ['Commercial paper', 'Short-term, sold direct to market, high-rated only (8% of Walmart)', 'Short · unsecured'],
              ['Revolving credit', 'Drawdown of a bank credit line (Walmart line $9.4B, undrawn)', 'Liquidity insurance'],
              ['Term loan', 'Standard bank loan, not from a credit line (none at Walmart)', 'Varies · usually secured'],
              ['Bonds', 'Issued direct to market, no bank (62% of Walmart)', 'Long · usually unsecured'],
              ['Leases', 'Future rental liability tied to an asset ($14.3B op. + $6.7B fin.)', 'Long · secured'],
            ]}
          />
          <Definition term="Secured vs. unsecured debt">
            <strong>Secured</strong> debt is backed by collateral (a specific asset or carved-out cash flows); the lender
            has priority over it in default. <strong>Unsecured</strong> debt is honored out of the firm&apos;s overall
            cash flows. Bonds and commercial paper are almost always unsecured; leases are secured by the leased asset.
          </Definition>
          <p>
            Two reporting notes: <strong>operating leases</strong> became debt on the balance sheet only after the{' '}
            <strong>2018</strong> accounting change (finance leases always were), and a bond differs from a lease in that
            a lease is tied to a <strong>specific asset</strong> while a bond is paid from the whole business.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-4 ─────────────────────────────────────────────────────── */}
      <LessonSection id="6-4" summary={SUMMARIES['6-4']} visuals={<DebtTypesMatrix />}>
        <LessonBlock eyebrow="6.4 · Bank or market?" title="The defining choice for a debt manager">
          <p>
            Banks and bonds are ~95% of US corporate debt. Compare <strong>Walmart</strong> (~$785B, AA, relies on bonds)
            with <strong>Pricemark</strong> (~$3B, pseudo-rated BB−, relies on bank term loans). Three forces explain the
            split:
          </p>
          <p>
            <strong>1. Fixed costs.</strong> Issuing bonds means SEC registration, underwriting, and buying a rating —
            largely fixed costs that hurt a $130M borrower far more than a $42B one.
          </p>
          <p>
            <strong>2. Collateral &amp; recovery.</strong> Bank debt is typically <strong>secured</strong>, so recovery is
            high (&gt;80%) vs. ~40% for senior unsecured bonds — making bank debt safer for the lender.
          </p>
          <Definition term="Covenant & technical default">
            A <strong>covenant</strong> is a condition the borrower must maintain (e.g. EBITDA above a threshold). Banks
            set it above interest due, so a breach triggers a <strong>technical default</strong> — control passes to the
            bank <em>before</em> insolvency, which raises recovery.
          </Definition>
          <p>
            <strong>3. Control.</strong> Bank debt&apos;s lower rate comes at the cost of collateral and covenants —
            control the firm gives up. The paradox: Pricemark pays ~8% to a bank while Walmart pays ~5% on bonds, but only
            because Pricemark is <em>riskier to begin with</em>, not because bank debt is dear.
          </p>
          <KeyTakeaway>
            Bank financing suits small, young, risky firms; bonds suit large, mature, high-rated firms. Walmart keeps
            arm&apos;s-length bonds precisely because its rating is already AA — the rate saving from a bank is small and
            the loss of control is not worth it.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-5 ─────────────────────────────────────────────────────── */}
      <LessonSection id="6-5" summary={SUMMARIES['6-5']} visuals={<PayoutDilution />}>
        <LessonBlock eyebrow="6.5 · Payout & value" title="Dilution is an illusion (again)">
          <Definition term="Payout policy">
            How a firm returns cash to <strong>equity</strong> investors — via dividends and share repurchases (buybacks
            are the same thing). Payments to debt investors are not &ldquo;policy&rdquo; because they are required.
          </Definition>
          <p>
            The common claim &ldquo;a buyback raises the price because there are fewer shares&rdquo; is wrong. With equity
            value $80,000 (1,000 shares × $80), repurchasing 100 shares at the market price spends $8,000, so the new
            price is (80,000 − 8,000)/900 = <strong>$80</strong> — unchanged.
          </p>
          <Formula caption="Repurchase at the market price → NPV = 0">
            P_new = (Equity value − Cash spent) / (Shares − Repurchased) = unchanged
          </Formula>
          <p>
            The same logic applies to dividends: doubling the dividend just moves cash from the firm&apos;s pocket to the
            shareholder&apos;s pocket — <strong>NPV = 0</strong> under Modigliani–Miller. But the data disagree:
          </p>
          <CompareTable
            headers={['Event', 'Average 3-day price reaction']}
            rows={[
              ['Large dividend increase', '+1.32%'],
              ['Dividend initiation', '+3.4%'],
              ['Dividend omission', '−7%'],
              ['Repurchase announcement', '+1.54%'],
            ]}
          />
          <KeyTakeaway>
            Both dividends and buybacks <strong>raise</strong> prices on average — so payout is positive-NPV, not zero.
            The reason is not arithmetic; it is what payout <em>signals</em> and the discipline it imposes (next lesson).
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-6 ─────────────────────────────────────────────────────── */}
      <LessonSection id="6-6" summary={SUMMARIES['6-6']}>
        <LessonBlock eyebrow="6.6 · Why pay out?" title="Taxes, signaling, cash management">
          <p>
            <strong>Taxes are a cost, not a benefit.</strong> A $4B dividend at a 20% rate sends $800M to the government.
            If only taxes mattered, the optimal policy would be to <em>never</em> pay out and defer the tax forever — so
            taxes cannot explain why firms pay out.
          </p>
          <Definition term="Signaling">
            Raising a dividend or buying back stock spends cash, so it signals management&apos;s <strong>confidence in
            future cash flows</strong>. A firm generating $2B/year that doubles its dividend to go cash-negative is telling
            the market it expects higher future cash flows.
          </Definition>
          <Definition term="Cash management (free-cash-flow problem)">
            Letting cash pile up invites <strong>value-destroying acquisitions</strong> and sloppy spending — each dollar
            of excess cash destroys about <strong>$0.07</strong> of value. Paying it out imposes discipline.
          </Definition>
          <KeyTakeaway>
            The real benefits of payout are <strong>signaling</strong> and <strong>cash discipline</strong>, not taxes.
            Payout can be positive-NPV when it stops managers from making negative-NPV investments.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 6-7 ─────────────────────────────────────────────────────── */}
      <LessonSection id="6-7" summary={SUMMARIES['6-7']} visuals={<PayoutScorecard />}>
        <LessonBlock eyebrow="6.7 · Dividends or buybacks?" title="The horse race and the dividend puzzle">
          <p>
            <strong>Taxes →</strong> repurchases win: only sellers are taxed, on the gain above cost basis; a dividend
            taxes all holders. <strong>Signaling →</strong> a tie: buybacks additionally signal undervaluation (buying
            your own &ldquo;cheap&rdquo; stock), dividends signal stability via the expectation of continuation.
          </p>
          <Definition term="EPS management (repurchases only)">
            Since EPS = net income / shares, a buyback mechanically raises EPS while a dividend changes neither. About{' '}
            <strong>37%</strong> of repurchases come from firms about to <em>just miss</em> the analyst EPS forecast — more
            so when CEO pay is tied to EPS, hinting at an agency problem.
          </Definition>
          <Formula caption="EPS after a cash-funded buyback (forgone interest lowers NI)">
            EPS = (Net income − forgone interest) / (Shares − Repurchased)
          </Formula>
          <p>
            Worked example: net income 2,500 over 1,000 shares (EPS 2.50); buy back 40 shares, net income falls to 2,450
            → EPS = 2,450/960 = <strong>2.55</strong>. <strong>Flexibility →</strong> repurchases win (a one-off creates no
            expectation; dividends are sticky and punished ~−7% if cut).
          </p>
          <p>
            Since the SEC&apos;s 1982 <strong>Rule 10b-18</strong> safe harbor (which removed insider-trading risk),
            repurchases have overtaken dividends as the main payout method.
          </p>
          <Pitfall>
            EPS &ldquo;management&rdquo; is a pseudo-benefit — EPS shouldn&apos;t drive value — but hitting the analyst
            target empirically matters, so it can still motivate buybacks.
          </Pitfall>
          <Definition term="The dividend puzzle">
            Repurchases win or tie on every dimension, yet firms still pay large dividends. Likely reasons: a behavioral
            preference for &ldquo;real&rdquo; cash, dividends&apos; stronger stability signal, and CFOs&apos; fear of being
            blamed for buying back at a high price.
          </Definition>
        </LessonBlock>
      </LessonSection>

      {/* REAL-WORLD CASE ──────────────────────────────────────────────── */}
      <LessonSection id="cases" summary={SUMMARIES.cases}>
        <LessonBlock eyebrow="Live session" title="Meta's $40B buyback — four possible drivers">
          <CaseStudy title="Meta (Feb 1, 2023): a $40B repurchase authorization">
            <p>
              On its Q4-2022 earnings call Meta raised its buyback authorization by <strong>$40B</strong> (to $149B). It
              missed EPS (<strong>$1.76</strong> vs. the <strong>$2.22</strong> expected, on a surprise $4.2B
              restructuring charge), yet the stock jumped <strong>~20–25%</strong> that day. What drove the buyback?
            </p>
            <p>
              <strong>1. Cash management?</strong> Cash ≈ $41B vs. the $40B buyback, with operations generating ~$50B and
              ~$9B of net debt issued in 2022. Takeaway: no <em>excess</em> cash — buybacks were funded by operating cash
              flow. <strong>2. Signaling?</strong> Mild undervaluation (justified price ≈ $155) plus confidence in future
              results.
            </p>
            <p>
              <strong>3. EPS management?</strong> Meta actually missed EPS and investors shrugged — so EPS management was{' '}
              <em>not</em> the 2023 driver. <strong>4. Optimal capital structure?</strong> Leverage was only{' '}
              <strong>~5.3%</strong> with an <strong>AA−</strong> rating — far below the ~30% median, so Meta looked{' '}
              <strong>underlevered</strong>; funding buybacks with some debt could move it toward its optimum and raise
              value.
            </p>
          </CaseStudy>
          <CaseStudy title="The 2024 epilogue — and the dividend puzzle">
            <p>
              Meta stayed hugely profitable (~$70B operating cash flow in 2023; cash + ST investments up to ~$65B) and
              repurchased ~<strong>$30B</strong> of stock in 2023. In early 2024 it beat Q4-2023 forecasts and announced a
              new <strong>$50B</strong> buyback <em>plus</em> its <strong>first-ever dividend ($5B)</strong>; the stock
              rose <strong>~17%</strong>.
            </p>
            <p>
              Why initiate a dividend at all, when repurchases are more efficient? That is the <strong>dividend
              puzzle</strong> in the flesh — a signal of maturity and stability, and a way to broaden the investor base.
            </p>
          </CaseStudy>
        </LessonBlock>
      </LessonSection>

      {/* REVIEW ────────────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review}>
        <LessonBlock eyebrow="Module 6 · Review" title="What you should walk away with">
          <p>
            On debt: the <strong>YTM</strong> is a promised return, but the WACC needs the expected{' '}
            <strong>cost of debt r_D</strong>, found by adjusting for default probability and recovery. A{' '}
            <strong>credit rating</strong> summarizes credit risk and sharpens the trade-off model (PepsiCo underlevered,
            Twitter overlevered). Debt comes in many forms, and the <strong>bank-vs-bond</strong> choice trades a lower
            rate for lost control. On payout: <strong>dilution is an illusion</strong> and MM makes payout zero-NPV, but{' '}
            <strong>signaling</strong> and <strong>cash discipline</strong> make it positive-NPV in practice.{' '}
            <strong>Repurchases</strong> beat dividends on taxes, EPS, and flexibility — yet dividends persist (the{' '}
            <strong>dividend puzzle</strong>).
          </p>
        </LessonBlock>
      </LessonSection>

      {/* CHEAT-SHEET ───────────────────────────────────────────────────── */}
      <section id="lesson-cheat" className="scroll-mt-32 card p-6">
        <div className="text-[11px] uppercase tracking-widest text-brand-300 mb-1">Reference</div>
        <h2 className="font-display text-2xl font-semibold leading-tight mb-4">Formula cheat-sheet</h2>
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

      {/* PAPERS ─────────────────────────────────────────────────────────── */}
      <PapersSection />

      {/* QUIZ CTA ──────────────────────────────────────────────────────── */}
      <section className="card p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 bg-brand-500" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="text-brand-400" />
            <div>
              <h4 className="font-display text-lg font-semibold">Ready to test yourself?</h4>
              <p className="text-sm text-ink-muted">20 questions for Module 6 · 4 easy · 12 medium · 4 hard.</p>
            </div>
          </div>
          <Link to="/quiz?module=6" className="btn-primary">
            <BookOpen size={16} /> Start Module 6 quiz <ArrowRight size={16} />
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
  { id: '6-1',    label: '6·1 Bonds & r_D' },
  { id: '6-2',    label: '6·2 Ratings' },
  { id: '6-3',    label: '6·3 Debt types' },
  { id: '6-4',    label: '6·4 Bank vs bond' },
  { id: '6-5',    label: '6·5 Payout & value' },
  { id: '6-6',    label: '6·6 Why pay out' },
  { id: '6-7',    label: '6·7 Div vs buyback' },
  { id: 'cases',  label: 'Meta case' },
  { id: 'review', label: 'Review' },
  { id: 'cheat',  label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 6 · Overview',
    title: 'Understanding Debt Financing and Payout Policy',
    tldr: (
      <>
        Two mirror images: <strong>debt financing</strong> (YTM, credit risk, ratings, bank vs. bond) and{' '}
        <strong>payout</strong> (dividends vs. buybacks). A <strong>rating</strong> sharpens the trade-off; payout is
        MM zero-NPV until signaling and cash discipline break the tie.
      </>
    ),
    keyPoints: [
      <>Debt: YTM ≠ cost of debt; ratings summarize credit risk; bank vs. bond trades rate for control.</>,
      <>Payout: dilution is an illusion; real drivers are signaling and cash management.</>,
      <>Repurchases beat dividends on taxes, EPS, flexibility — yet the dividend puzzle persists.</>,
    ],
  },

  '6-1': {
    eyebrow: 'Lesson 6-1',
    title: 'Bonds, credit risk, and the cost of debt',
    tldr: (
      <>
        The <strong>YTM</strong> is a promised return; the WACC needs the expected <strong>cost of debt</strong>,
        r_D = (1−p)·YTM + p·(recovery−1). Kraft-Heinz 4.2%→3.9%; Tenet 6.0%→4.1%.
      </>
    ),
    keyPoints: [
      <>YTM compensates for default risk; Treasuries are the risk-free benchmark.</>,
      <>Recovery ~40% for senior unsecured bonds → return on default = recovery − 1.</>,
      <>Adjust YTM → r_D whenever the rating is below A; else r_D ≈ YTM.</>,
      <>Spread method matches maturity / handles firms with no traded debt (spread 1–2%).</>,
    ],
    formulas: [
      { label: 'Cost of debt', expr: 'r_D = (1−p)·YTM + p·(recovery−1)' },
      { label: 'Spread method', expr: 'r_D ≈ risk-free + 1–2%' },
    ],
  },

  '6-2': {
    eyebrow: 'Lesson 6-2',
    title: 'Credit ratings',
    tldr: (
      <>
        A rating is a <strong>summary measure of credit risk</strong> (profitability, size, leverage, cash-flow risk).
        Same leverage, opposite verdict: PepsiCo (A+, 15%) underlevered; Twitter (BB+, 17%) overlevered.
      </>
    ),
    keyPoints: [
      <>Investment grade ≥ BBB−; BB+ and below is junk — a pivotal cutoff.</>,
      <>Median US firm (30% leverage) ≈ BBB.</>,
      <>The rating reveals the firm-specific L* that raw leverage hides.</>,
      <>Firms target ratings: downgrades cut CP access, raise rates, trip triggers; insurers shun sub-BBB−.</>,
    ],
  },

  '6-3': {
    eyebrow: 'Lesson 6-3',
    title: 'The many types of debt',
    tldr: (
      <>
        Walmart mixes <strong>commercial paper</strong> (8%), <strong>bonds</strong> (62%), and <strong>leases</strong>,
        with a $9.4B undrawn credit line as liquidity insurance. Bonds unsecured; leases secured.
      </>
    ),
    keyPoints: [
      <>Commercial paper: short-term, direct-to-market, high-rated only.</>,
      <>Revolving credit = drawn credit line; undrawn line = insurance.</>,
      <>Operating leases became balance-sheet debt only after the 2018 rule change.</>,
      <>Bonds are paid from the whole business; leases are tied to a specific asset.</>,
    ],
  },

  '6-4': {
    eyebrow: 'Lesson 6-4',
    title: 'Bank or market financing?',
    tldr: (
      <>
        Walmart (AA) uses <strong>bonds</strong>; Pricemark (BB−) uses <strong>bank loans</strong>. Bank debt is
        secured with covenants → higher recovery, lower rate, but less control.
      </>
    ),
    keyPoints: [
      <>Fixed bond costs (SEC, underwriting, rating) hurt small issuers.</>,
      <>Recovery: secured bank debt &gt;80% vs. senior unsecured bonds ~40%.</>,
      <>Covenants → technical default → bank control before insolvency.</>,
      <>Banks suit small/young/risky firms; bonds suit large/mature/high-rated firms.</>,
    ],
  },

  '6-5': {
    eyebrow: 'Lesson 6-5',
    title: 'Do dividends & buybacks affect value?',
    tldr: (
      <>
        <strong>Dilution is an illusion</strong>: a market-price buyback is zero-NPV (cash offsets fewer shares). MM makes
        dividends zero-NPV too — but data show prices rise (+1.32% / +1.54%).
      </>
    ),
    keyPoints: [
      <>$80,000 / 1,000 shares; buy 100 at $80 → still $80 (NPV = 0).</>,
      <>Dividends = moving cash pocket-to-pocket → MM zero-NPV.</>,
      <>Empirically: +1.32% dividend increase, +3.4% initiation, −7% omission, +1.54% buyback.</>,
    ],
    formulas: [{ label: 'Buyback price', expr: '(Equity − Cash) / (Shares − Repurchased)' }],
  },

  '6-6': {
    eyebrow: 'Lesson 6-6',
    title: 'Why companies pay out',
    tldr: (
      <>
        <strong>Taxes</strong> are a cost (defer forever if that were all). The real benefits are{' '}
        <strong>signaling</strong> future cash flows and <strong>cash management</strong> (excess cash destroys ~$0.07/$).
      </>
    ),
    keyPoints: [
      <>A $4B dividend at 20% sends $800M to the government — payout is taxed.</>,
      <>Spending cash signals confidence in future cash flows.</>,
      <>Excess cash funds value-destroying M&amp;A; payout imposes discipline.</>,
    ],
  },

  '6-7': {
    eyebrow: 'Lesson 6-7',
    title: 'Dividends or repurchases?',
    tldr: (
      <>
        Repurchases win on <strong>taxes</strong>, <strong>EPS</strong>, and <strong>flexibility</strong>; signaling is a
        tie. Since <strong>Rule 10b-18 (1982)</strong> buybacks overtook dividends — yet the dividend puzzle remains.
      </>
    ),
    keyPoints: [
      <>Taxes: only sellers taxed, on gain over cost basis → repurchases win.</>,
      <>EPS: buybacks lift EPS; 37% come from firms about to miss the target.</>,
      <>EPS after buyback example: 2,450 / 960 = 2.55.</>,
      <>Dividend puzzle: behavioral preference, stability signal, fear of buying high.</>,
    ],
    formulas: [{ label: 'EPS post-buyback', expr: '(NI − forgone interest) / (Shares − Repurchased)' }],
  },

  cases: {
    eyebrow: 'Live session',
    title: 'Meta’s $40B buyback (2023) & 2024 dividend',
    tldr: (
      <>
        Feb 2023: <strong>$40B</strong> buyback, EPS missed ($1.76 vs $2.22), stock +~20%. Drivers: cash-flow
        management + signaling + underleverage (AA−, ~5%). 2024: $50B buyback + first dividend.
      </>
    ),
    keyPoints: [
      <>No excess cash — buybacks funded by ~$50B operating cash flow.</>,
      <>EPS management was NOT the driver (Meta missed EPS, stock still rose).</>,
      <>Underlevered at ~5% with AA− → debt-funded buybacks could raise value.</>,
      <>2024: $50B buyback + first-ever $5B dividend → the dividend puzzle live.</>,
    ],
  },

  review: {
    eyebrow: 'Module 6 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        YTM → cost of debt; ratings sharpen the trade-off; bank vs. bond trades rate for control. Payout is MM zero-NPV
        but positive-NPV via signaling and cash discipline; repurchases beat dividends — yet dividends persist.
      </>
    ),
    keyPoints: [
      <>r_D = (1−p)·YTM + p·(recovery−1); adjust below rating A.</>,
      <>Rating = summary credit risk → PepsiCo underlevered, Twitter overlevered.</>,
      <>Dilution is an illusion; real payout drivers are signaling & cash management.</>,
      <>Repurchases win on taxes/EPS/flexibility; dividend puzzle remains.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Cost of debt',       formula: 'r_D = (1−p)·YTM + p·(recovery−1)', hint: 'expected return; used in WACC' },
  { name: 'Return on default',  formula: 'recovery − 1',                     hint: '40% recovery → −60%' },
  { name: 'Kraft-Heinz r_D',    formula: '0.996·4.2% + 0.004·(−60%)',        hint: '= 3.9%' },
  { name: 'Spread method',      formula: 'r_D ≈ risk-free + 1–2%',           hint: 'wider for lower ratings' },
  { name: 'Interest coverage',  formula: 'EBIT / Interest',                  hint: 'higher → better rating' },
  { name: 'Investment grade',   formula: '≥ BBB−',                           hint: 'BB+ and below = junk' },
  { name: 'Recovery (bank)',    formula: '> 80% secured',                    hint: 'vs ~40% senior unsecured bonds' },
  { name: 'Buyback price',      formula: '(Equity − Cash) / (Shares − n)',   hint: 'at market → unchanged' },
  { name: 'EPS post-buyback',   formula: '(NI − forgone int.) / (Shares − n)', hint: 'e.g. 2450/960 = 2.55' },
  { name: 'Dividend tax',       formula: 'Dividend × (1 − 20%)',             hint: '$4B → $3.2B; $0.8B to gov.' },
  { name: 'Excess-cash cost',   formula: '≈ $0.07 lost per $1',              hint: 'free-cash-flow problem' },
  { name: 'Median leverage',    formula: 'L ≈ 30% → ~BBB',                   hint: 'rating benchmark' },
]

const PAPERS = [
  {
    cite: 'Merton (1974)',
    title: 'On the Pricing of Corporate Debt: The Risk Structure of Interest Rates',
    idea: 'Structural credit-risk model: risky debt = risk-free debt minus a put on the firm’s assets; the yield spread compensates for default.',
    connection: 'Why YTM ≠ expected return (the cost-of-debt adjustment in Lesson 6-1).',
  },
  {
    cite: 'Altman (1968)',
    title: 'Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy',
    idea: 'The Z-score predicts default from financial ratios — the ancestor of quantitative rating models.',
    connection: 'Determinants of credit ratings (Lesson 6-2).',
  },
  {
    cite: 'Diamond (1991)',
    title: 'Monitoring and Reputation: The Choice between Bank Loans and Directly Placed Debt',
    idea: 'Young, risky firms borrow from banks (monitoring); mature firms with reputation move to bond markets.',
    connection: 'The Walmart-vs-Pricemark timeline (Lesson 6-4).',
  },
  {
    cite: 'Rajan (1992)',
    title: 'Insiders and Outsiders: The Choice between Informed and Arm’s-Length Debt',
    idea: 'Bank (informed) debt gives control and flexibility but extracts rents; bonds are arm’s-length.',
    connection: 'The rate-vs-control trade-off (Lesson 6-4).',
  },
  {
    cite: 'Miller & Modigliani (1961)',
    title: 'Dividend Policy, Growth and the Valuation of Shares',
    idea: 'Under ideal markets dividend policy is irrelevant — payout is zero-NPV.',
    connection: 'The MM benchmark for Lesson 6-5 (dilution illusion).',
  },
  {
    cite: 'Benartzi, Michaely & Thaler (1997)',
    title: 'Do Changes in Dividends Signal the Future or the Past?',
    idea: 'Documents the price reactions to dividend changes (+1.32% increase, +3.4% initiation, −7% omission).',
    connection: 'The empirical reactions in Lesson 6-5.',
  },
  {
    cite: 'Miller & Rock (1985)',
    title: 'Dividend Policy under Asymmetric Information',
    idea: 'Dividends convey private information about earnings — a formal signaling model.',
    connection: 'The signaling motive (Lesson 6-6).',
  },
  {
    cite: 'Jensen (1986)',
    title: 'Agency Costs of Free Cash Flow, Corporate Finance, and Takeovers',
    idea: 'Excess cash invites empire-building and value-destroying acquisitions; payout disciplines managers.',
    connection: 'The cash-management argument and the ~$0.07/$ figure (Lesson 6-6).',
  },
  {
    cite: 'Almeida, Fos & Kronlund (2016)',
    title: 'The Real Effects of Share Repurchases',
    idea: '~37% of buybacks come from firms about to just miss the EPS forecast, more so under EPS-linked CEO pay.',
    connection: 'EPS management (Lesson 6-7) — by the course instructor.',
  },
  {
    cite: 'Brav, Graham, Harvey & Michaely (2005)',
    title: 'Payout Policy in the 21st Century',
    idea: 'CFO survey: flexibility and the stickiness of dividends drive payout; repurchases are rising.',
    connection: 'The horse race and dividend puzzle (Lesson 6-7).',
  },
  {
    cite: 'Grullon & Michaely (2002)',
    title: 'Dividends, Share Repurchases, and the Substitution Hypothesis',
    idea: 'Repurchases have substituted for dividends since the 1982 safe harbor.',
    connection: 'The rise of buybacks / Rule 10b-18 (Lesson 6-7).',
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
          <h3 className="font-display text-lg font-semibold">11 papers behind Module 6</h3>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-ink-muted">
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
