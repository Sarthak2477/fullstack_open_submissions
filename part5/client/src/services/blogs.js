import axios from "axios"
const URL = "/api/blogs"
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(URL, newObject, config)
    return response.data
}

const removeBlog = async id => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${URL}/${id}`, config)
    return response.data
}

const updateBlog = async (id, newObject) => {
    const response = await axios.put(`${URL}/${id}`, newObject)
    return response.data
}

// eslint-disable-next-line
export default { create, getAll, removeBlog, updateBlog, setToken }