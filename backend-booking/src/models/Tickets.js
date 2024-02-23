const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    },
    phone: {
      type: Number
    },
    total: {
      type: Number
    },
    email: {
      type: String
    },
    pickedPoint: {
      type: mongoose.Types.ObjectId,
      ref: 'Point'
    },
    droppedPoint: {
      type: mongoose.Types.ObjectId,
      ref: 'Point'
    },
    timePickUp: {
      type: Date
    },
    timeDropOff: {
      type: Date
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip'
    },
    status: {
      type: String
    },
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat'
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
