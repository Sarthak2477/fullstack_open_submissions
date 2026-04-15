import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const initialState = window.localStorage.getItem("loggedInUser")

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser() {
            return null
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export const logInUser = credentials => {
    return async dispatch => {
        try {
            console.log(credentials)
            const user = await loginService.login(credentials)
            dispatch(setUser(user))
            blogService.setToken(user.token)
            window.localStorage.setItem("loggedInUser", JSON.stringify(user))
            dispatch(
                setNotification(
                    {
                        text: "Logged in",
                        class: "success",
                    },
                    5
                )
            )
        } catch (e) {
            dispatch(
                setNotification(
                    {
                        text: "wrong username or password",
                        class: "error",
                    },
                    5
                )
            )
            console.log("reducre", e)
        }
    }
}
export default userSlice.reducer
