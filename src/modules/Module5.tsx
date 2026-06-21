import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { IssuanceMechanics } from '@/components/IssuanceMechanics'
import { DilutionIllusion } from '@/components/DilutionIllusion'
import { LeverageBeta } from '@/components/LeverageBeta'
import { MMWaccIllusion } from '@/components/MMWaccIllusion'
import { PeckingOrder } from '@/components/PeckingOrder'
import { LeverageTaxShield } from '@/components/LeverageTaxShield'
import { TradeoffCurve } from '@/components/TradeoffCurve'

/**
 * Module 5 — Raising Financing: The Capital Structure Decision.
 * (Coursera "Corporate Finance II · Module 1", Almeida & Zeume.)
 *
 * Same summary-first layout as Modules 1–4: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with the full lecture prose behind a toggle), real-world
 * cases, a cheat-sheet, collapsible academic papers, and a quiz CTA. Page copy
 * is English; the Russian study notes live in the KnowledgeDB markdown file.
 */
export function Module5Content() {
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
            Corporate Finance I was about <em>spending</em> cash (NPV, IRR, cost of capital). This module is about{' '}
            <strong>raising</strong> it. The most basic question: should a firm fund new investment by{' '}
            <strong>issuing debt</strong> (a loan or a bond) or by <strong>issuing equity</strong> (selling shares)?
          </p>
          <p>
            We run the whole module on one example — <strong>PepsiCo</strong>, which needs to raise about{' '}
            <strong>$7B</strong> to fund a 2022–2023 expansion. We will see how each choice hits the financial
            statements, why both have <strong>zero NPV</strong> when fairly priced, two famous misconceptions that lead
            to <strong>Modigliani–Miller</strong>, the empirical <strong>pecking order</strong>, and finally the{' '}
            <strong>trade-off theory</strong> that pins down an optimal leverage ratio.
          </p>
          <KeyTakeaway>
            Debt looks cheaper and raises after-tax profit (OPAT), but it also raises risk and the chance of financial
            distress. Capital structure is the balance between those two forces.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="5-1" summary={SUMMARIES['5-1']} visuals={<IssuanceMechanics />}>
        <LessonBlock eyebrow="5.1 · Mechanics" title="How debt and equity issuance hit the statements">
          <p>
            PepsiCo plans capex of <strong>$5B (2022)</strong> and <strong>$8B (2023)</strong>. Its own cash almost
            covers this (change in cash ≈ <strong>−$2.9B</strong> by end-2023), but it does not want to drain its
            buffer, so it raises about <strong>$7B</strong> of new financing (a little extra, as a precaution).
          </p>
          <Definition term="Debt issuance">
            Borrow cash now in exchange for fixed interest and repayment of principal. A $7B issue at 4% adds{' '}
            <strong>$280M</strong> of interest per year.
          </Definition>
          <p>
            <strong>Debt.</strong> The income statement gains <strong>$280M</strong> of interest expense, so earnings
            fall (EBIT is unchanged). On the cash flow statement, <em>net borrowing</em> brings <strong>+$7B</strong>{' '}
            into financing, leaving a positive change in cash (≈ +$6.9B in 2022).
          </p>
          <Definition term="Equity issuance">
            Sell new shares; the firm gets cash and buyers become owners. At <strong>$173</strong>/share, $7B means{' '}
            <strong>40.46M</strong> new shares ($7B / $173).
          </Definition>
          <p>
            <strong>Equity.</strong> The income statement does <em>not</em> change — there is no interest on stock, so
            earnings are identical. The cash flow statement shows <em>net stock issuance</em> of <strong>+$7B</strong>.
            The cost is simply that there are now more shares: the same profit is split among more owners.
          </p>
          <Pitfall>
            The cost of equity is <em>not</em> higher dividends. Dividends are a separate payout decision (a constant
            fraction of earnings in the model), covered in Module 6 — issuing equity does not force a dividend increase.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-2 ─────────────────────────────────────────────────────── */}
      <LessonSection id="5-2" summary={SUMMARIES['5-2']}>
        <LessonBlock eyebrow="5.2 · NPV of issuance" title="Both debt and equity issuance have NPV ≈ 0">
          <p>
            We pick the option with higher NPV. <strong>Debt:</strong> the benefit is +$7B today; the cost is $280M of
            interest per year plus repayment. The right discount rate is the <strong>yield to maturity</strong> (4%),
            which is also the expected return on the bond. Discounting the obligations at 4% gives{' '}
            <strong>NPV = 0</strong> — the present value of the cost exactly offsets the cash received.
          </p>
          <Formula caption="If debt is fairly priced (interest rate = required return)">
            NPV(debt) = +7000 − PV(interest) − PV(principal) = 0
          </Formula>
          <p>
            <strong>Equity:</strong> maximizing NPV = maximizing the stock price. The old price is{' '}
            $239.6B / 1.383B = <strong>$173</strong>. After issuing, the cash adds $7B to market cap and shares rise by
            40.46M:
          </p>
          <Formula caption="New cash exactly offsets the new shares → price unchanged">
            P_new = (239.6B + 7B) / (1.383B + 0.04046B) = $173
          </Formula>
          <p>
            The price is unchanged, so <strong>NPV of equity issuance ≈ 0</strong> too. And we deliberately ignore the
            NPV of the underlying investment: it is the <strong>same</strong> whether funded by debt or equity, so it is
            non-incremental to the debt-vs-equity choice.
          </p>
          <KeyTakeaway>
            Under efficient markets both issuances are zero-NPV. That feels like &ldquo;it doesn&apos;t matter&rdquo; —
            but taxes and distress costs (coming up) will break the tie.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-3 ─────────────────────────────────────────────────────── */}
      <LessonSection
        id="5-3"
        summary={SUMMARIES['5-3']}
        visuals={<div className="space-y-4"><DilutionIllusion /><LeverageBeta /><MMWaccIllusion /></div>}
      >
        <LessonBlock eyebrow="5.3 · Two misconceptions" title="Dilution is an illusion; debt is not mechanically cheaper">
          <p>
            <strong>Misconception 1 — dilution.</strong> &ldquo;Issuing equity lowers the price because shares go
            up.&rdquo; Wrong: the firm also receives cash, so the market value of equity rises too. Price = value /
            shares; both numerator and denominator rise, and at a fair price the stock price is unchanged.
          </p>
          <KeyTakeaway>
            <strong>&ldquo;Dilution is an illusion.&rdquo;</strong> The argument is as common as it is wrong — unless
            shares are sold <em>below</em> the fair price (real dilution; see the Ruth&apos;s case below).
          </KeyTakeaway>
          <p>
            <strong>Misconception 2 — &ldquo;debt is cheaper.&rdquo;</strong> After-tax debt costs 4%×(1−21%) = 3.2%,
            equity 6%, so it looks like more debt lowers the WACC. Mechanically raising leverage from 14% to 40% while
            holding r_E and r_D fixed seems to cut WACC from 5.6% to 4.9%. But that holds risk constant, which is wrong.
          </p>
          <CompareTable
            headers={['State', 'All-equity (value 45)', 'With 15 of debt (equity 30)']}
            rows={[
              ['Boom (p=0.75): payoff', '50 → +11%', '35 → +17%'],
              ['Bust (p=0.25): payoff', '30 → −33%', '15 → −50%'],
              ['Effect', 'baseline swings', 'bigger swings → higher beta'],
            ]}
          />
          <p>
            Debt amplifies the swings in equity value: the boom return rises but the bust return falls further. Greater
            fluctuation is more <strong>systematic risk</strong>, so beta — and the required return on equity — rise
            with leverage.
          </p>
          <Definition term="Modigliani–Miller (1958)">
            Under ideal conditions the firm&apos;s cost of capital (WACC) is <strong>independent of leverage</strong>.
            As leverage rises, r_E and r_D rise just enough to keep WACC constant (5.6% for PepsiCo regardless of L).
          </Definition>
          <p>
            The conditions are: (1) debt and equity are <strong>fairly priced</strong> (NPV of issuance = 0), and (2)
            no other frictions — in particular <strong>no interest tax deduction</strong> (which is why the no-tax M&amp;M
            drops the (1−T) term). M&amp;M is a benchmark, not literal reality, but it saves us from the mechanical
            mistake &ldquo;debt is cheaper, so issue debt.&rdquo;
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-4 ─────────────────────────────────────────────────────── */}
      <LessonSection id="5-4" summary={SUMMARIES['5-4']} visuals={<PeckingOrder />}>
        <LessonBlock eyebrow="5.4 · Evidence from the field" title="What firms actually prefer">
          <p>
            Does M&amp;M hold in practice? No — firms are not indifferent. To test it we use an{' '}
            <strong>event study</strong>: if issuance is zero-NPV, the stock-price reaction should be zero.
          </p>
          <CaseStudy title="Eckbo & Masulis (1995): the price reaction">
            <p>
              When firms issue <strong>bonds</strong>, the average stock-price reaction is ≈ <strong>0%</strong> —
              consistent with M&amp;M. When firms issue <strong>equity</strong>, the price falls on average by{' '}
              <strong>1.5%–3%</strong>. The market reads equity issuance as bad news.
            </p>
          </CaseStudy>
          <Definition term="Pecking order">
            Firms prefer <strong>internal funds first</strong>, then <strong>debt</strong>, and{' '}
            <strong>external equity last</strong>. In U.S. aggregates, internal funds are the largest source and net
            equity issuance is <strong>negative</strong> almost every year (firms repurchase more than they issue).
          </Definition>
          <p>
            Exceptions where equity <em>is</em> issued: large <strong>M&amp;A</strong> deals paid in stock,{' '}
            <strong>venture capital</strong>, <strong>IPOs</strong>, and special-situation <strong>SEOs</strong>. These
            are too small to overturn the pattern: <strong>debt is the preferred external source</strong>, which is why
            the rest of the course focuses on debt (pricing, collateral, credit ratings).
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-5 ─────────────────────────────────────────────────────── */}
      <LessonSection id="5-5" summary={SUMMARIES['5-5']} visuals={<LeverageTaxShield />}>
        <LessonBlock eyebrow="5.5 · Taxes & profits" title="Leverage raises OPAT (the benefit of debt)">
          <Definition term="OPAT — Operating Profit After Taxes">
            Profit to all capital providers (before interest). In FIN 570 it is{' '}
            <strong>EBIT − taxes (as reported)</strong> — taxes on the post-interest base, not re-grossed-up.
          </Definition>
          <p>
            Compare PepsiCo before and after the $7B debt issue. EBIT is unchanged at <strong>$13.044B</strong>;
            interest rises by $280M to $1.975B; this <em>lowers taxable income</em>, so taxes fall from $2.383B to{' '}
            <strong>$2.324B</strong> (−$49M). Therefore:
          </p>
          <CompareTable
            headers={['$ billions (Dec 2022)', 'Before debt', 'After +$7B debt']}
            rows={[
              ['EBIT', '13.044', '13.044'],
              ['Interest', '1.695', '1.975'],
              ['Taxes', '2.383', '2.324 (−0.049)'],
              ['Net income', '8.965', 'lower'],
              ['OPAT = EBIT − Taxes', '10.660', '10.719 (+0.049)'],
            ]}
          />
          <KeyTakeaway>
            <strong>Net income falls, but OPAT rises.</strong> Deductible interest takes money from the government. The
            course measures profitability with OPAT — so the firm is <em>more</em> profitable after issuing debt.
          </KeyTakeaway>
          <p>
            So why not issue maximum debt? If OPAT only rises with leverage, profitable firms should be almost all debt.
            But average U.S. leverage is ≈ <strong>30%</strong>, and it is <em>lower</em> for profitable firms. We are
            missing a hidden cost.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-6 ─────────────────────────────────────────────────────── */}
      <LessonSection id="5-6" summary={SUMMARIES['5-6']}>
        <LessonBlock eyebrow="5.6 · Financial distress" title="The hidden cost of debt">
          <Definition term="Financial distress">
            A high-leverage situation where the firm cannot comfortably meet its obligations out of operating income and
            must take costly actions. Usually triggered by <strong>poor performance</strong>, not voluntary
            over-borrowing.
          </Definition>
          <p>
            Imagine EBIT falls to ≈ <strong>$10B</strong> while interest is even higher. Taxes are zero (good) but there
            is a cash shortage. The firm&apos;s options are mostly bad: spend cash (if any), refinance (now at a high
            rate), issue distressed equity (large price drop), or cut dividends/investment (both lower the stock price).
          </p>
          <KeyTakeaway>
            Almost every escape route destroys value — that value loss <em>is</em> the cost of financial distress.
            Bankruptcy is just the extreme version; distress happens far more often.
          </KeyTakeaway>
          <CaseStudy title="How big are distress costs? (Andrade & Kaplan 1998)">
            <p>
              For firms that became distressed due to high leverage, value falls by{' '}
              <strong>10–25%</strong> relative to the year before distress — a sizable loss, not a rounding error.{' '}
              <strong>Red Lobster</strong> (PE-owned LBO, 2014) is a modern cautionary example of over-leverage.
            </p>
          </CaseStudy>
          <p>
            Higher leverage raises the <strong>probability</strong> of distress, so the <strong>expected</strong>{' '}
            distress cost rises with leverage. This is the force that offsets the tax benefit.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 5-7 ─────────────────────────────────────────────────────── */}
      <LessonSection id="5-7" summary={SUMMARIES['5-7']} visuals={<TradeoffCurve />}>
        <LessonBlock eyebrow="5.7 · Trade-off theory" title="Balancing the tax shield against distress">
          <Definition term="Trade-off theory">
            Optimal leverage balances the <strong>tax benefit of debt</strong> (raises value) against the{' '}
            <strong>expected costs of financial distress</strong> (lowers value). The value-maximizing leverage is{' '}
            <strong>L*</strong>, which also minimizes the WACC.
          </Definition>
          <Formula caption="Value as a function of leverage">
            V_L = V_U + PV(tax shield) − PV(distress costs)
          </Formula>
          <p>
            <strong>Korteweg</strong> estimates that for the median U.S. firm, L* ≈ <strong>30%</strong> (also the
            median observed leverage), and moving from zero to L* adds ≈ <strong>5%</strong> of value (a $1B firm gains
            ~$50M). But L* differs across firms:
          </p>
          <CompareTable
            headers={['Characteristic', 'Effect on L*', 'Why']}
            rows={[
              ['Cash-flow volatility ↑', 'L* ↓', 'higher chance of negative profits → distress'],
              ['Collateral / tangibility ↑', 'L* ↑', 'assets to sell → creditors lose less'],
              ['Size ↑', 'L* ↑', 'large firms weather distress more cheaply'],
              ['Profitability ↑', 'L* ↑', 'profits to shield → tax benefit exists'],
              ['Market-to-book / growth ↑', 'L* ↓', 'more to lose if bankrupt before realizing growth'],
            ]}
          />
          <Pitfall>
            There is <strong>no precise quantitative model</strong> of optimal leverage for every firm. The trade-off
            gives <em>qualitative</em> guidance: a risky firm with leverage below 30% may be optimally levered, not
            under-levered. Credit ratings (Module 6) sharpen this analysis.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* REAL-WORLD CASES ──────────────────────────────────────────────── */}
      <LessonSection id="cases" summary={SUMMARIES.cases}>
        <LessonBlock eyebrow="Live session" title="When firms DO issue equity">
          <CaseStudy title="Ruth's Chris (2020) — real dilution & signaling">
            <p>
              COVID-2020: Ruth&apos;s had drawn its credit line and had no access to bond markets or government
              programs, so equity was the best source. Before the SEO: equity value <strong>$262.2M</strong>,{' '}
              <strong>27.6M</strong> shares → price <strong>$9.50</strong>. Underwriter Jefferies issued{' '}
              <strong>5.6M</strong> shares (≈20% of shares) at <strong>$7.75</strong> (below market).
            </p>
            <p>
              Mechanically the price should fall to (262.2 + 43.4)/33.2 ≈ <strong>$9.2</strong> — this is{' '}
              <strong>real dilution</strong> from selling below market. But the price actually dropped to{' '}
              <strong>$7.50</strong> (a stronger <strong>signaling</strong> effect). Why issue anyway? Because the
              counterfactual — running out of cash — was worse; the firm later recovered (NPV &gt; 0 in context).
            </p>
          </CaseStudy>
          <CaseStudy title="AMC (2021) — window of opportunity">
            <p>
              Fundamental value ≤ <strong>$15</strong>/share; on 2 June 2021 the price spiked to{' '}
              <strong>$62.55</strong> on retail trading. On 3 June, AMC sold <strong>11.55M</strong> shares at{' '}
              <strong>$50.85</strong>, raising <strong>$587M</strong>. With 500M shares (fundamental equity $7.5B):
            </p>
            <Formula caption="Selling overvalued shares raises the fundamental price">
              P_new = ($7.5B + $587M) / (500M + 11.55M) ≈ $15.81
            </Formula>
            <p>
              The fundamental price <strong>rises</strong> (NPV &gt; 0 for existing holders): new shareholders overpay,
              old shareholders gain at their expense. <strong>Meta (2026)</strong> shows the flip side — a rumored $60B
              equity issue for AI data centers sent the stock down ~7–8%.
            </p>
          </CaseStudy>
        </LessonBlock>
      </LessonSection>

      {/* REVIEW ────────────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review}>
        <LessonBlock eyebrow="Module 5 · Review" title="What you should walk away with">
          <p>
            Debt and equity issuance change the statements differently but are both <strong>zero-NPV</strong> when
            fairly priced, so <strong>dilution is an illusion</strong> and debt does not{' '}
            <strong>mechanically</strong> lower the WACC (Modigliani–Miller). Empirically firms follow a{' '}
            <strong>pecking order</strong> and avoid equity (it drops the price). Debt&apos;s benefit is the{' '}
            <strong>tax shield</strong> (OPAT rises); its cost is the <strong>expected cost of financial distress</strong>.
            The <strong>trade-off theory</strong> balances the two to give an optimal leverage L* (≈ 30% for the median
            firm).
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
              <p className="text-sm text-ink-muted">20 questions for Module 5 · 4 easy · 12 medium · 4 hard.</p>
            </div>
          </div>
          <Link to="/quiz?module=5" className="btn-primary">
            <BookOpen size={16} /> Start Module 5 quiz <ArrowRight size={16} />
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
  { id: '5-1',    label: '5·1 Mechanics' },
  { id: '5-2',    label: '5·2 NPV = 0' },
  { id: '5-3',    label: '5·3 M&M' },
  { id: '5-4',    label: '5·4 Pecking order' },
  { id: '5-5',    label: '5·5 Tax shield' },
  { id: '5-6',    label: '5·6 Distress' },
  { id: '5-7',    label: '5·7 Trade-off' },
  { id: 'cases',  label: 'SEO cases' },
  { id: 'review', label: 'Review' },
  { id: 'cheat',  label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 5 · Overview',
    title: 'Raising Financing: The Capital Structure Decision',
    tldr: (
      <>
        Debt or equity? Run on <strong>PepsiCo&apos;s $7B</strong> raise. Both issuances are{' '}
        <strong>zero-NPV</strong>; debt raises <strong>OPAT</strong> (tax shield) but also{' '}
        <strong>distress risk</strong>. The <strong>trade-off theory</strong> finds the optimal mix.
      </>
    ),
    keyPoints: [
      <>Mechanics → NPV=0 → two misconceptions (M&amp;M) → pecking order → tax shield → distress → trade-off.</>,
      <>Dilution is an illusion; debt is not mechanically cheaper (Modigliani–Miller).</>,
      <>Firms prefer internal funds → debt → equity; equity issues drop the price.</>,
      <>L* ≈ 30% for the median firm; a ~5% value gain (Korteweg).</>,
    ],
  },

  '5-1': {
    eyebrow: 'Lesson 5-1',
    title: 'Mechanics of debt and equity issuance',
    tldr: (
      <>
        PepsiCo raises <strong>$7B</strong>. Debt adds <strong>$280M</strong> interest (4%) and lowers earnings; equity
        adds <strong>40.46M</strong> shares ($7B/$173) and leaves earnings untouched.
      </>
    ),
    keyPoints: [
      <>Debt: interest +$280M → earnings ↓; net borrowing +$7B → Δcash ≈ +$6.9B.</>,
      <>Equity: income statement unchanged; net stock issuance +$7B; +40.46M shares.</>,
      <>The cost of equity is more shares — NOT higher dividends (separate decision).</>,
    ],
    formulas: [
      { label: 'New interest', expr: 'Debt × rate = $7B × 4% = $280M' },
      { label: 'New shares', expr: 'Amount / price = $7B / $173 ≈ 40.46M' },
    ],
  },

  '5-2': {
    eyebrow: 'Lesson 5-2',
    title: 'NPV of issuing debt and equity',
    tldr: (
      <>
        With fair pricing both issuances are <strong>zero-NPV</strong>: cash in exactly offsets interest/principal (debt)
        or new shares (equity). The investment&apos;s NPV is non-incremental and ignored.
      </>
    ),
    keyPoints: [
      <>Discount debt at the yield to maturity (4%) → NPV = 0.</>,
      <>Equity: P_new = (239.6B+7B)/(1.383B+0.04046B) = $173 → NPV = 0.</>,
      <>NPV of the project is the same either way → drop it from the decision.</>,
    ],
    formulas: [
      { label: 'NPV(debt)', expr: '+Proceeds − PV(interest+principal) = 0' },
      { label: 'NPV(equity)', expr: 'ΔP = 0 at fair price' },
    ],
  },

  '5-3': {
    eyebrow: 'Lesson 5-3',
    title: 'Two misconceptions → Modigliani–Miller',
    tldr: (
      <>
        <strong>Dilution is an illusion</strong> (cash offsets new shares). <strong>Debt is not mechanically cheaper</strong>:
        leverage raises beta, so r_E and r_D rise. M&amp;M: WACC is independent of leverage.
      </>
    ),
    keyPoints: [
      <>Price = value/shares; both rise at a fair price → no dilution.</>,
      <>Boom/bust: debt turns +11%/−33% into +17%/−50% → higher beta.</>,
      <>Naïve WACC 5.6%→4.9% at L=40% is wrong (holds r_E, r_D fixed).</>,
      <>M&amp;M conditions: fair pricing + no frictions (no tax deduction).</>,
    ],
    formulas: [
      { label: 'Price', expr: 'Market value of equity / shares' },
      { label: 'M&M (no-tax)', expr: 'WACC constant in L' },
    ],
  },

  '5-4': {
    eyebrow: 'Lesson 5-4',
    title: 'Evidence: the pecking order',
    tldr: (
      <>
        Reaction to bonds ≈ <strong>0%</strong>; to equity <strong>−1.5% to −3%</strong> (Eckbo–Masulis). Firms prefer{' '}
        <strong>internal funds → debt → equity</strong>; net equity issuance is negative.
      </>
    ),
    keyPoints: [
      <>Event study: equity issuance is read as bad news.</>,
      <>Internal funds are the largest source; firms repurchase more equity than they issue.</>,
      <>Exceptions: M&amp;A, venture capital, IPOs, special SEOs.</>,
    ],
  },

  '5-5': {
    eyebrow: 'Lesson 5-5',
    title: 'Leverage, taxes and OPAT',
    tldr: (
      <>
        Debt is tax-deductible → taxes fall → <strong>OPAT rises</strong> (PepsiCo 10.66→10.72B, +$49M) even though net
        income falls. The benefit of debt.
      </>
    ),
    keyPoints: [
      <>OPAT = EBIT − taxes (FIN 570 convention: taxes as reported).</>,
      <>+$7B debt → +$280M interest → −$49M taxes → +$49M OPAT.</>,
      <>Puzzle: if OPAT only rises, why is average leverage ~30%? Hidden cost ahead.</>,
    ],
    formulas: [{ label: 'OPAT', expr: 'EBIT − Taxes (as reported)' }],
  },

  '5-6': {
    eyebrow: 'Lesson 5-6',
    title: 'Costs of financial distress',
    tldr: (
      <>
        High leverage + poor performance → distress: costly refinancing, distressed equity, dividend/investment cuts.
        Value loss <strong>10–25%</strong> (Andrade–Kaplan). The cost of debt.
      </>
    ),
    keyPoints: [
      <>Distress is usually triggered by poor performance, not over-borrowing.</>,
      <>Almost every escape route destroys value; bankruptcy is the extreme.</>,
      <>Higher leverage → higher probability and expected cost of distress.</>,
      <>Red Lobster (2014 LBO) — over-leverage cautionary case.</>,
    ],
  },

  '5-7': {
    eyebrow: 'Lesson 5-7',
    title: 'The trade-off theory and L*',
    tldr: (
      <>
        <strong>V_L = V_U + tax shield − distress costs.</strong> The peak is L*. Median firm L* ≈ <strong>30%</strong>,
        value gain ≈ <strong>5%</strong> (Korteweg). L* differs by firm characteristics.
      </>
    ),
    keyPoints: [
      <>Volatility ↓ L*; collateral, size, profitability ↑ L*; growth ↓ L*.</>,
      <>Unprofitable firms: no tax benefit → L* may be ~0.</>,
      <>No precise quantitative optimum — qualitative guidance only (credit ratings help).</>,
    ],
    formulas: [{ label: 'Trade-off', expr: 'V_L = V_U + PV(shield) − PV(distress)' }],
  },

  cases: {
    eyebrow: 'Live session',
    title: 'When firms do issue equity (SEOs)',
    tldr: (
      <>
        <strong>Ruth&apos;s 2020</strong>: real dilution ($9.5→$9.2 mechanically, then $7.5 on the signal).{' '}
        <strong>AMC 2021</strong>: window of opportunity ($15→$15.81 fundamentally).
      </>
    ),
    keyPoints: [
      <>Ruth&apos;s sold below market out of necessity → real dilution + signaling.</>,
      <>AMC sold overvalued shares → fundamental price rises; new holders overpay.</>,
      <>Meta 2026: rumored $60B equity for AI → stock down ~7–8%.</>,
    ],
    formulas: [{ label: 'SEO price', expr: '(equity value + cash) / (old + new shares)' }],
  },

  review: {
    eyebrow: 'Module 5 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        Both issuances are zero-NPV (dilution is an illusion; M&amp;M). Debt&apos;s benefit is the{' '}
        <strong>tax shield</strong>, its cost is <strong>financial distress</strong>; the{' '}
        <strong>trade-off theory</strong> sets L*.
      </>
    ),
    keyPoints: [
      <>Dilution illusion; debt not mechanically cheaper (M&amp;M).</>,
      <>Pecking order: internal funds → debt → equity.</>,
      <>OPAT rises with leverage; distress costs 10–25%.</>,
      <>L* ≈ 30% median; depends on volatility, size, tangibility, profitability, growth.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'New interest',     formula: 'Debt × rate',                       hint: '$7B × 4% = $280M' },
  { name: 'New shares',       formula: 'Amount raised / share price',       hint: '$7B / $173 ≈ 40.46M' },
  { name: 'NPV(debt)',        formula: '+Proceeds − PV(interest+principal)', hint: '= 0 if fairly priced' },
  { name: 'New stock price',  formula: '(equity value + cash) / (old+new shares)', hint: 'fair price → unchanged' },
  { name: 'M&M (no-tax)',     formula: 'WACC independent of L',             hint: 'r_E, r_D rise with leverage' },
  { name: 'WACC',             formula: '(1−L)·r_E + L·r_D·(1−T)',           hint: 'PepsiCo ≈ 5.6%' },
  { name: 'OPAT',             formula: 'EBIT − Taxes (as reported)',        hint: 'rises with leverage' },
  { name: 'Tax saving',       formula: 'T × Interest',                      hint: '21% × $280M' },
  { name: 'Trade-off value',  formula: 'V_U + PV(shield) − PV(distress)',   hint: 'peak at L*' },
  { name: 'Optimal leverage', formula: 'L* ≈ 30% (median firm)',           hint: '+5% value vs zero debt' },
  { name: 'Distress cost',    formula: '10–25% of firm value',             hint: 'Andrade–Kaplan (1998)' },
  { name: 'Equity reaction',  formula: '−1.5% to −3% on SEO',              hint: 'Eckbo–Masulis (1995)' },
]

const PAPERS = [
  {
    cite: 'Modigliani & Miller (1958)',
    title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
    idea: 'Under ideal markets, firm value and WACC are independent of capital structure; leverage raises r_E to keep WACC constant.',
    connection: 'Backbone of Lesson 5-3 (debunking "debt is cheaper"); the module\'s benchmark.',
  },
  {
    cite: 'Modigliani & Miller (1963)',
    title: 'Corporate Income Taxes and the Cost of Capital: A Correction',
    idea: 'With corporate taxes, deductible interest creates a debt tax shield that raises value with leverage.',
    connection: 'Basis of the tax benefit (Lesson 5-5) and the rising arm of the trade-off (5-7).',
  },
  {
    cite: 'Miller (1977)',
    title: 'Debt and Taxes',
    idea: 'Personal taxes on interest vs equity partly offset the corporate tax shield.',
    connection: 'The "personal taxes" caveat to debt\'s tax benefit (Lesson 5-5).',
  },
  {
    cite: 'Eckbo & Masulis (1995)',
    title: 'Seasoned Equity Offerings: A Survey',
    idea: 'Bond-issue reaction ≈ 0%; equity-issue reaction is negative (−1.5% to −3%).',
    connection: 'Key empirics of Lesson 5-4 (why firms avoid equity).',
  },
  {
    cite: 'Myers & Majluf (1984)',
    title: 'Corporate Financing and Investment Decisions When Firms Have Information Investors Do Not',
    idea: 'Information asymmetry makes equity a negative signal → the pecking order.',
    connection: 'Theory behind Lesson 5-4 and the Ruth\'s signaling case.',
  },
  {
    cite: 'Myers (1984)',
    title: 'The Capital Structure Puzzle',
    idea: 'Contrasts trade-off and pecking-order explanations of observed leverage.',
    connection: 'Conceptual frame for Lessons 5-4 and 5-7.',
  },
  {
    cite: 'Andrade & Kaplan (1998)',
    title: 'How Costly Is Financial (Not Economic) Distress?',
    idea: 'Financial-distress costs are about 10–25% of firm value for highly leveraged firms.',
    connection: 'Quantifies the cost of debt (Lesson 5-6).',
  },
  {
    cite: 'Korteweg (2010)',
    title: 'The Net Benefits to Leverage',
    idea: 'Estimates the value of leverage; median firm optimum ≈ 30%, ~5% value gain vs zero debt.',
    connection: 'Empirical calibration of the trade-off curve (Lesson 5-7).',
  },
  {
    cite: 'Graham & Harvey (2001)',
    title: 'The Theory and Practice of Corporate Finance: Evidence from the Field',
    idea: 'CFO survey on what really drives capital-structure choices (flexibility, ratings, taxes).',
    connection: 'Field evidence behind Lessons 5-4 and 5-7.',
  },
  {
    cite: 'Frank & Goyal (2009)',
    title: 'Capital Structure Decisions: Which Factors Are Reliably Important?',
    idea: 'Reliable leverage factors: tangibility, size, profitability, market-to-book, industry median.',
    connection: 'The determinants of L* (Lesson 5-7).',
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
          <h3 className="font-display text-lg font-semibold">10 papers behind Module 5</h3>
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
