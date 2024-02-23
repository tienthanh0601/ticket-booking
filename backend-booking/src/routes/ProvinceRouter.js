const express = require('express')
const router = express.Router()
const provinceController = require('../controllers/provinceController')
const {
  authMiddleWare,
  authUserMiddleWare
} = require('../middleware/authMiddlewave')

router.post('/create', provinceController.createProvince)
router.put('/update/:id', provinceController.updateProvince)
// router.get('/details/:id', provinceController.getDetailsProvince)
router.get('/all', provinceController.getAllProvince)
router.delete('/delete/:id', provinceController.deleteProvince)

module.exports = router
