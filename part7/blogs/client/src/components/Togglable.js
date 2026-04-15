import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import { Button, Paper, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const clearFields = () => {
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    const createBlog = async event => {
        event.preventDefault()
        props.addBlog({
            title,
            author,
            url,
        })
        clearFields()
    }

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })
    const marginStyle = { margin: "5px" }
    return (
        <Paper>
            <div style={hideWhenVisible}>
                <Button id="open-togglable" onClick={toggleVisibility}>
                    {props.viewlabel}
                </Button>
            </div>
            <Box sx={{ width: "100%" }}>
                <Stack style={showWhenVisible}>
                    <form onSubmit={createBlog}>
                        <div>
                            <p>Enter new blog info</p>
                            <TextField
                                style={marginStyle}
                                label="Title"
                                id="title-input"
                                onChange={({ target }) => {
                                    setTitle(target.value)
                                }}
                                value={title}
                            />
                        </div>
                        <div>
                            <TextField
                                style={marginStyle}
                                label="Author"
                                id="author-input"
                                onChange={({ target }) => {
                                    setAuthor(target.value)
                                }}
                                value={author}
                            />
                        </div>
                        <div>
                            <TextField
                                style={marginStyle}
                                label="Url"
                                id="url-input"
                                onChange={({ target }) => {
                                    setUrl(target.value)
                                }}
                                value={url}
                            />
                        </div>
                        <Stack style={marginStyle} direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                id="submit-button"
                                type="submit"
                            >
                                add
                            </Button>
                            <Button
                                variant="outlined"
                                id="close-togglable"
                                onClick={toggleVisibility}
                            >
                                {props.cancellabel}
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Paper>
    )
})

Togglable.propTypes = {
    viewlabel: PropTypes.string.isRequired,
    cancellabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable
