const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  name: {
    type: String
  },
  floor: {
    type: Number
  },
  type: {
    type: String
  },
  price: {
    type: Number
  },
  isBooked: {
    type: Boolean,
    default: false
  }
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat
