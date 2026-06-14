import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { NPVTimeline } from '@/components/NPVTimeline'
import { PerpetuityConvergence } from '@/components/PerpetuityConvergence'
import { NPVShareholderEquivalence } from '@/components/NPVShareholderEquivalence'
import { NPVProfile } from '@/components/NPVProfile'
import { IRRPitfalls } from '@/components/IRRPitfalls'
import { FreeCashFlowBuilder } from '@/components/FreeCashFlowBuilder'
import { RealOptionsTree } from '@/components/RealOptionsTree'

/**
 * Module 3 — Making Investment Decisions.
 *
 * Same summary-first layout as Modules 1 & 2: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with the full lecture prose behind a toggle), a cheat-sheet,
 * collapsible academic papers, and a quiz CTA. Page copy is English; the
 * Russian study notes live in the KnowledgeDB markdown file.
 */
export function Module3Content() {
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
            Companies create shareholder value in two ways: <strong>build it</strong> (new products,
            R&amp;D) or <strong>buy it</strong> (acquire firms with valuable projects — Module 4).
            Finance cannot tell you how to invent the next iPhone, but it gives you the{' '}
            <strong>tools and formulas</strong> to judge whether a new investment — internal or
            external — <em>creates</em> shareholder value or <em>destroys</em> it.
          </p>
          <p>
            The central tool is <strong>Net Present Value (NPV)</strong>. We learn why maximizing NPV is
            the same as maximizing shareholder value, how to build the cash flows it needs, its
            percentage cousin the <strong>IRR</strong> (and when <em>not</em> to trust it), and finally{' '}
            <strong>real options</strong> for projects with built-in flexibility, such as R&amp;D.
          </p>
          <KeyTakeaway>
            In finance the relevant horizon is almost always <strong>infinity</strong>: value depends on{' '}
            <em>all</em> future cash flows, discounted to today.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="3-1" summary={SUMMARIES['3-1']} visuals={<NPVTimeline />}>
        <LessonBlock eyebrow="3.1 · The motivating case" title="Speeding up the collection of receivables">
          <p>
            In Module 2 we saw that receivables tie up cash and create liquidity problems. One fix is to{' '}
            <strong>collect faster</strong> — but there is a trade-off, and we want to put it in numbers.
          </p>
          <Definition term="Incremental Cash Flow">
            The cash flow that is a direct consequence of a decision, computed as{' '}
            <strong>&ldquo;new minus old&rdquo;</strong> — the change relative to not taking the project.
            These are the only cash flows that belong in an NPV calculation.
          </Definition>
          <CompareTable
            headers={['', 'Old system', 'New system']}
            rows={[
              ['Expected sales', '$1,000M', '$980M (−2%)'],
              ['Collected immediately', '80% → $800M', '90% → $882M'],
              ['Collected a year later', '$200M', '$98M'],
            ]}
          />
          <p>
            Customers dislike paying sooner, so demand — and revenue — falls 2%. The incremental cash
            flows are <strong>+$82M today</strong> (more cash now) and{' '}
            <strong>−$20M every year forever</strong> (lost sales). Which dominates? We need NPV.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-2 ─────────────────────────────────────────────────────── */}
      <LessonSection id="3-2" summary={SUMMARIES['3-2']} visuals={<PerpetuityConvergence />}>
        <LessonBlock eyebrow="3.2 · The concept" title="Net Present Value — two formulas and a computer">
          <Definition term="Net Present Value (NPV)">
            The sum of all incremental cash flows, today and in the future, discounted back to the
            present at the required return.
          </Definition>
          <p>Every NPV calculation is built from just two formulas (all others are consequences):</p>
          <Formula caption="Formula 1 — discount a single future cash flow">PV = C / (1 + R)^T</Formula>
          <Formula caption="Formula 2 — growing perpetuity (G = 0 gives the level perpetuity C/R)">
            PV = C / (R − G)
          </Formula>
          <CompareTable
            headers={['Example (R = 6%)', 'Calculation', 'Answer']}
            rows={[
              ['$1M in one year', '1,000,000 / 1.06', '$943,396'],
              ['$1M every year forever', '1,000,000 / 0.06', '$16,666,667'],
            ]}
          />
          <p>
            Back to receivables: how many years should we count the −$20M? In most real problems the
            horizon is <strong>infinity</strong> — there is no natural place to stop, since even a sale
            price depends on future cash flows. Distant flows discount to almost nothing, so the
            perpetuity formula already captures the whole infinite future. At R = 10%:
          </p>
          <Formula>NPV = +82 + (−20 / 0.10) = 82 − 200 = −$118M</Formula>
        </LessonBlock>

        <LessonBlock eyebrow="3.2.2 · Doing it in Excel" title="The date-0 trap">
          <p>
            Excel&apos;s <span className="font-mono">NPV()</span> assumes its first cash flow happens{' '}
            <strong>one year out</strong>. So you discount dates 1…N inside the function and add the
            date-0 flow <strong>separately</strong>:
          </p>
          <Formula>NPV = CF₀ + NPV(rate; CF₁ : CFₙ)</Formula>
          <Pitfall>
            Put CF₀ <em>inside</em> <span className="font-mono">NPV()</span> and Excel wrongly discounts
            it, giving a number that is too low. In the lecture example the correct NPV is{' '}
            <strong>$13,153</strong> (and the IRR, which takes <em>all</em> flows, is{' '}
            <strong>15.25%</strong>).
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-3 ─────────────────────────────────────────────────────── */}
      <LessonSection id="3-3" summary={SUMMARIES['3-3']} visuals={<NPVShareholderEquivalence />}>
        <LessonBlock eyebrow="3.3 · Why NPV is the rule" title="NPV equals the change in shareholder wealth">
          <p>
            From Module 1, a stock price is the present value of future cash flows. An NPV is the present
            value of incremental cash flows. <strong>The two definitions are identical</strong> — so
            taking a project changes shareholder wealth by exactly its NPV.
          </p>
          <KeyTakeaway>
            The −$118M NPV means shareholder wealth would fall by <strong>$118M</strong>. Maximizing NPV
            is maximizing shareholder value: <strong>accept if NPV &gt; 0, reject if NPV &lt; 0</strong>.
            Speeding up receivables is rejected — keep the old system.
          </KeyTakeaway>
          <p>The equivalence relies on idealized conditions and can break down:</p>
          <CompareTable
            headers={['Problem', 'Why the equivalence weakens']}
            rows={[
              ['Asymmetric information', 'Managers know more than the market (common in M&A)'],
              ['Market inefficiency', 'Prices may not reflect all future cash flows'],
              ['High leverage', 'Near bankruptcy, shareholders and debt holders disagree on projects'],
            ]}
          />
          <p>Even so, NPV remains the central idea and a reliable guide for financial management.</p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-4 & 3-5 ───────────────────────────────────────────────── */}
      <LessonSection id="3-4" summary={SUMMARIES['3-4']} visuals={<NPVProfile />}>
        <LessonBlock eyebrow="3.4 · A return in percent" title="The Internal Rate of Return (IRR)">
          <p>
            NPV is a number in dollars, but we like to think of returns in <strong>percentages</strong>.
            The IRR delivers exactly that.
          </p>
          <Definition term="Internal Rate of Return (IRR)">
            The rate of return of an investment — mathematically, the discount rate that makes NPV equal
            to zero.
          </Definition>
          <p>
            Why &ldquo;NPV = 0&rdquo;? Invest $10,000, receive $11,000 in a year — clearly 10%. The
            equation your brain solves rearranges to{' '}
            <span className="font-mono">0 = −10,000 + 11,000/(1 + R)</span>, an NPV set to zero at R =
            10%. This method always works, even when intuition fails: for −$10,000 then $500 growing 4%
            forever, solving <span className="font-mono">500/(R − 0.04) = 10,000</span> gives{' '}
            <strong>IRR = 9%</strong>.
          </p>
        </LessonBlock>

        <LessonBlock eyebrow="3.5 · Using it to decide" title="Invest if IRR beats the benchmark">
          <Definition term="Discount Rate (Benchmark)">
            The return required to invest in a project of given risk — the benchmark against which the
            IRR is compared (e.g. relative to Treasury bonds). How to estimate it comes later.
          </Definition>
          <Formula caption="The IRR decision rule">Invest if IRR &gt; Discount Rate</Formula>
          <CompareTable
            headers={['Benchmark', 'NPV = −10,000 + 500/(R−0.04)', 'Verdict']}
            rows={[
              ['8%', '+$2,500', 'IRR 9% > 8% → accept'],
              ['10%', '−$1,667', 'IRR 9% < 10% → reject'],
            ]}
          />
          <KeyTakeaway>
            A beautiful equivalence: <strong>NPV &gt; 0 if and only if IRR &gt; the discount rate</strong>.
            On the NPV profile, the curve crosses zero exactly at the IRR.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-6 ─────────────────────────────────────────────────────── */}
      <LessonSection id="3-6" summary={SUMMARIES['3-6']} visuals={<IRRPitfalls />}>
        <LessonBlock eyebrow="3.6 · Slow down" title="Three problems with the IRR">
          <p>
            Before you forget NPV and always use IRR — stop. The IRR has real pitfalls.
          </p>
          <CompareTable
            headers={['Pitfall', 'Example', 'What happens']}
            rows={[
              ['Sign flip', '+$20M then −$22M', 'Excel says "10%" — but it is bad (borrowing)'],
              ['Multiple IRR', '−4, +25, −25', 'Two roots: 25% and 400% — neither meaningful'],
              ['Scale', '1¢→2¢ vs $100→$200', 'Both 100% IRR, but B creates far more value'],
            ]}
          />
          <Pitfall>
            The common thread in the first two is a <strong>negative cash flow after a positive one</strong>.
            If you see that pattern, do not use IRR. And never compare projects of different{' '}
            <strong>sizes</strong> by IRR — only NPV (in dollars) is comparable across magnitudes.
          </Pitfall>
          <KeyTakeaway>
            NPV and IRR agree in most cases. Reach for NPV whenever cash flows flip sign or projects
            differ in scale.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-7 ─────────────────────────────────────────────────────── */}
      <LessonSection id="3-7" summary={SUMMARIES['3-7']} visuals={<FreeCashFlowBuilder />}>
        <LessonBlock eyebrow="3.7 · Building the cash flows" title="Free cash flow — the magic formula">
          <Definition term="Free Cash Flow (Magic Formula)">
            FCF = Sales − Costs − Taxes − Investments. It works under <em>any</em> tax code — only the
            tax line changes. Sales − Costs ≈ EBITDA; Investments include CapEx and working capital.
          </Definition>
          <Formula>FCF = Sales − Costs − Taxes − Investments</Formula>
          <p>
            A machine costs <strong>$40,000</strong>, lifts Sales − Costs by <strong>$9,000</strong>/yr
            for 10 years, has a <strong>$4,000</strong> pre-tax salvage, a 21% tax rate, and an 8%
            discount rate. The catch is taxes: CapEx creates <strong>depreciation tax shields</strong>,
            and the schedule depends on the tax code.
          </p>
          <CompareTable
            headers={['Tax regime', 'Depreciation', 'NPV @ 8%', 'IRR']}
            rows={[
              ['Before 2018', 'Accelerated, $8,000/yr × 5', '$15,880', '16.4%'],
              ['After 2018', 'Full expensing in year 0', '$17,572', '18.8%'],
            ]}
          />
          <p>
            Full expensing creates a <strong>−$8,400 tax</strong> (a refund/offset) in year 0 — pulling
            the shield forward raises both NPV and IRR. If the asset is fully depreciated, the whole
            salvage is taxable: <span className="font-mono">$4,000 × (1 − 0.21) = $3,160</span>.
          </p>
          <Pitfall>
            Working capital is also an Investment: if a project needs inventory of 50% of a $3M COGS,
            $1.5M is tied up at date 0 (non-deductible) and recaptured at the end — lowering NPV while
            held.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 3-8 ─────────────────────────────────────────────────────── */}
      <LessonSection id="3-8" summary={SUMMARIES['3-8']} visuals={<RealOptionsTree />}>
        <LessonBlock eyebrow="3.8 · Flexibility has value" title="Real options — valuing R&D">
          <p>
            Standard NPV assumes an all-or-nothing, irreversible decision. Reality gives firms{' '}
            <strong>options</strong> — to abandon, modify, or expand. R&amp;D is the leading example: its
            very purpose is to <strong>create an option to invest</strong> later.
          </p>
          <Definition term="Real Option">
            The right — not the obligation — to take a future action (expand, defer, abandon, invest
            further) created by a current investment. Valued with a decision tree.
          </Definition>
          <CaseStudy title="A diabetes drug — decision tree">
            <p>
              Spend <strong>$30M</strong> on R&amp;D. Drug phases compound to a low success rate
              (Phase 1→2 ≈ 70%, 2→3 ≈ 33%, … , FDA ≈ <strong>5%</strong>). On success, invest{' '}
              <strong>$1B</strong> and earn <strong>$200M/yr for 10 years</strong>, then{' '}
              <strong>$20M forever</strong> (generic). At 6%, the PV of those flows is{' '}
              <strong>$1,658M</strong>, so <span className="font-mono">NPV | success = 1,658 − 1,000 = +$658M</span>.
            </p>
            <p>
              But with a 5% chance and a <strong>3-year lag</strong>:{' '}
              <span className="font-mono">NPV = −30 + 0.05 × 658 / 1.06³ = −$2.37M</span> → do <em>not</em>{' '}
              invest, despite the huge upside.
            </p>
          </CaseStudy>
          <Pitfall>
            Mind the perpetuity timing: $20M starting in <strong>year 11</strong> gives 20/0.06 = $333M
            as of <strong>year 10</strong>, which must then be discounted 10 more years to today.
          </Pitfall>
          <KeyTakeaway>
            R&amp;D NPV is extremely sensitive to the (hard-to-estimate) success probability: raising it
            from 5% to 10% can flip the decision from reject to accept. The tools are the same as plain
            NPV — just a decision tree on top.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* MODULE REVIEW ─────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review} />

      {/* CHEAT-SHEET ───────────────────────────────────────────────────── */}
      <section id="lesson-cheat" className="card p-5 scroll-mt-32">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Cheat-sheet</div>
          <h3 className="font-display text-lg font-semibold">Every Module 3 formula in one place</h3>
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
                20 questions for Module 3 · 4 easy · 12 medium · 4 hard.
              </p>
            </div>
          </div>
          <Link to="/quiz?module=3" className="btn-primary">
            <BookOpen size={16} /> Start Module 3 quiz <ArrowRight size={16} />
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
  { id: '3-1',    label: '3·1 NPV example' },
  { id: '3-2',    label: '3·2 NPV' },
  { id: '3-3',    label: '3·3 Shareholder value' },
  { id: '3-4',    label: '3·4 IRR' },
  { id: '3-6',    label: '3·6 IRR pitfalls' },
  { id: '3-7',    label: '3·7 Free cash flow' },
  { id: '3-8',    label: '3·8 Real options' },
  { id: 'review', label: 'Review' },
  { id: 'cheat',  label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 3 · Overview',
    title: 'Making Investment Decisions',
    tldr: (
      <>
        Should you invest in a project? <strong>NPV</strong> answers it — and maximizing NPV is the same
        as maximizing shareholder value. We also meet <strong>IRR</strong> (and its traps) and{' '}
        <strong>real options</strong> for flexible projects like R&amp;D.
      </>
    ),
    keyPoints: [
      <>Value comes from building (R&amp;D, products) or buying (M&amp;A) valuable projects.</>,
      <>NPV = sum of incremental cash flows, discounted to today.</>,
      <>IRR is the percentage cousin of NPV — useful, but with pitfalls.</>,
      <>Real options capture the value of flexibility (expand / defer / abandon).</>,
      <>The relevant horizon is almost always infinity.</>,
    ],
  },

  '3-1': {
    eyebrow: 'Lesson 3-1',
    title: 'NPV example — speeding up receivables',
    tldr: (
      <>
        Collecting faster brings <strong>+$82M today</strong> but loses <strong>−$20M every year</strong>{' '}
        forever (sales fall 2%). Which wins? That is the NPV question.
      </>
    ),
    keyPoints: [
      <>Incremental cash flow = &ldquo;new minus old&rdquo;.</>,
      <>Move from 80% to 90% immediate collection; sales drop 2% ($1,000M → $980M).</>,
      <>+$82M at t=0, then −$20M every year, forever.</>,
      <>A benefit now vs. a loss later — only NPV can net them out.</>,
    ],
    formulas: [{ label: 'Incremental', expr: 'CF(new) − CF(old)' }],
  },

  '3-2': {
    eyebrow: 'Lesson 3-2',
    title: 'Net Present Value',
    tldr: (
      <>
        Two formulas build every NPV: <strong>PV = C/(1+R)^T</strong> and the growing perpetuity{' '}
        <strong>C/(R−G)</strong>. The receivables NPV at 10% is <strong>−$118M</strong>.
      </>
    ),
    keyPoints: [
      <>$1M in a year at 6% = $943,396; $1M forever at 6% = $16,666,667.</>,
      <>Horizon = infinity; distant flows discount to ≈0, so C/r is exact.</>,
      <>NPV = 82 − 20/0.10 = −$118M.</>,
      <>In Excel: add CF₀ outside NPV() (NPV = $13,153; IRR = 15.25%).</>,
    ],
    formulas: [
      { label: 'Discount', expr: 'PV = C/(1+R)^T' },
      { label: 'Growing perpetuity', expr: 'PV = C/(R−G)' },
    ],
  },

  '3-3': {
    eyebrow: 'Lesson 3-3',
    title: 'NPV = shareholder value',
    tldr: (
      <>
        A stock price and an NPV are both the PV of future cash flows, so a project changes wealth by
        exactly its NPV. <strong>Accept if NPV &gt; 0; reject if &lt; 0.</strong>
      </>
    ),
    keyPoints: [
      <>−$118M NPV ⇒ shareholder wealth falls $118M ⇒ keep the old system.</>,
      <>Maximizing NPV is maximizing shareholder value.</>,
      <>Equivalence can weaken: asymmetric info, market inefficiency, high leverage.</>,
    ],
    formulas: [{ label: 'Rule', expr: 'Accept if NPV > 0' }],
  },

  '3-4': {
    eyebrow: 'Lessons 3-4 & 3-5',
    title: 'Internal Rate of Return',
    tldr: (
      <>
        The IRR is the discount rate that makes <strong>NPV = 0</strong>. Invest if{' '}
        <strong>IRR &gt; benchmark</strong>; the NPV curve crosses zero exactly at the IRR.
      </>
    ),
    keyPoints: [
      <>$10,000 → $11,000 is a 10% IRR (NPV set to zero).</>,
      <>−$10,000 then $500 growing 4% forever → IRR = 9%.</>,
      <>NPV at 8% = +$2,500; at 10% = −$1,667.</>,
      <>NPV &gt; 0 ⟺ IRR &gt; discount rate.</>,
    ],
    formulas: [
      { label: 'IRR', expr: '0 = Σ CFₜ/(1+IRR)^t' },
      { label: 'Rule', expr: 'Invest if IRR > R' },
    ],
  },

  '3-6': {
    eyebrow: 'Lesson 3-6',
    title: 'Problems with the IRR',
    tldr: (
      <>
        IRR misleads when a <strong>negative flow follows a positive one</strong> (sign flip, multiple
        roots) and when comparing projects of different <strong>scale</strong>.
      </>
    ),
    keyPoints: [
      <>+$20M then −$22M → &ldquo;10%&rdquo; but a bad deal.</>,
      <>−4, +25, −25 → two IRRs (25% and 400%).</>,
      <>1¢→2¢ vs $100→$200: same 100% IRR, very different NPV.</>,
      <>Rule: no IRR for sign flips or different sizes — use NPV.</>,
    ],
  },

  '3-7': {
    eyebrow: 'Lesson 3-7',
    title: 'Free cash flow formulas',
    tldr: (
      <>
        <strong>FCF = Sales − Costs − Taxes − Investments</strong> — works under any tax code. Full
        expensing (post-2018) raises NPV ($15,880 → $17,572) and IRR (16.4% → 18.8%).
      </>
    ),
    keyPoints: [
      <>Sales − Costs ≈ EBITDA; Investments = CapEx + working capital.</>,
      <>CapEx creates depreciation tax shields; the schedule depends on the tax code.</>,
      <>Full expensing books a −$8,400 tax in year 0 (shield pulled forward).</>,
      <>After-tax salvage = $4,000 × (1 − 0.21) = $3,160 (fully depreciated).</>,
    ],
    formulas: [{ label: 'Magic formula', expr: 'Sales − Costs − Taxes − Investments' }],
  },

  '3-8': {
    eyebrow: 'Lesson 3-8',
    title: 'Real options — valuing R&D',
    tldr: (
      <>
        R&amp;D creates an <strong>option to invest</strong> later. Decision tree: 5% success → +$658M
        NPV; with a 3-yr lag the whole R&amp;D NPV is <strong>−$2.37M</strong> → reject.
      </>
    ),
    keyPoints: [
      <>Spend $30M; on success invest $1B, PV of flows $1,658M → NPV|success +$658M.</>,
      <>NPV = −30 + 0.05 × 658 / 1.06³ = −$2.37M.</>,
      <>Perpetuity timing: $20M from year 11 → 20/0.06 sits at year 10.</>,
      <>Extremely sensitive to the success probability (5% vs 10% flips it).</>,
    ],
    formulas: [{ label: 'R&D NPV', expr: '−30 + p·658/1.06^lag' }],
  },

  review: {
    eyebrow: 'Module 3 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        <strong>NPV is everything.</strong> It equals the change in shareholder wealth: accept positive,
        reject negative. IRR is a useful percentage cousin — except for sign flips and scale. Build cash
        flows with the magic formula; add real options for flexible projects.
      </>
    ),
    keyPoints: [
      <>NPV = PV of incremental cash flows = change in shareholder wealth.</>,
      <>IRR = the rate that makes NPV zero; invest if IRR &gt; benchmark.</>,
      <>Don&apos;t use IRR for negative-after-positive flows or different sizes.</>,
      <>FCF = Sales − Costs − Taxes − Investments; real options via decision trees.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Discount (single)',  formula: 'PV = C / (1 + R)^T',                 hint: '$1M/1.06 = $943,396' },
  { name: 'Perpetuity',         formula: 'PV = C / R',                         hint: '$1M/6% = $16,666,667' },
  { name: 'Growing perpetuity', formula: 'PV = C / (R − G)',                   hint: 'requires R > G' },
  { name: 'Net present value',  formula: 'NPV = Σ CFₜ / (1 + R)^t',            hint: 'accept if > 0' },
  { name: 'NPV in Excel',       formula: 'CF₀ + NPV(rate; CF₁:CFₙ)',          hint: 'date 0 stays outside' },
  { name: 'IRR',                formula: '0 = Σ CFₜ / (1 + IRR)^t',            hint: 'rate that zeroes NPV' },
  { name: 'IRR rule',           formula: 'Invest if IRR > Discount Rate',      hint: '⟺ NPV > 0' },
  { name: 'Free cash flow',     formula: 'Sales − Costs − Taxes − Investments',hint: 'works under any tax code' },
  { name: 'After-tax salvage',  formula: 'Salvage × (1 − T) if basis 0',       hint: '4,000 × 0.79 = 3,160' },
  { name: 'R&D real option',    formula: '−C + p × NPVsuccess / (1+R)^lag',    hint: '−30 + 0.05·658/1.06³' },
  { name: 'Receivables NPV',    formula: '82 − 20/R',                          hint: '= −$118M at R = 10%' },
  { name: 'NPV profile',        formula: 'NPV(R) crosses 0 at the IRR',        hint: 'left of IRR: NPV > 0' },
]

