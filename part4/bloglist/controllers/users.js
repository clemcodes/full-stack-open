const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})

    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if(password.length < 3){
        return res.status(400).send("Password must be 3 characters long at least")
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    user.validate(async (err) => {
        if(err){
            res.status(400).send(err.message)
        } else {
            try {
                const savedUser = await user.save()
                res.status(201).json(savedUser)
            } catch (err) {
                res.status(500).send(err.message)
            }
        }
    })
})

module.exports = usersRouter