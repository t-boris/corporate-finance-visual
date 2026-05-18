import type { QuizQuestion } from '@/lib/types'

// 20 вопросов для Module 1. Распределение по сложности:
// 4 easy · 12 medium · 4 hard (соответствует пропорции 20/60/20).
// Module IDs 2..8 будут заполняться по мере прохождения курса.
export const QUESTIONS: QuizQuestion[] = [
  // ─── EASY ────────────────────────────────────────────────
  {
    id: 'm1-e1',
    moduleId: 1,
    prompt: 'Какова главная цель корпоративных финансов согласно классическому учебнику?',
    choices: [
      'Максимизация бухгалтерской прибыли в текущем году',
      'Максимизация выручки',
      'Максимизация стоимости акций (shareholder value)',
      'Минимизация налогов',
    ],
    answerIndex: 2,
    explanation:
      'Цель — максимизация долгосрочной стоимости акций. Прибыль и выручка игнорируют timing, риск и инвестиции, а минимизация налогов сама по себе может разрушать стоимость.',
    difficulty: 'easy',
    topic: 'Objective',
  },
  {
    id: 'm1-e2',
    moduleId: 1,
    prompt: 'Что говорит принцип Time Value of Money?',
    choices: [
      'Деньги в будущем всегда дороже',
      'Доллар сегодня стоит больше доллара завтра',
      'Инфляция всегда выше реальной ставки',
      'Чем длиннее срок, тем выше PV',
    ],
    answerIndex: 1,
    explanation:
      'TVM: сегодняшний доллар стоит больше, потому что его можно инвестировать, есть инфляция и риск, и есть предпочтение текущего потребления.',
    difficulty: 'easy',
    topic: 'TVM',
  },
  {
    id: 'm1-e3',
    moduleId: 1,
    prompt: 'Какое уравнение выражает балансовое тождество?',
    choices: [
      'Revenue − Expenses = Profit',
      'Assets = Liabilities + Equity',
      'Cash In − Cash Out = Net Cash Flow',
      'EBIT − Taxes = Net Income',
    ],
    answerIndex: 1,
    explanation:
      'Balance Sheet identity: Assets = Liabilities + Equity. Из этого тождества следует базовая логика финансирования активов.',
    difficulty: 'easy',
    topic: 'Financial statements',
  },
  {
    id: 'm1-e4',
    moduleId: 1,
    prompt: 'Что такое limited liability у корпорации?',
    choices: [
      'Менеджеры не отвечают за свои решения',
      'Акционер рискует только суммой своих вложений',
      'Кредиторы не могут потребовать возврат долга',
      'Корпорация платит ограниченные налоги',
    ],
    answerIndex: 1,
    explanation:
      'Limited liability ограничивает риск акционера суммой инвестиции, делая массовое инвестирование в акции возможным.',
    difficulty: 'easy',
    topic: 'Structure',
  },

  // ─── MEDIUM ──────────────────────────────────────────────
  {
    id: 'm1-m1',
    moduleId: 1,
    prompt: 'Чему равна PV $1,000, полученных через 3 года, при ставке 8% годовых?',
    choices: ['≈ $793.83', '≈ $926.00', '≈ $1,259.71', '≈ $740.74'],
    answerIndex: 0,
    explanation: 'PV = 1000 / (1.08)^3 = 1000 / 1.259712 ≈ $793.83.',
    difficulty: 'medium',
    topic: 'PV/FV',
  },
  {
    id: 'm1-m2',
    moduleId: 1,
    prompt: 'PV ordinary annuity 5 платежей по $200 при r = 6%:',
    choices: ['≈ $842.47', '≈ $1,000.00', '≈ $1,127.10', '≈ $945.83'],
    answerIndex: 0,
    explanation:
      'PV = 200 · (1 − 1.06^−5) / 0.06 = 200 · 4.21236 ≈ $842.47.',
    difficulty: 'medium',
    topic: 'Annuity',
  },
  {
    id: 'm1-m3',
    moduleId: 1,
    prompt: 'Чему равна PV вечной ренты $100 в год при ставке 5%?',
    choices: ['$2,000', '$500', '$2,500', 'Бесконечность'],
    answerIndex: 0,
    explanation: 'PV perpetuity = C / r = 100 / 0.05 = $2,000.',
    difficulty: 'medium',
    topic: 'Perpetuity',
  },
  {
    id: 'm1-m4',
    moduleId: 1,
    prompt:
      'Растущая бесконечная рента: первая выплата $100 в конце года, рост g = 3%, r = 8%. Чему равна PV?',
    choices: ['$1,250', '$2,000', '$3,333.33', '$2,500'],
    answerIndex: 1,
    explanation: 'PV = C₁ / (r − g) = 100 / (0.08 − 0.03) = 100 / 0.05 = $2,000.',
    difficulty: 'medium',
    topic: 'Growing perpetuity',
  },
  {
    id: 'm1-m5',
    moduleId: 1,
    prompt: 'Почему финансисты предпочитают cash flow, а не accounting profit?',
    choices: [
      'Прибыль всегда меньше cash flow',
      'Cash flow свободен от учётной политики и отражает реальные деньги',
      'Прибыль не зависит от инвестиций',
      'Cash flow всегда положителен',
    ],
    answerIndex: 1,
    explanation:
      'Accounting profit зависит от выбора учётной политики (амортизация, accruals) и содержит non-cash items. Решения о стоимости принимаются по фактическим cash flows.',
    difficulty: 'medium',
    topic: 'Cash vs profit',
  },
  {
    id: 'm1-m6',
    moduleId: 1,
    prompt: 'Что является примером проявления agency problem?',
    choices: [
      'Совет директоров требует от CFO раскрыть бухгалтерскую отчётность',
      'Менеджеры строят империю через приобретения с отрицательным NPV',
      'Акционеры голосуют за дивиденды',
      'Аудитор находит ошибку в Cash Flow Statement',
    ],
    answerIndex: 1,
    explanation:
      'Empire building через value-destroying M&A — классический пример agency problem: менеджер увеличивает свою власть/комп за счёт стоимости акционеров.',
    difficulty: 'medium',
    topic: 'Agency',
  },
  {
    id: 'm1-m7',
    moduleId: 1,
    prompt: 'Какой механизм governance НЕ снижает agency problem напрямую?',
    choices: [
      'Stock-based compensation для CEO',
      'Независимый совет директоров',
      'Высокий corporate tax rate',
      'Угроза враждебного поглощения',
    ],
    answerIndex: 2,
    explanation:
      'Налоги не выравнивают интересы менеджера и акционера. Остальные три механизма — классические инструменты corporate governance.',
    difficulty: 'medium',
    topic: 'Governance',
  },
  {
    id: 'm1-m8',
    moduleId: 1,
    prompt: 'APR 12%, capitalized monthly. Эффективная годовая ставка (EAR)?',
    choices: ['12.00%', '12.36%', '12.55%', '12.68%'],
    answerIndex: 3,
    explanation: 'EAR = (1 + 0.12/12)^12 − 1 = 1.01^12 − 1 ≈ 12.68%.',
    difficulty: 'medium',
    topic: 'Compounding',
  },
  {
    id: 'm1-m9',
    moduleId: 1,
    prompt: 'FV $1,000 через 10 лет при 7% годовых (annual compounding):',
    choices: ['≈ $1,700', '≈ $1,967', '≈ $2,008', '≈ $1,400'],
    answerIndex: 1,
    explanation: 'FV = 1000 · 1.07^10 = 1000 · 1.96715 ≈ $1,967.',
    difficulty: 'medium',
    topic: 'PV/FV',
  },
  {
    id: 'm1-m10',
    moduleId: 1,
    prompt: 'Какие позиции относятся к operating section в Cash Flow Statement?',
    choices: [
      'Покупка оборудования',
      'Выплата дивидендов',
      'Увеличение accounts receivable',
      'Эмиссия новых акций',
    ],
    answerIndex: 2,
    explanation:
      'Изменение в working capital (включая A/R) — часть operating activities. Equity issuance — financing, CapEx — investing.',
    difficulty: 'medium',
    topic: 'Cash flow statement',
  },
  {
    id: 'm1-m11',
    moduleId: 1,
    prompt: 'Free Cash Flow равен:',
    choices: [
      'Net Income + Depreciation',
      'EBIT·(1−T) + D&A − ΔNWC − CapEx',
      'Revenue − COGS − OpEx',
      'EBITDA − Taxes',
    ],
    answerIndex: 1,
    explanation:
      'FCF (для firm) = EBIT·(1−T) + D&A − ΔNWC − CapEx. Это денежный поток, доступный всем поставщикам капитала.',
    difficulty: 'medium',
    topic: 'FCF',
  },
  {
    id: 'm1-m12',
    moduleId: 1,
    prompt: 'Если ставка вырастет, что произойдёт с PV будущих cash flows?',
    choices: [
      'PV вырастет, так как доходность выше',
      'PV упадёт, так как дисконт сильнее',
      'PV не изменится',
      'Зависит от знака cash flow',
    ],
    answerIndex: 1,
    explanation:
      'Рост ставки увеличивает знаменатель в PV = CF/(1+r)^t, поэтому PV падает. Это базовая обратная зависимость TVM.',
    difficulty: 'medium',
    topic: 'TVM',
  },

  // ─── HARD ────────────────────────────────────────────────
  {
    id: 'm1-h1',
    moduleId: 1,
    prompt:
      'Вы получаете $50,000 в год бесконечно, начиная через 5 лет. Ставка 10%. PV сегодня ≈?',
    choices: ['$500,000', '$341,506', '$310,460', '$455,000'],
    answerIndex: 1,
    explanation:
      'PV perpetuity на момент t=4 = 50,000/0.10 = $500,000. Дисконтируем 4 периода: 500,000/1.10^4 ≈ $341,506.',
    difficulty: 'hard',
    topic: 'Deferred perpetuity',
  },
  {
    id: 'm1-h2',
    moduleId: 1,
    prompt:
      'Проект: −$1,000 сейчас, +$600 через 1 год, +$600 через 2 года. При какой ставке NPV = 0 (IRR)?',
    choices: ['≈ 13.07%', '≈ 20.00%', '≈ 10.00%', '≈ 6.59%'],
    answerIndex: 0,
    explanation:
      '−1000 + 600/(1+r) + 600/(1+r)² = 0. Численно r ≈ 13.07%. (Можно решить через формулу annuity или бисекцию.)',
    difficulty: 'hard',
    topic: 'IRR',
  },
  {
    id: 'm1-h3',
    moduleId: 1,
    prompt:
      'Что эквивалентно $1 today, если ставка дискретно 8% годовых сейчас сравнивается с непрерывной капитализацией? Какая непрерывная ставка эквивалентна?',
    choices: ['ln(1.08) ≈ 7.696%', '1.08 − 1 = 8%', 'e^0.08 − 1 ≈ 8.33%', '8% / e ≈ 2.94%'],
    answerIndex: 0,
    explanation:
      'При непрерывной капитализации FV = e^(rt). Чтобы (1.08) = e^r, r = ln(1.08) ≈ 0.07696 ≈ 7.696%.',
    difficulty: 'hard',
    topic: 'Compounding',
  },
  {
    id: 'm1-h4',
    moduleId: 1,
    prompt:
      'Компания думает о стратегии «максимизация EPS». Почему это плохой proxy для maximization of shareholder value?',
    choices: [
      'EPS легко проверить аудитом',
      'EPS не учитывает риск, timing и стоимость капитала, использованного для роста',
      'EPS всегда меньше Net Income',
      'EPS не влияет на цену акций',
    ],
    answerIndex: 1,
    explanation:
      'EPS можно «накачать» обратным выкупом или дорогими приобретениями без учёта риска и cost of capital. Стоимость акций определяется будущими FCF, дисконтированными по требуемой доходности — то, что EPS не показывает.',
    difficulty: 'hard',
    topic: 'Objective',
  },
]

export const questionsByModule = (moduleId: number) =>
  QUESTIONS.filter((q) => q.moduleId === moduleId)
