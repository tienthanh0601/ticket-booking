import axiosClient from './axiosClient'

const seatApi = {
  getAll(params) {
    const url = '/seat/all'
    return axiosClient.get(url, { params })
  },
  getSeatByVehicle(vehicleId) {
    const url = `/seat/seatByVehicle/${vehicleId}`
    return axiosClient.get(url)
  },
  get(id) {
    const url = `/seat/details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/seat/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/seat/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/seat/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default seatApi
