import { TextField, IconButton, InputAdornment, Box, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { useController } from 'react-hook-form'

export function PasswordField({ label, control, name, placeholder, ...props }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control })

  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <Box>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  )
}
