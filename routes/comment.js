const { Router } = require('express')
const router = Router()
const { Reply, Replies } = require('../controllers/comment')

router
	.route('/reply')
	.post(Reply)

router
	.route('/replies')
	.post(Replies)

module.exports = router