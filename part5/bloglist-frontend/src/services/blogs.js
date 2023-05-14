import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (id, newObj) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObj, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }