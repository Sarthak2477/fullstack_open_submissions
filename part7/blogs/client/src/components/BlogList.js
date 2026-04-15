import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import Togglable from "./Togglable"
import Blog from "./Blog"
import { useRef } from "react"

const BlogList = () => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const blogs = useSelector(state => state.blogs)

    const addBlog = async blogObject => {
        dispatch(createBlog(blogObject))
        blogFormRef.current.toggleVisibility()
    }

    const blogForm = () => {
        return (
            <Togglable
                viewlabel="new blog"
                cancellabel="cancel"
                ref={blogFormRef}
                addBlog={addBlog}
            />
        )
    }

    const blogPosts = () => {
        return blogs ? (
            <div>
                {blogs
                    .slice()
                    .sort((a, b) => {
                        return b.likes - a.likes
                    })
                    .map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
            </div>
        ) : null
    }

    return (
        <div>
            {blogForm()}
            {blogPosts()}
        </div>
    )
}

export default BlogList
