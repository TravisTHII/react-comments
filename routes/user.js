const { Router } = require('express')
const router = Router()
const { getUsers, createUser } = require('../controllers/user')

router
  .route('/')
  .get(getUsers)

// router
// 	.route('/create')
// 	.post(createUser)

module.exports = router