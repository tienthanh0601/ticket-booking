import axiosClient from './axiosClient'

const vehicleApi = {
  getAll(params) {
    const url = '/vehicle/all'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/vehicle/details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/vehicle/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/vehicle/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/vehicle/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default vehicleApi
