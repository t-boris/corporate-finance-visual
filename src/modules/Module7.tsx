import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonBlock, Definition, Formula, KeyTakeaway, Pitfall, CaseStudy, CompareTable } from '@/components/LessonBlock'
import { LessonRail } from '@/components/LessonRail'
import { LessonSection, type LessonSummary } from '@/components/LessonSection'
import { DistressHedging } from '@/components/DistressHedging'
import { ForwardHedgeLock } from '@/components/ForwardHedgeLock'
import { FuturesSearchForZero } from '@/components/FuturesSearchForZero'
import { InterestRateSwapFlow } from '@/components/InterestRateSwapFlow'
import { LiquidityHedgeMatrix } from '@/components/LiquidityHedgeMatrix'
import { ExposureCompass } from '@/components/ExposureCompass'

/**
 * Module 7 — Risk Management.
 * (Coursera "Corporate Finance II · Module 3", Almeida & Zeume.)
 *
 * Same summary-first layout as Modules 1–6: a sticky LessonRail, per-lesson
 * LessonSections (TL;DR + key points + formulas + always-visible
 * visualizations, with the full lecture prose behind a toggle), the live
 * session cases (Nintendo vs Rolls-Royce, oil 2026), a cheat-sheet,
 * collapsible academic papers, and a quiz CTA. Page copy is English; the
 * Russian study notes live in the KnowledgeDB markdown file.
 */
