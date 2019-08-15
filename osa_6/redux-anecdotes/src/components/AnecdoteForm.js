import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdotetext.value
    props.store.dispatch(createAnecdote(content))
    event.target.anecdotetext.value = ''
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