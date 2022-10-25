import axios from 'axios'
const baseUrl = '/api/persons'

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
  return axios.patch(`${baseUrl}/${id}`, { number:changedNumber })
}

const exportedObject = { 
  getAll, 
  create, 
  deleteItem, 
  replaceNumber 
}

export default exportedObject