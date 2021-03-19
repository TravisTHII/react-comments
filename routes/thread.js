const { Router } = require('express')
const router = Router()
const { Selectors, createThread, getThread, Comment } = require('../controllers/thread')

router
	.route('/selectors')
	.get(Selectors)

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