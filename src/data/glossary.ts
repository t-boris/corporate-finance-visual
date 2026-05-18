import type { GlossaryTerm } from '@/lib/types'

// Глоссарий растёт модуль за модулем. Сейчас наполнен Module 1.
// Остальные модули — добавим по мере прохождения курса.
export const GLOSSARY: GlossaryTerm[] = [
  // ───── Module 1 · The Objective and Language of Corporate Finance ─────
  {
    term: 'Shareholder value maximization',
    moduleId: 1,
    definition:
      'Главная цель корпоративных финансов: максимизация рыночной стоимости акций фирмы в долгосрочной перспективе. Не путать с максимизацией прибыли — последняя игнорирует timing, риск и реинвестирование.',
    related: ['NPV', 'Cash flow', 'Agency problem'],
    tags: ['objective'],
  },
  {
    term: 'Agency problem',
    moduleId: 1,
    definition:
      'Конфликт интересов между менеджерами (agents) и акционерами (principals). Возникает, когда менеджеры действуют в своих интересах (бонусы, империя, низкий риск), а не в интересах владельцев.',
    related: ['Corporate governance', 'Executive compensation'],
    tags: ['governance'],
  },
  {
    term: 'Corporate governance',
    moduleId: 1,
    definition:
      'Система механизмов (совет директоров, аудит, право голоса акционеров, компенсация на основе акций), которые смягчают agency problem и согласовывают интересы менеджеров с интересами акционеров.',
    related: ['Agency problem', 'Board of directors'],
    tags: ['governance'],
  },
  {
    term: 'Cash flow',
    moduleId: 1,
    definition:
      'Денежный поток — фактическое поступление или расход денежных средств. Финансовые решения принимаются по cash flows, а не по бухгалтерской прибыли, потому что cash flows нельзя «нарисовать» учётной политикой.',
    related: ['Accounting profit', 'Free cash flow'],
    tags: ['fundamentals'],
  },
  {
    term: 'Accounting profit',
    moduleId: 1,
    definition:
      'Прибыль по правилам бухучёта (revenue − expenses). Содержит non-cash items (амортизация, accruals) и зависит от учётных оценок, поэтому для оценки стоимости используется не она, а cash flow.',
    related: ['Cash flow', 'Depreciation'],
    tags: ['accounting'],
  },
  {
    term: 'Free cash flow (FCF)',
    moduleId: 1,
    definition:
      'Денежный поток, доступный всем поставщикам капитала после операционных расходов, налогов и инвестиций в CapEx и оборотный капитал. FCF = EBIT(1−T) + D&A − ΔNWC − CapEx.',
    formula: 'FCF = EBIT·(1−T) + D&A − ΔNWC − CapEx',
    related: ['Cash flow', 'WACC', 'Enterprise value'],
    tags: ['valuation'],
  },
  {
    term: 'Time value of money (TVM)',
    moduleId: 1,
    definition:
      'Доллар сегодня стоит больше доллара завтра. Причины: возможность инвестировать, инфляция, риск, предпочтение текущего потребления.',
    related: ['Present value', 'Future value', 'Discount rate'],
    tags: ['fundamentals'],
  },
  {
    term: 'Present value (PV)',
    moduleId: 1,
    definition:
      'Сегодняшняя стоимость будущего денежного потока, дисконтированного по ставке r. PV = FV / (1+r)^n.',
    formula: 'PV = FV / (1 + r)^n',
    related: ['Future value', 'Discount rate', 'TVM'],
    tags: ['fundamentals'],
  },
  {
    term: 'Future value (FV)',
    moduleId: 1,
    definition:
      'Сколько будет стоить сегодняшняя сумма PV через n периодов при ставке r. FV = PV·(1+r)^n.',
    formula: 'FV = PV · (1 + r)^n',
    related: ['Present value', 'Compounding'],
    tags: ['fundamentals'],
  },
  {
    term: 'Discount rate',
    moduleId: 1,
    definition:
      'Ставка, по которой будущие cash flows приводятся к сегодняшнему дню. Отражает альтернативную стоимость капитала и риск проекта. В корпоративных оценках чаще всего — WACC.',
    related: ['WACC', 'Opportunity cost of capital', 'PV'],
    tags: ['fundamentals'],
  },
  {
    term: 'Compounding',
    moduleId: 1,
    definition:
      'Начисление процента на процент. Если ставка m раз в год капитализируется по r/m, эффективная годовая ставка EAR = (1 + r/m)^m − 1.',
    formula: 'EAR = (1 + r/m)^m − 1',
    related: ['APR', 'EAR'],
    tags: ['fundamentals'],
  },
  {
    term: 'Annuity',
    moduleId: 1,
    definition:
      'Серия равных платежей C через равные интервалы в течение n периодов. PV ordinary annuity = C · [1 − (1+r)^−n] / r.',
    formula: 'PV = C · [1 − (1+r)^−n] / r',
    related: ['Perpetuity', 'TVM'],
    tags: ['fundamentals'],
  },
  {
    term: 'Perpetuity',
    moduleId: 1,
    definition:
      'Бесконечная серия равных платежей C. PV = C / r. Growing perpetuity: PV = C / (r − g), при r > g (модель Гордона).',
    formula: 'PV = C / r  |  PV_g = C / (r − g)',
    related: ['Annuity', 'Gordon growth model'],
    tags: ['fundamentals'],
  },
  {
    term: 'Opportunity cost of capital',
    moduleId: 1,
    definition:
      'Доходность, которую инвестор мог бы получить на альтернативной инвестиции с эквивалентным риском. Это минимальная требуемая доходность проекта.',
    related: ['Discount rate', 'WACC', 'CAPM'],
    tags: ['fundamentals'],
  },
  {
    term: 'Stakeholder',
    moduleId: 1,
    definition:
      'Любая сторона, заинтересованная в фирме: сотрудники, клиенты, поставщики, кредиторы, государство, общество. Stakeholder view противопоставляется shareholder view.',
    related: ['Shareholder value maximization', 'ESG'],
    tags: ['governance'],
  },
  {
    term: 'Limited liability',
    moduleId: 1,
    definition:
      'Принцип, по которому акционер не отвечает по долгам корпорации больше, чем на сумму своих вложений. Делает массовое владение акциями возможным.',
    related: ['Corporation', 'Equity'],
    tags: ['structure'],
  },
  {
    term: 'Balance sheet',
    moduleId: 1,
    definition:
      'Snapshot активов, обязательств и собственного капитала на конкретную дату. Тождество: Assets = Liabilities + Equity.',
    related: ['Income statement', 'Cash flow statement'],
    tags: ['statements'],
  },
  {
    term: 'Income statement',
    moduleId: 1,
    definition:
      'Отчёт за период: Revenue − COGS − OpEx − Interest − Taxes = Net Income. Содержит как cash, так и non-cash items.',
    related: ['Balance sheet', 'EBIT', 'Net income'],
    tags: ['statements'],
  },
  {
    term: 'Cash flow statement',
    moduleId: 1,
    definition:
      'Реконсилиация Net Income в фактический cash. Три раздела: operating, investing, financing activities.',
    related: ['Free cash flow', 'Net income'],
    tags: ['statements'],
  },
  {
    term: 'EBIT',
    moduleId: 1,
    definition:
      'Earnings Before Interest and Taxes — операционная прибыль до процентов и налогов. Близка к операционному денежному потоку до CapEx и working capital.',
    related: ['EBITDA', 'Operating income'],
    tags: ['metrics'],
  },
]

export const allModuleIds = Array.from(new Set(GLOSSARY.map((g) => g.moduleId))).sort()
