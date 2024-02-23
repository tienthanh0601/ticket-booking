const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  },
  day: {
    type: Date
  },
  timeStart: {
    type: String
  },
  timeEnd: {
    type: String
  },
  price: {
    type: Number
  },
  status: {
    type: String
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  points: [
    {
      PickUpPointId: {
        type: mongoose.Types.ObjectId,
        ref: 'Point'
      },
      DropOffPointId: {
        type: mongoose.Types.ObjectId,
        ref: 'Point'
      },
      timeDropOff: {
        type: String
      },
      timePickUp: {
        type: String
      }
    }
  ]
  // points: [
  //   {
  //     diemdon: [
  //       {
  //         pointUp: QuảngNgãi,
  //         timeUp: { type: String }
  //       }
  //     ]
  //   },
  //   {
  //     diemtra: [
  //       {
  //         pointDown: QuyNhơn,
  //         timeDown: { type: String }
  //       }
  //     ]
  //   }
  // ]
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip
