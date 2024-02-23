import React, { useEffect } from 'react'
import '../scss/home.scss'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import * as UserService from '../services/UserService'
import { useMutationHooks } from '../hooks/useMutationHook'
import * as message from '../components/Message'
import { useNavigate } from 'react-router-dom'
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

function Register() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const mutation = useMutationHooks((data) => UserService.registerUser(data))
  const { data,isSuccess, isError } = mutation
  useEffect(() => {
    if (isSuccess) {
      message.success()
      navigate('/login')
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const onFinish = (values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.name,
      phone: values.phone
    })
  }
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  )

  return (
    <div className="box-register">
      <h1 className="title-register">Đăng ký</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '84'
        }}
        style={{
          maxWidth: 600
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
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
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                )
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

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
            addonBefore={prefixSelector}
            style={{
              width: '100%'
            }}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement'))
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        {data?.status === 'ERR' && (
          <span style={{ color: 'red' }}>{data?.message}</span>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
