# Corporate Finance · Visual Learner

Веб-приложение для визуального изучения курса **Corporate Finance · FIN 570** (UIUC iMBA, Summer 2026).
Учебные материалы сопровождаются интерактивными визуализациями, глоссарием с поиском и
конфигурируемыми тестами с подробным разбором.

## Особенности

- **8 модулей курса** с прогрессом и анимациями. Module 1 наполнен материалом, остальные — каркас «по мере прохождения».
- **Интерактивные explorer-ы**: TVM (FV vs simple interest), PV calculator с переключением single/annuity/perpetuity/growing.
- **Glossary** с моментальным поиском по терминам / определениям / тегам и фильтром по модулям.
- **Quiz engine**: выбор модулей, 5/10/20 вопросов, easy/medium/hard/mixed (20–60–20), таймер, разбор каждого ответа, persist прогресса в localStorage.
- **Light + Dark тема** на CSS variables — переключение мгновенное, без перерисовки.
- **Slick UI**: Tailwind + Framer Motion переходы между страницами, анимированные карточки, ProgressRing, Radar-chart mastery silhouette.

## Стек

- React 18 + Vite + TypeScript
- Tailwind CSS 3 (CSS-variable based theming)
- Framer Motion (page transitions, micro-interactions)
- Recharts (charts)
- Zustand + persist (state)
- React Router (HashRouter для static hosting)
- lucide-react (icons)

## Запуск

```bash
npm install
npm run dev
# http://localhost:5173
```

Сборка для production:

```bash
npm run build
npm run preview
```

`dist/` — статичные файлы, можно деплоить на GitHub Pages, Vercel, Netlify и т.д.

## Структура

```
src/
  components/   общие UI-компоненты (ThemeToggle, Layout, cards, ProgressRing, AnimatedNumber)
  modules/      контент модулей (Module1.tsx)
  pages/        Dashboard, ModulesIndex, ModulePage, GlossaryPage, QuizPage
  quiz/         QuizConfigForm, QuizPlayer, QuizResults, quizUtils
  data/         модули, глоссарий, банк вопросов (JSON-like TS)
  lib/          доменные типы, финансовые формулы
  hooks/        useApplyTheme
  store/        zustand stores (theme, progress)
  styles/       globals.css (tailwind layer + CSS variables)
```

## Добавление контента

Когда наполняется очередной модуль:

1. **Glossary** — добавить термины в `src/data/glossary.ts` (поле `moduleId`).
2. **Quiz** — добавить вопросы в `src/data/questions.ts` (20% easy, 60% medium, 20% hard).
3. **Module page** — заменить `ModulePlaceholder` на конкретный компонент в `src/modules/ModuleN.tsx` и подключить в `ModulePage.tsx`.
4. **Module status** — поставить `status: 'ready'` в `src/data/modules.ts`.

## Инструкторы курса

- Heitor Almeida
- Xiangyi Spencer
- Stefan Zeume

## License

MIT
