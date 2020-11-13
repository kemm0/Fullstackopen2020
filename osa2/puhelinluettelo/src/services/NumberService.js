import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

  const replace = newObject => {
    return axios.put(`${baseUrl}/${newObject.id}`,newObject)
  }

  const remove = objectID => {
    const response = axios.delete(`${baseUrl}/${objectID}`)
    return response
  }

  export default { 
    getAll: getAll, 
    create: create,
    remove: remove,
    replace: replace
  }