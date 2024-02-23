import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../../scss/admin.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { MdApproval } from 'react-icons/md'
import { MdPlace } from 'react-icons/md'
import { FaBusAlt } from 'react-icons/fa'
import { HiTicket } from 'react-icons/hi2'
import { GiWindyStripes } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { MdEvStation } from 'react-icons/md'
import { FaEarthEurope } from 'react-icons/fa6'
import { BsHouseDashFill } from 'react-icons/bs'

const { Header, Sider, Content } = Layout
const Admin = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <div className="admin-container">
      <Layout>
        <Sider
          style={{ minHeight: '100vh' }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo"></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              if (key === 'signout') {
                // todo
              } else {
                navigate(key)
              }
            }}
            items={[
              {
                key: '/admin',
                icon: <BsHouseDashFill />,
                label: 'Dashboard'
              },
              {
                key: '/admin/user',
                icon: <FaUserCircle />,
                label: 'Quản lý người dùng'
              },
              {
                key: '/admin/trip',
                icon: <GiWindyStripes />,
                label: 'Quản lý chuyến xe'
              },
              {
                key: '/admin/vehicles',
                icon: <FaBusAlt />,
                label: 'Quản lý xe'
              },
              {
                key: '/admin/tickets',
                icon: <HiTicket />,
                label: 'Quản lý vé'
              },
              {
                key: '/admin/station',
                icon: <MdEvStation />,
                label: 'Quản lý bến xe'
              },
              {
                key: '/admin/point',
                icon: <MdPlace />,
                label: 'Quản lý điểm'
              },
              {
                key: '/admin/province',
                icon: <MdApproval />,
                label: 'Quản lý thành phố'
              },
              {
                key: '/',
                icon: <FaEarthEurope />,
                label: 'Website'
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Admin
