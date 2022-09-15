import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteItem = id => {
    return axios.delete(`${baseUrl}/${id}`)
  }

const replaceNumber = (id, changedNumber) => {
  return axios.put(`${baseUrl}/${id}`, changedNumber)
}

export default { getAll, create, deleteItem, replaceNumber }