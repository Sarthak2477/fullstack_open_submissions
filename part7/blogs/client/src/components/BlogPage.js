import { Button, Link, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import CommentBox from "./CommentBox"
import { ThumbUp, DeleteOutline } from "@mui/icons-material"

const BlogPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blogs = useSelector(state => state.blogs)

    const match = useMatch("/blogs/:id")
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    const handleLikeButton = async event => {
        event.preventDefault()
        dispatch(likeBlog(blog.id))
    }

    const handleRemoveButton = async event => {
        if (window.confirm(`Remove blog ${blog.title}?`)) {
            event.preventDefault()
            dispatch(removeBlog(blog.id))
            navigate("/")
        }
    }

    return blog ? (
        <Container style={{ margin: "20px", backgroundColor: "whitesmoke" }}>
            <Container style={{ color: "#004d40", backgroundColor: "#4db6ac" }}>
                <Typography variant="h3">{blog.title}</Typography>
                <h2>author: {blog.author}</h2>
            </Container>

            <Link target="_blank" rel="noopener" href={blog.url}>
                {blog.url}
            </Link>
            <Typography variant="body1">Added by {blog.user.name}</Typography>

            <Stack style={{ margin: "20px" }} direction="row" spacing={2}>
                <Button
                    variant="contained"
                    startIcon={<ThumbUp></ThumbUp>}
                    id="like-button"
                    onClick={handleLikeButton}
                >
                    like {blog.likes}
                </Button>
                <Button
                    variant="outlined"
                    endIcon={<DeleteOutline />}
                    id="remove-button"
                    onClick={handleRemoveButton}
                >
                    remove
                </Button>
            </Stack>

            <CommentBox blog={blog} />
        </Container>
    ) : null
}

export default BlogPage
