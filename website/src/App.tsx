import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { NotebookPage } from '@/pages/NotebookPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter basename="/beamz-notebooks/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="examples/:slug" element={<NotebookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
