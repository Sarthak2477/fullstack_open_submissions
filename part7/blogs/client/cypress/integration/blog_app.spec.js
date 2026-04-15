

describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function () {
        cy.get("#username")
        cy.get("#password")
        cy.get("#login-button")
    })

    describe("Login", function () {
        const username = "teppo1"
        const password = "kissa123"
        beforeEach(function () {
            cy.newUser({ username, password })
        })
        it("succeeds with correct credentials", function () {
            cy.get("#username").type(username)
            cy.get("#password").type(password)
            cy.get("#login-button").click()

            cy.contains("Logged in")
            cy.contains("Log out")
        })

        it("fails with wrong credentials", function () {
            cy.get("#username").type(username)
            cy.get("#password").type("wrong")
            cy.get("#login-button").click()

            cy.contains("wrong username or password")
        })
    })

    describe("When logged in", function () {

        beforeEach(function () {
            const username = "teppo1"
            const password = "kissa123"
            cy.newUser({ username, password })
            cy.login({ username, password })
        })

        it("A blog can be created", function () {
            // open blog form
            cy.get("#open-togglable").click()

            // type blog info + submit
            const title = "this is title"
            cy.get("#title-input").type(title)
            cy.get("#author-input").type("Juha Kuusi")
            cy.get("#url-input").type("www.fi")
            cy.get("#submit-button").click()

            // check blog visibility
            cy.get(".blog")
            cy.contains(`New blog ${title} created`)
            cy.contains(title)
        })

    })

    describe("When logged in + blog created", function () {
        beforeEach(function () {
            const username = "teppo1"
            const password = "kissa123"
            cy.newUser({ username, password })
            cy.login({ username, password })
            cy.createBlog({ title: "this is title", author: "Jaska", url: "www.fi" })
        })

        it("A blog can be liked", function () {

            //open blog post
            cy.get(".blog").parent().as("blog")
            cy.get("@blog").find("#open-togglable").click()
            cy.get("@blog").should("contain", "likes 0")

            cy.get("@blog").find("#like-button").click()
            cy.get("@blog").should("contain", "likes 1")
        })

        it("blog removed", function () {
            //open blog post
            cy.get(".blog").parent().as("blog")
            cy.get("@blog").find("#open-togglable").click()

            cy.get("@blog").find("#remove-button").click()
            cy.on("window:confirm", () => true)
            cy.get(".blog").should("not.exist")
        })
    })

    describe("Three blogs created", function() {
        beforeEach(function() {
            const username = "teppo1"
            const password = "kissa123"
            cy.newUser({ username, password })
            cy.login({ username, password })
            cy.createBlog({ title: "least likes", author: "Jaska", url: "www.fi" })
            cy.createBlog({ title: "second most likes", author: "Jaska", url: "www.fi" })
            cy.createBlog({ title: "most likes", author: "Jaska", url: "www.fi" })
        })

        it("check blog sorting based on likes", function() {
            // check original order
            cy.get(".blog").eq(0).as("least").should("contain", "least likes")
            cy.get(".blog").eq(1).as("second").should("contain", "second most likes")
            cy.get(".blog").eq(2).as("most").should("contain", "most likes")

            // like post once
            cy.get("@second").find("#open-togglable").click()
            cy.get("@second").find("#like-button").click()

            // like post twice
            cy.get("@most").find("#open-togglable").click()
            cy.get("@most").find("#like-button").click()
            cy.wait(1000)
            cy.get("@most").find("#like-button").click()

            // check new order
            cy.get(".blog").eq(0).should("contain", "most likes")
            cy.get(".blog").eq(1).should("contain", "second most likes")
            cy.get(".blog").eq(2).should("contain", "least likes")
        })
    })

})