const express = require('express')
const router = express.Router()
const pointController = require('../controllers/pointController')
const {
  authMiddleWare,
  authUserMiddleWare
} = require('../middleware/authMiddlewave')

router.post('/create', pointController.createPoint)
router.put('/update/:id', pointController.updatePoint)
router.get('/details/:id', pointController.getDetailsPoint)
router.get('/all', pointController.getAllPoint)
router.delete('/delete/:id', pointController.deletePoint)

module.exports = router
