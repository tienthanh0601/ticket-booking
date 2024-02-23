const express = require('express')
const router = express.Router()
const stationController = require('../controllers/stationController')
const {authMiddleWare, authUserMiddleWare} = require('../middleware/authMiddlewave')

router.post('/create', stationController.createStation)
router.put('/update/:id', stationController.updateStation)
router.get('/details/:id', stationController.detailsStation)
router.get('/all', stationController.getAllStation)
router.delete('/delete/:id', stationController.deleteStation)


module.exports = router
