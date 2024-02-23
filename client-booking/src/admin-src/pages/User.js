import React, { Fragment, useEffect, useState } from 'react'
import {
  Table,
  Input,
  Breadcrumb,
  Space,
  Popconfirm,
  Button,
  Row,
  Col,
  Form,
  Select,
  Drawer,
  message
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Option } from 'antd/es/mentions'
import userApi from '../../api/userApi'
import EditUser from '../components/EditUser'
const { Search } = Input

const User = () => {
  /// new accout
  const [open, setOpen] = useState(false)
  const [userList, setUserList] = useState([])
  const [user, setUser] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const onSearch = (value, _e, info) => console.log(info?.source, value)
  const handleEditUser = async (id) => {
    const getUserId = await userApi.get(id)
    setUser(getUserId.data)
    setEmail(getUserId.data.email)
    setName(getUserId.data.name)
    setIsAdmin(getUserId.data.isAdmin)
    setPhone(getUserId.data.phone)
    setPassword(getUserId.data.password)
    setIsEdit(true)
  }

  const handleDelete = async (id) => {
    await userApi.remove(id)
    const userList = await userApi.getAll()
    setUserList(userList.data)
    message.success('Xoá tài khoản mới thành công')
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangeIsAdmin = (e) => {
    setIsAdmin(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangePhone = (e) => {
    setPhone(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleCloseEdit = () => {
    setIsEdit(false)
    setEmail('')
    setName('')
    setIsAdmin('')
    setPhone('')
    setPassword('')
    setUser()
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userList = await userApi.getAll()
      setUserList(userList.data)
    }
    fetchUser()
  }, [])

  const handleUpdate = async () => {
    const data = {
      id: user._id,
      email: email,
      name: name,
      isAdmin: isAdmin,
      phone: phone,
      password: password
    }
    await userApi.update(data)
    const userList = await userApi.getAll()
    setUserList(userList.data)
    message.success('Cập nhật tài khoản thành công')
  }

  const handleCreate = async (values) => {
    const data = {
      email: values.email,
      name: values.name,
      isAdmin: values.isAdmin,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword
    }
    await userApi.create(data)
    const userList = await userApi.getAll()
    setUserList(userList.data)
    setOpen(false)
    message.success('Tạo tài khoản mới thành công')
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      // filters: arrFilterPhone,
      onFilter: (value, record) => record.numberPhone.startsWith(value),
      filterSearch: true
    },
    {
      title: 'Role',
      dataIndex: 'isAdmin'
    },
    {
      title: 'Action',
      render: (text, item) => {
        return (
          <Fragment>
            <div className="btn-action">
              <button className="mr-3" onClick={() => handleEditUser(item._id)}>
                <EditOutlined className="btn-edit" />
              </button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onCancel={cancel}
                onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <button>
                  <DeleteOutlined className="btn-delete" />
                </button>
              </Popconfirm>
            </div>
          </Fragment>
        )
      }
    }
  ]
  const [form] = Form.useForm()
  return (
    <>
      {isEdit && (
        <EditUser
          handleUpdate={handleUpdate}
          isShowModal={isEdit}
          handleChangeEmail={handleChangeEmail}
          email={email}
          isAdmin={isAdmin}
          name={name}
          phone={phone}
          password={password}
          handleChangeName={handleChangeName}
          handleChangeIsAdmin={handleChangeIsAdmin}
          handleChangePhone={handleChangePhone}
          handleChangePassword={handleChangePassword}
          handleCloseEdit={handleCloseEdit}
        />
      )}
      <div className="wrapper-user">
        <Breadcrumb
          items={[
            {
              title: 'Admin'
            },
            {
              title: 'Quản lý người dùng'
            }
          ]}
        />
        <div className="search-user">
          <Search
            size="large"
            enterButton
            placeholder="Search User"
            allowClear
            onSearch={onSearch}
            style={{
              width: '100%'
            }}
          />
        </div>
        <div className="table-new-user">
          <Button
            type="primary"
            size="large"
            style={{ marginBottom: '24px' }}
            onClick={showDrawer}
            icon={<PlusOutlined />}
          >
            Thêm người dùng
          </Button>
          <Drawer
            title="Create a new account"
            width={720}
            onClose={onClose}
            open={open}
            styles={{
              body: {
                paddingBottom: 80
              }
            }}
          >
            <Form
              name="create"
              form={form}
              layout="vertical"
              onFinish={handleCreate}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter user name'
                      }
                    ]}
                  >
                    <Input placeholder="Please enter user name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: 'email',
                        required: true,
                        message: 'Please enter email'
                      }
                    ]}
                  >
                    <Input
                      style={{
                        width: '100%'
                      }}
                      placeholder="Please enter email"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!'
                      }
                    ]}
                  >
                    <Input
                      style={{
                        width: '100%'
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {/* <Form.Item
                    name="isAdmin"
                    label="Role"
                    rules={[
                      {
                        required: true,
                        message: 'Please select Role!'
                      }
                    ]}
                  >
                    <Select placeholder="select your Role">
                      <Option value="user">user</Option>
                      <Option value="admin">Admin</Option>
                    </Select>
                  </Form.Item> */}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please choose the Password'
                      }
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: '100%'
                      }}
                      placeholder="Please enter Password"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please choose the Password'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error(
                              'The new password that you entered do not match!'
                            )
                          )
                        }
                      })
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: '100%'
                      }}
                      placeholder="Please enter Password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Tạo tài khoản
              </Button>
            </Form>
          </Drawer>
        </div>
        <div className="list-user">
          <Table columns={columns} dataSource={userList} />;
        </div>
        {user?.id !== '' && <EditUser />}
      </div>
    </>
  )
}

export default User
