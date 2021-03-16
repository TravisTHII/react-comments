const { Router } = require('express')
const router = Router()
const { Reply, Replies } = require('../controllers/comment')

router
	.route('/reply')
	.post(Reply)

router
	.route('/replies')
	.get(Replies)

module.exports = router