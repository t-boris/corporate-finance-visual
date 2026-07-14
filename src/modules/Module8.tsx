import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { NPVChallengesMap } from '@/components/NPVChallengesMap'
import { BankruptcyWaterfall } from '@/components/BankruptcyWaterfall'
import { AgencyCostExplorer } from '@/components/AgencyCostExplorer'
import { HaircutSlider } from '@/components/HaircutSlider'
import { BriberyNPVDecision } from '@/components/BriberyNPVDecision'
import { ArbitrageFlow } from '@/components/ArbitrageFlow'
import { PriceOfInjustice } from '@/components/PriceOfInjustice'

/**
 * Module 8 — Finance, Governance, and Society.
 * (Coursera "Corporate Finance II · Module 4", Almeida & Zeume.)
 *
 * Same summary-first layout as Modules 1–7: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with the full lecture prose behind a toggle), the live
 * session corruption mini-case, the closing "whose NPV is it?" review, a
 * cheat-sheet, collapsible academic papers, and a quiz CTA. Page copy is
 * English; the Russian study notes live in the KnowledgeDB markdown file.
 *
 * The module is about the LIMITS of the NPV rule: agency costs of debt,
 * finance & society (externalities), and violations of the law of one price.
 */
export function Module8Content() {
  return (
    <div className="space-y-4">
      <LessonRail lessons={RAIL_LESSONS} />

      {/* INTRO ─────────────────────────────────────────────────────────── */}
      <LessonSection
        id="intro"
        summary={SUMMARIES.intro}
        visuals={<NPVChallengesMap />}
        toggleLabel={{ open: 'Show full intro', close: 'Hide full intro' }}
      >
        <LessonBlock>
          <p>
            All of finance reduces to one equation — the course &ldquo;tattoo.&rdquo; We discount future cash flows,
            subtract the initial investment, and invest if the result is positive.
          </p>
          <Formula caption="Invest if NPV > 0 — discount FCF at the WACC">NPV = −I + PV(FCF)</Formula>
          <p>
            Everything so far plugs into it: <strong>accept if NPV&gt;0</strong> and{' '}
            <strong>maximize the stock price</strong> (Modules 1, 3), use <strong>incremental free cash flows</strong>{' '}
            (Module 3), <strong>forecast</strong> them (Module 2), discount at the <strong>WACC</strong> (Module 4),
            which <strong>leverage</strong> (Modules 5–6) and <strong>risk management</strong> (Module 7) both move. In
            math, maximizing this is trivial. This module is about the <strong>three things outside the equation</strong>{' '}
            that break the simple rule.
          </p>
          <CompareTable
            headers={['Challenge', 'What breaks', 'Where']}
            rows={[
              ['Agency costs of debt', 'Shareholders accept −NPV or reject +NPV projects', 'Lessons 8-1 → 8-3'],
              ['Finance & society', 'The firm’s NPV imposes costs on non-shareholders (externalities)', 'Lesson 8-4'],
              ['NPV ≠ −I + PV(FCF)', 'The equation itself fails — arbitrage, or bias/injustice', 'Lesson 8-5'],
            ]}
          />
          <KeyTakeaway>
            The single idea running through the module: keep asking <strong>&ldquo;whose NPV is it?&rdquo;</strong> The
            NPV a firm maximizes can diverge from society&apos;s NPV, from creditors&apos; interests, and even from what
            the decision-maker personally maximizes.
          </KeyTakeaway>
          <p className="text-[13px] text-ink-muted">
            One topic is <em>not</em> repeated here: corporate governance (managers vs shareholders) was Module 1,
            Lesson 4. It reappears only in the closing review.
          </p>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 8-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="8-1" summary={SUMMARIES['8-1']} visuals={<BankruptcyWaterfall />}>
        <LessonBlock eyebrow="8.1 · Setup" title="Who gets what in bankruptcy">
          <p>
            To see how debt distorts investment, remember the pecking order in bankruptcy. There are two claimants:{' '}
            <strong>debtholders</strong> (e.g., the bank) and <strong>equity holders</strong> (shareholders).
          </p>
          <Definition term="Absolute priority (seniority of debt)">
            Debtholders are <strong>senior</strong> — repaid in full before equity gets anything. Shareholders are the{' '}
            <strong>residual claimant</strong>: they receive only what is left over.
          </Definition>
          <Definition term="Limited liability">
            Equity value can never go below zero — shareholders cannot lose more than they invested.
          </Definition>
          <Formula caption="Equity behaves like a call option on the firm’s assets">
            Value of Equity = max(Assets − Debt, 0)
          </Formula>
          <p>Three firms, all with $1M of debt, differ only in asset value:</p>
          <CompareTable
            headers={['Firm', 'Assets', 'Debt', 'Debtholders get', 'Equity = max(A−D,0)']}
            rows={[
              ['XX Corp', '$3.0M', '$1M', '$1.0M', '$2.0M'],
              ['YY Corp', '$1.0M', '$1M', '$1.0M', '$0'],
              ['ZZ Corp', '$0.5M', '$1M', '$0.5M', '$0'],
            ]}
          />
          <p>
            Shareholders love XX; between YY and ZZ they are <strong>indifferent</strong> (zero either way). Debtholders
            hate ZZ; between XX and YY they are indifferent (fully repaid either way). Now imagine you are YY and a
            project could turn you into <em>either</em> XX <em>or</em> ZZ: shareholders can only{' '}
            <strong>win</strong>, debtholders can only <strong>lose</strong>. That asymmetry is the seed of the two
            agency costs of debt.
          </p>
          <KeyTakeaway>
            Limited liability makes equity an option on the assets: shareholders keep the upside and hand the downside
            below the debt to creditors. With a lot of debt, this warps investment incentives in <em>both</em>{' '}
            directions — too much risk, and too little investment.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 8-2 ─────────────────────────────────────────────────────── */}
      <LessonSection id="8-2" summary={SUMMARIES['8-2']} visuals={<AgencyCostExplorer />}>
        <LessonBlock eyebrow="8.2 · Excessive risk taking" title="Gambling for resurrection">
          <Definition term="Excessive risk taking (gambling for resurrection)">
            Shareholders take a <strong>negative-NPV risky</strong> project because they don&apos;t bear the cost if it
            fails: success pays them, failure is borne by someone else (mostly the debtholders).
          </Definition>
          <p>
            The intuition-pump: FedEx&apos;s founder once took the firm&apos;s last ~<strong>$5,000</strong> to Las
            Vegas and <strong>won ~$32,000</strong>, covering a fuel bill and saving the company. With the firm
            otherwise doomed, a negative-NPV gamble was rational — do nothing and lose the company, gamble and lose the
            company (no worse), gamble and win and survive.
          </p>
          <p>
            <strong>Scooter Inc.</strong> A $1M loan is due in a year; assets are expected to be worth $900k (default
            looms). A no-cost risky project gives 50% → $1.3M and 50% → $0.3M.
          </p>
          <Formula caption="Objectively a bad project — should be rejected">
            E[firm value] = 0.5×$1.3M + 0.5×$0.3M = $0.8M &lt; $0.9M → destroys $100k
          </Formula>
          <p>
            Yet the parties split it very differently (use the toggle above): <strong>debtholders</strong> fall from
            $900k to $650k (−$250k), while <strong>equity</strong> rises from $0 to $150k (0.5×$300k). Shareholders,
            with nothing to lose and a shot at the upside, <strong>take the value-destroying gamble</strong> — at the
            creditors&apos; expense.
          </p>
          <Pitfall>
            The creditors&apos; loss ($250k) exceeds the shareholders&apos; gain ($150k). The $100k difference is exactly
            the value destroyed — this is not a free transfer, it shrinks the whole pie.
          </Pitfall>
          <KeyTakeaway>
            Excessive risk taking ⇒ investment in negative-NPV projects, driven by <strong>debt overhang</strong>.
            Standard fixes: <strong>covenants</strong> (caps on risky investments) and <strong>monitoring</strong>.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 8-3 ─────────────────────────────────────────────────────── */}
      <LessonSection id="8-3" summary={SUMMARIES['8-3']} visuals={<HaircutSlider />}>
        <LessonBlock eyebrow="8.3 · Underinvestment" title="Debt overhang and the haircut">
          <Definition term="Underinvestment (debt overhang)">
            Shareholders <strong>reject a positive-NPV</strong> project because they fund it out of pocket while the
            benefit accrues to the senior creditors.
          </Definition>
          <p>
            <strong>Scooter Inc.</strong> again ($1M loan, $900k assets). A <em>riskless</em> project: invest $100k
            today → $150k next year, so NPV = +$50k — objectively worth doing. But the firm has no cash, so shareholders
            must inject the $100k.
          </p>
          <CompareTable
            headers={['Party', 'No project', 'With project', 'Verdict']}
            rows={[
              ['Debtholders', '$900k', '$1,000k (fully repaid) → +$100k', 'want it'],
              ['Equity', '$0', 'inject $100k, get $50k back → −$50k', 'reject it'],
            ]}
          />
          <p>
            The positive-NPV project is <strong>forgone</strong> because the bank reaps the benefit while shareholders
            bear the cost. Two cures:
          </p>
          <p>
            <strong>1 · Project finance.</strong> Shareholders set up a <em>separate</em> company (beyond the reach of
            the old debt), invest $100k, earn $150k, and keep the $50k NPV themselves.
          </p>
          <p>
            <strong>2 · Haircut.</strong> The bank voluntarily cuts the loan&apos;s face value to unlock the project.
            Since it would otherwise recover only $900k but $1,000k with the project, it can share that gain. Cutting to{' '}
            <strong>$925k</strong> gives debtholders $925k (&gt; $900k) and equity +$25k — a win-win (use the slider
            above to find the whole $900k–$950k band).
          </p>
          <KeyTakeaway>
            Underinvestment ⇒ rejection of positive-NPV projects, again from debt overhang. Cured by{' '}
            <strong>project finance</strong> or a <strong>debt haircut</strong> (renegotiation).
          </KeyTakeaway>
          <Pitfall>
            Don&apos;t conflate the two: <strong>excessive risk taking</strong> = <em>take</em> a bad risky project;{' '}
            <strong>underinvestment</strong> = <em>reject</em> a good project needing shareholders&apos; own money. Same
            cause (debt), different cures.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 8-4 ─────────────────────────────────────────────────────── */}
      <LessonSection id="8-4" summary={SUMMARIES['8-4']} visuals={<BriberyNPVDecision />}>
        <LessonBlock eyebrow="8.4 · Finance & society" title="Corruption: whose NPV is it?">
          <p>
            Is maximizing shareholder wealth consistent with social responsibility? Maximizing the firm&apos;s NPV can
            impose <strong>externalities</strong> on non-shareholders — unhealthy products, pollution, outsourcing, tax
            avoidance, and (the case here) <strong>corruption</strong>.
          </p>
          <CompareTable
            headers={['View of corruption', 'Claim', 'Evidence']}
            rows={[
              ['Sand in the wheels', 'Bribes slow the whole machine', 'Most evidence supports this'],
              ['Greasing the wheels', 'Nothing works without side payments', 'Weak — only where taxes are very high'],
            ]}
          />
          <p>
            Wealthier countries are less corrupt; the <strong>World Bank</strong> estimates corruption costs{' '}
            <strong>$2.6 trillion a year (~5% of global GDP)</strong>. Now the firm&apos;s decision — treat it as pure
            NPV (use the calculator above):
          </p>
          <Formula caption="Contract $10k · bribe $1k · 20% win — no regulation">
            NPV(bribe) = −$1,000 + 0.20 × $10,000 = +$1,000 → bribe
          </Formula>
          <Formula caption="Add a $100k fine with 2% detection">
            NPV(bribe) = −$1,000 + 0.20 × $10,000 − 0.02 × $100,000 = −$1,000 → don’t bribe
          </Formula>
          <p>
            Regulation flips the decision and, from the firm&apos;s private view, <strong>destroys value</strong>{' '}
            (+$1,000 → $0) — while benefiting society. That wedge is the whole point.
          </p>
          <CaseStudy title="Is bribery really out there? Zeume (2017) and the UK Bribery Act">
            <p>
              Firms won&apos;t admit to bribing, so the World Bank ran an <strong>anonymous</strong> survey asking
              whether <em>competitors</em> bribe: <strong>one in three</strong> said yes (in perceivably corrupt
              countries). To measure the value at stake, <strong>Zeume (2017)</strong> studied stock prices around the{' '}
              <strong>UK Bribery Act</strong>: returns were <strong>negative</strong> for oil &amp; gas and
              aero/defense firms and for UK firms operating in corrupt countries, but <strong>positive</strong> for
              their non-UK competitors — a side effect of <em>unilateral</em> regulation. Afterwards UK firms saw slower
              sales growth and fewer M&amp;As there. Takeaway: firms use bribes to <em>create</em> NPV, and costly
              regulation <em>destroys</em> it.
            </p>
            <p className="text-[12px] text-ink-muted italic">
              Precision note: the UK Bribery Act was enacted in 2010 (in force 2011); &ldquo;2017&rdquo; is the year of
              Zeume&apos;s paper, which studies it.
            </p>
          </CaseStudy>
          <KeyTakeaway>
            <strong>
              NPV<sub>firm</sub> ≠ NPV<sub>society</sub>
            </strong>
            . Maximizing the firm&apos;s NPV can have externalities; the social cost never enters the firm&apos;s own
            calculation.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 8-5 ─────────────────────────────────────────────────────── */}
      <LessonSection id="8-5" summary={SUMMARIES['8-5']} visuals={<><ArbitrageFlow /><PriceOfInjustice /></>}>
        <LessonBlock eyebrow="8.5 · Law of one price" title="Arbitrage — and using it to uncover injustice">
          <p>
            Two projects with the same investment, same cash flows, and same risk should have the{' '}
            <strong>same NPV</strong>. The general version:
          </p>
          <Definition term="Law of one price">
            The same good or asset trading in two markets at the same time must have the <strong>same price</strong> in
            both. (Gold at $2,000 in New York should be $2,000 in London; a $1 toothbrush + $4 toothpaste bundle should
            cost $5.)
          </Definition>
          <Definition term="Arbitrage">
            Buying and selling the same good in two markets simultaneously to pocket a price difference with{' '}
            <strong>no risk</strong>. Gold $1,900 London vs $2,000 New York → buy low, sell high, earn $100.
          </Definition>
          <p>
            So why aren&apos;t we all rich? <strong>Limits to arbitrage</strong>: transaction costs, price risk (the
            price moves before you finish), competition (other traders converge the prices), and scalability (supply and
            demand move against volume). CVS $2 vs Walgreens $1.95 looks like a nickel of arbitrage — but would CVS buy
            your toothbrush?
          </p>
          <p>
            The powerful twist: when a violation <em>cannot</em> be arbitraged away, it can reveal{' '}
            <strong>bias</strong>. Comparable schools should pay the same to issue comparable bonds — but{' '}
            <strong>HBCUs pay ~20% higher underwriting fees</strong> (Dougal, Gao, Mayew &amp; Parsons 2019), and the
            authors cannot rule out race. Same-credit-score <strong>Black and Hispanic auto borrowers</strong> pay ~70
            bps more and default <em>less</em> (Butler, Mayer &amp; Weston 2020). Within the same occupations,{' '}
            <strong>women earned ~8.4% less</strong> (Blau &amp; Kahn 2017).
          </p>
          <KeyTakeaway>
            If <span className="font-mono">NPV ≠ −I + PV(FCF)</span>, suspect either an <strong>arbitrage</strong> or a{' '}
            <strong>bias</strong>. The law of one price becomes a tool for measuring injustice — with far-reaching
            implications for society.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LIVE SESSION ───────────────────────────────────────────────────── */}
      <LessonSection id="live" summary={SUMMARIES.live}>
        <LessonBlock eyebrow="Live session" title="The bribe mini-case: a facilitation payment">
          <CaseStudy title="Supermarket expansion into a perceivably corrupt country">
            <p>
              You run expansion for a US supermarket chain and apply for a license to open two stores. The official says
              the license will &ldquo;probably&rdquo; come in <strong>two years</strong> — but a{' '}
              <strong>$10,000 cash facilitation payment</strong> shortens the wait and raises the probability of
              approval to <strong>100%</strong>. Should you pay?
            </p>
          </CaseStudy>
          <p>
            <strong>Pure NPV.</strong> The bribe buys a faster, more certain cash-flow stream from the two stores. If the
            present value of that acceleration/certainty exceeds $10,000 (net of the expected penalty,{' '}
            <span className="font-mono">p(detect)×fine</span>), the naked NPV rule says pay — but anti-bribery law (US
            FCPA, UK Bribery Act) plus reputational and criminal risk is exactly the term that flips it. And{' '}
            <strong>
              NPV<sub>firm</sub> ≠ NPV<sub>society</sub>
            </strong>
            : the social cost never enters your spreadsheet.
          </p>
          <p>
            <strong>The agency twist.</strong> Suppose the company&apos;s NPV of bribing is negative, but{' '}
            <em>you personally</em> gain (a big bonus for &ldquo;stores opened&rdquo;). Now{' '}
            <strong>
              NPV<sub>decision-maker</sub> ≠ NPV<sub>firm</sub>
            </strong>
            . To stop you, the firm can fix <strong>incentives</strong> (don&apos;t reward results achieved illegally;
            clawbacks), and add <strong>compliance, monitoring, internal controls</strong>, a code of conduct, and
            approval segregation.
          </p>
          <CompareTable
            headers={['Question', 'Lever']}
            rows={[
              ['Stop the employee bribing', 'Incentives (no bonus for illegal wins, clawbacks), compliance & monitoring'],
              ['Stop the official soliciting', 'Higher official pay, transparency/digitization, rotation, audits, whistleblower protection'],
              ['Discourage firms from bribing', 'Real fines × detection, extraterritorial laws (FCPA/UK), international coordination'],
            ]}
          />
          <Pitfall>
            Unilateral regulation has a catch (Zeume 2017): if only your country bans bribes, your firms retreat and{' '}
            <em>foreign</em> competitors win the contracts. Coordination matters.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* REVIEW ─────────────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review}>
        <LessonBlock eyebrow="Module 8 · Review" title="Whose NPV is it?">
          <p>
            Three closing cases show what the naive NPV rule misses — each a different wedge between the NPV being
            maximized and the one that &ldquo;should&rdquo; be.
          </p>
          <CaseStudy title="Jérôme Kerviel · Société Générale — NPV(decision-maker) ≠ NPV(shareholders)">
            <p>
              A trader lost roughly <strong>$5 billion</strong> (≈ €4.9B) on risky bets. He traded on his{' '}
              <em>own</em> payoff: a huge bonus if the bets won, limited personal downside if they lost — with the
              investors&apos; money at stake. A pure agency/governance conflict (he went to prison; it wasn&apos;t his
              money). Shareholders would have preferred a standard, diversified strategy.
            </p>
          </CaseStudy>
          <CaseStudy title="Exxon Valdez (1989) — NPV(company) ≠ NPV(society)">
            <p>
              The oil spill may trace to saving on the tanker: a <strong>single-hull</strong> hull is cheaper and
              carries more oil (higher firm NPV), a <strong>double-hull</strong> is safer (higher social NPV). Minimizing
              cost, the firm can overlook enormous external costs. (The US OPA 1990 later mandated double hulls.)
            </p>
          </CaseStudy>
          <CaseStudy title="Larry & Beth Gies — value beyond dollars">
            <p>
              The Gies family donated millions to the college. On pure NPV, giving money away looks negative — but
              society benefits and so does the family (giving back). Some value simply doesn&apos;t translate into dollar
              signs.
            </p>
          </CaseStudy>
          <KeyTakeaway>
            In finance we discount future cash flows and invest if NPV&gt;0 — but watch for <strong>agency costs of
            debt</strong>, <strong>finance-and-society externalities</strong>, and cases where{' '}
            <span className="font-mono">NPV ≠ −I + PV(FCF)</span>. Always ask: <strong>whose NPV is it?</strong>
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* CHEAT-SHEET ───────────────────────────────────────────────────── */}
      <section id="lesson-cheat" className="scroll-mt-32 card p-6">
        <div className="text-[11px] uppercase tracking-widest text-brand-300 mb-1">Reference</div>
        <h2 className="font-display text-2xl font-semibold leading-tight mb-4">Formula &amp; number cheat-sheet</h2>
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
              <p className="text-sm text-ink-muted">20 questions for Module 8 · 4 easy · 12 medium · 4 hard.</p>
            </div>
          </div>
          <Link to="/quiz?module=8" className="btn-primary">
            <BookOpen size={16} /> Start Module 8 quiz <ArrowRight size={16} />
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
  { id: 'intro', label: 'Overview' },
  { id: '8-1', label: '8·1 Bankruptcy' },
  { id: '8-2', label: '8·2 Risk taking' },
  { id: '8-3', label: '8·3 Underinvestment' },
  { id: '8-4', label: '8·4 Corruption' },
  { id: '8-5', label: '8·5 Law of one price' },
  { id: 'live', label: 'Bribe mini-case' },
  { id: 'review', label: 'Whose NPV?' },
  { id: 'cheat', label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 8 · Overview',
    title: 'Finance, Governance, and Society',
    tldr: (
      <>
        The whole course is <span className="font-mono">NPV = −I + PV(FCF)</span>; this module is about the{' '}
        <strong>three ways it breaks</strong>: agency costs of debt, finance-and-society externalities, and violations
        of <span className="font-mono">NPV = −I + PV(FCF)</span>.
      </>
    ),
    keyPoints: [
      <>Agency costs of debt: shareholders accept −NPV (risk taking) or reject +NPV (underinvestment) projects.</>,
      <>Finance &amp; society: the firm&apos;s NPV can hurt non-shareholders — corruption is the worked case.</>,
      <>Law of one price: when NPV ≠ −I + PV(FCF), suspect arbitrage — or bias.</>,
      <>The refrain: <strong>whose NPV is it?</strong> Governance (managers vs shareholders) was Module 1.</>,
    ],
  },

  '8-1': {
    eyebrow: 'Lesson 8-1',
    title: 'Who gets what in bankruptcy',
    tldr: (
      <>
        Debt is <strong>senior</strong>; equity is the <strong>residual claimant</strong> worth{' '}
        <span className="font-mono">max(A − D, 0)</span>. Limited liability floors equity at zero — the seed of both
        agency costs of debt.
      </>
    ),
    keyPoints: [
      <>XX (A $3M) → equity $2M; YY (A $1M) → $0; ZZ (A $0.5M) → $0, bank recovers only $0.5M.</>,
      <>Move YY toward XX or ZZ: shareholders can only win, debtholders can only lose.</>,
      <>Equity is like a call option on the firm&apos;s assets.</>,
    ],
    formulas: [{ label: 'Equity value', expr: 'max(Assets − Debt, 0)' }],
  },

  '8-2': {
    eyebrow: 'Lesson 8-2',
    title: 'Excessive risk taking',
    tldr: (
      <>
        &ldquo;Gambling for resurrection&rdquo;: distressed shareholders take a <strong>−NPV risky</strong> project
        because they keep the upside and creditors bear the downside. Scooter Inc.: firm value $900k→$800k, yet equity
        +$150k.
      </>
    ),
    keyPoints: [
      <>FedEx founder: last ~$5k → ~$32k in Vegas, saving the firm — nothing to lose.</>,
      <>Scooter risky project: 0.5×$1.3M + 0.5×$0.3M = $0.8M → destroys $100k.</>,
      <>Debtholders $900k→$650k (−$250k); equity $0→$150k (+$150k) → they take it.</>,
      <>Fix: covenants + monitoring.</>,
    ],
    formulas: [
      { label: 'E[value]', expr: '0.5×1.3 + 0.5×0.3 = 0.8M' },
      { label: 'Equity', expr: '0.5×$300k = $150k' },
    ],
  },

  '8-3': {
    eyebrow: 'Lesson 8-3',
    title: 'Underinvestment & the haircut',
    tldr: (
      <>
        Debt overhang makes shareholders <strong>reject a +NPV</strong> project they must fund. Scooter Inc.: invest
        $100k → $150k (NPV +$50k), but equity nets −$50k. Cure with project finance or a <strong>haircut</strong>.
      </>
    ),
    keyPoints: [
      <>Debtholders $900k→$1,000k (+$100k); equity $0→−$50k → reject.</>,
      <>Project finance: fund it in a separate company, keep the $50k.</>,
      <>Haircut to $925k: debt $925k (&gt;$900k), equity +$25k — win-win (band $900k–$950k).</>,
    ],
    formulas: [
      { label: 'Project NPV', expr: '150 − 100 = +$50k' },
      { label: 'Equity (no haircut)', expr: '(1050 − 1000) − 100 = −$50k' },
    ],
  },

  '8-4': {
    eyebrow: 'Lesson 8-4',
    title: 'Finance & society: corruption',
    tldr: (
      <>
        Maximizing the firm&apos;s NPV can impose <strong>externalities</strong>. A bribe can be +NPV for the firm;
        anti-bribery law adds <span className="font-mono">−p(detect)×fine</span>, flipping the decision and cutting firm
        value while helping society.
      </>
    ),
    keyPoints: [
      <>&ldquo;Sand in the wheels&rdquo; wins the evidence; World Bank: ~$2.6T/yr (~5% of GDP).</>,
      <>No reg: −1,000 + 0.2×10,000 = +$1,000 → bribe.</>,
      <>With reg (fine $100k, 2% detect): −1,000 + 2,000 − 2,000 = −$1,000 → don&apos;t.</>,
      <>Zeume (2017), UK Bribery Act: −returns for suspect firms, +returns for foreign rivals.</>,
    ],
    formulas: [
      { label: 'Bribe NPV', expr: '−bribe + p(win)·V − p(detect)·fine' },
      { label: 'Wedge', expr: 'NPV_firm ≠ NPV_society' },
    ],
  },

  '8-5': {
    eyebrow: 'Lesson 8-5',
    title: 'Law of one price & injustice',
    tldr: (
      <>
        Same good, same price. Gold $1,900 London vs $2,000 NY → $100 arbitrage (bounded by transaction costs, price
        risk, competition, scalability). Non-arbitrageable gaps can reveal <strong>bias</strong>.
      </>
    ),
    keyPoints: [
      <>HBCUs pay ~20% higher bond underwriting fees (Dougal-Gao-Mayew-Parsons 2019).</>,
      <>Equal-score Black/Hispanic auto borrowers: ~70 bps more, default less (Butler-Mayer-Weston 2020).</>,
      <>Same-occupation gender wage gap ~8.4% (Blau &amp; Kahn 2017).</>,
      <>NPV ≠ −I + PV(FCF) ⇒ arbitrage or bias.</>,
    ],
    formulas: [{ label: 'Gold arbitrage', expr: '$2,000 − $1,900 = $100' }],
  },

  live: {
    eyebrow: 'Live session',
    title: 'The bribe mini-case',
    tldr: (
      <>
        A $10,000 facilitation payment turns a 2-year, uncertain license into an instant, certain one. Pure NPV may say
        pay — but regulation and{' '}
        <strong>
          NPV<sub>firm</sub> ≠ NPV<sub>society</sub>
        </strong>{' '}
        say otherwise; and an employee&apos;s bonus can make them bribe even when the firm shouldn&apos;t.
      </>
    ),
    keyPoints: [
      <>Firm value: acceleration/certainty vs bribe + expected penalty.</>,
      <>Agency twist: NPV(decision-maker) ≠ NPV(firm) → fix incentives, compliance, monitoring.</>,
      <>Government levers: pay/transparency for officials; fines × detection and coordination for firms.</>,
      <>Unilateral bans hand contracts to foreign rivals (Zeume 2017).</>,
    ],
  },

  review: {
    eyebrow: 'Module 8 · Review',
    title: 'Whose NPV is it?',
    tldr: (
      <>
        Kerviel (NPV of the <strong>decision-maker</strong> ≠ shareholders), Exxon Valdez (NPV of the{' '}
        <strong>company</strong> ≠ society), and the Gies gift (value beyond dollars) — three wedges the naive NPV rule
        misses.
      </>
    ),
    keyPoints: [
      <>Kerviel: ~$5B lost; bonus-driven risk, investors&apos; money — agency/governance.</>,
      <>Exxon Valdez: single- vs double-hull — firm cost vs social safety.</>,
      <>Gies donation: charity looks −NPV but creates non-dollar value.</>,
      <>Always ask: whose NPV is being maximized?</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Course summary', formula: 'NPV = −I + PV(FCF)', hint: 'invest if NPV > 0; discount at WACC' },
  { name: 'Equity value', formula: 'max(Assets − Debt, 0)', hint: 'limited liability; a call on assets' },
  { name: 'Risk taking (firm)', formula: '0.5×1.3 + 0.5×0.3 = 0.8M', hint: 'destroys $100k vs $900k' },
  { name: 'Risk taking (equity)', formula: '0.5×$300k = $150k', hint: 'vs $0 → they take the −NPV gamble' },
  { name: 'Risk taking (debt)', formula: '0.5×$1M + 0.5×$0.3M = $650k', hint: '−$250k vs $900k' },
  { name: 'Underinvestment NPV', formula: '150 − 100 = +$50k', hint: 'riskless project, r = 0' },
  { name: 'Equity (no haircut)', formula: '(1050 − 1000) − 100 = −$50k', hint: 'reject the +NPV project' },
  { name: 'Haircut win-win', formula: '$900k ≤ F ≤ $950k', hint: 'F=$925k → debt $925k, equity +$25k' },
  { name: 'Bribe NPV (no reg)', formula: '−1,000 + 0.2×10,000 = +$1,000', hint: 'bribe' },
  { name: 'Bribe NPV (reg)', formula: '… − 0.02×100,000 = −$1,000', hint: 'don’t bribe; value +1,000 → 0' },
  { name: 'Gold arbitrage', formula: '$2,000 − $1,900 = $100', hint: 'buy low (London), sell high (NY)' },
  { name: 'Whose NPV?', formula: 'firm ≠ society ≠ decision-maker', hint: 'the module in three words' },
]

const PAPERS = [
  {
    cite: 'Jensen & Meckling (1976)',
    title: 'Theory of the Firm: Managerial Behavior, Agency Costs and Ownership Structure',
    idea: 'Founding treatment of agency costs of debt and equity, including asset substitution — why levered shareholders favor risk.',
    connection: 'The core of Lessons 8-1 and 8-2.',
  },
  {
    cite: 'Myers (1977)',
    title: 'Determinants of Corporate Borrowing',
    idea: 'Introduces debt overhang: outstanding risky debt makes shareholders pass up positive-NPV investment.',
    connection: 'The engine of Lesson 8-3 (underinvestment).',
  },
  {
    cite: 'Smith & Warner (1979)',
    title: 'On Financial Contracting: An Analysis of Bond Covenants',
    idea: 'Covenants are the contractual response to agency costs of debt — restricting investment, dividends, and further borrowing.',
    connection: 'The "how to fix it" in Lessons 8-2 and 8-3.',
  },
  {
    cite: 'Jensen (1986)',
    title: 'Agency Costs of Free Cash Flow, Corporate Finance, and Takeovers',
    idea: 'Free cash flow can be over-invested by managers; debt disciplines them — the governance backdrop.',
    connection: 'Governance thread (Module 1) and the review.',
  },
  {
    cite: 'Modigliani & Miller (1958)',
    title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
    idea: 'In frictionless markets, purely financial choices are value-irrelevant; agency costs arise from frictions.',
    connection: 'The baseline the module departs from.',
  },
  {
    cite: 'Mauro (1995)',
    title: 'Corruption and Growth',
    idea: 'Cross-country evidence that corruption lowers investment and growth — the empirical "sand in the wheels."',
    connection: 'Social cost of corruption (Lesson 8-4).',
  },
  {
    cite: 'Shleifer & Vishny (1993)',
    title: 'Corruption',
    idea: 'An economic theory of why corruption is distortionary and costly, not merely redistributive.',
    connection: 'Why bribery is "sand in the wheels" (Lesson 8-4).',
  },
  {
    cite: 'Zeume (2017)',
    title: 'Bribes and Firm Value',
    idea: 'Event study around the UK Bribery Act: suspect firms lose value, foreign competitors gain, sales growth and M&A slow.',
    connection: 'The direct source for Lesson 8-4.',
  },
  {
    cite: 'Dougal, Gao, Mayew & Parsons (2019)',
    title: 'What’s in a (school) name? Racial discrimination in higher education bond markets',
    idea: 'HBCUs pay ~20% higher underwriting fees on otherwise comparable bonds; risk cannot fully explain it.',
    connection: 'Law of one price and injustice (Lesson 8-5).',
  },
  {
    cite: 'Butler, Mayer & Weston (2020)',
    title: 'Racial Disparities in the Auto Loan Market',
    idea: 'Equal-credit-score minority borrowers are approved less, pay ~70 bps more, and default less — inconsistent with a risk story.',
    connection: 'Law of one price and injustice (Lesson 8-5).',
  },
  {
    cite: 'Blau & Kahn (2017)',
    title: 'The Gender Wage Gap: Extent, Trends, and Explanations',
    idea: 'A within-occupation wage gap (~8.4%, 1990–2010) that standard controls do not eliminate.',
    connection: 'Law of one price and injustice (Lesson 8-5).',
  },
]

function PapersSection() {
  const [open, setOpen] = useState(false)
  return (
    <section className="card p-5">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-3 text-left">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Academic foundations</div>
          <h3 className="font-display text-lg font-semibold">11 papers behind Module 8</h3>
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
