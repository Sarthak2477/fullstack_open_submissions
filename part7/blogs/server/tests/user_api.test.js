const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

test("check that password and username are not too short", async () =>{
    const userCountBefore = (await helper.usersInDb()).length

    const tooShortPassword = {
        username: "Matti1010",
        password: "123",
        name: "Matti Mies"
    }

    const tooShortUsername = {
        username: "tom",
        password: "12345122345",
        name: "Tommi Läntinen"
    }

    await api.post("/api/users")
        .send(tooShortPassword)
        .expect(400)
    
    await api.post("/api/users")
        .send(tooShortUsername)
        .expect(400)

    const userCountAfter = (await helper.usersInDb()).length

    expect(userCountAfter).toBe(userCountBefore)
})

test("check that username and password not missing", async () =>{
    const userCountBefore = (await helper.usersInDb()).length

    const noPassword = {
        username: "Matti1010",
        name: "Matti Mies"
    }

    const noUsername = {
        password: "12345122345",
        name: "Tommi Läntinen"
    }

    await api.post("/api/users")
        .send(noPassword)
        .expect(400)
    
    await api.post("/api/users")
        .send(noUsername)
        .expect(400)

    const userCountAfter = (await helper.usersInDb()).length

    expect(userCountAfter).toBe(userCountBefore)
})


afterAll(() => {
    mongoose.connection.close()
})