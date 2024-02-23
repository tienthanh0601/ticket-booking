const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')
const {
  authMiddleWare,
  authUserMiddleWare
} = require('../middleware/authMiddlewave')

router.post('/create', vehicleController.createVehicle)
router.put('/update/:id', vehicleController.updateVehicle)
router.get('/details/:id', vehicleController.getDetailsVehicle)
router.get('/all', vehicleController.getAllVehicle)
router.delete('/delete/:id', vehicleController.deleteVehicle)

module.exports = router
