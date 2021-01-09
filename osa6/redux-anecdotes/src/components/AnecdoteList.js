import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote} 
  from '../reducers/anecdoteReducer'
import {notificationChange} 
  from '../reducers/NotificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const content = anecdotes.find(anecdote => anecdote.id === id).content
    dispatch(notificationChange(`Voted ${content}`))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }
  return (
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList