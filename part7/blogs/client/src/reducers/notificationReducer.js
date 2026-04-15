import { createSlice } from "@reduxjs/toolkit"

const initialState = null
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        },
    },
})

export const { addNotification, clearNotification } = notificationSlice.actions


export const setNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(addNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 1000*seconds)
    }
}

export default notificationSlice.reducer