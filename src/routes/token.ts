import { Router } from 'express'
import { Auth } from '../middleware/auth'
import { TestToken, Token } from '../controllers/token'

const router = Router()

router.route('').post(Token)

if (process.env.ENV === 'development') {
  router.route('/test_token').get(Auth, TestToken)
}

export default router
