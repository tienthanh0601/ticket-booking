import React, { useEffect, useState } from 'react'
import '../scss/header.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Popover } from 'antd'
import * as UserService from '../services/UserService'
import { resetUser } from '../redux/slices/userSlice'
import Loading from './Loading'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const user = useSelector((state) => state.user)

  const handleNavigateLogin = () => {
    navigate('/login')
  }

  const handleLogout = async () => {
    setLoading(true)
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    await UserService.logoutUser()
    dispatch(resetUser())
    navigate('/')
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setLoading(false)
  }, [user?.name])

  const content = (
    <div className="">
      <Link to={'/profile-user'}>Thông tin người dùng</Link>
      <p style={{ cursor: 'pointer' }} onClick={handleLogout}>
        Đăng xuất
      </p>
    </div>
  )

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top-container">
          <p>Commit to 150% refund if the ticket is not valid</p>
          <p>
            Hotline: <a href="tell:+84 355898259">+84 355898259</a>
          </p>
        </div>
        <hr />
        <div className="header-bottom-container">
          <div className="header-logo">
            <h1>
              <Link to={'/'} className="logo-name">
                Bus Corner
              </Link>
            </h1>
          </div>
          <nav className="header-nav">
            <ul className="list-item-big">
              <li className="nav-item">
                <Link to={'/search-trip'}>BOOKING</Link>
              </li>
              <li className="nav-item">
                <Link to={'/contact'}>CONTACT</Link>
              </li>
            </ul>
            <Loading isLoading={loading}>
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="hover">
                    <div
                      style={{ display: 'flex', alignItems: 'center' }}
                      className="box-user"
                    >
                      <FaUserCircle className="user-icon" />
                      <p className="name-user">{userName}</p>
                    </div>
                  </Popover>
                </>
              ) : (
                <Link onClick={handleNavigateLogin} className="user-btn">
                  <FaUserCircle className="user-icon" />
                  <Link className="btn-accout">Đăng nhập</Link>
                </Link>
              )}
            </Loading>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
