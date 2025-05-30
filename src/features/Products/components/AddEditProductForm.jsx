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
    name: yup.string().required('Name is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is required'),
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .min(0, 'Quantity cannot be negative')
      .required('Quantity is required'),
    category: yup.string().required('Category is required'),
    shortDescription: yup.string().required('Short description is required'),
    description: yup.string().required('Description is required'),
    image: yup.mixed().test('file-required', 'Image is required', (value) => {
      if (isEdit) return true
      return value instanceof File
    }),
  })

export const AddEditProductForm = forwardRef(({ data, onSubmit, categoryList }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      name: '',
      category: '',
      shortDescription: '',
      description: '',
      image: '',
      price: '',
      quantity: '',
    },
    resolver: yupResolver(schema(!!data)),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    const newData = new FormData()

    newData.append('name', formValues.name)
    newData.append('category', formValues.category)
    newData.append('shortDescription', formValues.shortDescription)
    newData.append('description', formValues.description)
    newData.append('price', parseInt(formValues.price))
    newData.append('quantity', parseInt(formValues.quantity))

    newData.append('image', formValues.image)

    onSubmit?.(newData)
  })

  useImperativeHandle(ref, () => {
    return {
      submit() {
        handleFormSubmit()
      },
    }
  })

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={3}>
      <Box>
        <InputField name="name" label="Name" control={control} />
      </Box>

      <Box>
        <InputField name="price" label="Price" control={control} />
      </Box>

      <Box>
        <InputField name="quantity" label="Quantity" control={control} />
      </Box>

      <Box>
        <SelectField name="category" label="Category" control={control} options={categoryList} />
      </Box>

      <Box
        sx={{
          '& *': {
            whiteSpace: 'pre-wrap',
          },
        }}
      >
        <InputField
          multiline
          rows={5}
          name="shortDescription"
          label="Short Description"
          control={control}
          sx={{
            '.MuiInputBase-root': {
              whiteSpace: 'pre-wrap',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          '& *': {
            whiteSpace: 'pre-wrap',
          },
        }}
      >
        <InputField multiline rows={15} name="description" label="Description" control={control} />
      </Box>

      <Box width={2 / 3}>
        <UploadField
          name="image"
          label="Upload Image"
          control={control}
          imageUrl={data?.image?.url || ''}
        />
      </Box>
    </Stack>
  )
})
