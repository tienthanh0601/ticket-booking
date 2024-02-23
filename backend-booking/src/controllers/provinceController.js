const ProvinceService = require('../services/ProvinceService')

const deleteProvince = async (req, res) => {
  try {
    const provinceId = req.params.id
    if (!provinceId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The pointId is required'
      })
    }
    const response = await ProvinceService.deleteProvince(provinceId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllProvince = async (req, res) => {
  try {
    const response = await ProvinceService.getAllProvince()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const detailsProvince = async (req, res) => {
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

const updateProvince = async (req, res) => {
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

const createProvince = async (req, res) => {
  const { name } = req.body
  try {
    const response = await ProvinceService.createProvince(req.body)
    return res.status(200).json(response)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  createProvince,
  updateProvince,
  detailsProvince,
  getAllProvince,
  deleteProvince
}
