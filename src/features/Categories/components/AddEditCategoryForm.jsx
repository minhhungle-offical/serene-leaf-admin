import { InputField } from '@/components/FormFields/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
})

export const AddEditCategoryForm = forwardRef(({ data, onSubmit }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      name: '',
      description: '',
    },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
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

      <Box
        sx={{
          '& *': {
            whiteSpace: 'pre-wrap',
          },
        }}
      >
        <InputField multiline rows={15} name="description" label="Description" control={control} />
      </Box>
    </Stack>
  )
})
