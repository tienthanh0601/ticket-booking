const Seat = require('../models/SeatModel')

const deleteSeat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkSeat = await Seat.findOne({
        _id: id
      })
      if (checkSeat === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      await Seat.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'delete SUCCESS'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllSeat = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allSeat = await Seat.find()
      resolve({
        status: 'OK',
        message: 'get all point',
        data: allSeat
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getDetailsSeat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const seat = await Seat.findOne({
        _id: id
      })
      if (seat === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: seat
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getSeatByVehicle = (vehicle) => {
  return new Promise(async (resolve, reject) => {
    try {
      const seatByVehicle = await Seat.find({
        vehicle: vehicle
      })
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: seatByVehicle
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updateSeat = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkSeat = await Seat.findOne({
        _id: id
      })
      if (checkSeat === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      const updatedSeat = await Seat.findByIdAndUpdate(id, data, {
        new: true
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedSeat
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createSeat = (newSeat) => {
  return new Promise(async (resolve, reject) => {
    const { vehicle, name, floor, type, price, userId, isBooked } = newSeat
    try {
      const createdSeat = await Seat.create({
        vehicle,
        name,
        floor,
        type,
        price,
        userId,
        isBooked: false
      })
      if (createdSeat) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdSeat
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createSeat,
  updateSeat,
  getDetailsSeat,
  getAllSeat,
  deleteSeat,
  getSeatByVehicle
}
