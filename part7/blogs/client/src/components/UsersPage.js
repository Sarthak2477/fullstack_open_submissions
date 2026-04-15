import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initializeUsers } from "../reducers/allUsersReducer"

const UsersPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    const users = useSelector(state => state.allUsers)
    return (
        <div>
            {users ? (
                <div>
                    <h2>Users</h2>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>Blogs created</td>
                                </tr>
                                {users
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            b.blogs.length - a.blogs.length
                                    )
                                    .map(user => (
                                        <tr key={user.id}>
                                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                            <td>{user.blogs.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default UsersPage
