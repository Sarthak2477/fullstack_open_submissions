import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const Message = ({ message }) => {
    if (message === null) {
        return null
    }
    return <div className={message.class}>{message.text}</div>
}

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(data => {
            setBlogs(data)
        })
    }, [])

    // login user
    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedInUser")
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })


            console.log(user)
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            window.localStorage.setItem("loggedInUser", JSON.stringify(user))
            setMessage({
                text: "Logged in",
                class: "success"
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (e) {
            setMessage({
                text: "wrong username or password",
                class: "error"
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            console.log("wrong credentials")
            console.log(e)
        }
    }

    const loginForm = () => {
        return (
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        username: <input
                            id="username"
                            onChange={({ target }) => { setUsername(target.value) }}
                            value={username} />
                    </div>
                    <div>
                        password: <input
                            id="password"
                            type="password"
                            onChange={({ target }) => { setPassword(target.value) }}
                            value={password} />
                    </div>
                    <div>
                        <button id="login-button" type="submit">Login</button>
                    </div>
                </form>

            </div>
        )
    }

    const handleChange = async (blogObject) => {

        try {
            const res = await blogService.create(blogObject)
            setBlogs(blogs.concat(res))
            console.log(res)

            setMessage({
                text: `New blog ${res.title} created`,
                class: "success"
            })

            blogFormRef.current.toggleVisibility()

            setTimeout(() => {
                setMessage(null)
            }, 5000)

        } catch (e) {
            setMessage({
                text: e.text,
                class: "error"
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)

            console.log(e)
        }
    }

    const blogForm = () => {
        return (
            <Togglable viewlabel="new blog" cancellabel="cancel" ref={blogFormRef}>
                <BlogForm
                    handleChange={handleChange} />
            </Togglable>

        )
    }

    const blogPosts = () => {
        return (
            <div>
                {blogs.sort((a, b) => { return b.likes - a.likes }).map(blog => <Blog key={blog.id} blogs={blogs} setBlogs={setBlogs} post={blog} />)}
            </div>
        )
    }

    const handleLogOut = () => {
        setUser(null)
        window.localStorage.removeItem("loggedInUser")
    }

    return (

        <div className="background">
            <Message message={message} />
            {user === null ?
                loginForm() :
                <div>
                    <button onClick={handleLogOut}>Log out</button>
                    <p>Logged in as {user.name}</p>
                    {blogForm()}
                    {blogPosts()}
                </div>
            }
        </div>


    )
}

export default App
