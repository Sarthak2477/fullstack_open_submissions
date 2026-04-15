import { Button, Card, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"

const CommentBox = ({ blog }) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const handleComment = async event => {
        event.preventDefault()
        console.log(blog.id, comment)
        dispatch(addComment(comment, blog.id))
        setComment("")
    }

    return (
        <Card style={{ padding: "10px" }}>
            <form onSubmit={handleComment}>
                <Stack direction="row" spacing={3}>
                    {" "}
                    <div>
                        <TextField
                            label="Enter comment"
                            id="comment-input"
                            onChange={({ target }) => {
                                setComment(target.value)
                            }}
                            value={comment}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            id="submit-button"
                            type="submit"
                        >
                            add
                        </Button>
                    </div>
                </Stack>
            </form>
            {blog.comments.map(comment => (
                <Card style={{ backgroundColor: "Aquamarine", margin: "10px" }} key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>- {comment.user.name}</p>
                </Card>
            ))}
        </Card>
    )
}

export default CommentBox
