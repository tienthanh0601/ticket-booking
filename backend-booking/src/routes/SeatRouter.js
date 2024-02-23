const express = require('express')
const router = express.Router()
const seatController = require('../controllers/seatController')
const {
  authMiddleWare,
  authUserMiddleWare
} = require('../middleware/authMiddlewave')

router.post('/create', seatController.createSeat)
router.put('/update/:id', seatController.updateSeat)
router.get('/details/:id', seatController.getDetailsSeat)
router.get('/all', seatController.getAllSeat)
router.get('/seatByVehicle/:id', seatController.getSeatByVehicle)
router.delete('/delete/:id', seatController.deleteSeat)

module.exports = router
