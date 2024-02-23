import axiosClient from './axiosClient'

const provinceApi = {
  getAll(params) {
    const url = '/province/all'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/province/details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/province/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/province/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/province/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default provinceApi
