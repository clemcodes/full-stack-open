const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        req.token = authorization.substring(7)
    } 
    next()
}

const userExtractor = async (req, res, next) => {
    if(req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!decodedToken.id){
            return res.status(401).json({ error: 'Token invalid' })
        }
        req.user = await User.findById(decodedToken.id)
    }
    
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if(error.message === 'CastError'){
        return res.status(400).send({ error:'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if(error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
  }