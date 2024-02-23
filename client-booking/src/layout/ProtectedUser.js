import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedUser = ({ children }) => {
  let user = localStorage.getItem('user')
  let dataUser
  if (user) {
    dataUser = JSON.parse(user).data
    if (dataUser.isAdmin == 'user' || dataUser.isAdmin == 'admin') {
      return <>{children}</>
    }
  }

  return <Navigate to={'/login'} />
}

export default ProtectedUser
