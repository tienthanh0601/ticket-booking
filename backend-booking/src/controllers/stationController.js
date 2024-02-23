const StationService = require('../services/StationService')

const deleteStation = async (req, res) => {
  try {
    const stationId = req.params.id
    if (!stationId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The pointId is required'
      })
    }
    const response = await StationService.deleteStation(stationId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllStation = async (req, res) => {
  try {
    const response = await StationService.getAllStation()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const detailsStation = async (req, res) => {
  try {
    const stationId = req.params.id
    if (!stationId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The stationId is required'
      })
    }
    const response = await StationService.getDetailsStation(stationId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateStation = async (req, res) => {
  try {
    const stationId = req.params.id
    const data = req.body
    if (!stationId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The stationId is required'
      })
    }
    const response = await StationService.updateStation(stationId, data)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const createStation = async (req, res) => {
  const { name, address, province } = req.body
  try {
    const response = await StationService.createStation(req.body)
    return res.status(200).json(response)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  createStation,
  updateStation,
  detailsStation,
  getAllStation,
  deleteStation
}
