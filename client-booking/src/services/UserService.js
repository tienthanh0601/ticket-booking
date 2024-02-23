import axios from 'axios'

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/sign-in`,
    data
  )
  return response.data
}

export const registerUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/sign-up`,
    data
  )
  return response.data
}

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`
      }
    }
  )
  return res.data
}

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/refresh-token`,
    {
      withCredentials: true
    }
  )
  return res.data
}

export const logoutUser = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/log-out`
  )
  return response.data
}

export const updateUser = async (id, data, access_token) => {
  const response = await axiosJWT.put(
    `${process.env.REACT_APP_API_KEY}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`
      }
    }
  )
  return response.data
}
