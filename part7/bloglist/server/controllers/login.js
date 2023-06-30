const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async(req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if(!user) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200)
       .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter