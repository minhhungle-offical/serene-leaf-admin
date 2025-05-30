import { LinearProgress } from '@mui/material'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import { SignUp } from './Pages/SignUp'
import { useSelector } from 'react-redux'

export function Auth() {
  const { token } = useSelector((state) => state.auth)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Suspense>
  )
}

export default Auth
