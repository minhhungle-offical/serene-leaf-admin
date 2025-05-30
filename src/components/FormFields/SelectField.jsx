import { Box, Typography, FormControl, Select, MenuItem, FormHelperText } from '@mui/material'
import { useController } from 'react-hook-form'

export function SelectField({ label, control, name, options = [], placeholder = '', ...props }) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <Box>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}
      <FormControl fullWidth error={!!error} sx={{ mt: 0.5 }}>
        <Select
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          displayEmpty
          placeholder={placeholder}
          sx={{
            '& .MuiOutlinedInput-root': {
              minHeight: '56px',
            },
          }}
          {...props}
        >
          <MenuItem value="" disabled>
            -- Select an item --
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    </Box>
  )
}
