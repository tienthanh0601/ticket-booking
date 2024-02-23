import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import '../../scss/edituser.scss'
import { data } from '../../data/Provinces'
import provinceApi from '../../api/provinceApi'
const EditStation = ({
  handleUpdate,
  isShowModal,
  handleChangeName,
  handleChangeAddress,
  provinceStation,
  handleChangeProvince,
  name,
  address,
  handleCloseEdit
}) => {
  const [provinceList, setProvinceList] = useState([])

  useEffect(() => {
    const fetchProvince = async () => {
      const provinceList = await provinceApi.getAll()
      setProvinceList(provinceList.data)
    }
    fetchProvince()
  }, [])

  const renderPickProvince = () => {
    return provinceList.map((item, index) => {
      return { label: `${item.name}`, value: item._id }
    })
  }
  const handleOk = () => {
    handleUpdate()
    handleCloseEdit()
  }
  console.log(provinceStation)
  return (
    <div>
      <Modal
        title="Edit Station"
        open={isShowModal}
        onOk={handleOk}
        onCancel={handleCloseEdit}
      >
        {/* <div className="input-edit">
          <span>Name :</span>
          <input
            className="input-css"
            value={name}
            onChange={handleChangeName}
            type="text"
          />
        </div>
        <div className="input-edit">
          <span>Address :</span>
          <input value={address} onChange={handleChangeAddress} type="text" />
        </div>
        <div className="input-edit">
          <span>Thành phố :</span>
          <select
            className="input-edit"
            value={province}
            onChange={handleChangeProvince}
          >
            {renderPickProvince().map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
        </div> */}
        <Form
          name="basic"
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 20
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            name: name,
            address: address,
            province: provinceStation,
            remember: true
          }}
          onFinish={handleOk}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            onChange={handleChangeName}
            rules={[
              {
                required: true,
                message: 'Please input Name Station!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            onChange={handleChangeAddress}
            rules={[
              {
                required: true,
                message: 'Please input your Address!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="province"
            label="Province"
            onChange={handleChangeProvince}
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              options={renderPickProvince()}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditStation

