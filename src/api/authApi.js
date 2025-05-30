import axiosClient from './axiosClient'
const url = '/auth'
export const authApi = {
  signUp(body) {
    return axiosClient.post(`${url}/signup`, body)
  },
  login(body) {
    return axiosClient.post(`${url}/login`, body)
  },

  getAll(params) {
    return axiosClient.get(`${url}/users`, { params })
  },

  edit(id, body) {
    return axiosClient.put(`${url}/users/${id}`, body)
  },

  remove(id, body) {
    return axiosClient.delete(`${url}/users/${id}`, body)
  },
}
