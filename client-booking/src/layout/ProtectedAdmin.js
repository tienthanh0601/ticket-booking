import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = ({ children }) => {
  // const user = useSelector((state) => state.user)

  let user = localStorage.getItem('user')
  let dataUser
  if (user) {
    dataUser = JSON.parse(user).data
    if (dataUser.isAdmin == 'admin') {
      return <>{children}</>
    }
  }

  return <Navigate to={'/'} />
}

export default ProtectedAdmin
