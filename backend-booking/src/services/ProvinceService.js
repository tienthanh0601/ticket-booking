const Province = require('../models/Province')

const deleteProvince = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProvince = await Province.findOne({
        _id: id
      })
      if (checkProvince === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      await Province.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'delete SUCCESS'
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllProvince = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProvince = await Province.find()
      resolve({
        status: 'OK',
        message: 'get all point',
        data: allProvince
      })
    } catch (e) {
      reject(e)
    }
  })
}

const detailsProvince = (id) => {
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

const updateProvince = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProvince = await Province.findOne({
        _id: id
      })
      if (checkProvince === null) {
        resolve({
          status: 'ERR',
          message: 'The point is not defined'
        })
      }
      const updatedProvince = await Province.findByIdAndUpdate(id, data, {
        new: true
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedProvince
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createProvince = (newProvince) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newProvince
    try {
      const createdProvince = await Province.create({
        name
      })
      if (createdProvince) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdProvince
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createProvince,
  updateProvince,
  detailsProvince,
  getAllProvince,
  deleteProvince
}
