import axiosClient from './axiosClient'

const tripApi = {
  getAll(params) {
    const url = '/trip/all'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/trip/details/${id}`
    return axiosClient.get(url)
  },
  search(data) {
    const url = '/trip/find-trip'
    return axiosClient.post(url, data)
  },
  create(data) {
    const url = '/trip/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/trip/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/trip/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default tripApi
