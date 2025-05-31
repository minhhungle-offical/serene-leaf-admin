import { SearchBox } from '@/components/FormFields/SearchBox'
import { SortField } from '@/components/FormFields/SortField'
import { Box, Stack } from '@mui/material'

export function PostFilter({ params, categoryList, onFilterChange }) {
  function handleSearchChange(search) {
    const newParams = {
      ...params,
      search,
    }
    onFilterChange?.(newParams)
  }

  function handleSortOrderChange(value) {
    const newParams = {
      ...params,
      category: value,
    }
    onFilterChange?.(newParams)
  }

  return (
    <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="flex-end" flexWrap="wrap" mx={-1}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ p: 1 }}>
            <SearchBox onSearchChange={(value) => handleSearchChange?.(value)} />
          </Box>
        </Box>

        <Box sx={{ width: 1 / 4 }}>
          <Box sx={{ p: 1 }}>
            <SortField
              defaultValue=""
              label="Filter by category"
              optionList={categoryList}
              onChange={(value) => handleSortOrderChange(value)}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
