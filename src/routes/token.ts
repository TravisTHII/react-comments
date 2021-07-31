import { Router } from 'express'
import { Token } from '../controllers/token'

const router = Router()

router.route('').post(Token)

export default router
