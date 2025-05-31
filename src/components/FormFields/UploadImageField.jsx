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
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)

  const {
    field: { value, onChange },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  })

  const handleSelectFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file || uploading) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      setUploading(true)
      const res = await uploadApi.singleUpload(formData)

      console.log('res: ', res)
      if (res?.url) {
        onChange({ url: res.url, publicId: res.publicId })
      }
    } catch (err) {
      console.error('Image upload error:', err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemoveImage = async () => {
    if (!value?.publicId) {
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    try {
      setRemoving(true)
      await uploadApi.removeImage(value.publicId)
      onChange(null)
    } catch (error) {
      console.error('Image removal error:', error)
    } finally {
      setRemoving(false)
      if (inputRef.current) inputRef.current.value = ''
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
              alt="Uploaded"
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
              disabled={removing}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.4)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
              }}
            >
              {removing ? (
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
              disabled={disabled || uploading}
              sx={{
                width: 200,
                p: 2,
                border: '1px dashed',
                borderColor: 'grey.300',
                borderRadius: '8px',
                aspectRatio: 3 / 2,
              }}
            >
              {uploading ? 'Uploading...' : 'Select image'}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleSelectFile}
                disabled={disabled || uploading}
              />
            </Button>
          </Box>
        )}
      </Box>

      {invalid && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
