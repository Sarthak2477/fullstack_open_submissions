import axios from "axios"
const URL = "/api/users"

const register = async credentials => {

    const response = await axios.post(URL, credentials)
    return response.data
}

export default { register }