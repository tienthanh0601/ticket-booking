const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')
const {
  authMiddleWare,
  authUserMiddleWare
} = require('../middleware/authMiddlewave')

router.post('/create', ticketController.createTicket)

router.put('/update/:id', ticketController.updateTicket)
router.get('/details/:id', ticketController.getDetailsTicket)
router.get('/all', ticketController.getAllTicket)
router.post('/find-ticket', ticketController.getTicketsById)
router.delete('/delete/:id', ticketController.deleteTicket)

module.exports = router
