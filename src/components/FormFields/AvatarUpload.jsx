import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import { Avatar, Box, Typography } from '@mui/material'
import { useController } from 'react-hook-form'

export function AvatarUpload({ imageUrl, name, control, label, width = 80, height = 80 }) {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  const handleFileChange = (e) => {
    e.preventDefault()

    const file = e.target?.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    onChange({
      file,
      preview: imageUrl,
    })
  }

  const previewUrl = value?.preview || imageUrl
  const key = `photo-field-${name}`

  return (
    <Box>
      <Typography variant="body2">{label}</Typography>
      <Box component="label" htmlFor={key} sx={{ cursor: 'pointer' }}>
        <Avatar
          sx={{ width, height, position: 'relative' }}
          aria-label="photo upload"
          alt="avatar"
          src={previewUrl}
        >
          <CloudUploadRoundedIcon fontSize="large" />
        </Avatar>
      </Box>

      <Box>
        <Box
          name={name}
          hidden
          component="input"
          accept="image/*"
          id={key}
          type="file"
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  )
}
