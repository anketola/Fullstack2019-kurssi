import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdotetext.value
    event.target.anecdotetext.value = ''
    props.createAnecdote(content)
    props.setNotification(`you added a new anecdote called '${content}'`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm