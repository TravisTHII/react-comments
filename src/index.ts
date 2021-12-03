import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import colors from 'colors/safe'
import helmet from 'helmet'
import rateLimiter from 'express-rate-limit'
import { mongoDb } from './config/mongo'

import { comment, thread, token, user } from './routes'

mongoDb()

const app = express()

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/v1/user', user)
app.use('/api/v1/thread', thread)
app.use('/api/v1/comment', comment)
app.use('/api/v1/token', token)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    colors.yellow(`Running server on port ${PORT} in ${process.env.ENV} mode`)
  )
)
