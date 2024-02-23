const TripService = require('../services/TripService')

const createTrip = async (req, res) => {
  const { from, to, day, timeStart, timeEnd, vehicle, points } = req.body
  console.log('req:', req.body.points)
  try {
    const response = await TripService.createTrip(req.body)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateTrip = async (req, res) => {
  try {
    const tripId = req.params.id
    const data = req.body
    if (!tripId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await TripService.updateTrip(tripId, data)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailsTrip = async (req, res) => {
  try {
    const tripId = req.params.id
    if (!tripId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await TripService.getDetailsTrip(tripId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const findTrip = async (req, res) => {
  try {
    const { fromId, toId, date } = req.body
    const response = await TripService.findTrip({
      fromId,
      toId,
      date
    })
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id
    if (!tripId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The tripId is required'
      })
    }
    const response = await TripService.deleteTrip(tripId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllTrip = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.body
    const response = await TripService.getAllTrip(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    )
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

module.exports = {
  createTrip,
  updateTrip,
  getDetailsTrip,
  deleteTrip,
  getAllTrip,
  findTrip
}
