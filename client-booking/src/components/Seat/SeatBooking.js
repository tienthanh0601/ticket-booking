import React, { useMemo, useState } from 'react'
import { Grid, Paper, Tooltip, Typography } from '@mui/material'
import Seat from '../../admin-src/components/Seat'
import '../../scss/seat.scss'
import Wheel from './Wheel'
import SeatBooked from './SeatBooked'

const SeatBooking = ({ seats, selectedSeats, toggleSeat }) => {
  const [color, setColor] = useState(false)

  const renderSeats = () => {
    return seats.map((seat) => (
      <Tooltip
        style={{ margin: '20px' }}
        placement="top"
        title={`Ghế : ${seat.name} + ${seat.price} VND`}
      >
        <button
          key={seat._id}
          variant={seat.isBooked ? 'cursor: text' : 'none'}
          color={seat.isBooked ? '#ccc' : 'primary'}
          disabled={seat.isBooked}
          onClick={() => toggleSeat(seat._id)}
          className="btn-seat"
          style={{
            backgroundColor: seat.isBooked ? 'white' : color ? 'green' : '#ccc'
          }}
        >
          {seat.name}
        </button>
      </Tooltip>
    ))
  }

  return (
    <div>
      <Typography style={{ fontStyle: '500' }} variant="h5" gutterBottom>
        Chọn chỗ ngồi
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', marginBottom: '20px' }}>
            {renderSeats()}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Ghế đã chọn
            </Typography>
            {selectedSeats.length === 0 ? (
              <Typography>Chưa chọn ghế nào</Typography>
            ) : (
              <div className="">
                {selectedSeats.map((seatId) => (
                  <span
                    style={{
                      color: 'green',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}
                    key={seatId}
                  >
                    {`${seats.find((x) => x._id === seatId).name} `}
                  </span>
                ))}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SeatBooking
