import { Banknote, Coins, Compass, ScrollText, Users, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TVMExplorer } from '@/components/TVMExplorer'
import { PVCalculator } from '@/components/PVCalculator'
import { ConceptCard } from '@/components/ConceptCard'
import { AgencyDiagram } from '@/components/AgencyDiagram'

/**
 * Module 1 — The Objective and Language of Corporate Finance.
 * Состав: цели курса, agency problems, governance, cash vs profit,
 * базовые финансовые отчёты, TVM (PV/FV, annuity, perpetuity).
 */
export function Module1Content() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ConceptCard title="Цель — максимизация стоимости акций" icon={<Compass size={16} />} accent="#6366f1">
          <p>
            Главная цель корпоративных финансов — <strong>максимизация долгосрочной рыночной стоимости акций</strong>.
            Это не то же самое, что максимизация прибыли (она игнорирует риск и timing) или выручки
            (она игнорирует затраты).
          </p>
          <p>
            Стоимость акции — это <strong>present value будущих cash flows</strong>, доступных акционерам,
            дисконтированных по требуемой доходности с учётом риска.
          </p>
        </ConceptCard>

        <ConceptCard title="Agency problem & governance" icon={<Users size={16} />} accent="#06b6d4" index={1}>
          <p>
            Менеджеры (agents) могут действовать в своих интересах вместо интересов акционеров (principals):
            строить «империю» через value-destroying M&amp;A, избегать риска, потреблять «привилегии» (perks).
          </p>
          <p>
            Инструменты governance: <em>independent board</em>, <em>stock-based compensation</em>,
            <em> threat of takeover</em>, <em>auditors</em>, <em>activist investors</em>.
          </p>
        </ConceptCard>

        <ConceptCard title="Cash flow ≠ Accounting profit" icon={<Coins size={16} />} accent="#10b981" index={2}>
          <p>
            Бухгалтерская прибыль зависит от учётной политики (амортизация, accruals).
            Финансовые решения принимаются по <strong>фактическим cash flows</strong>,
            потому что только их можно реинвестировать и распределить.
          </p>
          <p className="font-mono text-xs bg-surface-3 border border-line rounded-lg p-2">
            FCF = EBIT · (1 − T) + D&amp;A − ΔNWC − CapEx
          </p>
        </ConceptCard>

        <ConceptCard title="Три финансовых отчёта" icon={<ScrollText size={16} />} accent="#f59e0b" index={3}>
          <p>
            <strong>Balance Sheet</strong> — snapshot активов и финансирования: Assets = Liabilities + Equity.
          </p>
          <p>
            <strong>Income Statement</strong> — Revenue → Net Income за период (включает non-cash items).
          </p>
          <p>
            <strong>Cash Flow Statement</strong> — реконсилиация Net Income в фактический cash по трём разделам:
            operating, investing, financing.
          </p>
        </ConceptCard>
      </section>

      {/* ───── Visualization 1: Agency diagram ───── */}
      <AgencyDiagram />

      {/* ───── Visualization 2: TVM Explorer ───── */}
      <TVMExplorer />

      {/* ───── Visualization 3: PV Calculator ───── */}
      <PVCalculator />

      {/* ───── Key formulas ───── */}
      <section className="card p-5">
        <header className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Formula cheat-sheet</div>
          <h3 className="font-display text-lg font-semibold">Time Value of Money — основные формулы</h3>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Future Value (single)',  formula: 'FV = PV · (1 + r)ⁿ',                 hint: 'Compound growth' },
            { name: 'Present Value (single)', formula: 'PV = FV / (1 + r)ⁿ',                 hint: 'Discount one CF' },
            { name: 'PV of annuity',          formula: 'PV = C · [1 − (1+r)⁻ⁿ] / r',         hint: 'n равных платежей' },
            { name: 'FV of annuity',          formula: 'FV = C · [(1+r)ⁿ − 1] / r',          hint: 'Накопление' },
            { name: 'Perpetuity',             formula: 'PV = C / r',                          hint: 'Бесконечная рента' },
            { name: 'Growing perpetuity',     formula: 'PV = C / (r − g),  r > g',           hint: 'Модель Гордона' },
            { name: 'EAR (compounding m/yr)', formula: 'EAR = (1 + r/m)ᵐ − 1',               hint: 'Сравнение ставок' },
            { name: 'Continuous compounding', formula: 'FV = PV · eʳᵗ',                      hint: 'Непрерывная' },
          ].map((f) => (
            <div key={f.name} className="rounded-xl border border-line bg-surface-3/60 p-3">
              <div className="text-xs text-ink-muted uppercase tracking-wider">{f.name}</div>
              <div className="font-mono text-base mt-1 text-ink">{f.formula}</div>
              <div className="text-xs text-ink-muted mt-1">{f.hint}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 bg-brand-500" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="text-brand-400" />
            <div>
              <h4 className="font-display text-lg font-semibold">Готов проверить себя?</h4>
              <p className="text-sm text-ink-muted">
                20 вопросов по Module 1 · 4 easy · 12 medium · 4 hard. Выбери длительность и стартуй.
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

/** Заглушка для модулей, которые ещё не наполнены контентом. */
export function ModulePlaceholder({ moduleId }: { moduleId: number }) {
  return (
    <div className="card p-8 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-surface-3 mb-4">
        <Banknote className="text-ink-muted" />
      </div>
      <h3 className="font-display text-xl font-semibold">Module {moduleId} — coming soon</h3>
      <p className="text-ink-muted text-sm mt-2 max-w-md mx-auto">
        Контент этого модуля будет наполнен по мере прохождения курса. Каркас, навигация и quiz-engine
        уже готовы — нужно только добавить материалы, термины и вопросы.
      </p>
    </div>
  )
}
