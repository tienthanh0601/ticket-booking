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
  message,
  Select
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import EditStation from '../components/EditStation'
import pointApi from '../../api/PointApi'
import { data } from '../../data/Provinces'
import provinceApi from '../../api/provinceApi'

const Province = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [provinceList, setProvinceList] = useState([])
  const [province, setProvince] = useState('')
  const [namePoint, setNamePoint] = useState('')
  const [addressPoint, setAddressPoint] = useState('')
  //   const handleChangeName = (e) => {
  //     setNamePoint(e.target.value)
  //   }
  //   const handleChangeAddress = (e) => {
  //     setAddressPoint(e.target.value)
  //   }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  //   const handleEditPoint = async (id) => {
  //     const getPointId = await pointApi.get(id)
  //     setPoint(getPointId.data)
  //     setNamePoint(getPointId.data.name)
  //     setAddressPoint(getPointId.data.address)
  //     setIsEdit(true)
  //   }
  //   const handleUpdate = async () => {
  //     const data = {
  //       id: point._id,
  //       name: namePoint,
  //       address: addressPoint
  //     }
  //     await pointApi.update(data)
  //     const pointList = await pointApi.getAll()
  //     setPointList(pointList.data)
  //     message.success('Cập nhật điểm thành công')
  //   }
  //   const handleCloseEdit = () => {
  //     setIsEdit(false)
  //     setNamePoint('')
  //     setAddressPoint('')
  //     setPoint()
  //   }
  useEffect(() => {
    const fetchProvince = async () => {
      const provinceList = await provinceApi.getAll()
      setProvinceList(provinceList.data)
    }
    fetchProvince()
  }, [])

  const handleAddProvince = async (values) => {
    const data = {
      name: values.name
    }
    console.log(data)
    await provinceApi.create(data)
    const provinceList = await provinceApi.getAll()
    setProvinceList(provinceList.data)
    setOpen(false)
    message.success('Tạo điểm mới thành công')
  }

  const handleDelete = async (id) => {
    await provinceApi.remove(id)
    const provinceList = await provinceApi.getAll()
    setProvinceList(provinceList.data)
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
      title: 'Tên thành phố',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Action',

      render: (text, item) => {
        return (
          <Fragment>
            <div className="btn-action">
              <button
                className="mr-3"
                // onClick={() => {
                //   handleEditPoint(item._id)
                // }}
              >
                <EditOutlined className="btn-edit" />
              </button>

              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onCancel={cancel}
                // onConfirm={() => handleDelete(item._id)}
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

  const renderPickProvince = () => {
    return data.map((item, index) => {
      return { label: `${item.name}`, value: item.name }
    })
  }

  return (
    <div className="wrapper-vehicle">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Province'
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
          Thêm thành phố
        </Button>
        <Drawer
          title="Tạo thành phố "
          width={600}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80
            }
          }}
        >
          <Form layout="vertical" onFinish={handleAddProvince} hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name Province"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name Province'
                    }
                  ]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    options={renderPickProvince()}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Tạo thành phố
            </Button>
          </Form>
        </Drawer>
      </div>
      <div className="list-user">
        <Table columns={columns} dataSource={provinceList} />;
      </div>
      {/* {isEdit && (
        <EditStation
          handleUpdate={handleUpdate}
          isShowModal={isEdit}
          handleChangeName={handleChangeName}
          handleChangeAddress={handleChangeAddress}
          name={namePoint}
          address={addressPoint}
          handleCloseEdit={handleCloseEdit}
        />
      )} */}

      {/* {point?.id !== '' && <EditStation />} */}
    </div>
  )
}

export default Province
