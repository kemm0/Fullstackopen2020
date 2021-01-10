import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: {id : anecdote.id}
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}
const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type){
    case 'VOTE':
      const anecdotes =  [...state]
      anecdotes.find(anecdote => anecdote.id === action.data.id).votes += 1
      return anecdotes
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer