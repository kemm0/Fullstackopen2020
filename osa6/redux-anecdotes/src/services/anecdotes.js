import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {content, votes: 0}
  const response = await axios.post(baseUrl,object)
  console.log(response.data)
  return response.data
}

const vote = async object => {
  const request = await axios.put(`${baseUrl}/${object.id}`,{
    content: object.content,
    votes: object.votes + 1
  })
  return request.data
}
export default {getAll, createNew, vote}