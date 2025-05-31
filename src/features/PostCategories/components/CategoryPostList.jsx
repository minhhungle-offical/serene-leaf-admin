import { Delete, Edit } from '@mui/icons-material'
import { Box, Chip, Stack, Tooltip, Typography, alpha } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

export function PostCategoryList({
  params = { page: 1, limit: 5 },
  data,
  loading,
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

  const rows =
    data?.map((item, idx) => ({
      key: (params.page - 1) * params.limit + idx + 1,
      ...item,
    })) || []

  const columns = [
    {
      field: 'key',
      headerName: '#',
      width: 60,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
    },
    {
      field: 'name',
      headerName: 'Category Name',
      minWidth: 150,

      ...baseColProps,
      renderCell: ({ row }) => (
        <Stack justifyContent="center" sx={{ height: '100%', py: 1 }}>
          <Typography fontWeight={600}>{row.name}</Typography>
        </Stack>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 600,
      flex: 2,
      ...baseColProps,
      renderCell: ({ row }) => (
        <Stack justifyContent="center" sx={{ height: '100%', py: 1 }}>
          <Typography whiteSpace="wrap" variant="body2" color="text.secondary">
            {row.description}
          </Typography>
        </Stack>
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
    onPaginationModelChange?.({
      page: model.page + 1, // DataGrid uses 0-indexed pages
      limit: model.pageSize,
    })
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
        getRowId={(row) => row?._id}
        columns={columns}
        rowHeight={100}
        disableRowSelectionOnClick
        pagination
        paginationMode="client"
        // rowCount={rows?.length || 0}
        paginationModel={{
          page: (params.page || 1) - 1, // Convert to 0-based
          pageSize: params.limit || 5,
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50]}
        disableColumnSelector
      />
    </Box>
  )
}
