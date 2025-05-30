import { Box, TextField, Typography } from '@mui/material'
import { useController } from 'react-hook-form'

export function InputField({
  multiline,
  rows = 4,
  label,
  control,
  name,
  placeholder,
  onFieldChange,

  ...props
}) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (e) => {
    onChange(e)
    onFieldChange?.(e)
  }

  return (
    <Box>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}
      <TextField
        size="medium"
        variant="outlined"
        multiline={multiline}
        rows={rows}
        fullWidth
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        placeholder={placeholder}
        {...props}
      />
    </Box>
  )
}
