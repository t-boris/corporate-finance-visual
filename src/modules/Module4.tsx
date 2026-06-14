import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { SynergyValuation } from '@/components/SynergyValuation'
import { MeansOfPayment } from '@/components/MeansOfPayment'
import { SensitivityAnalysis } from '@/components/SensitivityAnalysis'
import { WACCBuilder } from '@/components/WACCBuilder'
import { EVAVisual } from '@/components/EVAVisual'

/**
 * Module 4 — Mergers and Acquisitions, Risk, and Performance Evaluation.
 *
 * Same summary-first layout as Modules 1–3: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with the full lecture prose behind a toggle), a cheat-sheet,
 * collapsible academic papers, and a quiz CTA. Page copy is English; the
 * Russian study notes live in the KnowledgeDB markdown file.
 */
export function Module4Content() {
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
            This module bundles <strong>two big topics</strong>. First, <strong>M&amp;A</strong>: besides{' '}
            <em>building</em> value (Module 3), firms create value by <em>buying</em> companies that already
            have valuable projects — or by selling or <strong>splitting</strong> themselves (spin-offs).
          </p>
          <p>
            Second, <strong>risk and the discount rate</strong>. In Module 3 the forecasts were handed to us
            with no discussion of uncertainty. Here we learn to handle it — first with{' '}
            <strong>sensitivity analysis</strong>, then by recognizing that risk is hidden in the{' '}
            <strong>discount rate</strong>, which we estimate via the <strong>WACC</strong>. Finally we use
            the WACC to measure performance with <strong>EVA</strong>.
          </p>
          <KeyTakeaway>
            Uncertainty is the key driver of the <strong>discount rate</strong> — the hurdle rate that tells
            us whether a project, division, or whole company is creating value.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 4-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="4-1" summary={SUMMARIES['4-1']}>
        <LessonBlock eyebrow="4.1 · The core idea" title="Good and bad reasons for M&A">
          <Definition term="Synergy">
            A merger adds value only if the two firms are worth more together than apart — the{' '}
            <strong>&ldquo;2 + 2 = 5&rdquo;</strong> idea. The synergy is the extra &ldquo;1&rdquo;, and it
            equals the <strong>total NPV of the merger</strong>. The same logic applies to spin-offs and asset
            sales — value comes only from adding something.
          </Definition>
          <p>
            Examples beyond plain mergers: in <strong>2012 Microsoft bought patents from AOL</strong> — value
            created because the patents are worth more to Microsoft, not because the firms combined. In{' '}
            <strong>2011 Kraft split</strong> into <strong>Mondelez</strong> (Global Snacks) and the new Kraft
            (North American grocery) because the parts were worth more than the whole.
          </p>
          <CompareTable
            headers={['Good (rational) reasons', 'What it does']}
            rows={[
              ['Economies of scale', 'Lower costs: buying power, better processes — especially a large target'],
              ['Market power', 'Merging competitors can raise prices (may trigger antitrust review)'],
              ['Vertical integration', 'Buy a key supplier to run production in-house more efficiently'],
              ['Eliminate inefficiency', 'Better management of A runs B\'s assets more profitably'],
            ]}
          />
          <CaseStudy title="Two bad reasons — and the evidence">
            <p>
              <strong>1. Spending idle cash.</strong> Holding cash earns low returns, so &ldquo;let&apos;s buy
              a company&rdquo; sounds smart — but it is a recipe for disaster. <strong>Harford&apos;s study
              (1977–1993)</strong>: cash-rich firms acquire more <em>and</em> destroy value — about{' '}
              <strong>7 cents per dollar of excess cash</strong>. If a deal has positive NPV you can always
              raise financing; don&apos;t spend cash just because you have it (pay it out instead).
            </p>
            <p>
              <strong>2. Risk diversification.</strong> Buying a firm in another industry to &ldquo;reduce
              risk&rdquo; is pointless — shareholders diversify on their own via index funds. The modern trend
              is <strong>focus, not conglomeration</strong>: <strong>GE</strong> broke itself up (GE Capital,
              aircraft engines) after Jack Welch.
            </p>
          </CaseStudy>
          <KeyTakeaway>
            What justifies M&amp;A is <strong>synergy</strong> — not how much cash you hold, and not a wish to
            diversify.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 4-2 ─────────────────────────────────────────────────────── */}
      <LessonSection id="4-2" summary={SUMMARIES['4-2']} visuals={<SynergyValuation />}>
        <LessonBlock eyebrow="4.2 · Valuing synergies" title="Synergy valuation & deal pricing — HP–Compaq (2002)">
          <p>
            Valuing synergies is <strong>nothing new</strong> — it is an NPV calculation: forecast the
            incremental cash flows from the merger, discount them, and use the result to structure the deal.
          </p>
          <CaseStudy title="HP–Compaq, announced 4 September 2001">
            <p>
              Management projected <strong>$2.5B</strong> annual pre-tax cost savings (from mid-2004, a 3-year
              lag) and a <strong>$4.1B</strong> revenue loss (competitors selling the same PCs). Profit margin
              12%, tax 26%, discount rate 12%, inflation (growth) 3%.
            </p>
            <Formula caption="Profit impact of lost revenue">12% × $4.1B = $0.5B</Formula>
            <Formula caption="After-tax annual synergy">(2.5 − 0.5) × (1 − 26%) = $1.48B</Formula>
            <Formula caption="Growing perpetuity → value at 2003, then discount 2 yrs to 2001">
              1.48 / (12% − 3%) = $16.4B ; ÷ 1.12² ≈ $13.1B
            </Formula>
          </CaseStudy>
          <Pitfall>
            The growing-perpetuity formula gives a value <strong>one year before</strong> the first cash flow:
            a 2004 flow is valued as of 2003, then discounted two more years to 2001.
          </Pitfall>
          <p>Pricing follows from the premium:</p>
          <Formula>NPV(target) = Premium ; NPV(acquirer) = Synergy − Premium</Formula>
          <KeyTakeaway>
            Average public-target premium ≈ <strong>30%</strong>, so deals must generate a lot of synergy.
            HP&apos;s break-even cash price ≈ Compaq&apos;s <strong>$20.9B</strong> + synergy{' '}
            <strong>$13.1B</strong> = <strong>$34.0B</strong>; pay more and HP overpays.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 4-3 ─────────────────────────────────────────────────────── */}
      <LessonSection id="4-3" summary={SUMMARIES['4-3']} visuals={<MeansOfPayment />}>
        <LessonBlock eyebrow="4.3 · Cash vs. stock" title="Means of payment & the market reaction">
          <p>
            An acquirer pays with <strong>cash</strong> (buy out the target&apos;s shares) or{' '}
            <strong>stock</strong> (issue new shares so target holders become owners of the merged firm).
          </p>
          <Definition term="Exchange ratio">
            The number of acquirer shares each target shareholder receives, fixed at announcement. HP offering
            $16 with a pre-deal price of $23 → <span className="font-mono">16/23 ≈ 0.69</span> (the real deal
            used 0.6325).
          </Definition>
          <p>
            Because target holders are paid in HP <em>stock</em>, HP&apos;s price drop mattered: HP fell from{' '}
            <strong>$23 to $18</strong>, cutting the offer&apos;s real value to <strong>~$11.4</strong> —{' '}
            <em>below</em> Compaq&apos;s pre-deal <strong>$12.35</strong>. So Compaq&apos;s stock <em>fell too</em>
            (famously unusual).
          </p>
          <CompareTable
            headers={['Average announcement return', 'Finding']}
            rows={[
              ['Target', '≈ +20% — significant premium; deals are +NPV for targets'],
              ['Acquirer', '≈ 0% — flat on average; acquirers tend to overpay'],
            ]}
          />
          <Pitfall>
            Long-term, HP rose vs. Dell and IBM — but that proves little. We can never observe the{' '}
            <strong>counterfactual</strong> (how HP would have done <em>without</em> the deal), so judging
            whether a merger &ldquo;worked&rdquo; is genuinely hard.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 4-4 ─────────────────────────────────────────────────────── */}
      <LessonSection id="4-4" summary={SUMMARIES['4-4']} visuals={<SensitivityAnalysis />}>
        <LessonBlock eyebrow="4.4 · Handling uncertainty" title="Sensitivity analysis">
          <Definition term="Sensitivity analysis">
            Computing how sensitive the NPV is to changes in key parameters (sales, costs, discount rate). The
            baseline always uses the <strong>expected value</strong>, never the worst case.
          </Definition>
          <p>
            Reusing the Module-3 machine ($40M, +$9M/yr, 10 yrs), expected sales are 3M units (the average of
            an equally-likely 1–5M range). NPV is linear in volume: <strong>−$16M</strong> at 1M,{' '}
            <strong>+$17.5M</strong> at 3M (base), <strong>+$51M</strong> at 5M. Break-even ≈{' '}
            <strong>1.965M units</strong>.
          </p>
          <Pitfall>
            A negative worst-case NPV is <strong>not</strong> a reason to reject. The expected-value NPV is
            unchanged ($17.5M); almost any project is negative under <em>some</em> assumption — value creation
            requires risk. Use sensitivity analysis to <em>validate forecasts</em> and find break-evens.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSONS 4-5 → 4-8 ──────────────────────────────────────────────── */}
      <LessonSection id="4-5" summary={SUMMARIES['4-5']} visuals={<WACCBuilder />}>
        <LessonBlock eyebrow="4.5 · Where risk lives" title="Discount rates incorporate risk — the WACC">
          <p>
            Risk did not vanish in sensitivity analysis — it is <strong>hidden in the discount rate</strong>,
            which we took as given. The riskier the project, the higher the IRR it must clear. We measure the
            firm&apos;s discount rate with the <strong>WACC</strong>.
          </p>
          <Formula caption="Weighted average cost of capital (market-value weights)">
            WACC = r_D · (D/V) · (1 − T_c) + r_E · (E/V)
          </Formula>

          <Definition term="Required return on debt">
            Approximated by the long-term <strong>yield to maturity</strong> on the firm&apos;s bonds — valid
            only if the firm is far from bankruptcy. PepsiCo&apos;s 2060 bonds yielded ≈ 4%.
          </Definition>
          <KeyTakeaway>
            <strong>Zero-NPV idea:</strong> a freely traded bond has NPV ≈ 0 (buyers would bid the price up),
            so its expected return = required return. That is why the YTM can stand in for the cost of debt.
          </KeyTakeaway>
        </LessonBlock>

        <LessonBlock eyebrow="4.6 · Cost of equity" title="CAPM — the required return on equity">
          <p>
            Equity has <strong>no promised cash flow</strong> (a residual claim), so there is no YTM. We use
            the <strong>CAPM</strong> instead.
          </p>
          <Formula caption="Capital Asset Pricing Model">r_E = R_f + β × (R_m − R_f)</Formula>
          <CompareTable
            headers={['Input', 'Value (PepsiCo, 2022)', 'Source']}
            rows={[
              ['Risk-free rate R_f', '3% (30-yr T-bond ≈ 2.99%)', 'Use longest maturity, current yield'],
              ['Market risk premium', '≈ 5% (stocks 10% − bonds 4.84%, 1928–2021)', 'Historical realized returns'],
              ['Expected market return R_m', '3% + 5% = 8%', 'Current R_f + premium'],
            ]}
          />
        </LessonBlock>

        <LessonBlock eyebrow="4.7 · Beta" title="Finding beta — the measure of risk">
          <Definition term="Beta (β)">
            How a company&apos;s returns move with the market. <strong>High beta = high risk.</strong> Market
            −10% &amp; stock −15% → β &gt; 1 (amplified); stock −3% → β &lt; 1.
          </Definition>
        </LessonBlock>

        <LessonBlock eyebrow="4.8 · Putting it together" title="Estimating PepsiCo's WACC">
          <Pitfall>
            <strong>Use the MARKET value of equity for leverage.</strong> Book equity ignores future value,
            overstates D/V, understates the WACC, and could let you accept negative-NPV projects. PepsiCo:
            D = $40B, E = $240B → V = $280B, <span className="font-mono">D/V = 14%</span>.
          </Pitfall>
          <Formula caption="r_E 6%, r_D 4%, T 21%, E/V 86%, D/V 14%">
            WACC = 6%×0.86 + 4%×0.14×(1−0.21) ≈ 5.6%
          </Formula>
          <KeyTakeaway>
            WACC is the hurdle rate for projects of similar risk: a new PepsiCo soda needs{' '}
            <strong>IRR &gt; 5.6%</strong>. Beta range 0.4–0.8 → WACC ≈ 4.7%–6.5% (always run a beta
            sensitivity).
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSONS 4-9 & 4-10 ─────────────────────────────────────────────── */}
      <LessonSection id="4-9" summary={SUMMARIES['4-9']} visuals={<EVAVisual />}>
        <LessonBlock eyebrow="4.9 · Performance" title="Economic Value Added (EVA)">
          <Definition term="EVA (Economic Value Added)">
            Whether a company, division, or project earns more than its cost of capital in a year:{' '}
            <strong>EVA = OPAT − WACC × Operating Assets</strong>. Positive EVA = real economic profit.
          </Definition>
          <p>
            Use <strong>OPAT</strong> (operating profit after taxes, <em>before</em> interest) — not Net Income
            — to judge the whole business. Use <strong>operating assets = book assets − cash</strong>: book
            (we measure capital invested <em>now</em>), and minus cash (usually parked in financial assets).
          </p>
          <CaseStudy title="PepsiCo (2021)">
            <p>
              OPAT <strong>$9.7B</strong>, operating assets <strong>$86.4B</strong>. At the conservative WACC
              of 6.5%, EVA ≈ <strong>$4.1B</strong> — positive across the whole 4.7%–6.5% range.
            </p>
          </CaseStudy>
        </LessonBlock>

        <LessonBlock eyebrow="4.10 · Divisions" title="Divisional EVA — use the division's own beta">
          <p>
            Different divisions have different risk, so the company-wide WACC can be the wrong discount rate.
          </p>
          <CaseStudy title="Altria's wine division (Ste Michelle), 2021">
            <p>
              OPAT <strong>$16.6M</strong>. Altria&apos;s beta of <strong>0.5</strong> is really the{' '}
              <em>tobacco</em> beta (&gt;95% of the firm). The wine division needs its own beta — via an{' '}
              <strong>industry beta</strong> (alcoholic beverages ≈ 0.82) or a <strong>pure-play</strong>
              {' '}(Constellation Brands ≈ <strong>1.07</strong>), giving r_E ≈ 8.35% and{' '}
              <strong>WACC ≈ 7.2%</strong>. Result: <strong>EVA ≈ −$48M</strong>.
            </p>
          </CaseStudy>
          <Pitfall>
            Using the tobacco beta would <em>understate</em> risk → lower WACC → overstated EVA. And a negative
            EVA today does not mandate selling the division — a young business may turn positive later. Interpret
            with care.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* MODULE REVIEW ─────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review} />

      {/* CHEAT-SHEET ───────────────────────────────────────────────────── */}
      <section id="lesson-cheat" className="card p-5 scroll-mt-32">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Cheat-sheet</div>
          <h3 className="font-display text-lg font-semibold">Every Module 4 formula in one place</h3>
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
                20 questions for Module 4 · 4 easy · 12 medium · 4 hard.
              </p>
            </div>
          </div>
          <Link to="/quiz?module=4" className="btn-primary">
            <BookOpen size={16} /> Start Module 4 quiz <ArrowRight size={16} />
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
  { id: '4-1',    label: '4·1 M&A reasons' },
  { id: '4-2',    label: '4·2 Synergy & pricing' },
  { id: '4-3',    label: '4·3 Cash vs stock' },
  { id: '4-4',    label: '4·4 Sensitivity' },
  { id: '4-5',    label: '4·5–8 WACC' },
  { id: '4-9',    label: '4·9–10 EVA' },
  { id: 'review', label: 'Review' },
  { id: 'cheat',  label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 4 · Overview',
    title: 'M&A, Risk, and Performance Evaluation',
    tldr: (
      <>
        Two topics: <strong>M&amp;A</strong> (create value by buying/splitting firms, driven by{' '}
        <strong>synergies</strong>) and <strong>risk</strong> (the discount rate, the <strong>WACC</strong>,
        and measuring performance with <strong>EVA</strong>).
      </>
    ),
    keyPoints: [
      <>Synergy = the NPV of a merger (&ldquo;2 + 2 = 5&rdquo;); cash &amp; diversification are bad reasons.</>,
      <>Sensitivity analysis handles uncertainty — but never reject on the worst case.</>,
      <>Risk hides in the discount rate; estimate it with the WACC (CAPM + cost of debt).</>,
      <>EVA = OPAT − WACC × operating assets measures real economic profit.</>,
    ],
  },

  '4-1': {
    eyebrow: 'Lesson 4-1',
    title: 'Good and bad reasons for M&A',
    tldr: (
      <>
        Mergers add value only via <strong>synergy</strong> (2 + 2 = 5). Good: scale, market power, vertical
        integration, fixing bad management. Bad: spending idle cash and diversifying risk.
      </>
    ),
    keyPoints: [
      <>Synergy = total NPV of the deal; also applies to spin-offs (Kraft→Mondelez) and asset sales (MSFT–AOL).</>,
      <>Harford: cash-rich acquirers destroy ~7¢ per $1 of excess cash.</>,
      <>Shareholders diversify themselves — GE broke up to refocus.</>,
    ],
    formulas: [{ label: 'Synergy', expr: 'Value(A+B) − Value(A) − Value(B)' }],
  },

  '4-2': {
    eyebrow: 'Lesson 4-2',
    title: 'Synergy valuation & deal pricing',
    tldr: (
      <>
        Synergy is just an NPV. HP–Compaq: after-tax flow <strong>$1.48B</strong> grows 3% at a 12% rate →{' '}
        <strong>$13.1B</strong> synergy. Acquirer NPV = synergy − premium.
      </>
    ),
    keyPoints: [
      <>$2.5B savings − 12%×$4.1B loss = $2.0B; after 26% tax = $1.48B.</>,
      <>1.48/(12%−3%) = $16.4B at 2003, ÷1.12² ≈ $13.1B at 2001.</>,
      <>Average premium ≈ 30%; NPV(target) = premium.</>,
      <>HP break-even price ≈ $20.9B + $13.1B = $34.0B.</>,
    ],
    formulas: [
      { label: 'Growing perpetuity', expr: 'C / (R − g)' },
      { label: 'Acquirer NPV', expr: 'Synergy − Premium' },
    ],
  },

  '4-3': {
    eyebrow: 'Lesson 4-3',
    title: 'Means of payment & market reaction',
    tldr: (
      <>
        Cash vs. <strong>stock</strong> (exchange ratio 16/23 ≈ 0.69). Paid in HP stock, the offer&apos;s value
        fell to ~$11.4 as HP dropped to $18. Targets +20%, acquirers ≈ 0%.
      </>
    ),
    keyPoints: [
      <>Cash: fixed $16/share. Stock: target holders become acquirer shareholders.</>,
      <>HP $23→$18 cut the real offer to $11.4 &lt; Compaq&apos;s $12.35 → Compaq fell too.</>,
      <>Targets earn ~+20%; acquirers ≈ 0% (overpay on average).</>,
      <>Counterfactual is unobservable — long-term &ldquo;success&rdquo; is hard to prove.</>,
    ],
    formulas: [{ label: 'Exchange ratio', expr: 'Offer / Acquirer price' }],
  },

  '4-4': {
    eyebrow: 'Lesson 4-4',
    title: 'Sensitivity analysis',
    tldr: (
      <>
        NPV is linear in sales: <strong>−$16M</strong> (1M units) → <strong>+$51M</strong> (5M). Base (expected
        3M) NPV = <strong>+$17.5M</strong>; break-even ≈ 1.965M units.
      </>
    ),
    keyPoints: [
      <>Always value at the expected value (3M = average of 1–5M), not the worst case.</>,
      <>A negative worst-case NPV is not a reason to reject — value creation needs risk.</>,
      <>Use it to validate forecasts and find break-evens.</>,
    ],
    formulas: [{ label: 'Break-even', expr: 'sales where NPV = 0 (≈1.965M)' }],
  },

  '4-5': {
    eyebrow: 'Lessons 4-5 → 4-8',
    title: 'Risk, the discount rate, and the WACC',
    tldr: (
      <>
        Risk hides in the discount rate. Build the <strong>WACC</strong>: cost of debt = bond YTM (4%), cost of
        equity via <strong>CAPM</strong> (R_f 3% + β×5%), market weights → PepsiCo <strong>5.6%</strong>.
      </>
    ),
    keyPoints: [
      <>Zero-NPV idea: a traded bond&apos;s NPV ≈ 0, so YTM = required return on debt.</>,
      <>Equity has no YTM (residual claim) → CAPM: r_E = R_f + β(R_m − R_f).</>,
      <>R_f = 3% (30-yr T-bond); market premium ≈ 5%; R_m = 8%.</>,
      <>Beta measures risk; use MARKET equity for D/V (PepsiCo 14%).</>,
      <>WACC = 6%×0.86 + 4%×0.14×0.79 ≈ 5.6% (range 4.7–6.5%).</>,
    ],
    formulas: [
      { label: 'CAPM', expr: 'r_E = R_f + β(R_m − R_f)' },
      { label: 'WACC', expr: 'r_E(E/V) + r_D(D/V)(1−T)' },
    ],
  },

  '4-9': {
    eyebrow: 'Lessons 4-9 & 4-10',
    title: 'Economic Value Added (EVA)',
    tldr: (
      <>
        <strong>EVA = OPAT − WACC × operating assets.</strong> PepsiCo 2021 ≈ <strong>+$4.1B</strong>; Altria&apos;s
        wine division ≈ <strong>−$48M</strong> (using the wine beta 1.07, not tobacco 0.5).
      </>
    ),
    keyPoints: [
      <>OPAT (before interest), operating assets = book assets − cash.</>,
      <>PepsiCo: $9.7B − WACC×$86.4B &gt; 0 across 4.7–6.5%.</>,
      <>Divisions need their own beta: industry (0.82) or pure-play Constellation (1.07).</>,
      <>Wine r_E 8.35%, WACC 7.2% → EVA −$48M; interpret with care.</>,
    ],
    formulas: [{ label: 'EVA', expr: 'OPAT − WACC × Operating Assets' }],
  },

  review: {
    eyebrow: 'Module 4 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        M&amp;A creates value through <strong>synergies</strong>, priced against a ~30% premium. Risk lives in
        the discount rate — build the <strong>WACC</strong> from CAPM and the cost of debt — and{' '}
        <strong>EVA</strong> tells you whether a business beats its cost of capital.
      </>
    ),
    keyPoints: [
      <>Synergy = NPV of the merger; NPV(acquirer) = synergy − premium.</>,
      <>Cash vs stock; targets +20%, acquirers ≈ 0%.</>,
      <>WACC = r_E(E/V) + r_D(D/V)(1−T), with MARKET-value weights.</>,
      <>EVA = OPAT − WACC × operating assets; use a division&apos;s own beta.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Synergy',            formula: 'V(A+B) − V(A) − V(B)',            hint: '= total NPV of the merger' },
  { name: 'Profit impact',      formula: 'Margin × Revenue loss',           hint: '12% × $4.1B = $0.5B' },
  { name: 'Growing perpetuity', formula: 'C / (R − g)',                     hint: 'value sits 1 yr early' },
  { name: 'HP–Compaq synergy',  formula: '1.48/(0.12−0.03)/1.12²',          hint: '≈ $13.1B at 2001' },
  { name: 'Deal pricing',       formula: 'NPV(acq) = Synergy − Premium',    hint: 'NPV(target) = Premium' },
  { name: 'Exchange ratio',     formula: 'Offer / Acquirer price',          hint: '16/23 ≈ 0.69' },
  { name: 'CAPM',               formula: 'r_E = R_f + β(R_m − R_f)',        hint: '3% + β×5%' },
  { name: 'Expected market',    formula: 'R_m = R_f + premium',             hint: '3% + 5% = 8%' },
  { name: 'WACC',               formula: 'r_E(E/V) + r_D(D/V)(1−T)',        hint: 'market weights → 5.6%' },
  { name: 'Leverage',           formula: 'D/V (market value of E)',         hint: 'PepsiCo 40/280 = 14%' },
  { name: 'OPAT',               formula: 'Operating Income − Taxes',        hint: 'before interest' },
  { name: 'EVA',                formula: 'OPAT − WACC × Operating Assets',  hint: 'assets = book − cash' },
]

