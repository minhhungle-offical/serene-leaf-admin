import axiosClient from './axiosClient'

const url = '/post-categories'

export const postCategoryApi = {
  getAll(params) {
    return axiosClient.get(`${url}`, { params })
  },
  get(id) {
    return axiosClient.get(`${url}/${id}`)
  },
  add(body) {
    return axiosClient.post(`${url}`, body)
  },
  edit(id, body) {
    return axiosClient.put(`${url}/${id}`, body)
  },
  remove(id) {
    return axiosClient.delete(`${url}/${id}`)
  },
}
