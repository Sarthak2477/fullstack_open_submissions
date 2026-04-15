const User = require("../models/user")
const logger = require("./logger")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

const tokenExtractor = (request, response, next) => {
    
    const auth = request.get("authorization")
    if(auth && auth.toLowerCase().startsWith("bearer ")){
        request.token = auth.substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if(decodedToken.id){
        request.user = await (User.findById(decodedToken.id))
    }

    next()
}

const unknownRequest = (request, response) => {
    response.status(404).send({ error: "unknown request" })
}

const errorHandler = (error, req, res, next) => {
    switch (error.name) {
    case "CastError": return res.status(400).send({ error: error.message })
    case "ValidationError": return res.status(400).json({ error: error.message })
    case "JsonWebTokenError": return res.status(401).json({error: "invalid token"})
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownRequest,
    errorHandler,
    tokenExtractor,
    userExtractor
}