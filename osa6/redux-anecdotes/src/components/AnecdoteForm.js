import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote} 
  from '../reducers/anecdoteReducer'
import {notificationChange} 
  from '../reducers/NotificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationChange(`Created ${content}`,5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm