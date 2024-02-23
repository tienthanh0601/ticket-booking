import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  access_token: '',
  id: '',
  isAdmin: false,
  refreshToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = '',
        email = '',
        access_token = '',
        address = '',
        phone = '',
        password = '',
        _id = '',
        isAdmin,
        refreshToken = ''
      } = action.payload
      state.name = name ? name : state.name
      state.password = password ? password : state.password
      state.email = email ? email : state.email
      state.address = address ? address : state.address
      state.phone = phone ? phone : state.phone
      state.id = _id ? _id : state.id
      state.access_token = access_token ? access_token : state.access_token
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken
    },
    resetUser: (state, action) => {
      state.name = ''
      state.email = ''
      state.address = ''
      state.phone = ''
      state.id = ''
      state.access_token = ''
      state.isAdmin = false
      state.refreshToken = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
