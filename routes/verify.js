const express = require('express')
const router = express.Router()
const verifyEndpointController = require('../controllers/verifyController')
//const {jwtCheck} = require('../middlewares/jwtCheck')

router.put('/:token', verifyEndpointController.index) 

module.exports = router