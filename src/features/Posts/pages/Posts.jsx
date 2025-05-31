import { postActions, postAdd, postEdit, postGetAll, postRemove } from '@/stores/slices/postSlice'
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
  Stack,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddEditPostForm } from '../components/AddEditPostForm'
import { PostFilter } from '../components/PostFilter'
import { PostList } from '../components/PostList'

export default function Posts() {
  const [openAddEdit, setOpenAddEdit] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const [removeData, setRemoveData] = useState(null)

  const dispatch = useDispatch()

  const formRef = useRef(null)
  const { filter, status, data, total } = useSelector((state) => state.post)
  const { data: categoryList } = useSelector((state) => state.postCategory)
  const { enqueueSnackbar } = useSnackbar()

  const handleCancel = () => {
    setOpenAddEdit(false)
    setCurrentData(null)
    setRemoveData(null)
  }

  useEffect(() => {
    dispatch(postGetAll(filter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    if (status === 'created') {
      enqueueSnackbar('Create post success', { variant: 'success' })
      dispatch(postGetAll(filter))
      dispatch(postActions.resetStatus())
      handleCancel()
    }

    if (status === 'updated') {
      enqueueSnackbar('Update post success', { variant: 'success' })
      dispatch(postActions.resetStatus())
      dispatch(postGetAll(filter))
      handleCancel()
    }

    if (status === 'removed') {
      enqueueSnackbar('Remove post success', { variant: 'success' })
      dispatch(postGetAll(filter))
      handleCancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleAddPost = () => {
    setOpenAddEdit(true)
    setCurrentData(null)
  }

  const handleEditPost = (data) => {
    setOpenAddEdit(true)
    setCurrentData(data)
  }

  const handleSubmit = (formData) => {
    if (currentData) {
      dispatch(postEdit({ id: currentData._id, data: formData }))
      return
    }
    dispatch(postAdd(formData))
  }

  const handleFilterChange = (newFilter) => {
    dispatch(postActions.setFilter(newFilter))
  }

  const handleRemove = (data) => {
    setRemoveData(data)
  }

  const handleRemoveConfirm = (id) => {
    dispatch(postRemove(id))
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={3} py={3}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="text.primary">Posts</Typography>
          </Breadcrumbs>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight="bold" sx={{ m: 0 }}>
              Posts
            </Typography>
            <Button variant="contained" color="success" startIcon={<Add />} onClick={handleAddPost}>
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
            <PostFilter
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
            <PostList
              loading={status === 'loading'}
              data={data}
              total={total}
              params={filter}
              onEdit={handleEditPost}
              onRemove={handleRemove}
              onPaginationModelChange={handleFilterChange}
              categoryList={categoryList || []}
            />
          </Box>
        </Box>

        <Dialog fullWidth maxWidth="md" open={!!removeData || openAddEdit}>
          <DialogTitle variant="h5" fontWeight={600}>
            {removeData ? 'Confirm deletion' : currentData ? 'Update post' : 'Create post'}
          </DialogTitle>

          <DialogContent dividers>
            {removeData ? (
              <Box>
                <Typography variant="body1">
                  Are you sure you want to delete <strong>{removeData.title}</strong>?
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  This action cannot be undone.
                </Typography>
              </Box>
            ) : (
              <AddEditPostForm
                ref={formRef}
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
                onClick={() => formRef?.current?.submit()}
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
