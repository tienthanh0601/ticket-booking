const mongoose = require('mongoose')

// ponint database => id point => station (id) => updated points []
// updated/station/{1111111} => call api
// data {name: 14 Oong ick khiem, addres: "sssss"};
// create point {name: 14 Oong ick khiem, addres: "sssss"} => database => return id point
// station.poins([return id point])

/// FLOW UI:
// 1. Tạo ponint
//

const pointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

const Point = mongoose.model('Point', pointSchema)

module.exports = Point
