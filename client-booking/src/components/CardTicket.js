import React, { Fragment, useEffect, useState } from 'react'
import '../scss/account.scss'
import { Col, Modal, Popconfirm, Row, Table, message } from 'antd'
import '../scss/account.scss'
import { AiFillCloseCircle, AiOutlineEyeInvisible } from 'react-icons/ai'
import ticketApi from '../api/ticketApi'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import seatApi from '../api/seatApi'
import pointApi from '../api/PointApi'
import tripApi from '../api/tripApi'
const CardTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ticketList, setTicketList] = useState([])
  const [tripList, setTripList] = useState([])
  const userId = useSelector((state) => state.user.id)
  const [seatList, setSeatList] = useState([])
  const [pointList, setPointList] = useState([])
  const [cancellingTicket, setCancellingTicket] = useState(null)

  useEffect(() => {
    const fetchPoint = async () => {
      const points = await pointApi.getAll()
      setPointList(points.data)
    }
    fetchPoint()
  }, [])

  useEffect(() => {
    const fetchTrip = async () => {
      const trips = await tripApi.getAll()
      setTripList(trips.allTrip)
    }
    fetchTrip()
  }, [])

  useEffect(() => {
    const fetchSeat = async () => {
      const seatList = await seatApi.getAll()
      setSeatList(seatList.data)
    }
    fetchSeat()
  }, [])

  useEffect(() => {
    const fetchTicket = async () => {
      const ticketList = await ticketApi.getTicketsById(userId)
      setTicketList(ticketList.data)
    }
    fetchTicket()
  }, [])

  // const showModal = () => {
  //   setIsModalOpen(true)
  // }
  // const handleOk = () => {
  //   setIsModalOpen(false)
  // }
  // const handleCancel = () => {
  //   setIsModalOpen(false)
  // }
  const vnd = 'VND'

  const getSeatNameById = (id, seatList) => {
    const foundSeat = seatList.find((seat) => seat._id === id)
    return foundSeat ? foundSeat.name : ''
  }
  const getPointById = (id, pointList) => {
    const foundPoint = pointList.find((point) => point._id === id)
    return foundPoint ? foundPoint.address : ''
  }
  const getDayFromTripById = (tripId, tripList) => {
    console.log('tripId:', tripId)
    console.log('tripList:', tripList)

    const foundTrip = tripList?.find((trip) => trip._id === tripId)
    return foundTrip
      ? format(new Date(foundTrip.day), 'dd/MM/yyyy')
      : 'không có gì'
  }

  const handleCancelTicket = async (ticketId, seatId) => {
    try {
      // Thực hiện các xử lý trước khi huỷ vé (gọi API, cập nhật trạng thái, vv.)
      // Ví dụ:
      await ticketApi.cancelTicket(ticketId)

      // Cập nhật trạng thái biến SeatId về false hoặc thực hiện các bước cần thiết
      // ...

      // Cập nhật danh sách vé sau khi huỷ
      const updatedTicketList = ticketList.filter(
        (ticket) => ticket._id !== ticketId
      )
      setTicketList(updatedTicketList)

      // Cập nhật thông tin ghế sau khi huỷ vé
      const updatedSeatList = seatList.map((seat) => {
        if (seat._id === seatId) {
          return { ...seat, isBooked: false }
        }
        return seat
      })
      setSeatList(updatedSeatList)

      // Đặt trạng thái huỷ vé về null
      setCancellingTicket(null)

      message.success('Huỷ vé thành công')
    } catch (error) {
      console.error('Error cancelling ticket:', error)
      message.error('Đã có lỗi xảy ra khi huỷ vé')
    }
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

  const columns = [
    {
      title: 'Action',
      width: 30,
      fixed: 'left',
      render: (text, item) => (
        <Fragment>
          <div className="action-ticket">
            <Popconfirm
              title="Bạn có muốn huỷ vé"
              description="Are you sure you want to cancel your ticket?"
              onConfirm={() => handleCancelTicket(item._id)}
              onCancel={() => setCancellingTicket(null)}
              okText="Yes"
              cancelText="No"
            >
              <button
                onClick={() => setCancellingTicket(item._id)}
                disabled={cancellingTicket === item._id}
              >
                <AiFillCloseCircle className="btn-cancel-ticket" />
              </button>
            </Popconfirm>
          </div>
        </Fragment>
      )
    },
    {
      title: 'Mã vé',
      width: 55,
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Name',
      width: 50,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: '1',
      width: 50
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '2',
      width: 80
    },
    {
      title: 'Số tiền',
      dataIndex: 'total',
      key: '3',
      width: 50,
      render: (total) => (
        <span>
          {total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} {vnd}
        </span>
      )
    },
    {
      title: 'Ghế',
      dataIndex: 'seatId',
      key: '4',
      width: 40,
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
      width: 100,
      render: (pickedPoint, record) => (
        <span>
          {format(new Date(record.timePickUp), 'HH:mm')} -{' '}
          {getPointById(pickedPoint, pointList)}
        </span>
      )
    },
    {
      title: 'Điểm trả',
      dataIndex: 'droppedPoint',
      key: 'to',
      width: 100,
      render: (droppedPoint, record) => (
        <span>
          {format(new Date(record.timeDropOff), 'HH:mm')} -{' '}
          {getPointById(droppedPoint, pointList)}
        </span>
      )
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'createdAt',
      key: '5',
      width: 50,
      render: (createdAt) => format(new Date(createdAt), ' HH:mm dd/MM/yyyy')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 50,
      key: 'status',
      render: (_, record) => {
        const status = getStatusByDate(record.tripId, tripList)
        return <span>{status}</span>
      }
    }
  ]
  return (
    <div className="wrapper-order-ticket">
      <div className="container-ticket">
        <div className="box-card">
          <Table
            pagination={false}
            columns={columns}
            dataSource={ticketList}
            scroll={{
              x: 1500,
              y: 300
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CardTicket
