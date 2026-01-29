import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  try {
        return await axios
            .get(baseUrl)
    } catch (error) {
        return console.log(error.response.data)
    }
}

const create = async newObject => {
  try {
        return await axios
            .post(baseUrl, newObject)
    } catch (error) {
        return console.log(error.response.data)
    }
}

const update = async (id, newObject) => {
  try {
        return await axios
            .put(`${baseUrl}/${id}`, newObject)
    } catch (error) {
        console.log("Error",error.response.data)
        throw error("Not Found")
    }
}

const deletePerson = async (id) => {
  try {
        return await axios
            .delete(`${baseUrl}/${id}`)
    } catch (error) {
        return console.log(error.response.data)
    }
}

export default {getAll, create, update, deletePerson}