const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const mongoUrl = config.MONGODB_URI;
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/user')
const loginRouter = require('./utils/login')
mongoose.connect(mongoUrl, { family: 4 }).then(
  logger.info("MongoDB connected.")
)

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/', blogRouter)
app.use('/api/',userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app