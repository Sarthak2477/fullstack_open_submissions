import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Link,
} from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../reducers/userReducer"

const NavBar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(removeUser())
        window.localStorage.removeItem("loggedInUser")
    }
    return user ? (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Link underline="hover" color={"white"} href={"/"}>
                        <Typography variant="h6">Blogs</Typography>
                    </Link>
                    <Link underline="hover" color={"white"} href={"/users"}>
                        <Typography variant="h6">Users</Typography>
                    </Link>
                    <Typography variant="h6">
                        Logged in as {user.name}
                    </Typography>
                    <Button variant="secondary" onClick={handleLogOut}>Log out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    ) : null
}

export default NavBar
