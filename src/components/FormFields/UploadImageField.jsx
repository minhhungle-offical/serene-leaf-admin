import { uploadApi } from '@/api/uploadApi'
import CloseIcon from '@mui/icons-material/Close'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { useController } from 'react-hook-form'

export function UploadImageField({ name, control, label, disabled = false }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const {
    field: { value, onChange },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  })

  const handleSelectFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      setLoading(true)
      const res = await uploadApi.upload(formData)
      if (res?.url) {
        onChange({ url: res.url, publicId: res.publicId })
      }
    } catch (err) {
      console.error('Lỗi upload ảnh:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!value?.publicId) {
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    try {
      setDeleting(true)
      await uploadApi.removeImage(value.publicId)
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
    } catch (error) {
      console.error('Lỗi xoá ảnh:', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <FormControl fullWidth error={invalid}>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" gap={1}>
        {value?.url ? (
          <Box position="relative" width="fit-content">
            <Box
              component="img"
              src={value.url}
              alt="uploaded"
              sx={{
                width: 200,
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #ccc',
                aspectRatio: 3 / 2,
              }}
            />
            <IconButton
              size="small"
              onClick={handleRemoveImage}
              disabled={deleting}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                color: 'white',
              }}
            >
              {deleting ? (
                <CircularProgress size={18} sx={{ color: 'white' }} />
              ) : (
                <CloseIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        ) : (
          <Box>
            <Button
              component="label"
              startIcon={<PhotoCameraIcon />}
              disabled={disabled || loading}
              sx={{
                width: 200,
                p: 2,
                border: '1px dashed',
                borderColor: 'grey.300',
                borderRadius: '8px',
                aspectRatio: 3 / 2,
              }}
            >
              {loading ? 'Đang tải...' : 'Chọn ảnh'}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleSelectFile}
                disabled={disabled || loading}
              />
            </Button>
          </Box>
        )}
      </Box>

      {invalid && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
