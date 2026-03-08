const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }
]

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)

    await User.deleteMany({})

    const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'secret'
    }
    
    await api.post('/api/users').send(user)

    // Then login to get token
    const loginResponse = await api.post('/api/login').send({ username: 'testuser', password: 'secret' })
    token = loginResponse.body.token
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
})

test('a valid blog can be added', async () => {
    const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
})

test('default like value is 0 if the property is missing', async()=>{
    const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const lastBlog = await Blog.findOne().sort({ _id: -1 })

    assert.ok(lastBlog.likes === 0)
})

test('status code 400 if the title or url is missing', async()=>{
    const blog = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

test('blog posts get deleted', async()=>{
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(
        blogsAtEnd.length,
        blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
})

test('blog posts get updated', async()=>{
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        ...blogToUpdate,
        likes: 1000
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd[0].likes, 1000)
})

test('valid user created', async()=>{
    // Clear users for this test only
    await User.deleteMany({})
    
    const user = {
        username: 'newTestUser',
        name: 'Test User',
        password: 'secret',
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, 1)
})

test('password must have at least 3 characters', async()=>{
    // Clear users for this test only
    await User.deleteMany({})
    
    const user = {
        username: 'shortPassUser',
        name: 'Test User',
        password: 'se',
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, 0)
})

test('user can login with valid credentials', async () => {
    const user = {
        username: 'loginTestUser',
        name: 'Test User',
        password: 'secret'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)

    // Then login with the same credentials
    const loginData = {
        username: 'loginTestUser',
        password: 'secret'
    }

    const response = await api
        .post('/api/login')
        .send(loginData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.ok(response.body.token)
    assert.strictEqual(response.body.username, 'loginTestUser')
    assert.strictEqual(response.body.name, 'Test User')
})

test('login fails with invalid credentials', async () => {
    const loginData = {
        username: 'nonexistent',
        password: 'wrong'
    }

    const response = await api
        .post('/api/login')
        .send(loginData)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, 'invalid username or password')
})


after(async () => {
    await mongoose.connection.close()
})




