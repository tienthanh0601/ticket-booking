import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd'
import Station from './Station'
import AddInfoTickets from './AddInfoTickets'
import SelectSeats from './Seat/SelectSeats'

const SelectTrip = ({
  seats,
  trip,
  points,
  handleSubmitTicket,
  selectedSeats,
  toggleSeat,
  email,
  name,
  phone,
  handleChangePhone,
  handleChangeName,
  handleChangeEmail,
  handleChangePickedPoint,
  pickedPoint,
  droppedPoint,
  handleChangeDroppedPoint
}) => {
  const steps = [
    {
      title: 'Chọn chỗ ',
      content: (
        <SelectSeats
          seats={seats}
          selectedSeats={selectedSeats}
          toggleSeat={toggleSeat}
        />
      )
    },
    {
      title: 'Điểm đón trả',
      content: (
        <Station
          trip={trip}
          points={points}
          handleChangePickedPoint={handleChangePickedPoint}
          pickedPoint={pickedPoint}
          handleChangeDroppedPoint={handleChangeDroppedPoint}
          droppedPoint={droppedPoint}
        />
      )
    },
    {
      title: 'Nhập thông tin',
      content: (
        <AddInfoTickets
          email={email}
          handleChangeEmail={handleChangeEmail}
          name={name}
          handleChangeName={handleChangeName}
          phone={phone}
          handleChangePhone={handleChangePhone}
        />
      )
    }
  ]
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))
  const contentStyle = {
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }
  return (
    <div className="select-trip">
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        className="btn-selects"
        style={{
          marginTop: 24
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => prev()}
          >
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmitTicket}>
            Done
          </Button>
        )}
      </div>
    </div>
  )
}

export default SelectTrip
