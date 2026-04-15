const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

const getTokenAndLogin = async () => {
    const user = (await helper.initialUsers)[0]

    await api
        .post("/api/users")
        .send(user)
        .expect(201)


    const res = await api
        .post("/api/login")
        .send(user)
    
    return res.body.token
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
})

test("check notes return form", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("check that all returned blogs have field 'id'", async () => {
    const res = await api
        .get("/api/blogs")

    res.body.forEach((obj) => {
        expect(Object.keys(obj)).toContain("id")
    })
})

test("check that new blogs can be added", async () => {
    const blogCountBegin = (await helper.blogsInDb()).length

    const token = await getTokenAndLogin()

    const newBlog = {
        "author": "kimi räikkönen",
        "title": "jääukko",
        "url": "www.rimikäikkönen.fi",
        "likes": 10032
    }

    await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

    const blogCountEnd = (await helper.blogsInDb()).length

    expect(blogCountEnd).toBe(blogCountBegin + 1)
})


test("check that blog added with no likes field gets zero likes", async () => {

    const token = await getTokenAndLogin()

    const newBlog = {
        "author": "kimi räikkönen",
        "title": "jääukko",
        "url": "www.rimikäikkönen.fi"
    }

    const res = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

    expect(res.body.likes).toBe(0)
})

test("check that post request with no title or url return code 400", async () => {
    const token = await getTokenAndLogin()

    const newBlog = {
        "author": "kimi räikkönen",
        "likes": 10
    }

    await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        
})

test("add and delete blog by id and return 204", async () => {
    const token = await getTokenAndLogin()

    const newBlog = {
        "author": "kimi räikkönen",
        "title": "jääukko",
        "url": "www.rimikäikkönen.fi"
    }

    const res = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

    const id = res.body.id

    const blogCountBegin = (await helper.blogsInDb()).length

    await api
        .delete(`/api/blogs/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204)

    const blogCountEnd = (await helper.blogsInDb()).length

    expect(blogCountEnd).toBe(blogCountBegin - 1)
})


test("edit existing blog", async () => {
    const originalBlog = (await helper.blogsInDb())[0]
    const id = originalBlog.id

    const updatedBlog = {...originalBlog, likes: originalBlog.likes +1}
    const res = await api
        .put(`/api/blogs/${id}`)
        .send(updatedBlog)
  
    expect(res.body.likes).toBe(originalBlog.likes + 1)
})

test("unauthorized access to blog POST method without token", async () => {

    const newBlog = {
        "author": "kimi räikkönen",
        "title": "jääukko",
        "url": "www.rimikäikkönen.fi"
    }

    await api
        .post("/api/blogs")
        .set("Authorization", "Bearer ")
        .send(newBlog)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})