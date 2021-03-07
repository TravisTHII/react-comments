const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const mongoDb = require('./config/mongo')

dotenv.config({ path: './config/config.env' })

mongoDb()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/hmd/thread', require('./routes/thread'))

app.listen(
	PORT,
	console.log(`Server on port ${PORT}`.yellow.bold)
)