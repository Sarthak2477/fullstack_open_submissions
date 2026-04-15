import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = []
const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
    },
})

export const { setUsers } = allUsersSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3003/api/users")
        dispatch(setUsers(response.data))

    }
}


export default allUsersSlice.reducer