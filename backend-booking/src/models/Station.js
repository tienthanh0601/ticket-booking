const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province'
  }
})

const Station = mongoose.model('Station', stationSchema)

module.exports = Station
