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
import ModalListPoint from '../components/ModalListPoint'
import StationApi from '../../api/StationApi'
import EditStation from '../components/EditStation'
import { BsBusFrontFill } from 'react-icons/bs'
import pointApi from '../../api/PointApi'
import { data } from '../../data/Provinces'
import provinceApi from '../../api/provinceApi'
const Station = () => {
  const [open, setOpen] = useState(false)
  const [openModalPoint, setOpenModalPoint] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [stationList, setStationList] = useState([])
  const [station, setStation] = useState('')
  const [nameStation, setNameStation] = useState('')
  const [addressStation, setAddressStation] = useState('')
  const [provinceStation, setProvinceStation] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [provinceList, setProvinceList] = useState([])

  const handleChangeName = (e) => {
    setNameStation(e.target.value)
  }
  const handleChangeAddress = (e) => {
    setAddressStation(e.target.value)
  }

  const handleChangeProvince = (e) => {
    setProvinceStation(e.target.value)
  }

  const [pointList, setPointList] = useState([])

  useEffect(() => {
    const fetchPoint = async () => {
      const pointList = await pointApi.getAll()
      setPointList(pointList.data)
    }
    fetchPoint()
  }, [])

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

  const filteredOptions = pointList?.filter(
    (o) => !selectedItems?.includes(o._id)
  )
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handleToggleModal = (id) => {
    setOpenModalPoint(() => !openModalPoint)
    setStation(id)
    const data = stationList.find((x) => x._id === id)
    if (data !== undefined) setSelectedItems(data.points)
    else setSelectedItems([])
  }

  const handleEditStation = async (id) => {
    const getStationId = await StationApi.get(id)
    setStation(getStationId.data)
    setNameStation(getStationId.data.name)
    setAddressStation(getStationId.data.address)
    setProvinceStation(getStationId.data.province)
    setIsEdit(true)
  }
  const handleUpdate = async () => {
    const data = {
      id: station._id,
      name: nameStation,
      address: addressStation,
      province: provinceStation
    }
    await StationApi.update(data)
    const stationList = await StationApi.getAll()
    setStationList(stationList.data)
    message.success('Cập nhật thông tin bến xe thành công')
  }
  const handleCloseEdit = () => {
    setIsEdit(false)
    setNameStation('')
    setAddressStation('')
    setStation()
  }
  useEffect(() => {
    const fetchStation = async () => {
      const stationList = await StationApi.getAll()
      setStationList(stationList.data)
    }
    fetchStation()
  }, [])

  const handleAddPoint = async (values) => {
    const data = {
      name: values.name,
      address: values.address,
      province: values.province
    }
    await StationApi.create(data)
    const stationList = await StationApi.getAll()
    setStationList(stationList.data)
    setOpen(false)
    message.success('Tạo bến xe mới thành công')
  }

  const handleDelete = async (id) => {
    await StationApi.remove(id)
    const stationList = await StationApi.getAll()
    setStationList(stationList.data)
    message.success('Xoá bến xe thành công')
  }

  //

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  const handleUpdatePoint = async () => {
    const data = {
      id: station,
      points: selectedItems
    }
    await StationApi.update(data)
    setOpenModalPoint(false)
    const stationList = await StationApi.getAll()
    setStationList(stationList.data)
  }
  //
  const columns = [
    {
      title: 'Tên Bến',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Thành phố',
      dataIndex: 'province'
    },
    {
      title: 'Các điểm đón / trả',
      render: (text, item) => {
        return (
          <Fragment>
            <div>
              <button
                className="btn-point"
                onClick={() => {
                  handleToggleModal(item._id)
                }}
              >
                <BsBusFrontFill className="icon-point" />
                Điểm đón / Dừng
              </button>
            </div>
          </Fragment>
        )
      }
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
                  handleEditStation(item._id)
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
          Thêm Bến Xe
        </Button>
        <Drawer
          title="Tạo Bến xe"
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
            <Row>
              <Col span={12}>
                <Form.Item
                  name="province"
                  label="Name Province"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Province'
                    }
                  ]}
                >
                  <Select
                    options={renderPickProvince()}
                    placeholder="select Province"
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Tạo Bến Xe
            </Button>
          </Form>
        </Drawer>
      </div>
      <div className="list-user">
        <Table columns={columns} dataSource={stationList} />;
      </div>
      {isEdit && (
        <EditStation
          handleUpdate={handleUpdate}
          isShowModal={isEdit}
          handleChangeName={handleChangeName}
          handleChangeAddress={handleChangeAddress}
          handleChangeProvince={handleChangeProvince}
          name={nameStation}
          provinceStation={provinceStation}
          address={addressStation}
          handleCloseEdit={handleCloseEdit}
        />
      )}
      <ModalListPoint
        isOpen={openModalPoint}
        handleToogle={handleToggleModal}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        filteredOptions={filteredOptions}
        handleUpdatePoint={handleUpdatePoint}
      />
      {station?.id !== '' && <EditStation />}
    </div>
  )
}

export default Station
