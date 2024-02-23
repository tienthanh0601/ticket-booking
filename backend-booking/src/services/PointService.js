const Point = require('../models/Point')

const deletePoint = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPoint = await Point.findOne({
        _id: id
      })
      if (checkPoint === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      await Point.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'delete SUCCESS'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllPoint = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allPoint = await Point.find()
      resolve({
        status: 'OK',
        message: 'get all point',
        data: allPoint
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getDetailsPoint = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const point = await Point.findOne({
        _id: id
      })
      if (point === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: point
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updatePoint = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPoint = await Point.findOne({
        _id: id
      })
      if (checkPoint === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      const updatedPoint = await Point.findByIdAndUpdate(id, data, {
        new: true
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedPoint
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createPoint = (newPoint) => {
  return new Promise(async (resolve, reject) => {
    const { name, address, point } = newPoint
    try {
      const createdPoint = await Point.create({
        name,
        address
      })
      if (createdPoint) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdPoint
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createPoint,
  updatePoint,
  getDetailsPoint,
  getAllPoint,
  deletePoint
}
