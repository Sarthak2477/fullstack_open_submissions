import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Test blog rendering", () => {
    let container
    let mockHandler

    beforeEach(() => {
        mockHandler = jest.fn()
        const blog = {
            title: "this is title",
            author: "minä",
            url: "www.fi",
            likes: 3,
        }

        container = render(
            <Blog post={blog} callOnLike={mockHandler} />
        ).container
    })

    test("check rendered blog", async () => {

        const title = screen.getByText("this is title")
        expect(title).toBeVisible()

        const author = screen.queryByText("minä")
        expect(author).not.toBeVisible()

        const url = screen.queryByText("www.fi")
        expect(url).not.toBeVisible()

        const likes = screen.getByText(
            "likes",
            { exact: false }
        )
        expect(likes).not.toBeVisible()
    })

    test("check that components turn visible when button is clicked", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("view")

        await user.click(button)

        const div = container.querySelector("#content")
        expect(div).not.toHaveStyle("display: none")

        const author = screen.queryByText("minä")
        expect(author).toBeVisible()

        const url = screen.queryByText("www.fi")
        expect(url).toBeVisible()

        const likes = screen.getByText(
            "likes",
            { exact: false }
        )
        expect(likes).toBeVisible()
    })

})

test("check like button event handler calls", async () => {
    const mockHandler = jest.fn()
    const blog = {
        title: "this is title",
        author: "minä",
        url: "www.fi",
        likes: 3,
    }

    render(
        <Blog post={blog} callOnLike={mockHandler} />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    const likeButton = screen.getByText("like")

    await user.click(viewButton)
    screen.debug()
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})



