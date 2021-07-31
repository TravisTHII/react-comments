import { Router } from 'express'
import { Auth } from '../middleware/auth'
import { Reply, Replies, Pin, Edit, Delete } from '../controllers/comment'

const router = Router()

router.route('/reply').post(Auth, Reply)

router.route('/replies').post(Auth, Replies)

router.route('/pin').post(Pin)

router.route('/edit').post(Auth, Edit)

router.route('/delete').post(Delete)

export default router
