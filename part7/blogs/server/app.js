const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const commentsRouter = require("./controllers/comments")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

require("express-async-errors")

mongoose.connect(config.MONGOURL)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error while connecting to MongoDB:", error)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
  
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/blogs", commentsRouter)

if (process.env.NODE_ENV === "test") {
    console.log("testing mode")
    const testingRouter = require("./controllers/testing")
    app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownRequest)
app.use(middleware.errorHandler)

module.exports = app