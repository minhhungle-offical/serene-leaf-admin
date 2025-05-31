import { CKEditorField } from '@/components/FormFields/CKEditor/CKEditorField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { UploadField } from '@/components/FormFields/UploadField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = (isEdit = false) =>
  yup.object().shape({
    title: yup.string().required('Title is required'),
    shortDescription: yup.string(),
    content: yup.string().required('Content is required'),
    category: yup.string().required('Category is required'),
    image: yup.mixed().test('file-required', 'Image is required', (value) => {
      if (isEdit) return true
      return value instanceof File
    }),
  })

export const AddEditPostForm = forwardRef(({ data, onSubmit, categoryList = [] }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      title: '',
      shortDescription: '',
      content: '',
      category: '',
      image: null,
      isActive: true,
    },
    resolver: yupResolver(schema(!!data)),
  })

  const handleFormSubmit = handleSubmit((values) => {
    values.isActive = true
    const formData = new FormData()

    for (const key in values) {
      const value = values[key]

      if (key === 'image') {
        if (value instanceof File) {
          formData.append('image', value)
        }
        continue
      }

      formData.append(key, value)
    }

    onSubmit?.(formData)
  })

  useImperativeHandle(ref, () => ({
    submit() {
      handleFormSubmit()
    },
  }))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={3}>
      <Box>
        <InputField name="title" label="Title" control={control} />
      </Box>

      <Box>
        <InputField
          multiline
          rows={3}
          name="shortDescription"
          label="Short Description"
          control={control}
        />
      </Box>

      <Box>
        <SelectField name="category" label="Category" control={control} options={categoryList} />
      </Box>

      <Box>
        <CKEditorField name="content" label="Content" control={control} />
      </Box>

      <Box width={2 / 3}>
        <UploadField name="image" label="Upload Image" control={control} />
      </Box>
    </Stack>
  )
})
