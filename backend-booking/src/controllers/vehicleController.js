const VehicleService = require('../services/VehicleService')

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id
    if (!vehicleId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The pointId is required'
      })
    }
    const response = await VehicleService.deleteVehicle(vehicleId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllVehicle = async (req, res) => {
  try {
    const response = await VehicleService.getAllVehicle()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailsVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id
    if (!vehicleId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The VehicleId is required'
      })
    }
    const response = await VehicleService.getDetailsVehicle(vehicleId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id
    const data = req.body
    if (!vehicleId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The vehicleId is required'
      })
    }
    const response = await VehicleService.updateVehiclen(vehicleId, data)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const createVehicle = async (req, res) => {
  const { name, floor, type, totalSeat } = req.body
  try {
    const response = await VehicleService.createVehicle(req.body)
    return res.status(200).json(response)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  createVehicle,
  deleteVehicle,
  getAllVehicle,
  getDetailsVehicle,
  updateVehicle
}
