'use client'

import { Box, Typography } from '@mui/material'
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers'
import { useController } from 'react-hook-form'
import dayjs from 'dayjs'

export function DateTimeField({ label, control, name, mode = 'date', ...props }) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const PickerComponent =
    mode === 'time' ? TimePicker : mode === 'datetime' ? DateTimePicker : DatePicker

  const parsedValue = value && dayjs(value).isValid() ? dayjs(value) : null

  const format = mode === 'time' ? 'HH:mm' : mode === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'

  return (
    <Box>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}

      <PickerComponent
        value={parsedValue}
        onChange={(date) => {
          onChange(date ? date.toISOString() : null)
        }}
        onBlur={onBlur}
        format={format}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!error,
            helperText: error?.message,
            sx: {
              '& .MuiOutlinedInput-root': {
                minHeight: '56px',
              },
            },
          },
        }}
        {...props}
      />
    </Box>
  )
}
