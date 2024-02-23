import React, { useEffect, useState } from 'react'
import '../scss/account.scss'
import { FaUserCircle } from 'react-icons/fa'
import { BsClockFill } from 'react-icons/bs'
import { TbLogout } from 'react-icons/tb'
import AccoutUser from '../components/AccoutUser'
import CardTicket from '../components/CardTicket'

const Profile = () => {
  const [showEdit, setShowEdit] = useState(true)
  const [showTicket, setShowTicket] = useState(false)

  const showCard = () => {
    setShowEdit(false)
    setShowTicket(true)
  }

  const showEditUser = () => {
    setShowTicket(false)
    setShowEdit(true)
  }
  return (
    <div className="account-wrapper">
      <div className="menu">
        <div onClick={showEditUser} className="info-accout">
          <FaUserCircle className="user-icon" />
          <span className="title-account">Thông tin tài khoản</span>
        </div>
        <div onClick={showCard} className="info-accout">
          <BsClockFill className="tickets-icon" />
          <span className="title-account">Lịch sử mua vé</span>
        </div>
        <div className="info-accout">
          <TbLogout className="logout-icon" />
          <span className="title-account">Đăng xuất</span>
        </div>
      </div>
      {showEdit && <AccoutUser />}
      {showTicket && <CardTicket />}
    </div>
  )
}

export default Profile
