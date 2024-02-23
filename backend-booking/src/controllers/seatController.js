const SeatService = require('../services/SeatService')

const createSeat = async (req, res) => {
  const { vehicle, name, type, price, isBooked } = req.body
  try {
    if (!vehicle || !name || !type || !price) {
      return res.status(200).json({
        status: 'err',
        message: 'The input is required'
      })
    }
    const response = await SeatService.createSeat(req.body)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateSeat = async (req, res) => {
  try {
    const seatId = req.params.id
    const data = req.body
    if (!seatId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await SeatService.updateSeat(seatId, data)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailsSeat = async (req, res) => {
  try {
    const seatId = req.params.id
    if (!seatId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await SeatService.getDetailsSeat(seatId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const deleteSeat = async (req, res) => {
  try {
    const seatId = req.params.id
    if (!seatId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The tripId is required'
      })
    }
    const response = await SeatService.deleteSeat(seatId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllSeat = async (req, res) => {
  try {
    const response = await SeatService.getAllSeat()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getSeatByVehicle = async (req, res) => {
  const vehicle = req.params.id
  console.log(vehicle)
  try {
    const response = await SeatService.getSeatByVehicle(vehicle)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}



module.exports = {
  createSeat,
  updateSeat,
  getDetailsSeat,
  deleteSeat,
  getAllSeat,
  getSeatByVehicle
}
