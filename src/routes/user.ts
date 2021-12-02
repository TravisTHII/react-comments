import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user'

const router = Router()

router.route('/').get(getUsers)

if (process.env.ENV === 'development') {
  router.route('/create_user').post(createUser)
}

export default router
