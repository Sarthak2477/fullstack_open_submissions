import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const UserPage = () => {
    const users = useSelector(state => state.allUsers)

    const match = useMatch("/users/:id")
    const user = match ? users.find(user => user.id === match.params.id) : null

    return (
        <div>
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    <h4>Added blogs</h4>
                    {user.blogs.length ? (
                        user.blogs.slice().map(blog => (
                            <div key={blog.id}>
                                <ul>
                                    <li>{blog.title}</li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>no blogs</p>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default UserPage
