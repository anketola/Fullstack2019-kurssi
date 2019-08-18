import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, nullifyNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
  const anecdotes = props.store.getState().anecdotes
  
  const vote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
    props.store.dispatch(notificationChange(`you voted for '${anecdote.content}'`))   
    setTimeout(() => {
      props.store.dispatch(nullifyNotification())
    }, 5000)
  }
  
  
  //console.log(anecdotes)

return (
  <div>  
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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