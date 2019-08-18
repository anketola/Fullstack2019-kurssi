import React from 'react'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, nullifyNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
  const anecdotes = props.store.getState().anecdotes
  
  const filter = props.store.getState().filter

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
    <Filter store={props.store}/>  
    {anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.includes(filter))
    .map(anecdote =>
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