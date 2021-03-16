const { Router } = require('express')
const router = Router()
const { getThread, Comment } = require('../controllers/thread')

router
	.route('/:_thread_name')
	.get(getThread)

router
	.route('/comment')
	.post(Comment)

module.exports = router