const PAPERS = [
  {
    cite: 'Harford (1999)',
    title: 'Corporate Cash Reserves and Acquisitions',
    idea: 'Cash-rich firms acquire more often and their deals destroy value — roughly 7 cents per dollar of excess cash.',
    connection: 'Evidence behind the "don\'t spend idle cash" bad reason (Lesson 4-1).',
  },
  {
    cite: 'Jensen (1986)',
    title: 'Agency Costs of Free Cash Flow, Corporate Finance, and Takeovers',
    idea: 'Free cash flow tempts managers into negative-NPV empire building.',
    connection: 'Theory behind cash-driven bad M&A (Lesson 4-1).',
  },
  {
    cite: 'Roll (1986)',
    title: 'The Hubris Hypothesis of Corporate Takeovers',
    idea: 'Overconfident acquirers overpay, transferring gains to the target.',
    connection: 'Explains the ≈0% average acquirer reaction (Lesson 4-3).',
  },
  {
    cite: 'Andrade, Mitchell & Stafford (2001)',
    title: 'New Evidence and Perspectives on Mergers',
    idea: 'Survey of M&A empirics: targets earn a sizable premium; acquirers ≈ 0%.',
    connection: 'Event-study reaction numbers (Lesson 4-3).',
  },
  {
    cite: 'Sharpe (1964) / Lintner (1965)',
    title: 'Capital Asset Prices / The Valuation of Risk Assets',
    idea: 'Derived the CAPM: required return = R_f + β × market risk premium.',
    connection: 'Foundation for the cost of equity (Lessons 4-6, 4-7).',
  },
  {
    cite: 'Modigliani & Miller (1958)',
    title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
    idea: 'Capital-structure irrelevance under ideal markets; basis of WACC and the debt tax shield.',
    connection: 'Theoretical backbone of the WACC and (1−T) on debt (Lessons 4-5, 4-8).',
  },
  {
    cite: 'Fama & French (1992, 1993)',
    title: 'The Cross-Section of Expected Returns / Common Risk Factors',
    idea: 'Empirical critique of one-factor CAPM; size and value factors matter too.',
    connection: 'Context and limits of beta estimation (Lesson 4-7).',
  },
  {
    cite: 'Stewart (1991)',
    title: 'The Quest for Value (EVA®, Stern Stewart & Co.)',
    idea: 'Popularized EVA as economic profit = NOPAT minus a charge for capital.',
    connection: 'Direct source of the EVA methodology (Lessons 4-9, 4-10).',
  },
  {
    cite: 'Berger & Ofek (1995)',
    title: 'Diversification\'s Effect on Firm Value',
    idea: 'Conglomerate diversification tends to destroy value (the "diversification discount").',
    connection: 'Why diversification is a bad M&A reason; GE\'s break-up (Lesson 4-1).',
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
          <h3 className="font-display text-lg font-semibold">9 papers behind Module 4</h3>
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
