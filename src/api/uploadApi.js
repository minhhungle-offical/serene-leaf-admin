import axiosClient from './axiosClient'

const url = '/upload'

export const uploadApi = {
  singleUpload(formData) {
    return axiosClient.post(`${url}/single-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  multipleUpload(formData) {
    return axiosClient.post(`${url}/multiple-images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  removeImage(publicId) {
    return axiosClient.post(`${url}/remove-image`, { publicId })
  },
}
