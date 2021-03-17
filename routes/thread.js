const { Router } = require('express')
const router = Router()
const { getThreads, createThread, getThread, Comment } = require('../controllers/thread')

router
	.route('/all')
	.get(getThreads)

router
	.route('/create')
	.post(createThread)

router
	.route('/:_thread_name')
	.get(getThread)

router
	.route('/comment')
	.post(Comment)

module.exports = router