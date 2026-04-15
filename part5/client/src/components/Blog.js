import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ post, blogs, setBlogs, callOnLike }) => {

    const handleLikeButton = async (event) => {
        event.preventDefault()


        const newBlog = {
            ...post, likes: post.likes + 1,
        }

        const res = await blogService.updateBlog(post.id, newBlog)
        setBlogs(blogs.map(blog => blog.id === res.id ? { ...blog, likes: res.likes } : blog))
    }

    const handleRemoveButton = async (event) => {
        if (window.confirm(`Remove blog ${post.title}?`)) {
            event.preventDefault()
            await blogService.removeBlog(post.id)
            setBlogs(blogs.filter(blog => blog.id !== post.id))
        }

    }
    return (
        <div className="blog">
            <p className="blog-title">{post.title}</p>
            <Togglable viewlabel="view" cancellabel="hide">
                <div className="blog-content">
                    <p>{post.author}</p>
                    <p>{post.url}</p>
                    <p>likes {post.likes}</p>
                    <button id="like-button" onClick={callOnLike ? callOnLike : handleLikeButton}>like</button>
                    <button id="remove-button" onClick={handleRemoveButton}>remove</button>
                </div>
            </Togglable>
        </div>
    )
}

export default Blog