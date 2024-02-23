import axiosClient from './axiosClient'

const ticketApi = {
  getAll(params) {
    const url = '/ticket/all'
    return axiosClient.get(url, { params })
  },
  get(id) {
    const url = `/ticket/details/${id}`
    return axiosClient.get(url)
  },
  getTicketsById(userId) {
    const url = '/ticket/find-ticket'
    const ọbjectUser = {
      user: userId
    }
    return axiosClient.post(url, ọbjectUser)
  },
  create(data) {
    const url = '/ticket/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/ticket/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/ticket/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default ticketApi
