import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Popconfirm, Table, message } from 'antd'
import ModalListPoint from '../components/ModalListPoint'
import tripApi from '../../api/tripApi'
import StationApi from '../../api/StationApi'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import vehicleApi from '../../api/VehicleApi'
import pointApi from '../../api/PointApi'
dayjs.extend(customParseFormat)
const TripManagement = () => {
  const navigate = useNavigate()

  // const [searchText, setSearchText] = useState('')
  // const [searchedColumn, setSearchedColumn] = useState('')
  // const searchInput = useRef(null)

  const [tripList, setTripList] = useState([])
  const [stations, setStations] = useState([])
  const [points, setPoints] = useState([])
  const [vehicleList, setVehicleList] = useState([])

  useEffect(() => {
    const fetchVehicle = async () => {
      const vehicleList = await vehicleApi.getAll()
      setVehicleList(vehicleList.data)
    }
    fetchVehicle()
  }, [])

  useEffect(() => {
    const fetchPoint = async () => {
      const points = await pointApi.getAll()
      setPoints(points.data)
    }
    fetchPoint()
  }, [])

  useEffect(() => {
    const fetchTrip = async () => {
      const tripList = await tripApi.getAll()
      const responseGetStations = await StationApi.getAll()
      // console.log(tripList.allTrip)
      setTripList(tripList.allTrip)
      setStations(responseGetStations.data)
    }
    fetchTrip()
  }, [tripList])

  const handleDelete = async (id) => {
    await tripApi.remove(id)
    const tripList = await tripApi.getAll()
    setTripList(tripList.data)
    message.success('Xoá chuyến xe thành công')
  }

  const handleToAdd = () => {
    navigate('/admin/add-trip')
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close
  //   }) => (
  //     <div
  //       style={{
  //         padding: 8
  //       }}
  //       onKeyDown={(e) => e.stopPropagation()}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: 'block'
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false
  //             })
  //             setSearchText(selectedKeys[0])
  //             setSearchedColumn(dataIndex)
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close()
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? '#1677ff' : undefined
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100)
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: '#ffc069',
  //           padding: 0
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     )
  // })

  const getVehicleById = (id, vehicleList) => {
    const foundVehicle = vehicleList.find((vehicle) => vehicle._id === id)
    console.log('point : ', foundVehicle)
    return foundVehicle ? foundVehicle.name : ''
  }

  const getPointsName = (pointId) => {
    const point = points.find((point) => point._id === pointId)
    return point ? point.name : ''
  }

  const getPointsAddress = (pointId) => {
    const point = points.find((point) => point._id === pointId)
    return point ? point.address : ''
  }

  const formatTime = (time) => {
    return time ? dayjs(time).format('HH:mm') : ''
  }
  const getStatusByDate = (day) => {
    const currentDate = dayjs()
    const tripDate = dayjs(day)

    if (tripDate.isBefore(currentDate, 'day')) {
      return <b style={{ color: 'red' }}>Hết hạn</b>
    } else if (tripDate.isSame(currentDate, 'day')) {
      return <b style={{ color: 'green' }}>Đang chạy</b>
    } else {
      return <b style={{ color: 'blue' }}>Sắp chạy</b>
    }
  }
  const columns = [
    {
      title: 'Điểm đi',
      dataIndex: 'from',
      key: 'from',
      width: '10%',
      render: (fromStationId) => {
        const station = stations.find(
          (station) => station._id === fromStationId
        )
        return station ? station.name : ''
      }
    },
    {
      title: 'Điểm đến',
      dataIndex: 'to',
      key: 'to',
      width: '10%',
      render: (toStationId) => {
        const station = stations.find((station) => station._id === toStationId)
        return station ? station.name : ''
      }
    },
    {
      title: 'Ngày đi',
      dataIndex: 'day',
      key: 'day',
      width: '10%',
      render: (day) => dayjs(day).format('DD/MM/YYYY')
    },
    {
      title: 'Giờ đi',
      dataIndex: 'timeStart',
      key: 'timeStart',
      width: '10%',
      render: (timeStart) => dayjs(timeStart).format('HH:mm')
    },
    {
      title: 'Giờ đến',
      dataIndex: 'timeEnd',
      key: 'timeEnd',
      width: '10%',
      render: (timeEnd) => dayjs(timeEnd).format('HH:mm')
    },
    {
      title: 'Tên xe',
      dataIndex: 'vehicle',
      key: 'vehicle',
      width: '10%',
      render: (seatId) => getVehicleById(seatId, vehicleList)
    },
    {
      title: 'Điểm đón',
      dataIndex: 'points',
      key: 'pickupPoints',
      width: '30%',
      render: (points) => (
        <Fragment>
          {points.map((point, index) => (
            <div key={index}>
              <p>
                <strong>Điểm đón:</strong>
                <br />
                <b style={{ color: 'blue' }}>
                  {formatTime(point.timePickUp)}
                </b>{' '}
                -{getPointsName(point.PickUpPointId)} -
                {getPointsAddress(point.PickUpPointId)}
              </p>
              <p>
                <strong>Điểm trả:</strong>
                <br />
                <b style={{ color: 'red' }}>{formatTime(point.timeDropOff)} </b>
                -{getPointsName(point.DropOffPointId)} -
                {getPointsAddress(point.DropOffPointId)}
              </p>
            </div>
          ))}
        </Fragment>
      )
    },
    {
      title: 'Status',
      dataIndex: 'day',
      key: 'status',
      width: '10%',
      render: (day) => <span>{getStatusByDate(day)}</span>
    },
    {
      title: 'Action',
      render: (text, item) => {
        return (
          <Fragment>
            <div className="btn-action">
              <button
                className="mr-3"
                // onClick={() => handleEditUser(item._id)}
              >
                <EditOutlined className="btn-edit" />
              </button>
              <Popconfirm
                placement="topLeft"
                title="Bạn có muốn xóa chuyến xe này?"
                onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <button
                  className="text-red-700"
                  // onClick={() => handleConfirmDelete(item._id)}
                >
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
    <div className="trip-management">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Danh sách chuyến xe'
          }
        ]}
      />
      <Button
        type="primary"
        size="large"
        onClick={handleToAdd}
        style={{ marginBottom: '24px' }}
        icon={<PlusOutlined />}
      >
        Thêm chuyến xe
      </Button>
      <Table
        columns={columns}
        scroll={{
          x: 1300
        }}
        dataSource={tripList}
      />
    </div>
  )
}

export default TripManagement
