import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, nullifyNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdotetext.value
    props.store.dispatch(createAnecdote(content))
    event.target.anecdotetext.value = ''
    props.store.dispatch(notificationChange(`you added a new anecdote called '${content}'`))   
    setTimeout(() => {
      props.store.dispatch(nullifyNotification())
    }, 5000)
  }

return (
  <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdotetext"/></div>
      <button>create</button>
    </form>
  </div>
  )  
}

export default AnecdoteForm