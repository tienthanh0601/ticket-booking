import React, { Fragment, useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import ticketApi from '../../api/ticketApi'
import pointApi from '../../api/PointApi'
import { format } from 'date-fns'
import seatApi from '../../api/seatApi'
import tripApi from '../../api/tripApi'

const Tickets = () => {
  // lấy tat cả tieket ra
  const [ticketList, setTicketList] = useState([])
  const [pointList, setPointList] = useState([])
  const [seatList, setSeatList] = useState([])
  const [tripList, setTripList] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState(null)
  // tát cả point
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    const fetchTicket = async () => {
      const pointList = await ticketApi.getAll()
      setTicketList(pointList.data)
    }
    fetchTicket()
  }, [])

  useEffect(() => {
    const fetchSeat = async () => {
      const seatList = await seatApi.getAll()
      setSeatList(seatList.data)
    }
    const fetchTrip = async () => {
      const trips = await tripApi.getAll()
      console.log(' list 1 ', trips.allTrip)
      setTripList(trips.allTrip)
    }
    fetchTrip()
    fetchSeat()
  }, [])

  useEffect(() => {
    const fetchPoint = async () => {
      const points = await pointApi.getAll()
      setPointList(points.data)
    }
    fetchPoint()
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const getPointById = (id, pointList) => {
    console.log('first', id, pointList)
    const foundPoint = pointList.find((point) => point._id === id)
    console.log(foundPoint)
    return foundPoint ? foundPoint.address : ''
  }

  const getSeatNameById = (id, seatList) => {
    const foundSeat = seatList.find((seat) => seat._id === id)
    return foundSeat ? foundSeat.name : ''
  }

  const getDayFromTripById = (tripId, tripList) => {
    console.log('tripId:', tripId)
    console.log('tripList:', tripList)

    const foundTrip = tripList?.find((trip) => trip._id === tripId)
    return foundTrip
      ? format(new Date(foundTrip.day), 'dd/MM/yyyy')
      : 'không có gì'
  }

  const deleteTicket = async (ticketId) => {
    try {
      // Gọi API xóa vé với ID tương ứng
      await ticketApi.remove(ticketId)

      // Cập nhật danh sách vé sau khi xóa
      const updatedTicketList = ticketList.filter(
        (ticket) => ticket._id !== ticketId
      )
      setTicketList(updatedTicketList)
    } catch (error) {
      console.error('Error deleting ticket:', error)
    } finally {
      // Đặt lại trạng thái
      setConfirmDelete(false)
      setDeletingItemId(null)
    }
  }
  const handleConfirmDelete = async (ticketId) => {
    setConfirmDelete(true)
    setDeletingItemId(ticketId)
  }

  // Xử lý sự kiện hủy xác nhận xóa
  const handleCancelDelete = () => {
    setConfirmDelete(false)
    setDeletingItemId(null)
  }

  const getStatusByDate = (tripId, tripList) => {
    const foundTrip = tripList?.find((trip) => trip._id === tripId)
    const currentDate = new Date()

    if (!foundTrip) {
      return 'Không xác định'
    }

    const tripDate = new Date(foundTrip.day)

    if (tripDate < currentDate) {
      return <b style={{ color: 'red' }}>Hết hạn</b>
    } else if (tripDate.getDate() === currentDate.getDate()) {
      return <b style={{ color: 'green' }}>Đang chạy</b>
    } else {
      return <b style={{ color: 'blue' }}>Sắp chạy</b>
    }
  }

  const vnd = 'VND'
  const columns = [
    {
      title: 'Mã vé',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      ...getColumnSearchProps('email')
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      width: 50,
      render: (total) => (
        <span>
          {total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} {vnd}
        </span>
      )
    },
    {
      title: 'Tên ghế',
      dataIndex: 'seatId',
      key: 'seatId',
      width: '10%',
      render: (seatId) => getSeatNameById(seatId, seatList)
    },
    {
      title: 'Ngày đi',
      dataIndex: 'tripId',
      key: '4',
      width: 40,
      render: (tripId) => getDayFromTripById(tripId, tripList)
    },
    {
      title: 'Điểm đón',
      dataIndex: 'pickedPoint',
      key: 'pickedPoint',
      width: '30%',
      render: (pickedPoint, record) => (
        <span>
          <b style={{ color: 'blue' }}>
            {' '}
            {format(new Date(record.timePickUp), 'HH:mm')} -{' '}
          </b>

          {getPointById(pickedPoint, pointList)}
        </span>
      )
    },
    {
      title: 'Điểm trả',
      dataIndex: 'droppedPoint',
      key: 'to',
      width: '30%',
      render: (droppedPoint, record) => (
        <span>
          <b style={{ color: 'red' }}>
            {' '}
            {format(new Date(record.timeDropOff), 'HH:mm')} -{' '}
          </b>
          {getPointById(droppedPoint, pointList)}
        </span>
      )
    },
    {
      title: 'Ngày mua',
      dataIndex: 'createdAt',
      key: 'createdAt',

      render: (createdAt) => format(new Date(createdAt), 'dd/MM/yyyy HH:mm')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        const status = getStatusByDate(record.tripId, tripList)
        return <span>{status}</span>
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
                // onClick={() => {
                //   dispatch({
                //     type: SET_MODAL,
                //     title: 'EDIT USER',
                //     content: <EditUser id={item.id} />,
                //     width: 600
                //   })
                // }}
              >
                <EditOutlined className="btn-edit" />
              </button>
              <Popconfirm
                placement="topLeft"
                title={'Bạn có muốn xóa tài khoản này'}
                onConfirm={() => deleteTicket(item._id)}
                onCancel={handleCancelDelete}
                okText="Yes"
                cancelText="No"
                visible={confirmDelete && deletingItemId === item._id}
              >
                <button
                  className="text-red-700"
                  onClick={() => handleConfirmDelete(item._id)}
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
    <div className="">
      <Table
        columns={columns}
        scroll={{
          x: 1400
        }}
        dataSource={ticketList}
      />
    </div>
  )
}

export default Tickets
