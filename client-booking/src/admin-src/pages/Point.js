import React, { Fragment, useEffect, useState } from 'react'
import {
  Table,
  Input,
  Breadcrumb,
  Popconfirm,
  Button,
  Row,
  Col,
  Form,
  Drawer,
  message
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import EditStation from '../components/EditStation'
import pointApi from '../../api/PointApi'
import EditPoint from '../components/EditPoint'

const Point = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [pointList, setPointList] = useState([])
  const [point, setPoint] = useState('')
  const [namePoint, setNamePoint] = useState('')
  const [addressPoint, setAddressPoint] = useState('')
  const handleChangeName = (e) => {
    setNamePoint(e.target.value)
  }
  const handleChangeAddress = (e) => {
    setAddressPoint(e.target.value)
  }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handleEditPoint = async (id) => {
    const getPointId = await pointApi.get(id)
    setPoint(getPointId.data)
    setNamePoint(getPointId.data.name)
    setAddressPoint(getPointId.data.address)
    setIsEdit(true)
  }
  const handleUpdate = async () => {
    const data = {
      id: point._id,
      name: namePoint,
      address: addressPoint
    }
    await pointApi.update(data)
    const pointList = await pointApi.getAll()
    setPointList(pointList.data)
    message.success('Cập nhật điểm thành công')
  }
  const handleCloseEdit = () => {
    setIsEdit(false)
    setNamePoint('')
    setAddressPoint('')
    setPoint()
  }
  useEffect(() => {
    const fetchPoint = async () => {
      const pointList = await pointApi.getAll()
      setPointList(pointList.data)
    }
    fetchPoint()
  }, [])

  const handleAddPoint = async (values) => {
    const data = {
      name: values.name,
      address: values.address
    }
    await pointApi.create(data)
    const pointList = await pointApi.getAll()
    setPointList(pointList.data)
    setOpen(false)
    message.success('Tạo điểm mới thành công')
  }

  const handleDelete = async (id) => {
    await pointApi.remove(id)
    const stationList = await pointApi.getAll()
    setPointList(stationList.data)
    message.success('Xoá tài khoản mới thành công')
  }

  //

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  //
  const columns = [
    {
      title: 'Tên điểm đón/ trả',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Action',

      render: (text, item) => {
        return (
          <Fragment>
            <div className="btn-action">
              <button
                className="mr-3"
                onClick={() => {
                  handleEditPoint(item._id)
                }}
              >
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

  return (
    <div className="wrapper-vehicle">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Station'
          }
        ]}
      />
      <div className="table-new-station">
        <Button
          type="primary"
          size="large"
          style={{ marginBottom: '24px' }}
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Thêm điểm đón / trả
        </Button>
        <Drawer
          title="Tạo Điểm "
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80
            }
          }}
        >
          <Form layout="vertical" onFinish={handleAddPoint} hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name Station"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name Station'
                    }
                  ]}
                >
                  <Input placeholder="Please enter name Station" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter address Station'
                    }
                  ]}
                >
                  <Input placeholder="Please enter address Station" />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Tạo Điểm đón / trả
            </Button>
          </Form>
        </Drawer>
      </div>
      <div className="list-user">
        <Table columns={columns} dataSource={pointList} />;
      </div>
      {isEdit && (
        <EditPoint
          handleUpdate={handleUpdate}
          isShowModal={isEdit}
          handleChangeName={handleChangeName}
          handleChangeAddress={handleChangeAddress}
          name={namePoint}
          address={addressPoint}
          handleCloseEdit={handleCloseEdit}
        />
      )}

      {point?.id !== '' && <EditStation />}
    </div>
  )
}

export default Point
