import { Button, Stack, Typography } from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export function NotFound(props) {
  const navigate = useNavigate()

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, bgcolor: 'white' }}
    >
      <Typography variant="h6" component="h6"></Typography>

      <Typography variant="h1" component="h1" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h5" component="h5" marginTop="24px" marginBottom="16px">
        Oops! Page Not Found.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button onClick={() => navigate('/dashboard')} variant="contained">
          Dashboard
        </Button>

        <Button variant="outlined" onClick={() => navigate('/auth')}>
          Go to login
        </Button>
      </Stack>
    </Stack>
  )
}
