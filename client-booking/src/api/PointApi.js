import axiosClient from './axiosClient'

const pointApi = {
  getAll(params) {
    const url = '/point/all'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/point/details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/point/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/point/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/point/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default pointApi
