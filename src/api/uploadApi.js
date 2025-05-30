import axiosClient from './axiosClient'

const url = '/upload'

export const uploadApi = {
  upload(formData) {
    return axiosClient.post(`${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