export function Module7Content() {
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
            Companies can use financial instruments to <strong>reduce or reallocate risks</strong> — traded contracts
            such as <strong>forwards, futures, options, and swaps</strong> (collectively,{' '}
            <strong>financial derivatives</strong>) — and also non-derivative mechanisms:{' '}
            <strong>liquidity</strong> and <strong>operational hedging</strong>. This reduction or reallocation of risk
            is what finance calls <strong>hedging</strong>.
          </p>
          <p>
            The module answers five questions. When is hedging a <em>good</em> idea — and when is it{' '}
            <strong>speculation</strong> in disguise? How do forwards and futures actually work (rates, margins,
            marking to market)? How do you hedge <strong>currency</strong> and <strong>interest-rate</strong> risk —
            the two risks the videos focus on? What do you do when the derivative doesn&apos;t exist or hedges only
            part of the risk? And how can changing <em>operations</em> remove currency risk altogether?
          </p>
          <KeyTakeaway>
            The single most useful idea: <strong>hedging is the search for zero</strong>. Determine the firm&apos;s
            operational exposure, then take the financial position that moves profits the <em>opposite</em> way. A
            &ldquo;hedge&rdquo; in the same direction as the exposure — like Nintendo&apos;s $7.4B foreign-cash pile —
            is speculation, whatever it&apos;s called.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 7-1 ─────────────────────────────────────────────────────── */}
      <LessonSection id="7-1" summary={SUMMARIES['7-1']} visuals={<DistressHedging />}>
        <LessonBlock eyebrow="7.1 · Why hedge?" title="Good and bad reasons to hedge">
          <p>
            <strong>Bad reason #1 — &ldquo;we smooth our volatile profits.&rdquo;</strong> A cyclical company using
            derivatives to smooth profit fluctuations sounds prudent, but reducing volatility{' '}
            <strong>per se</strong> does not increase shareholder value: shareholders can manage risk on their own —
            the same argument that kills diversifying M&amp;A deals (Module 4). And remember,{' '}
            <strong>no risk = no return</strong> — eliminating all cash-flow risk eliminates the potential returns too.
          </p>
          <p>
            <strong>Bad reason #2 — &ldquo;we know where prices are going.&rdquo;</strong> A manufacturer that
            &ldquo;knows the steel market&rdquo; and shorts steel futures because the CFO expects prices to fall is not
            hedging — it is <strong>speculating</strong>. A general principle of finance:{' '}
            <strong>prices are unpredictable</strong>. If the CFO can really forecast steel, he should{' '}
            <em>move to the financial sector</em> — there is no business playing with the company&apos;s finances to
            chase trading profits.
          </p>
          <Definition term="Speculation">
            Using derivatives (or balance-sheet positions) to profit from a view about future prices — the opposite of
            hedging. Warren Buffett called derivatives &ldquo;financial weapons of mass destruction&rdquo; precisely
            because many companies use them this way.
          </Definition>
          <p>Three <strong>good</strong> reasons to hedge:</p>
          <CompareTable
            headers={['Good reason', 'Example', 'Why it makes sense']}
            rows={[
              [
                '1 · Choosing which risks to take',
                'US company opens a branch in India; sales in rupees',
                'Keep the Indian-market exposure (demand, product), drop the currency exposure',
              ],
              [
                '2 · Eliminating risks outside the company\'s control',
                'Airline hedges oil so profits reflect tickets sold, not oil',
                'Cleaner performance measurement — don\'t pay (or punish) the CEO for the oil price',
              ],
              [
                '3 · Reducing the risk of financial distress',
                'Highly levered airline hedges oil to avoid distress if prices spike',
                'Distress destroys value (Module 5); hedging cuts its probability and the cost of capital',
              ],
            ]}
          />
          <p>
            The distress logic deserves the diagram (above). An <strong>unlevered</strong> airline whose profit swings
            with the oil price has little to gain from hedging — volatility alone doesn&apos;t move value (maybe the
            compensation argument applies). Now add <strong>high leverage</strong>: an oil spike pushes profit below
            the debt payment, triggering <strong>financial distress</strong> — a higher cost of capital, lost value.
            For that firm, hedging oil is clearly valuable.
          </p>
          <KeyTakeaway>
            Hedging creates value when it reduces the probability of financial distress or removes noise from
            performance — not because lower volatility is good in itself. Shareholders diversify; companies
            shouldn&apos;t do it for them.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 7-2 ─────────────────────────────────────────────────────── */}
      <LessonSection id="7-2" summary={SUMMARIES['7-2']} visuals={<ForwardHedgeLock />}>
        <LessonBlock eyebrow="7.2 · Forwards" title="The forward contract: locking in a rate with a piece of paper">
          <Definition term="Forward contract">
            An obligation to exchange an asset (real or financial) at a future date, at a pre-specified price.{' '}
            <strong>No cash is exchanged when the contract is written</strong>; the two counterparties settle at
            maturity. Forwards/futures exist for tradable risks: currencies, commodities (oil, steel), interest rates.
          </Definition>
          <p>
            The lecture example: it is <strong>August 2025</strong>, and a US company must pay{' '}
            <strong>£200 million</strong> to a UK supplier in <strong>December 2025</strong>. Spot rate:{' '}
            <strong>$1.328/£</strong>. The risk: the pound <strong>appreciates</strong> and the dollar cost of the
            payment rises.
          </p>
          <p>
            The hedge: enter a forward to <strong>receive £200M in December</strong> — in the jargon,{' '}
            <strong>long pounds, short dollars</strong> (the counterparty is the mirror image). Forward markets quote a{' '}
            <strong>December-2025 forward rate</strong> of <strong>$1.329/£</strong>, so the company will pay exactly:
          </p>
          <Formula caption="The forward locks in the forward rate — not the spot">
            £200M × $1.329/£ = $265.8M — irrespective of the future exchange rate
          </Formula>
          <p>
            In December the company pays $265.8M, receives £200M, and pays the supplier. If the pound jumped to{' '}
            <strong>$1.50</strong>, the unhedged bill would have been <strong>$300M</strong> — the hedge saved $34.2M.
            If the pound <em>fell</em> to <strong>$1.00</strong>, the unhedged bill would have been just{' '}
            <strong>$200M</strong> — with the hedge you still pay $265.8M.
          </p>
          <Pitfall>
            You cannot lock in the <em>current</em> spot rate (1.328) — only the forward/futures rate (1.329). And the
            hedge &ldquo;cuts both ways&rdquo;: when the currency moves in your favor, you&apos;ll look like you
            overpaid. Why that is <em>not</em> a mistake is the point of the next lesson.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 7-3 ─────────────────────────────────────────────────────── */}
      <LessonSection id="7-3" summary={SUMMARIES['7-3']} visuals={<FuturesSearchForZero />}>
        <LessonBlock eyebrow="7.3 · Futures" title="Futures, margin accounts, and the search for zero">
          <p>
            A forward is literally a signed piece of paper with zero upfront cost — it only works if{' '}
            <strong>both parties are reliable</strong>. The worry that one side defaults is{' '}
            <strong>settlement risk</strong>; in practice forwards are used mainly within the financial industry and by
            companies with very high credit ratings (Module 6).
          </p>
          <Definition term="Futures contract">
            A <strong>standardized</strong> contract that trades on an exchange (like stocks — e.g., the{' '}
            <strong>CME</strong>, Chicago Mercantile Exchange). The exchange requires <strong>margin accounts</strong>{' '}
            from buyers and sellers and assumes the settlement risk — there is <strong>no direct counterparty</strong>.
            Contracts have minimum sizes.
          </Definition>
          <p>
            New example, opposite direction: the US company <strong>expects to receive £1 million</strong> from a
            customer in December 2025. To neutralize it, the company <strong>sells (shorts) pound futures</strong> —
            short pounds, long dollars — committing to pay pounds in exchange for dollars; the customer&apos;s payment
            covers the short.
          </p>
          <Formula caption="Contract math (contract size £62,500)">
            £1,000,000 / £62,500 = 16 contracts shorted at the Dec-25 futures rate of $1.329/£
          </Formula>
          <p>
            To open the position the CME requires a cash deposit — say <strong>$100,000</strong> — held in escrow
            (earning interest). Suppose that by September the futures price is <strong>$1.4/£</strong>. The pound
            appreciated, so the short position <em>lost</em> money:
          </p>
          <Formula caption="Marking to market">
            Loss = (1.4 − 1.329) × £1M = $71,000 → margin falls to $29,000 (+ accrued interest)
          </Formula>
          <p>
            The CME deducts the loss from the margin account (and will likely ask the company to top it up). Now the
            big question: <strong>did the CFO make a mistake?</strong> The answer is <strong>no</strong>. The goal was
            to eliminate exchange-rate risk — and the value of the £1M receivable went <em>up</em> by the same $71,000.
          </p>
          <Formula caption="This is what hedging means">
            Futures loss (−$71,000) + receivable gain (+$71,000) = 0 — &ldquo;hedging is the search for zero&rdquo;
          </Formula>
          <Pitfall>
            After the pound rose, the CFO&apos;s &ldquo;gut feeling&rdquo; says it will keep rising, so he proposes
            closing the short and going <strong>long</strong> pounds. Wrong: the CFO&apos;s opinion doesn&apos;t
            matter — <strong>no one can forecast exchange rates</strong> (finance research backs this). The position is
            dictated by the <strong>operational exposure</strong>: you receive pounds, so you short. A long position is
            a textbook example of <strong>speculation</strong>.
          </Pitfall>
          <KeyTakeaway>
            When you hedge, you are trying to get <strong>zero</strong>, not a trading profit. Judge a hedge by whether
            it removed the risk, never by the derivative&apos;s P&amp;L alone.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 7-4 ─────────────────────────────────────────────────────── */}
      <LessonSection id="7-4" summary={SUMMARIES['7-4']} visuals={<InterestRateSwapFlow />}>
        <LessonBlock eyebrow="7.4 · Interest-rate risk" title="Swaps for floating debt, futures for future issuance">
          <p>
            Interest rates create corporate risk through two channels: <strong>floating-rate debt</strong> and{' '}
            <strong>planned future issuance</strong>.
          </p>
          <p>
            <strong>Channel 1 — floating-rate debt.</strong> Smaller, riskier companies rely on bank debt (Module 6) —
            and bank debt is almost always <strong>floating rate</strong>: interest = <strong>base rate + fixed
            spread</strong>.
          </p>
          <Definition term="SOFR (Secured Overnight Financing Rate)">
            The interbank overnight rate used as the current risk-free benchmark for US loan pricing — the replacement
            for LIBOR (retired after its self-reporting scandals). August 2025 in the example: <strong>4.3%</strong>.
          </Definition>
          <p>
            A firm borrowing at <strong>SOFR + 2%</strong> currently pays <strong>6.3%</strong>. If SOFR rises to
            4.6%, the rate becomes 6.6% — for a small company, a potentially significant{' '}
            <strong>liquidity shock</strong> (Module 2). The fix — since bonds (fixed-rate) are out of reach — is an{' '}
            <strong>interest rate swap</strong>:
          </p>
          <Formula caption="Short fixed · long floating">
            Pay fixed 4.3% + receive floating SOFR ⇒ floating legs cancel ⇒ all-in rate = 6.3% fixed
          </Formula>
          <p>
            The company keeps paying its bank loan normally; the swap neutralizes base-rate moves. It cuts both ways:
            if SOFR falls, the firm pays above market — that possibility is why a counterparty signs.
          </p>
          <p>
            <strong>Channel 2 — future issuance.</strong> A company plans to issue <strong>$100M of commercial
            paper in 3 months</strong>; today&apos;s rate is <strong>4.5%</strong> (SOFR 4.3% + 0.2% CP spread — small,
            because only very reliable, high-rated firms can issue CP, Module 6). Fear: rates rise before issuance.
            The instrument: <strong>SOFR (3-month) futures</strong>. Which side? For debt securities,{' '}
            <strong>prices move inversely to rates</strong> — the firm fears higher rates = lower prices, so it{' '}
            <strong>sells (shorts)</strong> the futures: if prices fall, the short profits and compensates the higher
            borrowing rate.
          </p>
          <Pitfall>
            The hedge is <strong>imperfect</strong>: there are no futures on <em>this corporation&apos;s</em> paper —
            only on the SOFR benchmark. If SOFR is flat but the CP <strong>spread</strong> jumps from 0.2% to 0.5% (as
            in the post-2008 CP crisis), the SOFR hedge pays nothing. What to do about spread risk → next lesson.
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 7-5 ─────────────────────────────────────────────────────── */}
      <LessonSection id="7-5" summary={SUMMARIES['7-5']} visuals={<LiquidityHedgeMatrix />}>
        <LessonBlock eyebrow="7.5 · Liquidity" title="Liquidity as a substitute for hedging">
          <p>
            The CP problem has an <em>almost trivial</em> solution: <strong>issue the commercial paper today</strong>{' '}
            instead of waiting three months. CP markets are liquid; issue now and you pay 4.5% no matter what happens
            to rates. But borrowing early is not enough — the company must <strong>hold the cash</strong> on the
            balance sheet until it&apos;s needed. Spend it, and you&apos;ll have to borrow again: the hedge fails.
          </p>
          <KeyTakeaway>
            <strong>Liquidity is a substitute for hedging.</strong> And it&apos;s a <em>fuller</em> hedge here than the
            derivative: issuing early locks in the base rate <strong>and the spread</strong> — the SOFR futures could
            only lock the base rate.
          </KeyTakeaway>
          <p>
            The costs: the cash must sit in a <strong>safe asset</strong> (US Treasuries, Swiss government bonds, bank
            deposits) with a <strong>low return</strong>; the interest is <strong>taxable</strong>; and — perhaps most
            importantly — a big cash pile creates the <strong>temptation to spend it</strong>, even when it&apos;s
            earmarked as precautionary.
          </p>
          <p>The same balance-sheet logic hedges currency risk, in both directions:</p>
          <CompareTable
            headers={['Exposure', 'Balance-sheet hedge', 'Key detail']}
            rows={[
              [
                'Must PAY £200M in December',
                'Buy pounds today at spot; hold cash in £ (safe asset)',
                'Holding dollars would leave the conversion risk open',
              ],
              [
                'Will RECEIVE £1M in December',
                'Borrow in pounds today (e.g., 3-month debt); convert proceeds to $',
                'The incoming pounds service the £ debt; no point holding £ — operations are already long £',
              ],
            ]}
          />
          <p>
            This is especially useful where <strong>no liquid futures market exists</strong> — say, an emerging-market
            currency. The trade-offs: carrying costs, taxes on interest, and possibly{' '}
            <strong>credit risk on foreign bonds</strong> (investing in UK gilts is one thing; an emerging market is
            another).
          </p>
          <KeyTakeaway>
            If a liquid, safe derivative exists, it is probably the <strong>cheaper and safer</strong> tool (currency
            risk in developed markets). But when the derivative is missing or the hedge is imperfect (the CP spread),
            liquidity is a very useful tool for financial managers.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LESSON 7-6 ─────────────────────────────────────────────────────── */}
      <LessonSection id="7-6" summary={SUMMARIES['7-6']}>
        <LessonBlock eyebrow="7.6 · Operational hedging" title="Honda: the natural hedge">
          <p>
            Companies can also hedge by <strong>changing operations</strong>. The example: <strong>Honda</strong>, a
            Japanese company with about <strong>50% of its car sales in the US</strong>. Dollar revenues + yen costs =
            currency risk. Test yourself: what exactly is Honda afraid of? Answer: that the{' '}
            <strong>dollar depreciates against the yen</strong> — profitability would fall regardless of how many cars
            it sells. That risk has nothing to do with car quality or demand, so it&apos;s a natural candidate for
            elimination.
          </p>
          <p>Honda&apos;s three options:</p>
          <CompareTable
            headers={['Tool', 'Position', 'Catch']}
            rows={[
              [
                'Futures',
                'Short dollars — profit if the dollar depreciates',
                'Position size depends on uncertain future US sales → imperfect',
              ],
              [
                'Liquidity',
                'Borrow in dollars, invest in yen',
                'If $ depreciates, the $-debt shrinks in yen terms — a financial gain offsetting the operating loss',
              ],
              [
                'Operations',
                'Move production to the US',
                'Costs and revenues share the dollar → the risk disappears at the source',
              ],
            ]}
          />
          <Definition term="Natural hedge">
            When costs and revenues are denominated in the same currency, exchange-rate moves hit both sides equally
            and profitability is insulated. <strong>Operational hedging</strong> = changing operations (e.g., moving
            production) to create one.
          </Definition>
          <p>
            <strong>Evidence from the data.</strong> Honda&apos;s annual report (Form 20-F): the company{' '}
            <em>&ldquo;has not held any derivatives designated as hedging instruments for the years ended March 31,
            2023, 2024 and 2025.&rdquo;</em> Its capital structure shows no significant debt in foreign currencies —
            so no liquidity hedging either. But segment data show large US revenues <em>and</em> large North-American
            assets (plants, machines): Honda builds cars where it sells them.
          </p>
          <KeyTakeaway>
            No derivatives + no FX debt ≠ ignoring risk. Honda may simply not need them — moving production created a{' '}
            <strong>natural hedge</strong> that eliminated the currency problem operationally.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* LIVE SESSION CASES ───────────────────────────────────────────── */}
      <LessonSection id="cases" summary={SUMMARIES.cases} visuals={<ExposureCompass />}>
        <LessonBlock eyebrow="Live session" title="Nintendo vs Rolls-Royce: who was actually hedging?">
          <p>
            Two companies, both reporting big losses on financial positions — with{' '}
            <strong>opposite verdicts</strong>. The test is the live session&apos;s{' '}
            <strong>general rule for hedging</strong>: (1) determine the company&apos;s operational exposure — how does
            the exchange rate move profits? (2) the financial position must move profits in the{' '}
            <strong>opposite</strong> direction.
          </p>
          <CaseStudy title="Nintendo (WSJ, Nov 2010): a stash of cash gets zapped by the strong yen">
            <p>
              Nintendo earned <strong>80%+ of revenue outside Japan</strong> (Wii, DS) with costs largely in yen — so
              its operations were already <strong>long dollars</strong>. Yet it held{' '}
              <strong>$7.4 billion of cash in foreign currencies</strong> — nearly <strong>70% of its total
              cash</strong> ($3.4B in dollars, €2.7B in euros), the largest FX reserves among Japanese exporters. When
              the yen hit 15-year highs, those reserves produced <strong>¥62.1B of appraisal losses</strong> and
              Nintendo&apos;s <strong>first interim net loss in seven years</strong> (¥2.01B, ≈$24.8M) — despite a
              ¥54.23B operating profit.
            </p>
            <p>
              Nintendo&apos;s justifications: higher interest rates overseas, saved conversion commissions, and
              &ldquo;long-term thinking&rdquo; (losses now may reverse later). The course&apos;s verdict:{' '}
              <strong>speculation</strong>. Holding USD cash is the <strong>wrong direction</strong> — it adds to an
              already-long dollar exposure. The correct hedge is to <strong>short dollars</strong>: borrow $10B and
              convert to yen (if the dollar falls from ¥90 to ¥81, the debt shrinks in yen terms, offsetting the
              operating hit); or short dollar forwards/futures; or move costs into dollars operationally. And
              &ldquo;higher foreign interest rates&rdquo; is a price view, not a hedge.
            </p>
          </CaseStudy>
          <CaseStudy title="Rolls-Royce (FT, Feb 2017): playing it by the book with a £4.6B pre-tax loss">
            <p>
              Rolls-Royce reported one of the biggest losses in UK corporate history — <strong>£4.6B pre-tax</strong> —
              driven by a <strong>£4.4B revaluation of currency hedges</strong> after sterling crashed post-Brexit. Its
              engines and 5–10-year service contracts are priced in <strong>dollars</strong>, while costs are mostly{' '}
              <strong>sterling</strong> (revenues ≈ £14B): operations <strong>long dollars</strong> → RR{' '}
              <strong>shorts $5–6B a year</strong> of net dollar inflows, with a total{' '}
              <strong>hedgebook of $38B</strong> (~2.5× annual sales — covering multi-year contracted income; engines
              fly 20+ years).
            </p>
            <p>
              CEO Warren East: the revaluation &ldquo;has a big impact on the reported profit figure but{' '}
              <strong>no impact whatsoever on what is really going on in our business or on cash</strong>.&rdquo; The
              £4.4B is an accounting <strong>mark-to-market</strong> of open hedges through the P&amp;L — no cash moves
              while hedges stay open, and the derivative losses mirror <em>more valuable</em> future dollar revenues.
              The verdict: <strong>hedging</strong> — correct direction, backed by dollar income from signed contracts.
              &ldquo;It is a cost worth bearing to take out existential risk.&rdquo;
            </p>
            <p>
              The contrast cases from the article: <strong>Allied Lyons (1991)</strong> — the FD resigned after
              currency <em>speculation</em>; <strong>Mitchells &amp; Butlers (2009)</strong> — £500M lost hedging a
              property deal <em>that never happened</em> (a hedge without an exposure = speculation). The real danger
              sign is covering <em>more</em> than expected future revenues — which RR rejects: its book is
              &ldquo;nowhere near&rdquo; total contracted dollar inflows.
            </p>
          </CaseStudy>
          <KeyTakeaway>
            <strong>Rolls-Royce was searching for zero; Nintendo was searching for trading profits.</strong> Same
            headline (&ldquo;billions lost on financial positions&rdquo;), opposite economics — the direction relative
            to operational exposure is the whole test.
          </KeyTakeaway>
        </LessonBlock>
      </LessonSection>

      {/* OIL 2026 ─────────────────────────────────────────────────────── */}
      <LessonSection id="oil" summary={SUMMARIES.oil}>
        <LessonBlock eyebrow="Live session · 2026" title="Oil in 2026: who should hedge, and how?">
          <p>
            The big risk-management story of 2026 is the <strong>sharp rise in oil prices</strong>. Apply the general
            rule:
          </p>
          <CompareTable
            headers={['Player', 'Operational exposure', 'Correct hedge']}
            rows={[
              ['Oil producers', 'Long oil — profits rise with the price', 'Short (sell futures)'],
              ['Consumers (e.g., airlines)', 'Short oil — profits fall as the price rises', 'Long (buy futures)'],
            ]}
          />
          <p>
            <strong>The producers&apos; puzzle.</strong> US oil producers hedged <strong>51.7%</strong> of output
            entering 2020 — but only <strong>21%</strong> of 2025 output and a mere <strong>4%</strong> for 2026. Why
            so little? &ldquo;Because prices have increased&rdquo; — which is a bet that they&apos;ll stay high:{' '}
            <strong>speculation!</strong> If the goal of the hedge is to guarantee a minimum value, current prices far
            above that minimum make protection <em>cheap</em> — cutting it is a price view, not risk management.
          </p>
          <CaseStudy title="Southwest Airlines: the consumer that stopped hedging (2025)">
            <p>
              Southwest ran a fuel-hedging program from the 2000s — famously profitable in the 2008 spike — but{' '}
              <strong>stopped hedging fuel in 2025</strong>. CEO Bob Jordan: &ldquo;With the exception of a couple of
              positive years, it&apos;s not been beneficial to the company for the past 10 to 15 years.&rdquo;
            </p>
            <p>
              Note the logic: judging a hedge by its <em>trading P&amp;L</em> — insurance evaluated by whether disaster
              struck. The consequences of an unfavorable move for an unhedged Southwest: potential{' '}
              <strong>financial distress</strong>, <strong>compensation</strong> wrecked by a factor outside
              management&apos;s control, and an open question of whether higher fuel costs can be{' '}
              <strong>passed through</strong> to fares.
            </p>
          </CaseStudy>
          <Pitfall>
            &ldquo;The hedge lost money for years&rdquo; is not evidence the hedge was wrong — hedging is the search
            for zero, and the &ldquo;loss&rdquo; is the insurance premium. The right question: what happens to the firm
            in the bad state if it doesn&apos;t hedge?
          </Pitfall>
        </LessonBlock>
      </LessonSection>

      {/* REVIEW ────────────────────────────────────────────────────────── */}
      <LessonSection id="review" summary={SUMMARIES.review}>
        <LessonBlock eyebrow="Module 7 · Review" title="What you should walk away with">
          <p>
            Hedging is the <strong>reduction or reallocation of risk</strong> — and there are right and wrong reasons
            for it. Wrong: smoothing volatility for its own sake (shareholders diversify) and chasing trading profits
            (<strong>speculation</strong> — prices are unpredictable). Right: choosing which risks to take, removing
            risks outside the company&apos;s control, and cutting the probability of{' '}
            <strong>financial distress</strong>. <strong>Forwards</strong> lock in a rate with a piece of paper (but
            carry settlement risk); <strong>futures</strong> move the contract to an exchange with margin accounts and
            marking to market. A hedge that loses money on the derivative while operations gain the same amount did
            its job: <strong>hedging is the search for zero</strong>. <strong>Swaps</strong> turn floating rates into
            fixed; <strong>SOFR futures</strong> hedge future issuance — but only the base rate, so{' '}
            <strong>liquidity</strong> (issue early, hold cash; buy/borrow the currency) substitutes when derivatives
            are missing or imperfect. And sometimes the best hedge is <strong>operational</strong>: Honda builds cars
            where it sells them — a <strong>natural hedge</strong> with no derivatives at all.
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
              <p className="text-sm text-ink-muted">20 questions for Module 7 · 4 easy · 12 medium · 4 hard.</p>
            </div>
          </div>
          <Link to="/quiz?module=7" className="btn-primary">
            <BookOpen size={16} /> Start Module 7 quiz <ArrowRight size={16} />
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
  { id: '7-1',    label: '7·1 Why hedge?' },
  { id: '7-2',    label: '7·2 Forwards' },
  { id: '7-3',    label: '7·3 Futures & zero' },
  { id: '7-4',    label: '7·4 Rates & swaps' },
  { id: '7-5',    label: '7·5 Liquidity' },
  { id: '7-6',    label: '7·6 Operational' },
  { id: 'cases',  label: 'Nintendo vs RR' },
  { id: 'oil',    label: 'Oil 2026' },
  { id: 'review', label: 'Review' },
  { id: 'cheat',  label: 'Cheat-sheet' },
]

