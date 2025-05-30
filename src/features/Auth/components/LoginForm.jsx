import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Divider, IconButton, InputAdornment, Stack, Button } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField } from '@/components/FormFields/InputField'

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export function LoginForm({ onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: yupResolver(schema),
  })

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  return (
    <Stack component="form" noValidate spacing={3} onSubmit={handleFormSubmit}>
      <Box>
        <InputField required name="email" control={control} label="Email" />
      </Box>

      <Box>
        <InputField
          required
          control={control}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider />

      <Stack spacing={2}>
        <Box>
          <Button loading={loading} type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
