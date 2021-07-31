import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import colors from 'colors/safe'
import { mongoDb } from './config/mongo'

import { comment, thread, token, user } from './routes'

mongoDb()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/user', user)
app.use('/api/v1/thread', thread)
app.use('/api/v1/comment', comment)
app.use('/api/v1/token', token)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(colors.yellow(`Running server on port ${PORT}`))
)
