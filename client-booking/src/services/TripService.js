import axios from 'axios'

export const axiosJWT = axios.create()

export const getAllTrip = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_KEY}/trip/all`,
    data
  )
  return response.data
}