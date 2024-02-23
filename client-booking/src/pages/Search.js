import React, { useEffect, useState } from 'react'
import '../scss/search.scss'
import SearchTickets from '../components/SearchTickets'
import SideBar from '../components/SideBar'
import Trip from '../components/Trip'
import StationApi from '../api/StationApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsFillRecordCircleFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import { Alert, Button, message, notification } from 'antd'
import SelectTrip from '../components/SelectTrip'
import vehicleApi from '../api/VehicleApi'
import seatApi from '../api/seatApi'
import tripApi from '../api/tripApi'
import dayjs from 'dayjs'
import provinceApi from '../api/provinceApi'
import pointApi from '../api/PointApi'
import ticketApi from '../api/ticketApi'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

const calculateDuration = (timeStart, timeEnd) => {
  const start = new Date(timeStart)
  const end = new Date(timeEnd)

  const hours = end.getHours() - start.getHours()
  const minutes = end.getMinutes() - start.getMinutes()
  if (hours > 0 && minutes === 0) return `${hours} giờ`
  if (hours === 0 && minutes > 0) return `${minutes} phút`
  return `${hours} giờ ${minutes} phút`
}

const getStationById = (id, stations) => {
  const find = stations.find((s) => s._id === id)
  return find !== undefined ? find.name : 'Không tìm thấy'
}

const getVehicleById = (id, vehicles) => {
  const find = vehicles.find((item) => item._id === id)
  return find !== undefined ? find : 'Không tìm thấy'
}

const getSeatsById = (id, seats) => {
  const result = []
  if (seats === undefined) return result
  for (let i = 0; i < seats.length; i++) {
    if (seats[i].vehicle === id) result.push(seats[i])
  }
  return result
}

const countSeatEmpty = (seats) => {
  let count = 0
  if (seats === undefined) return count

  for (let i = 0; i < seats.length; i++) {
    if (!seats[i].isBooked) count++
  }

  return count
}