// ───────────────────────────────────────────────────────────────────────────
// Summaries — the always-visible TL;DR per lesson
// ───────────────────────────────────────────────────────────────────────────
const SUMMARIES: Record<string, LessonSummary> = {
  intro: {
    eyebrow: 'Module 7 · Overview',
    title: 'Risk Management',
    tldr: (
      <>
        Firms <strong>hedge</strong> — reduce or reallocate risk — with derivatives (forwards, futures, swaps),{' '}
        <strong>liquidity</strong>, and <strong>operational</strong> changes. The core skill: distinguish hedging from{' '}
        <strong>speculation</strong>, and derive the position&apos;s direction from the{' '}
        <strong>operational exposure</strong>.
      </>
    ),
    keyPoints: [
      <>Good reasons to hedge: choose risks · remove uncontrollable risks · cut distress probability.</>,
      <>Hedging is the search for <strong>zero</strong> — derivative P&amp;L offsets the operational P&amp;L.</>,
      <>When derivatives are missing or imperfect: liquidity and operational hedging (natural hedge).</>,
    ],
  },

  '7-1': {
    eyebrow: 'Lesson 7-1',
    title: 'Good and bad reasons to hedge',
    tldr: (
      <>
        Bad: smoothing volatility per se (shareholders diversify; no risk = no return) and trading on price views
        (speculation). Good: <strong>choosing risks</strong>, removing risks <strong>outside the firm&apos;s
        control</strong> (compensation), and reducing <strong>financial-distress</strong> risk.
      </>
    ),
    keyPoints: [
      <>&ldquo;We smooth volatile profits&rdquo; fails: investors can do it themselves — same logic as diversifying M&amp;A.</>,
      <>&ldquo;We know steel prices will fall&rdquo; = speculation; prices are unpredictable — &ldquo;the CFO should move to Wall Street.&rdquo;</>,
      <>Unlevered airline: hedging oil ≈ value-neutral. Highly levered: oil spike → distress → hedging creates value.</>,
      <>India example: keep the market exposure, hedge away the currency exposure.</>,
    ],
  },

  '7-2': {
    eyebrow: 'Lesson 7-2',
    title: 'Forward contracts',
    tldr: (
      <>
        A forward is an <strong>obligation</strong> to exchange an asset at a future date at a pre-set price — zero
        cash upfront. Paying £200M in December? Go <strong>long £ forward</strong> at the Dec forward rate ($1.329/£)
        and pay <strong>$265.8M</strong> whatever the spot does.
      </>
    ),
    keyPoints: [
      <>August 2025: spot $1.328/£, December forward $1.329/£ — you lock the forward rate, not the spot.</>,
      <>£ at $1.50 → unhedged $300M vs hedged $265.8M (saved $34.2M).</>,
      <>£ at $1.00 → unhedged $200M; hedged still pays $265.8M — the &ldquo;other side&rdquo; of hedging.</>,
    ],
    formulas: [{ label: 'Locked payment', expr: '£200M × 1.329 = $265.8M' }],
  },

  '7-3': {
    eyebrow: 'Lesson 7-3',
    title: 'Futures & the search for zero',
    tldr: (
      <>
        Futures = standardized, exchange-traded forwards with <strong>margin accounts</strong> — the exchange absorbs{' '}
        <strong>settlement risk</strong>. Receiving £1M → short 16 contracts at 1.329. Rate → 1.4: futures lose{' '}
        <strong>$71k</strong>, receivable gains $71k — <strong>net 0</strong>. That&apos;s hedging.
      </>
    ),
    keyPoints: [
      <>Forwards need reliable counterparties (settlement risk) — fine for banks and top-rated firms only.</>,
      <>£1M / £62,500 = 16 contracts; margin $100k → after the $71k loss: $29k + interest, margin call likely.</>,
      <>Marking to market settles gains/losses daily through the margin account.</>,
      <>Flipping short→long on a &ldquo;gut feeling&rdquo; = speculation; direction comes from operational exposure.</>,
    ],
    formulas: [
      { label: 'Contracts', expr: '£1M / £62.5k = 16' },
      { label: 'MTM loss', expr: '(1.4 − 1.329)·£1M = $71k' },
      { label: 'Hedge target', expr: 'derivative + operations = 0' },
    ],
  },

  '7-4': {
    eyebrow: 'Lesson 7-4',
    title: 'Hedging interest-rate risk',
    tldr: (
      <>
        Floating bank debt (SOFR + 2% = 6.3%) → fix it with a <strong>swap</strong>: pay fixed 4.3%, receive SOFR.
        Future CP issuance ($100M in 3 months at 4.5%) → <strong>short SOFR futures</strong> (prices move inversely to
        rates). But futures hedge the <strong>base rate only</strong> — never the firm&apos;s spread.
      </>
    ),
    keyPoints: [
      <>Small/risky firms carry floating-rate bank debt: rate = base (SOFR) + fixed spread.</>,
      <>SOFR = interbank overnight benchmark, LIBOR&apos;s replacement; 4.3% in the example.</>,
      <>Swap = short fixed, long floating → all-in 6.3% fixed; if SOFR falls you pay above market (both ways!).</>,
      <>No futures on one firm&apos;s CP → spread jump (0.2%→0.5%, post-2008 crisis) is unhedgeable with SOFR futures.</>,
    ],
    formulas: [
      { label: 'Floating loan', expr: 'SOFR + spread (4.3% + 2%)' },
      { label: 'Swap', expr: 'pay 4.3% fix · receive SOFR' },
      { label: 'Rates vs prices', expr: 'rates ↑ ⇒ debt prices ↓' },
    ],
  },

  '7-5': {
    eyebrow: 'Lesson 7-5',
    title: 'Liquidity as a substitute for hedging',
    tldr: (
      <>
        The &ldquo;almost trivial&rdquo; fix: <strong>issue the CP today</strong> at 4.5% and <strong>hold the
        cash</strong> in a safe asset — locking base rate <em>and</em> spread. Currency versions: buy £ today for a
        future £ payment; borrow £ (convert to $) against a future £ receivable.
      </>
    ),
    keyPoints: [
      <>Spend the cash and the hedge dies — you&apos;d have to borrow again.</>,
      <>Costs: low safe-asset return · taxable interest · temptation to spend · FX credit risk.</>,
      <>Liquidity beats futures when the derivative is missing (EM currencies) or imperfect (CP spread).</>,
      <>If a liquid derivative exists, it&apos;s usually the cheaper, safer tool.</>,
    ],
  },

  '7-6': {
    eyebrow: 'Lesson 7-6',
    title: 'Operational hedging (Honda)',
    tldr: (
      <>
        Honda: ~50% of car sales in the US, yen costs → fears <strong>dollar depreciation</strong>. Instead of
        derivatives it <strong>moved production to the US</strong>: costs and revenues share a currency — a{' '}
        <strong>natural hedge</strong>.
      </>
    ),
    keyPoints: [
      <>Alternatives: short $ futures (size unclear) or borrow $ / invest in ¥ (liquidity).</>,
      <>20-F: no hedging derivatives held FY2023–25; no significant foreign-currency debt.</>,
      <>Segment data: big US revenues and big North-American assets — production where the sales are.</>,
      <>Natural hedge = same-currency costs & revenues → FX stops mattering for profitability.</>,
    ],
  },

  cases: {
    eyebrow: 'Live session',
    title: 'Nintendo vs Rolls-Royce',
    tldr: (
      <>
        Both &ldquo;lost billions&rdquo; on financial positions. <strong>Nintendo</strong> (2010): $7.4B foreign cash
        while operationally long dollars — <strong>wrong direction → speculation</strong>. <strong>Rolls-Royce</strong>{' '}
        (2017): £4.4B mark-to-market on shorts against contracted dollar income — <strong>correct direction →
        hedging</strong>, &ldquo;searching for zero.&rdquo;
      </>
    ),
    keyPoints: [
      <>General rule: find the operational exposure → the financial position must move profits the opposite way.</>,
      <>Nintendo: 80%+ foreign revenue, ¥ costs; ¥62.1B appraisal losses, first interim loss in 7 years.</>,
      <>RR: $38B hedgebook ≈ 2.5× sales — justified by 20-year engines and 5–10-year contracts.</>,
      <>RR&apos;s loss = accounting mark-to-market, no cash impact; mirrored by more valuable dollar revenues.</>,
    ],
  },

  oil: {
    eyebrow: 'Live session · 2026',
    title: 'Oil 2026: producers, consumers, Southwest',
    tldr: (
      <>
        Producers are <strong>long oil → should short</strong>; consumers (airlines) are{' '}
        <strong>short oil → should go long</strong>. US producers hedge only <strong>4%</strong> of 2026 output (vs
        51.7% entering 2020) &ldquo;because prices rose&rdquo; — a price view. Southwest stopped hedging fuel in 2025.
      </>
    ),
    keyPoints: [
      <>Hedge ratios: 51.7% (2020) → 21% (2025) → 4% (2026) — cutting hedges on a rally is speculation.</>,
      <>High prices make floor-protection cheap — the distress logic argues FOR hedging, not against.</>,
      <>Southwest CEO: &ldquo;not beneficial for 10–15 years&rdquo; — judging insurance by trading P&amp;L.</>,
      <>Unhedged consumer risks: distress, wrecked compensation, uncertain pass-through to fares.</>,
    ],
  },

  review: {
    eyebrow: 'Module 7 · Review',
    title: 'What you should walk away with',
    tldr: (
      <>
        Hedge to choose risks, remove uncontrollable noise, and avoid distress — never to chase price views. Forwards
        and futures lock rates (search for zero); swaps fix floating debt; liquidity substitutes when derivatives fail;
        operations can remove the exposure entirely.
      </>
    ),
    keyPoints: [
      <>Direction test: financial position opposite to operational exposure — else it&apos;s speculation.</>,
      <>Judge hedges by risk removed (net = 0), never by the derivative&apos;s P&amp;L alone.</>,
      <>Imperfect hedges (CP spread) and missing markets → liquidity; currency mismatch → natural hedge.</>,
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// Cheat-sheet and papers
// ───────────────────────────────────────────────────────────────────────────
const FORMULA_CHEATSHEET = [
  { name: 'Hedging',            formula: 'derivative P&L + operational P&L = 0',   hint: '"the search for zero"' },
  { name: 'Direction rule',     formula: 'financial position ⊥ operational exposure', hint: 'same direction = speculation' },
  { name: 'Forward payment',    formula: '£200M × 1.329 = $265.8M',                hint: 'locks the forward rate, not spot' },
  { name: 'Futures contracts',  formula: '£1M / £62,500 = 16',                     hint: 'minimum contract sizes' },
  { name: 'MTM loss (short £)', formula: '(1.4 − 1.329) × £1M = $71k',             hint: 'deducted from margin daily' },
  { name: 'Margin account',     formula: '$100k − $71k = $29k',                    hint: '+ accrued interest; margin call next' },
  { name: 'Floating loan',      formula: 'SOFR + 2% = 6.3%',                       hint: 'SOFR 4.3% (Aug 2025)' },
  { name: 'Swap position',      formula: 'pay fixed 4.3% · receive SOFR',          hint: 'short fixed, long floating → 6.3% fixed' },
  { name: 'Rates vs prices',    formula: 'rates ↑ ⇒ debt prices ↓',                hint: 'fear rates ↑ → SHORT rate futures' },
  { name: 'CP rate',            formula: 'SOFR 4.3% + spread 0.2% = 4.5%',         hint: 'futures hedge base only, not spread' },
  { name: 'Liquidity hedge',    formula: 'issue today + hold cash (safe asset)',   hint: 'locks base + spread; don\'t spend it' },
  { name: 'Natural hedge',      formula: 'costs & revenues in the same currency',  hint: 'Honda: produce where you sell' },
]

const PAPERS = [
  {
    cite: 'Smith & Stulz (1985)',
    title: 'The Determinants of Firms\' Hedging Policies',
    idea: 'The classic theory: hedging adds value via lower expected costs of financial distress, taxes, and managerial risk aversion — not via lower volatility per se.',
    connection: 'The three good reasons to hedge (Lesson 7-1).',
  },
  {
    cite: 'Froot, Scharfstein & Stein (1993)',
    title: 'Risk Management: Coordinating Corporate Investment and Financing Policies',
    idea: 'Hedging is valuable when internal cash flows fund investment: unhedged shocks force firms to cut positive-NPV projects or raise costly external finance.',
    connection: 'Why hedging and liquidity interact with investment (Lessons 7-1, 7-5).',
  },
  {
    cite: 'Modigliani & Miller (1958)',
    title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
    idea: 'In perfect markets, purely financial transactions — including hedges — are zero-NPV; only frictions (distress costs, taxes, information) make them matter.',
    connection: 'The baseline for the whole module: volatility per se doesn\'t move value.',
  },
  {
    cite: 'Stulz (1996)',
    title: 'Rethinking Risk Management',
    idea: 'Corporate risk management should eliminate catastrophic (lower-tail) outcomes, not smooth all volatility; warns against "selective hedging" — mixing views into hedges.',
    connection: 'Hedging vs speculation; the Nintendo verdict (Lessons 7-1, 7-3, cases).',
  },
  {
    cite: 'Tufano (1996)',
    title: 'Who Manages Risk? Evidence from the Gold Mining Industry',
    idea: 'Hedging intensity in gold mining tracks managerial incentives (options vs shares) better than value theories — risk management often reflects agency motives.',
    connection: 'Why oil producers\' hedge ratios swing with prices (live session).',
  },
  {
    cite: 'Carter, Rogers & Simkins (2006)',
    title: 'Does Hedging Affect Firm Value? Evidence from the US Airline Industry',
    idea: 'Fuel-hedging airlines trade at a ~5–10% value premium, linked to the ability to invest when fuel prices (and rivals) are distressed.',
    connection: 'The airline examples and the Southwest case (Lesson 7-1, live session).',
  },
  {
    cite: 'Allayannis & Weston (2001)',
    title: 'The Use of Foreign Currency Derivatives and Firm Market Value',
    idea: 'Firms with FX exposure that use currency derivatives show a higher Tobin\'s Q (~4.9% premium) — currency hedging is associated with higher value.',
    connection: 'Currency hedging with forwards/futures (Lessons 7-2, 7-3, 7-6).',
  },
  {
    cite: 'Rampini, Sufi & Viswanathan (2014)',
    title: 'Dynamic Risk Management',
    idea: 'Hedging requires collateral/margin and competes with financing investment — financially constrained firms hedge less.',
    connection: 'Margin accounts at the CME; the costs of liquidity (Lessons 7-3, 7-5).',
  },
  {
    cite: 'Bolton, Chen & Wang (2011)',
    title: 'A Unified Theory of Tobin\'s q, Corporate Investment, Financing, and Risk Management',
    idea: 'A unified model where cash holdings buffer shocks — liquidity and derivatives hedging are substitute tools of risk management.',
    connection: 'Liquidity as a substitute for hedging (Lesson 7-5).',
  },
  {
    cite: 'Osawa, WSJ (2010) · FT (2017)',
    title: 'Nintendo\'s Stash of Cash Gets Zapped · Rolls-Royce Plays It by the Book',
    idea: 'The two journalistic sources behind the live-session cases: Nintendo\'s $7.4B FX cash pile and appraisal losses; RR\'s £4.4B mark-to-market on a $38B hedgebook.',
    connection: 'The Nintendo-vs-Rolls-Royce discussion (live session).',
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
          <h3 className="font-display text-lg font-semibold">10 papers behind Module 7</h3>
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
