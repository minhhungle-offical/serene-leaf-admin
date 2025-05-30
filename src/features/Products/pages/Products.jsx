import {
  productActions,
  productAdd,
  productEdit,
  productGetAll,
  productRemove,
} from '@/stores/slices/productSlice'
import { Add } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddEditProductForm } from '../components/AddEditProductForm'
import { ProductFilter } from '../components/ProductFilter'
import { ProductList } from '../components/ProductList'

export default function Products() {
  const [openAddEdit, setOpenAddEdit] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const [removeData, setRemoveData] = useState(null)

  const dispatch = useDispatch()

  const formData = useRef(null)
  const { filter, status, resId, data, total } = useSelector((state) => state.product)
  const { data: categoryList } = useSelector((state) => state.category)
  const { enqueueSnackbar } = useSnackbar()

  const handleCancel = () => {
    setOpenAddEdit(false)
    setCurrentData(null)
    setRemoveData(null)
  }

  useEffect(() => {
    dispatch(productGetAll(filter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    if (status === 'created' && resId) {
      enqueueSnackbar('create product success', { variant: 'success' })
      dispatch(productGetAll(filter))
      dispatch(productActions.resetStatus())
      handleCancel()
    }

    if (status === 'updated') {
      enqueueSnackbar('Update product success', { variant: 'success' })
      dispatch(productActions.resetStatus())
      dispatch(productGetAll(filter))
      handleCancel()
    }

    if (status === 'removed') {
      handleCancel()
      dispatch(productGetAll(filter))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, resId])

  const handleAddProduct = () => {
    setOpenAddEdit(true)
    setCurrentData(null)
  }

  const handleEditProduct = (data) => {
    setOpenAddEdit(true)
    setCurrentData(data)
  }

  const handleSubmit = (formData) => {
    if (currentData) {
      dispatch(productEdit({ id: currentData._id, data: formData }))
      return
    }

    dispatch(productAdd(formData))
  }

  const handleFilterChange = (newFilter) => {
    dispatch(productActions.setFilter(newFilter))
  }

  const handleRemove = (data) => {
    setRemoveData(data)
  }
  const handleRemoveConfirm = (id) => {
    dispatch(productRemove(id))
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={3} py={3}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="text.primary">Products</Typography>
          </Breadcrumbs>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight="bold" sx={{ m: 0 }}>
              Products
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<Add />}
              onClick={handleAddProduct}
            >
              Add new
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            boxShadow: (theme) => theme.shadows[24],
            backgroundColor: 'background.paper',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <ProductFilter
              params={filter}
              onFilterChange={handleFilterChange}
              categoryList={categoryList?.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
            />
          </Box>

          <Divider />

          <Box>
            <ProductList
              loading={status === 'loading'}
              data={data}
              total={total}
              params={filter}
              onEdit={handleEditProduct}
              onRemove={handleRemove}
              onPaginationModelChange={handleFilterChange}
              categoryList={categoryList || []}
            />
          </Box>
        </Box>

        <Dialog fullWidth maxWidth="md" open={!!removeData || openAddEdit}>
          <DialogTitle variant="h5" fontWeight={600}>
            {removeData ? 'Confirm deletion' : currentData ? 'Update product' : 'Create product'}
          </DialogTitle>

          <DialogContent dividers>
            {removeData ? (
              <Box>
                <Typography variant="body1">
                  Are you sure you want to delete <strong>{removeData.name}</strong>?
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  This action cannot be undone.
                </Typography>
              </Box>
            ) : (
              <AddEditProductForm
                ref={formData}
                onSubmit={handleSubmit}
                data={currentData}
                categoryList={categoryList?.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            )}
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
              disabled={status === 'loading'}
            >
              Cancel
            </Button>

            {removeData ? (
              <Button
                color="error"
                variant="contained"
                onClick={() => handleRemoveConfirm(removeData?._id)}
                disabled={status === 'loading'}
              >
                Confirm
              </Button>
            ) : (
              <Button
                color="info"
                variant="contained"
                disabled={status === 'loading'}
                onClick={() => formData?.current?.submit()}
              >
                {currentData ? 'Save' : 'Create'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  )
}
