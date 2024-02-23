import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.js'
import Layout from './components/Layout'
import Booking from './pages/Booking'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import isJsonString from './utils.js'
import { jwtDecode } from 'jwt-decode'
import { updateUser } from './redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import * as UserService from './services/UserService'
import Profile from './pages/Profile.js'
import Admin from './admin-src/layouts/Admin.js'
import ProtectedUser from './layout/ProtectedUser.js'
import ProtectedAdmin from './layout/ProtectedAdmin.js'
import Search from './pages/Search.js'
import User from './admin-src/pages/User.js'
import PassengerCarCompany from './admin-src/pages/PassengerCarCompany.js'
import TripManagement from './admin-src/pages/TripManagement.js'
import Tickets from './admin-src/pages/Tickets.js'
import Station from './admin-src/pages/Station.js'
import HomeAdmin from './admin-src/pages/HomeAdmin.js'
import Vehicle from './admin-src/pages/Vehicle.js'
import AddTrip from './admin-src/pages/AddTrip.js'
import Point from './admin-src/pages/Point.js'
import Province from './admin-src/pages/Province.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // const { storageData, decoded } = handleDecoded()
    // if (decoded?.id) {
    //   handleGetDetailsUser(decoded?.id, storageData)
    // }
    let user = localStorage.getItem('user')
    if (user) {
      let dataUser = JSON.parse(user).data
      let access_token = JSON.parse(user).access_token
      dispatch(updateUser({ ...dataUser, access_token: access_token }))
    }
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date()
      const { decoded } = handleDecoded()
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token)
  //   dispatch(updateUser({ ...res?.data, access_token: token }))
  // }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="search" element={<Booking />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="about" element={<Booking />}></Route>
            <Route path="contact" element={<Booking />}></Route>
            <Route path="search-trip" element={<Search />}></Route>
            <Route path="register" element={<Register />}></Route>

            <Route
              path="profile-user"
              element={
                <ProtectedUser>
                  <Profile />
                </ProtectedUser>
              }
            ></Route>
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          >
            <Route index element={<HomeAdmin />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="trip" element={<TripManagement />}></Route>
            <Route path="add-trip" element={<AddTrip />}></Route>
            <Route
              path="passengercarcompany"
              element={<PassengerCarCompany />}
            ></Route>
            <Route path="vehicles" element={<Vehicle />}></Route>
            <Route path="tickets" element={<Tickets />}></Route>
            <Route path="station" element={<Station />}></Route>
            <Route path="point" element={<Point />}></Route>
            <Route path="province" element={<Province />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
