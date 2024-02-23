const Vehicle = require('../models/Vehicle')

const deleteVehicle = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkVehicle = await Vehicle.findOne({
        _id: id
      })
      if (checkVehicle === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      await Vehicle.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'delete SUCCESS'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllVehicle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allVehicle = await Vehicle.find()
      resolve({
        status: 'OK',
        message: 'get all point',
        data: allVehicle
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getDetailsVehicle = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle.findOne({
        _id: id
      })
      if (vehicle === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: vehicle
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updateVehicle = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkVehicle = await Vehicle.findOne({
        _id: id
      })
      if (checkVehicle === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      const updatedVehicle = await Vehicle.findByIdAndUpdate(id, data, {
        new: true
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedVehicle
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createVehicle = (newVehicle) => {
  return new Promise(async (resolve, reject) => {
    const { name, type, floor, totalSeat } = newVehicle
    try {
      const createdVehicle = await Vehicle.create({
        name,
        type,
        floor,
        totalSeat
      })
      if (createdVehicle) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdVehicle
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createVehicle,
  deleteVehicle,
  getAllVehicle,
  getDetailsVehicle,
  updateVehicle
}
