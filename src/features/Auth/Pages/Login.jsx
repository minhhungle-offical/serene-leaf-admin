import { authActions, login } from '@/stores/slices/authSlice'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'

export function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { status, token } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log('status: ', status)
    if (status === 'logged-in' && token) {
      localStorage.setItem('token', token)
      enqueueSnackbar('Đăng nhập thành công!', { variant: 'success' })
      navigate('/dashboard')
      dispatch(authActions.resetStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, token])

  function handleSubmit(formValues) {
    dispatch(login(formValues))
  }

  return (
    <Stack justifyContent="center" alignItems="center" width="100%" height="100vh">
      <Container maxWidth="sm">
        <Box borderRadius="4px" boxShadow={3}>
          <Stack>
            <Box sx={{ py: 3 }}>
              <Typography variant="h4" fontWeight={600} textAlign="center">
                Login
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <LoginForm onSubmit={handleSubmit} loading={status === 'loading'} />
            </Box>

            <Typography sx={{ p: 3 }} color="primary">
              I don't have any account.{' '}
              <Box
                component={Link}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  textDecoration: 'none',
                }}
                to="/auth/sign-up"
              >
                Sign Up
              </Box>
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Stack>
  )
}
