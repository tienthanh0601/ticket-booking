const TicketService = require('../services/TicketService')
const SeatService = require('../services/SeatService')

const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id
    if (!ticketId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The pointId is required'
      })
    }
    const response = await TicketService.deleteTicket(ticketId)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getAllTicket = async (req, res) => {
  try {
    const response = await TicketService.getAllTicket()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailsTicket = async (req, res) => {
  try {
    const ticketId = req.body
    const response = await TicketService.getDetailsTicket(ticketId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const getTicketsById = async (req, res) => {
  try {
    const userId = req.body.user
    console.log('fafaf', userId)
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await TicketService.getTicketsById(userId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id
    const data = req.body
    if (!ticketId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The TicketId is required'
      })
    }
    const response = await TicketService.updateTicket(ticketId, data)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}
// api: user: userid
//      trip: TripId
//      isPaid: false
//      seats: danh sách id của ghế mà user này chọn đặt

const createTicket = async (req, res) => {
  const {
    user,
    tripId,
    isPaid,
    seats,
    name,
    phone,
    total,
    email,
    pickedPoint,
    droppedPoint,
    timePickUp,
    timeDropOff
  } = req.body
  try {
    seats.forEach(async (seat) => {
      // tạo vé
      await TicketService.createTicket({
        user,
        tripId,
        isPaid,
        seatId: seat,
        name,
        phone,
        total,
        email,
        pickedPoint,
        droppedPoint,
        timePickUp,
        timeDropOff
      })
      // cập nhật ghế đã đặt
      await SeatService.updateSeat(seat, { isBooked: true })
    })
    return res.status(200).json('OK')
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  createTicket,
  updateTicket,
  getDetailsTicket,
  getAllTicket,
  deleteTicket,
  getTicketsById
}
