const PointService = require('../services/PointService')

const deletePoint = async (req, res) => {
  try {
    const pointId = req.params.id
    if (!pointId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The pointId is required'
      })
    }
    const response = await PointService.deletePoint(pointId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllPoint = async (req, res) => {
  try {
    const response = await PointService.getAllPoint()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailsPoint = async (req, res) => {
  try {
    const pointId = req.params.id
    if (!pointId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The pointId is required'
      })
    }
    const response = await PointService.getDetailsPoint(pointId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updatePoint = async (req, res) => {
  try {
    const pointId = req.params.id
    const data = req.body
    if (!pointId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await PointService.updatePoint(pointId, data)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const createPoint = async (req, res) => {
  try {
    const { name, address } = req.body
    if (!name || !address) {
      return res.status(200).json({
        status: 'err',
        message: 'The input is required'
      })
    }
    const response = await PointService.createPoint(req.body)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

module.exports = {
  createPoint,
  updatePoint,
  getDetailsPoint,
  getAllPoint,
  deletePoint
}
