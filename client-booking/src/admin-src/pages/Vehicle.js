import React, { Fragment, useEffect, useState } from 'react'
import '../../scss/vehicle.scss'
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
  message,
  Modal
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import { Option } from 'antd/es/mentions'
import vehicleApi from '../../api/VehicleApi'
import { BsBusFrontFill } from 'react-icons/bs'
import SeatBooked from '../../components/Seat/SeatBooked'
import Seat1 from '../../components/Seat/Seat1'
import SeatBooking from '../../components/Seat/SeatBooking'
import DetailsSeat from '../components/DetailsSeat'
import { Hidden } from '@mui/material'

const Vehicle = () => {
  const [open, setOpen] = useState(false)
  const [vehicleList, setVehicleList] = useState([])

  const handleDelete = async (id) => {
    await vehicleApi.remove(id)
    const vehicleList = await vehicleApi.getAll()
    setVehicleList(vehicleList.data)
    message.success('Xoá xe thành công')
  }

  useEffect(() => {
    const fetchVehicle = async () => {
      const vehicleList = await vehicleApi.getAll()
      setVehicleList(vehicleList.data)
    }
    fetchVehicle()
  }, [])

  const handleCreate = async (values) => {
    const data = {
      name: values.name,
      type: values.type,
      floor: values.floor,
      totalSeat: values.totalSeat
    }
    console.log(data)
    await vehicleApi.create(data)
    const vehicleList = await vehicleApi.getAll()
    setVehicleList(vehicleList.data)
    setOpen(false)
    message.success('Tạo xe mới thành công')
  }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVehicleOpen, setIsModalVehicleOpen] = useState(false)
  const [vehicleId, setVehicleId] = useState('')
  const showModal = (id) => {
    setIsModalOpen(true)
    setVehicleId(id)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setVehicleId('')
  }

  const showModalEdit = () => {
    setIsModalVehicleOpen(true)
  }
  const handleOkVehicle = () => {
    setIsModalVehicleOpen(false)
  }
  const handleCancelVehicle = () => {
    setIsModalVehicleOpen(false)
  }

  // const handleUpdateVehicle = async (values, idVehicle) => {
  //   const data = {
  //     id: idVehicle,
  //     name: values.name,
  //     type: values.type
  //   }
  //   await vehicleApi.update(data)
  //   setIsModalVehicleOpen(false)
  //   const vehicleList = await vehicleApi.getAll()
  //   setVehicleList(vehicleList.data)
  //   message.success('Cập nhật thông tin xe thành công')
  // }

  const columns = [
    {
      title: 'Tên Xe',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    // {
    //   title: 'Số tầng',
    //   dataIndex: 'floor'
    // },
    {
      title: 'Loại xe',
      dataIndex: 'type',
      filters: [
        {
          text: 'Giường nằm',
          value: 'Giường nằm'
        },
        {
          text: 'Limousine',
          value: 'Limousine'
        }
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: true
    },
    {
      title: 'Chi tiết ghế',
      render: (text, item) => {
        return (
          <Fragment>
            <div>
              <Button
                className="btn-point"
                type="primary"
                onClick={() => showModal(item._id)}
              >
                <BsBusFrontFill className="icon-point" />
                Xem ghế
              </Button>
              <Modal
                width={800}
                title="Chi tiết ghế"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <DetailsSeat vehicleId={vehicleId} />
              </Modal>
            </div>
          </Fragment>
        )
      }
    },
    {
      title: 'Action',

      render: (text, item) => {
        console.log(item)
        return (
          <Fragment>
            <div className="btn-action">
              <button onClick={showModalEdit}>
                <EditOutlined className="btn-edit" />
              </button>
              <Modal
                title="Edit Vehicle"
                open={isModalVehicleOpen}
                onOk={handleOkVehicle}
                onCancel={handleCancelVehicle}
                okButtonProps={{
                  hidden: true,
                  disabled: true
                }}
                okText=" "
              >
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
                    remember: true,
                    name: item.name,
                    type: item.type
                  }}
                  // onFinish={handleUpdateVehicle(item._id)}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    // onChange={handleChangeName}
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
                    name="type"
                    label="Type"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      // options={renderPickProvince()}
                    >
                      <Option value="Giường nằm">Giường nằm</Option>
                      <Option value="Limousine">Limousine</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 10,
                      span: 24
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>

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

  return (
    <div className="wrapper-vehicle">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Quản lý xe'
          }
        ]}
      />
      <div className="table-new-vehicle">
        <Button
          type="primary"
          size="large"
          style={{ marginBottom: '24px' }}
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Thêm Xe
        </Button>
        <Drawer
          title="Tạo xe mới"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80
            }
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <Form layout="vertical" onFinish={handleCreate}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name Vehicle"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name Vehicle'
                    }
                  ]}
                >
                  <Input placeholder="Please enter name Vehicle" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an Type'
                    }
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="Giường nằm">Xe giường nằm</Option>
                    <Option value="Limousine">Limousine</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="floor"
                  label="Floor"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter floor'
                    }
                  ]}
                >
                  <Select placeholder="Please select floor">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="totalSeat"
                  label="Total Seat"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Total Seat'
                    }
                  ]}
                >
                  <Input placeholder="Please enter Total Seat" />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Tạo xe mới
            </Button>
          </Form>
        </Drawer>
      </div>
      <div className="list-user">
        <Table columns={columns} dataSource={vehicleList} />
      </div>
    </div>
  )
}

export default Vehicle
