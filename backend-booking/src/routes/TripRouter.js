const express = require('express')
const router = express.Router()
const tripController = require('../controllers/tripController')
const {
  authMiddleWare,
  authUserMiddleWare
} = require('../middleware/authMiddlewave')

router.post('/create', tripController.createTrip)
router.put('/update/:id', tripController.updateTrip)
router.get('/details/:id', tripController.getDetailsTrip)
router.post('/find-trip', tripController.findTrip)
router.get('/all', tripController.getAllTrip)
router.delete('/delete/:id', tripController.deleteTrip)

module.exports = router
