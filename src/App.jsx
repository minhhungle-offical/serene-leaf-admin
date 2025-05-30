import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Main = lazy(() => import('@/features/Main/index'))
const Auth = lazy(() => import('@/features/Auth/Auth'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/dashboard/*" element={<Main />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  )
}
