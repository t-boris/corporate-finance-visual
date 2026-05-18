import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { useApplyTheme } from '@/hooks/useApplyTheme'
import { Dashboard } from '@/pages/Dashboard'
import { ModulesIndex } from '@/pages/ModulesIndex'
import { ModulePage } from '@/pages/ModulePage'
import { GlossaryPage } from '@/pages/GlossaryPage'
import { QuizPage } from '@/pages/QuizPage'

export default function App() {
  useApplyTheme()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/modules" element={<ModulesIndex />} />
        <Route path="/modules/:slug" element={<ModulePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
