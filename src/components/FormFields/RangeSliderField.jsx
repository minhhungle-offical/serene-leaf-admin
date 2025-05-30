import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import * as React from 'react'

export default function RangeSliderField({
  max = 100,
  min = 0,
  defaultValue = [0, max],
  onChange,
}) {
  const [value, setValue] = React.useState(defaultValue)

  const handleValueChange = (event, newValue) => {
    setValue(newValue)
    onChange?.(value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleValueChange}
        valueLabelDisplay="auto"
        max={max}
        min={min}
        marks={value.map((value) => ({
          value: value,
          label: value,
        }))}
      />
    </Box>
  )
}
