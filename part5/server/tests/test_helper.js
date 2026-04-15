const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        "author": "Matti Kunnas",
        "title": "Blogi avaruudesta",
        "url": "www.netti.fi",
        "likes": 20

    },
    {
        "author": "Kim yong Un",
        "title": "Hallitsemisen riemut",
        "url": "www.cccp.fi",
        "likes": 0
    
    }
    
]

const initialUsers = [
    {
        username: "matti123",
        name: "Matti Jukkainen",
        password: "kissa11"
    },
    {
        username: "toni123",
        name: "Toni Mäkinen",
        password: "anasalas"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


module.exports = {
    initialBlogs,initialUsers, blogsInDb, usersInDb
}
