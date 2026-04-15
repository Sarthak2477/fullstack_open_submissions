import { Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

import registerService from "../services/register"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { logInUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const marginStyle = { margin: "5px" }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async event => {
        event.preventDefault()
        if (username.length < 4 || password.length < 4) {
            dispatch(
                setNotification(
                    {
                        class: "error",
                        text: "Username or password too short",
                    },
                    5
                )
            )
        } else {
            console.log(username, password)
            const nameInput = name ? name : username
            const user = await registerService.register({
                username,
                name: nameInput,
                password,
            })
            dispatch(logInUser({ username, password }))
            navigate("/")
            setNotification(
                {
                    text: `Welcome ${user.name}`,
                    class: "success",
                },
                5
            )
        }
    }

    return (
        <Paper>
            <Notification />
            <Stack style={{ padding: "10px" }}>
                <Typography variant="body2">Create new user</Typography>
                <form onSubmit={onSubmit}>
                    <div>
                        <TextField
                            required
                            style={marginStyle}
                            label="Username"
                            id="register-username-input"
                            onChange={({ target }) => {
                                setUsername(target.value)
                            }}
                            value={username}
                        />
                    </div>
                    <div>
                        <TextField
                            style={marginStyle}
                            label="Name"
                            id="register-name-input"
                            onChange={({ target }) => {
                                setName(target.value)
                            }}
                            value={name}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            type="password"
                            style={marginStyle}
                            label="Password"
                            id="register-password-input"
                            onChange={({ target }) => {
                                setPassword(target.value)
                            }}
                            value={password}
                        />
                    </div>
                    <Button variant="contained" type="submit">
                        Register
                    </Button>
                </form>
            </Stack>
        </Paper>
    )
}

export default RegisterPage
