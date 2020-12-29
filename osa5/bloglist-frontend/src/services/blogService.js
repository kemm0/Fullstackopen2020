import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token}
  }
  const request = await axios.post(baseUrl, {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url
  },config)
  return request.data
}
const modify = async (blogObject) => {
  const config = {
    headers: { Authorization: token}
  }
  const request = await axios.put(`${baseUrl}/${blogObject.id}`, {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: blogObject.likes
  },config)
  return request.data
}
const remove = async (blogObject) => {
  const config = {
    headers: { Authorization: token}
  }
  const request = await axios.delete(`${baseUrl}/${blogObject.id}`,config)
  return request.data
}

export default { getAll, setToken, create, modify, remove }