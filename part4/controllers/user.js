const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { error } = require('../utils/logger')

userRouter.post('/users', async (request, response) => {
    if(request.body.password.length < 3){
        return response.status(400).send({error:'password should be at least 3 characters long'})
    }

    const passwordHash = await bcrypt.hash(request.body.password, 10)  // Add await

    const user = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash  // Change from passwordhash to passwordHash
    })

    try {
        const result = await user.save()
        response.status(201).json(result)
    } catch(error) {
        response.status(400).send({error:'Invalid username or password'})
    }
})


userRouter.get('/users', async (request, response) => {
    const users = await User
    .find({}).populate('blogs') 
    response.json(users)  
     
})
module.exports = userRouter