import { Router } from 'express'
import { Auth } from '../middleware/auth'
import {
  Selectors,
  createThread,
  getThread,
  Comment,
  Pin,
} from '../controllers/thread'

const router = Router()

router.route('/selectors').get(Selectors)

router.route('/create').post(createThread)

router.route('/:_thread_name').get(Auth, getThread)

router.route('/comment').post(Auth, Comment)

router.route('/:_thread_name/pin').post(Auth, Pin)

export default router
