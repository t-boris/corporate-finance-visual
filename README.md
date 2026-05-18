# Corporate Finance · Visual Learner

A web application for visually studying the **Corporate Finance · FIN 570** course (UIUC iMBA, Summer 2026).
Course material is paired with interactive visualizations, a searchable glossary, and configurable
multiple-choice quizzes with detailed explanations.

## Features

- **All 8 course modules** with progress tracking and animations. Module 1 is fully populated; the rest are scaffolded for content as the course progresses.
- **Interactive explorers**: TVM (compound vs. simple interest), PV calculator with single / annuity / perpetuity / growing-perpetuity modes.
- **Glossary** with instant search over terms, definitions, and tags, plus filter by module.
- **Quiz engine**: pick modules, 5 / 10 / 20 questions, easy / medium / hard / mixed (20–60–20 split), optional timer, per-answer explanations, progress persisted in localStorage.
- **Light + Dark themes** built on CSS variables — instant switching, no re-render.
- **Slick UI**: Tailwind + Framer Motion page transitions, animated cards, ProgressRing, Radar-chart mastery silhouette.

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS 3 (CSS-variable-based theming)
- Framer Motion (page transitions, micro-interactions)
- Recharts (charts)
- Zustand + persist (state)
- React Router (HashRouter — works as static hosting and on GitHub Pages without server rewrites)
- lucide-react (icons)

## Run locally

```bash
npm install
npm run dev
# http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

`dist/` contains static files ready to deploy to GitHub Pages, Vercel, Netlify, etc.

## Structure

```
src/
  components/   shared UI (ThemeToggle, Layout, cards, ProgressRing, AnimatedNumber)
  modules/      per-module content (Module1.tsx)
  pages/        Dashboard, ModulesIndex, ModulePage, GlossaryPage, QuizPage
  quiz/         QuizConfigForm, QuizPlayer, QuizResults, quizUtils
  data/         modules, glossary, question bank (TypeScript modules)
  lib/          domain types, finance formulas
  hooks/        useApplyTheme
  store/        zustand stores (theme, progress)
  styles/       globals.css (Tailwind layer + CSS variables)
```

## Adding content

When the next module is covered:

1. **Glossary** — add terms to `src/data/glossary.ts` (set `moduleId`).
2. **Quiz** — add questions to `src/data/questions.ts` (target 20% easy / 60% medium / 20% hard).
3. **Module page** — replace `ModulePlaceholder` with a component in `src/modules/ModuleN.tsx` and wire it up in `ModulePage.tsx`.
4. **Module status** — flip `status: 'ready'` in `src/data/modules.ts`.

The Glossary and Quiz pages pick up new data automatically.

## Course instructors

- Heitor Almeida
- Xiangyi Spencer
- Stefan Zeume

## License

MIT
