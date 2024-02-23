import axiosClient from './axiosClient'

const userApi = {
  getAll(params) {
    const url = '/user/getAll'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/user/get-details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/user/sign-up'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/user/update-user/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/user/delete-user/${id}`
    return axiosClient.delete(url)
  }
}

export default userApi
