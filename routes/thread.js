const { Router } = require('express')
const router = Router()
const { getThread } = require('../controllers/thread')

router
	.route('/')
	.get(getThread)

module.exports = router