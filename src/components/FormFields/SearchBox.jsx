import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { debounce } from 'lodash'
import React from 'react'

export function SearchBox({ placeholder = 'Search...', onSearchChange }) {
  const handleSearchChange = debounce((e) => {
    onSearchChange?.(e.target.value)
  }, 600)

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      onChange={handleSearchChange}
      InputProps={{
        'aria-label': 'search',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
