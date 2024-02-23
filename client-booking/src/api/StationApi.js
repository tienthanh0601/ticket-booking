import axiosClient from './axiosClient'

const StationApi = {
  getAll(params) {
    const url = '/station/all'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/station/details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/station/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/station/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/station/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default StationApi
