const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogRouter.get('/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogRouter.post('/blogs', async(request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    }

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog
        ({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes || 0,
            user: user._id
        })

    blog.save().then((result) => {
        response.status(201).json(result)
    }).catch(error => {
        response.status(400).send({ error: 'bad request' })
    })
})
blogRouter.delete('/blogs/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog.user && blog.user.toString() !== request.user._id.toString()) {
            return response.status(401).json({ error: 'permission denied' })
        }
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})


blogRouter.put('/blogs/:id', (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})
module.exports = blogRouter