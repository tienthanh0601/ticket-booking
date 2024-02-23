import React, { useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import '../scss/home.scss'
import * as UserService from '../services/UserService'
import { useMutationHooks } from '../hooks/useMutationHook'
import * as message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/userSlice'
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutationHooks((data) => UserService.loginUser(data))
  const { data, isSuccess, isError } = mutation

  useEffect(() => {
    if (data) {
      if (data.status == 'OK') {
        message.success()
        navigate('/')
        localStorage.setItem('access_token', JSON.stringify(data?.access_token))
        localStorage.setItem('user', JSON.stringify(data))
        if (data?.access_token) {
          const decoded = jwtDecode(data?.access_token)
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.access_token)
          }
        }
      } else if (data.status == 'ERR') {
        console.log('false', data.status)
        message.error()
      }
    }
  }, [isSuccess, isError])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const onFinish = (values) => {
    mutation.mutate({
      email: values.email,
      password: values.password
    })
  }
  return (
    <div className="box-login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <span className="title-login">ĐĂNG NHẬP</span>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="d-flex">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>
        {data?.status === 'ERR' && (
          <span style={{ color: 'red' }}>{data?.message}</span>
        )}

        <Form.Item className="d-flex">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