const PAPERS = [
  {
    cite: 'Fisher (1930)',
    title: 'The Theory of Interest',
    idea: 'Founded the theory of discounting and the Fisher Separation Theorem: the firm\'s investment rule (take positive-NPV projects) is independent of shareholders\' preferences.',
    connection: 'Foundation of NPV and the NPV = shareholder value result (Lessons 3-2, 3-3).',
  },
  {
    cite: 'Hirshleifer (1958)',
    title: 'On the Theory of Optimal Investment Decision',
    idea: 'Rigorously justified the NPV rule under capital markets and showed when IRR coincides with — or diverges from — NPV.',
    connection: 'Theory behind the NPV ↔ IRR equivalence (Lessons 3-3, 3-5).',
  },
  {
    cite: 'Graham & Harvey (2001)',
    title: 'The Theory and Practice of Corporate Finance: Evidence from the Field',
    idea: 'A survey of CFOs: about 75% use NPV and IRR; IRR is even slightly more popular despite its pitfalls.',
    connection: 'Real-world prevalence of NPV and IRR (Lessons 3-4, 3-6).',
  },
  {
    cite: 'Myers (1977)',
    title: 'Determinants of Corporate Borrowing',
    idea: 'Introduced growth options — part of firm value is the option to make future investments.',
    connection: 'Conceptual basis of real options and R&D valuation (Lesson 3-8).',
  },
  {
    cite: 'McDonald & Siegel (1986)',
    title: 'The Value of Waiting to Invest',
    idea: 'Under uncertainty the option to defer an irreversible investment has value that naive NPV ignores.',
    connection: 'Why flexibility changes the decision vs. plain NPV (Lesson 3-8).',
  },
  {
    cite: 'Dixit & Pindyck (1994)',
    title: 'Investment under Uncertainty',
    idea: 'The canonical real-options text: irreversibility + uncertainty + the ability to wait add a premium over static NPV.',
    connection: 'Framework behind the decision-tree treatment of R&D (Lesson 3-8).',
  },
  {
    cite: 'Black & Scholes (1973) / Merton (1973)',
    title: 'The Pricing of Options and Corporate Liabilities',
    idea: 'Option-pricing theory underpinning the valuation of real options — R&D as a call option on a future launch.',
    connection: 'Theoretical backbone of real-options valuation (Lesson 3-8).',
  },
  {
    cite: 'DiMasi, Grabowski & Hansen (2016)',
    title: 'Innovation in the Pharmaceutical Industry: New Estimates of R&D Costs',
    idea: 'Estimates the cost of bringing a drug to market at ~$2.6B with very low phase-by-phase success probabilities.',
    connection: 'Empirical grounding for the drug-R&D numbers (Lesson 3-8).',
  },
  {
    cite: 'Jensen (1986)',
    title: 'Agency Costs of Free Cash Flow, Corporate Finance, and Takeovers',
    idea: 'Excess free cash flow tempts managers into negative-NPV investment (empire building).',
    connection: 'Why NPV discipline matters when building cash flows (Lesson 3-7).',
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
          <h3 className="font-display text-lg font-semibold">9 papers behind Module 3</h3>
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
