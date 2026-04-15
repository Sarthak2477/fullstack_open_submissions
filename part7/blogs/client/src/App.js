import { useState, useEffect } from "react"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import BlogList from "./components/BlogList"
import { logInUser, setUser } from "./reducers/userReducer"
import UsersPage from "./components/UsersPage"
import { Routes, Route } from "react-router-dom"
import UserPage from "./components/UserPage"
import BlogPage from "./components/BlogPage"
import blogService from "./services/blogs"
import NavBar from "./components/NavBar"
import { Link } from "@mui/material"
import RegisterPage from "./components/RegisterPage"

function App() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    // initialize blogs
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    // log in existing user
    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedInUser")
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const user = useSelector(state => state.user)
    const handleLogin = async event => {
        event.preventDefault()

        dispatch(logInUser({ username, password }))
        setUsername("")
        setPassword("")
    }

    const loginForm = () => {
        return (
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        username:{" "}
                        <input
                            id="username"
                            onChange={({ target }) => {
                                setUsername(target.value)
                            }}
                            value={username}
                        />
                    </div>
                    <div>
                        password:{" "}
                        <input
                            id="password"
                            type="password"
                            onChange={({ target }) => {
                                setPassword(target.value)
                            }}
                            value={password}
                        />
                    </div>
                    <div>
                        <button id="login-button" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                New user?
                <Link href="/register"> Register here</Link>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="background">
                            <Notification />
                            {user === null ? loginForm() : <BlogList />}
                        </div>
                    }
                />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/blogs/:id" element={<BlogPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
    )
}

export default App
