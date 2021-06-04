const { Router } = require('express')
const router = Router()
const { Token } = require('../controllers/token')

router
	.route('')
	.post(Token)

module.exports = router