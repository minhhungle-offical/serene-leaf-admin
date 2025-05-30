import axiosClient from './axiosClient'

const url = '/posts'

export const postApi = {
  getAll(params) {
    return axiosClient.get(`${url}`, { params })
  },
  get(id) {
    return axiosClient.get(`${url}/${id}`)
  },
  add(body) {
    return axiosClient.post(`${url}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  edit(id, body) {
    return axiosClient.put(`${url}/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  remove(id) {
    return axiosClient.delete(`${url}/${id}`)
  },
}
