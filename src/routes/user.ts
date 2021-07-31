import { Router } from 'express'
import { getUsers } from '../controllers/user'

const router = Router()

router.route('/').get(getUsers)

// router
// 	.route('/create')
// 	.post(createUser)

export default router
