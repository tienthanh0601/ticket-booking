const Trip = require('../models/TripModel')
const { parse, format } = require('date-fns')
const Station = require('../models/Station')
const { ObjectId } = require('mongodb')

const createTrip = (newTrip) => {
  return new Promise(async (resolve, reject) => {
    const { from, to, day, timeStart, timeEnd, price, points, vehicle } =
      newTrip
    try {
      const createdTrip = await Trip.create({
        from,
        to,
        day,
        timeStart,
        timeEnd,
        points,
        vehicle
      })
      if (createdTrip) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdTrip
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const updateTrip = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkTrip = await Trip.findOne({
        _id: id
      })
      if (checkTrip === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      const updatedTrip = await Trip.findByIdAndUpdate(id, data, { new: true })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedTrip
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getDetailsTrip = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const trip = await Trip.findOne({
        _id: id
      })
      if (trip === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCESS',
        data: trip
      })
    } catch (e) {
      reject(e)
    }
  })
}

const deleteTrip = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkTrip = await Trip.findOne({
        _id: id
      })
      if (checkTrip === null) {
        resolve({
          status: 'ERR',
          message: 'The product is not defined'
        })
      }

      await Trip.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'Delete product success'
      })
    } catch (e) {
      reject(e)
    }
  })
}

// fromd
const findTrip = async ({ fromId, toId, date }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // list id stations
      const fromStations = []
      const toStations = []
      // find Staion
      const stations = await Station.find()
      stations.forEach((station) => {
        if (station.province.toString() === fromId)
          fromStations.push(station._id)
        if (station.province.toString() === toId) toStations.push(station._id)
      })

      const trips = await Trip.find({
        from: { $in: fromStations },
        to: { $in: toStations },
        day: {
          $gte: new Date(date),
          $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
        }
      })

      console.log('tìm trip', trips)
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: trips
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllTrip = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalTrip = await Trip.find().count()
      let allTrip = []
      if (filter) {
        const label = filter[0]
        const objectFilter = await Trip.find({ [label]: { $regex: filter[1] } })
          .limit(limit)
          .skip(page * limit)
        resolve({
          status: 'OK',
          message: 'filter ok',
          data: objectFilter,
          total: totalTrip,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalTrip / limit)
        })
      }
      if (sort) {
        const objectSort = {}
        objectSort[sort[1]] = sort[0]
        const allTripSort = await Trip.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
        resolve({
          status: 'OK',
          message: 'sort trip',
          data: allTripSort,
          total: totalTrip,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalTrip / limit)
        })
      }
      if (!limit) {
        allTrip = await Trip.find().sort({ createdAt: -1, updatedAt: -1 })
      } else {
        allTrip = await Trip.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 })
      }
      resolve({
        status: 'OK',
        message: 'get all Trip',
        allTrip,
        total: totalTrip,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalTrip / limit)
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createTrip,
  updateTrip,
  getDetailsTrip,
  deleteTrip,
  getAllTrip,
  findTrip
}
