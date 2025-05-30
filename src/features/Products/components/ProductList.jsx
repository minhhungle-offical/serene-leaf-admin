import { Edit, Delete } from '@mui/icons-material'
import { Box, Chip, Paper, Stack, Tooltip, Typography, alpha } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { numberToCurrencyUSD } from '@/utils/common'

export function ProductList({
  params = { page: 1, limit: 5 },
  data,
  total,
  loading,
  categoryList = [],
  onPaginationModelChange,
  onEdit,
  onRemove,
}) {
  const baseColProps = {
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    headerClassName: 'header',
  }

  const rows = data?.map((item, idx) => ({
    key: (params.page - 1) * params.limit + idx + 1,
    ...item,
  }))

  const columns = [
    {
      field: 'key',
      headerName: '#',
      width: 60,
      headerAlign: 'center',
      align: 'center',
      ...baseColProps,
    },
    {
      field: 'product',
      headerName: 'Product',
      minWidth: 700,
      flex: 2,
      ...baseColProps,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%', py: 1 }}>
          <Box
            component="img"
            src={row.image.url}
            alt={row.name}
            sx={{
              width: '80px',
              aspectRatio: '1/1',
              borderRadius: 2,
              objectFit: 'cover',
              boxShadow: 1,
            }}
          />
          <Box>
            <Typography fontWeight={600}>{row.name}</Typography>
            <Typography whiteSpace="wrap" variant="body2" color="text.secondary">
              {row.shortDescription}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={numberToCurrencyUSD(row.price)}
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.warning.main,
            bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
          }}
        />
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={categoryList?.find((item) => item._id === row.category)?.name || ''}
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.info.main,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
          }}
        />
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          sx={{
            fontWeight: 500,
            color: (theme) =>
              row.isActive ? theme.palette.success.main : theme.palette.error.main,
            bgcolor: (theme) =>
              alpha(row.isActive ? theme.palette.success.main : theme.palette.error.main, 0.1),
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit">
              <Edit color="primary" />
            </Tooltip>
          }
          label="Edit"
          onClick={() => onEdit?.(row)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <Delete color="error" />
            </Tooltip>
          }
          label="Delete"
          onClick={() => onRemove?.(row)}
        />,
      ],
    },
  ]

  const handlePaginationModelChange = (model) => {
    const newParams = {
      ...params,
      page: model.page + 1,
      limit: model.pageSize,
    }
    onPaginationModelChange?.(newParams)
  }

  return (
    <Box
      sx={{
        height: '100%',
        '.MuiDataGrid-root': {
          border: 0,
          minHeight: 611,
        },
        '.header .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 600,
        },
        '.MuiDataGrid-columnHeaders': {
          borderBottom: '2px solid #ccc',
        },
        '.MuiDataGrid-cell': {
          px: 2,
        },
        '.MuiDataGrid-columnHeader': {
          px: 2,
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows || []}
        getRowId={(row) => row._id}
        columns={columns}
        rowHeight={100}
        disableRowSelectionOnClick
        pagination
        paginationMode="server"
        rowCount={total || 0}
        paginationModel={{
          page: params?.page - 1 || 0,
          pageSize: params?.limit || 10,
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50]}
        disableColumnSelector
      />
    </Box>
  )
}
