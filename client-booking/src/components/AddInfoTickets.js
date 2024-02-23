import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useSelector } from 'react-redux'
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

const AddInfoTickets = ({
  email,
  name,
  phone,
  handleChangeEmail,
  handleChangeName,
  handleChangePhone
}) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
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
    <Form
      {...formItemLayout}
      form={form}
      name="checkinfo"
      onFinish={onFinish}
      initialValues={{
        name: name,
        phone: phone,
        email: email,
        prefix: '84'
      }}
      style={{
        maxWidth: 600
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        onChange={handleChangeEmail}
        value={email}
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
        name="name"
        label="Nickname"
        onChange={handleChangeName}
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
        name="phone"
        label="Phone Number"
        onChange={handleChangePhone}
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
      {/* <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item> */}
    </Form>
  )
}
export default AddInfoTickets
