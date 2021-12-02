import { Router } from 'express'
import { Auth, SoftAccess } from '../middleware/auth'
import {
  Selectors,
  createThread,
  getThread,
  Comment,
  Pin,
} from '../controllers/thread'

const router = Router()

router.route('/selectors').get(Selectors)

router.route('/:_thread_name').get(SoftAccess, getThread)

router.route('/comment').post(Auth, Comment)

router.route('/:_thread_name/pin').post(Auth, Pin)

if (process.env.ENV === 'development') {
  router.route('/create_thread').post(createThread)
}

export default router
