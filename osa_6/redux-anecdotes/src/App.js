import React from 'react';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdotetext.value
    props.store.dispatch(createAnecdote(content))
    event.target.anecdotetext.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdotetext"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App