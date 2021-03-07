const { Router } = require('express')
const router = Router()
const { getThread, getThreads, Comment } = require('../controllers/thread')

router
	.route('/')
	.get(getThread)

router
	.route('/all')
	.get(getThreads)

router
	.route('/comment')
	.post(Comment)

module.exports = router