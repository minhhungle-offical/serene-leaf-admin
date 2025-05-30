import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, IconButton, InputAdornment, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  role: yup.string().required('Role is required'),
  name: yup.string().required('Name is required'),
})

export function SignUpForm({ onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      phone: '',
      address: '',
      role: 'admin',
    },
    resolver: yupResolver(schema),
  })

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onFormSubmit = (data) => {
    // Since no file upload, just send plain object
    onSubmit?.(data)
  }

  return (
    <Stack spacing={3}>
      <InputField required name="email" control={control} label="Email" />

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

      <InputField
        required
        control={control}
        type={showPassword ? 'text' : 'password'}
        name="passwordConfirmation"
        label="Password Confirmation"
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

      <InputField required name="name" control={control} label="Name" />

      <InputField name="address" control={control} label="Address" />

      <InputField name="phone" control={control} label="Phone" />

      <SelectField
        name="role"
        control={control}
        label="Role"
        disabled
        optionList={[
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
          { label: 'Customer', value: 'customer' },
        ]}
      />

      <Divider />

      <Stack spacing={2} direction="row">
        <Button
          loading={loading}
          variant="contained"
          onClick={handleSubmit(onFormSubmit)}
          fullWidth
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
