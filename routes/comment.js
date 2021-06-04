const { Router } = require('express')
const router = Router()
const Auth = require('../middleware/auth')
const { Reply, Replies, Pin, Edit, Delete } = require('../controllers/comment')

router
	.route('/reply')
	.post(Auth, Reply)

router
	.route('/replies')
	.post(Auth, Replies)

router
	.route('/pin')
	.post(Pin)

router
	.route('/edit')
	.post(Auth, Edit)

router
	.route('/delete')
	.post(Delete)

module.exports = router