const Station = require('../models/Station')

const deleteStation = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStation = await Station.findOne({
        _id: id
      })
      if (checkStation === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      await Station.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'delete SUCCESS'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllStation = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allStation = await Station.find()
      resolve({
        status: 'OK',
        message: 'get all point',
        data: allStation
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getDetailsStation = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const station = await Station.findOne({
        _id: id
      })
      if (station === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: station
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updateStation = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStation = await Station.findOne({
        _id: id
      })
      if (checkStation === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      const updatedStation = await Station.findByIdAndUpdate(id, data, {
        new: true
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedStation
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createStation = (newStation) => {
  return new Promise(async (resolve, reject) => {
    const { name, address, province } = newStation
    try {
      const createdStation = await Station.create({
        name,
        address,
        province
      })
      if (createdStation) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdStation
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

// Find station by from & to for search



module.exports = {
  createStation,
  updateStation,
  getDetailsStation,
  getAllStation,
  deleteStation
}
