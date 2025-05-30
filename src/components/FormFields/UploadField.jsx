import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { UploadIcon } from '@/assets/icon/UploadIcon'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useController } from 'react-hook-form'
import { PRIMARY_COLOR } from '@/constants/common'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function UploadField({ name, control, label = 'Upload file', imageUrl }) {
  const [preview, setPreview] = React.useState('')
  const { enqueueSnackbar } = useSnackbar()

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (e) => {
    const file = e.target?.files?.[0]
    if (!file) {
      enqueueSnackbar('File not found!', { variant: 'error' })
      return
    }

    if (file.size > 300_000) {
      enqueueSnackbar('File size must be less than 300KB', { variant: 'error' })
      return
    }

    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
    onChange(file)
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color={error ? 'error' : 'primary'}
          component="label"
        >
          {label}
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChange} />
        </Button>
      </Box>

      <Box>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            border: '1px solid',
            borderColor: error ? 'error.main' : 'grey.300',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          {preview || imageUrl ? (
            <Box
              component="img"
              src={preview || imageUrl}
              alt="Preview"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <UploadIcon
              sx={{ fontSize: 64, color: 'grey.400' }}
              fill={error ? '#D32F2F' : PRIMARY_COLOR}
            />
          )}
        </Box>

        {error && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 0.5, pl: '14px', display: 'block' }}
          >
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
