import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("test blog content on submition", async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const blog = {
        title: "this is title",
        author: "minä",
        url: "www.fi"
    }

    const { container } = render(<BlogForm handleChange={createBlog}/>)

    const titleInput = container.querySelector("#title-input")
    const authorInput = container.querySelector("#author-input")
    const urlInput = container.querySelector("#url-input")
    const submitButton = screen.getByRole("button")


    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toMatchObject(blog)

})