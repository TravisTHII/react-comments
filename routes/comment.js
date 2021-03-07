const { Router } = require('express')
const router = Router()
const { getUsers, createUser } = require('../controllers/user')

router
	.route('/')
	.get(getUsers)

module.exports = router