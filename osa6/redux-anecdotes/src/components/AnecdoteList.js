import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote} 
  from '../reducers/anecdoteReducer'
import {notificationChange} 
  from '../reducers/NotificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    console.log('vote', anecdote.content)
    dispatch(voteAnecdote(anecdote))
    dispatch(notificationChange(`Voted ${anecdote.content}`,5))
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
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList