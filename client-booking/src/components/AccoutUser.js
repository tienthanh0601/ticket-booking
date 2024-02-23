import { Button, Form, Input, Space, message } from 'antd'
import React, { useEffect } from 'react'
import { updateUser } from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMutationHooks } from '../hooks/useMutationHook'
import * as UserService from '../services/UserService'

const AccoutUser = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data
    UserService.updateUser(id, rests, access_token)
  })

  const { data, isSuccess, isError, isLoading } = mutation

  useEffect(() => {
    let userLocal = localStorage.getItem('user')
    if (userLocal) {
      let dataUser = JSON.parse(userLocal)
      dispatch(
        updateUser({ ...dataUser.data, access_token: dataUser.access_token })
      )
    }
  }, [isSuccess, isError])

  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token)
  //   dispatch(updateUser({ ...res?.data, access_token: token }))
  // }

  const onFinish = (values) => {
    mutation.mutate({
      id: user?.id,
      email: user?.email,
      password: user?.password,
      name: user?.name,
      phone: user?.phone,
      access_token: user?.access_token
    })
    message.success()
  }
  return (
    <div className="account-infomation">
      <div className="description">
        <h1>Thông tin tài khoản</h1>
        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className="">
        <Form
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default AccoutUser
