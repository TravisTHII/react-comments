const { Router } = require('express')
const router = Router()
const Auth = require('../middleware/auth')
const { Selectors, createThread, getThread, Comment } = require('../controllers/thread')

router
	.route('/selectors')
	.get(Selectors)

router
	.route('/create')
	.post(createThread)

router
	.route('/:_thread_name')
	.get(Auth, getThread)

router
	.route('/comment')
	.post(Auth, Comment)

module.exports = router