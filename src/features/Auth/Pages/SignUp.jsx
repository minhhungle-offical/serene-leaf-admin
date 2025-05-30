import { Box, Container, Stack, Typography } from '@mui/material'
import { SignUpForm } from '../components/SignUpForm'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export function SignUp() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(formData) {
    setLoading(true)
    authApi
      .signUp(formData)
      .then(() => {
        enqueueSnackbar('sign up success', { variant: 'success' })
        navigate('/auth/login')
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Stack justifyContent="center" alignItems="center" width="100%" height="100vh">
      <Container maxWidth="sm">
        <Box borderRadius="4px" boxShadow={3}>
          <Stack>
            <Box sx={{ py: 3 }}>
              <Typography variant="h4" fontWeight={600} textAlign="center">
                Sign Up
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <SignUpForm onSubmit={handleSubmit} loading={loading} />
            </Box>

            <Typography sx={{ p: 3 }} color="primary">
              I have an account.{' '}
              <Box
                component={Link}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  textDecoration: 'none',
                }}
                to="/auth/login"
              >
                Login
              </Box>
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Stack>
  )
}