const Search = () => {
  const userId = useSelector((state) => state.user.id)
  const [isShowSelect, setIsShowSelect] = useState(false)
  const [stations, setStations] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [trips, setTrips] = useState([])
  const [seats, setSeats] = useState([])
  const [points, setPoints] = useState([])

  const [provinceList, setProvinceList] = useState([])
  const [from, setFrom] = useState({})
  const [to, setTo] = useState({})

  const [date, setDate] = useState(dayjs())

  useEffect(() => {
    const fetchStation = async () => {
      const stationList = await StationApi.getAll()
      setStations(stationList.data)
    }
    fetchStation()
  }, [])

  useEffect(() => {
    const fetchVehicle = async () => {
      const vehicleList = await vehicleApi.getAll()
      setVehicles(vehicleList.data)
    }
    fetchVehicle()
  }, [])

  useEffect(() => {
    const fetchSeat = async () => {
      const seatList = await seatApi.getAll()

      setSeats(seatList.data)
    }
    fetchSeat()
  }, [])

  useEffect(() => {
    const fetchPoints = async () => {
      const pointList = await pointApi.getAll()

      setPoints(pointList.data)
    }
    fetchPoints()
  }, [])

  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'

  const handleSearch = async () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    // Your existing code...

    messageApi.open({
      key,
      type: 'success',
      content: 'Loaded!',
      duration: 2
    })
    if (from._id === to._id) {
      notification.error({
        message: 'Lỗi',
        description: 'Điểm xuất phát và điểm đến không thể giống nhau.'
      })
      return // Kết thúc hàm nếu có lỗi
    }
    const selectedDate = format(new Date(date.$d), 'yyyy/MM/dd')
    const currentDate = format(new Date(), 'yyyy/MM/dd')

    if (currentDate > selectedDate) {
      notification.error({
        message: 'Lỗi',
        description: 'Ngày đã chọn phải là ngày trong tương lai.'
      })
      return // Kết thúc hàm nếu có lỗi
    }
    const data = {
      fromId: from._id,
      toId: to._id,
      date: selectedDate
    }
    console.log('first', data.date)
    const response = await tripApi.search(data)
    setTrips(response.data)
  }

  useEffect(() => {
    const fetchProvince = async () => {
      const provinceList = await provinceApi.getAll()
      setProvinceList(provinceList.data)
      setFrom(provinceList.data[0])
      setTo(provinceList.data[0])
    }
    fetchProvince()
  }, [])

  const handleChangeFrom = (id) => {
    const findFromById = provinceList.find((x) => x._id === id)
    setFrom(findFromById)
  }

  const handleChangeTo = (id) => {
    const findToById = provinceList.find((x) => x._id === id)
    setTo(findToById)
  }

  const handleChangeDate = (e) => {
    setDate(e)
  }

  const navigate = useNavigate()

  const handleSubmitTicket = async () => {
    const currentDate = dayjs().format('DD/MM/YYYY')

    const selectedTrip = trips.find((trip) => trip._id === tripSelected)
    const tripDate = dayjs(selectedTrip?.day).format('DD/MM/YYYY')
    if (!userId) {
      message.error('Bạn cần đăng nhập để đặt vé.')
      navigate('/login')
      return
    }
    if (currentDate === tripDate) {
      message.error('Chuyến xe đã hết hạn đặt vé.')
      return
    }
    const data = {
      pickedPoint: pickedPoint.pickUpPointId,
      droppedPoint: droppedPoint.DropOffPointId,
      timePickUp: pickedPoint.timePickUp,
      timeDropOff: droppedPoint.timeDropOff,
      email,
      phone,
      name,
      tripId: tripSelected,
      user: userId,
      seats: selectedSeats,
      total: seats[0].price * selectedSeats.length
    }
    await ticketApi.create(data)
    message.success('Đặt vé thành công thành công')
    navigate('/')
  }

  const [selectedSeats, setSelectedSeats] = useState([])

  const [pickedPoint, setPickedPoint] = useState('')
  const [droppedPoint, setDroppedPoint] = useState('')

  const toggleSeat = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      const updatedSeats = prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
      return updatedSeats
    })
  }
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = React.useState(false)

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangePhone = (e) => {
    setPhone(e.target.value)
  }
  const handleChangePickedPoint = (e) => {
    setPickedPoint(e.target.value)
  }
  const handleChangeDroppedPoint = (e) => {
    setDroppedPoint(e.target.value)
  }
  // trip == tripSelected
  const [tripSelected, setTripSelected] = useState('')

  const toggleTripSelected = (id, isSelected) => {
    setTripSelected(id)
    setIsShowSelect(!isShowSelect)
    // Trigger the update of select button status when tripSelected changes
    updateSelectButtonStatus()
  }

  const [isSelectButtonDisabled, setIsSelectButtonDisabled] = useState(false)

  const updateSelectButtonStatus = () => {
    const selectedTrip = trips.find((trip) => trip._id === tripSelected)

    const currentDate = dayjs().format('DD/MM/YYYY')
    const tripDate = dayjs(selectedTrip?.day).format('DD/MM/YYYY')
    const isFutureDate = dayjs(tripDate, 'DD/MM/YYYY').isBefore(
      dayjs(currentDate, 'DD/MM/YYYY'),
      'day'
    )

    // const seatsForSelectedTrip = getSeatsById(selectedTrip?.vehicle, seats)
    // const isSeatsAvailable = countSeatEmpty(seatsForSelectedTrip) == 0
    // console.log('fafaf', isSeatsAvailable)

    // Disable button nếu không còn ghế trống hoặc ngày đi là ngày quá khứ
    // setIsSelectButtonDisabled(!isFutureDate)
  }

  useEffect(() => {
    updateSelectButtonStatus()
  }, [tripSelected])

  return (
    <div className="search-trip">
      <SearchTickets
        date={date}
        from={from}
        handleChangeDate={handleChangeDate}
        handleChangeFrom={handleChangeFrom}
        handleChangeTo={handleChangeTo}
        handleSearch={handleSearch}
        provinceList={provinceList}
        to={to}
      />
      <div className="search-container">
        <SideBar />
        <div className="list-trip">
          <div className="des-trip">
            <span className="title-trip"></span>
          </div>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div className="trip">
                <div className="">
                  <div className="time-trip">
                    <span className="time">
                      {new Date(trip.timeStart).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      })}
                    </span>
                    <div className="fulltime">
                      <BsFillRecordCircleFill className="icon-station" />
                      <span className="boder-doten"></span>
                      <span className="time-1 ">
                        {calculateDuration(trip.timeStart, trip.timeEnd)}
                      </span>
                      <span className="boder-doten"></span>
                      <HiLocationMarker className="icon-place" />
                    </div>
                    <span className="time">
                      {new Date(trip.timeEnd).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      })}
                    </span>
                  </div>
                  <div className="station">
                    <div className="station-left">
                      <span className="fz">
                        {getStationById(trip.from, stations)}
                      </span>
                    </div>
                    <div className="station-right">
                      <span className="fz">
                        {' '}
                        {getStationById(trip.to, stations)}
                      </span>
                    </div>
                  </div>
                  <div className="divide"></div>
                  <div className="description-trip">
                    <div className="">
                      <span className="text-price">
                        <span className="fz">
                          {' '}
                          {dayjs(trip.day).format('DD-MM-YYYY')}
                        </span>{' '}
                      </span>
                      <span className="text-ver">
                        {getVehicleById(trip.vehicle, vehicles).type}
                      </span>
                      <span className="text-price">
                        {' '}
                        {countSeatEmpty(getSeatsById(trip.vehicle, seats))} Ghế
                        trống
                      </span>
                    </div>
                    <div className="">
                      {isShowSelect === false && (
                        <Button
                          onClick={() => toggleTripSelected(trip._id, true)}
                          type="primary"
                          disabled={isSelectButtonDisabled}
                        >
                          Chọn chuyến
                        </Button>
                      )}
                      {isShowSelect === true && (
                        <Button
                          style={{ background: 'red' }}
                          onClick={() => toggleTripSelected('', false)}
                          type="primary"
                        >
                          Đóng
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {isShowSelect === true && (
                  <SelectTrip
                    seats={getSeatsById(trip.vehicle, seats)}
                    trip={trip}
                    points={points}
                    handleSubmitTicket={handleSubmitTicket}
                    selectedSeats={selectedSeats}
                    toggleSeat={toggleSeat}
                    email={email}
                    name={name}
                    phone={phone}
                    handleChangeEmail={handleChangeEmail}
                    handleChangeName={handleChangeName}
                    handleChangePhone={handleChangePhone}
                    handleChangePickedPoint={handleChangePickedPoint}
                    pickedPoint={pickedPoint}
                    handleChangeDroppedPoint={handleChangeDroppedPoint}
                    droppedPoint={droppedPoint}
                    onChange={() => updateSelectButtonStatus()}
                  />
                )}
              </div>
            ))
          ) : (
            <div>Không tìm thấy chuyến xe</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
